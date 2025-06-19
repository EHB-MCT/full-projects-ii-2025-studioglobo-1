const form = document.getElementById("loginForm");
const errorDiv = document.getElementById("loginError");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  errorDiv.textContent = "";

  const email = form.elements["email"].value;
  const password = form.elements["password"].value;

  try {
    const res = await fetch("http://127.0.0.1:8090/api/collections/inschrijvingen/auth-with-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity: email, password: password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Stocke le token pour la session
      localStorage.setItem("pb_token", data.token);
      localStorage.setItem("user_id", data.record.id);
      // Redirige vers la page protégée (exemple : lesmateriaal.html)
      window.location.href = "materiaal.html";
    } else {
      errorDiv.textContent = "Login mislukt. Controleer je gegevens.";
      console.error("Login error details:", data);
    }
  } catch (err) {
    errorDiv.textContent = "Serverfout. Probeer later opnieuw.";
  }
});


