// Protection d'accès : redirige si pas connecté
if (!localStorage.getItem("pb_token")) {
  window.location.href = "login.html";
}

// Affiche le nom de l'utilisateur connecté
async function fetchUserInfo() {
  const token = localStorage.getItem("pb_token");
  const userId = localStorage.getItem("user_id");
  try {
    const response = await fetch(`http://127.0.0.1:8090/api/collections/inschrijvingen/records/${userId}`, {
      headers: { "Authorization": token }
    });
    if (response.ok) {
      const user = await response.json();
      document.getElementById("welcome").textContent = `Welkom, ${user.voornaam} ${user.naam} !`;
    }
  } catch (e) {
    window.location.href = "login.html";
  }
}
document.addEventListener("DOMContentLoaded", fetchUserInfo);

// Déconnexion
document.getElementById("logoutBtn").addEventListener("click", function() {
  localStorage.removeItem("pb_token");
  localStorage.removeItem("user_id");
  window.location.href = "login.html";
});
