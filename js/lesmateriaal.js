// if (!localStorage.getItem("pb_token")) {
//   window.location.href = "login.html";
// }

// async function fetchUserInfo() {
//   const token = localStorage.getItem("pb_token");
//   const userId = localStorage.getItem("user_id");
//   try {
//     const response = await fetch(`http://127.0.0.1:8090/api/collections/inschrijvingen/records/${userId}`, {
//       headers: { "Authorization": token }
//     });
//     if (response.ok) {
//       const user = await response.json();
//       document.getElementById("welcome").textContent = `Welkom, ${user.voornaam} ${user.naam} !`;
//     } else {
//       const error = await response.json();
//       console.error("Réponse de Pocketbase (NOT OK):", error);
//       alert("Erreur API : " + JSON.stringify(error));
//     }
//   } catch (e) {
//     console.error("Erreur attrapée par le catch:", e);
//     alert("Erreur JS (catch): " + e);
//   }
// }
// document.addEventListener("DOMContentLoaded", fetchUserInfo);

// document.getElementById("logoutBtn").addEventListener("click", function() {
//   localStorage.removeItem("pb_token");
//   localStorage.removeItem("user_id");
//   localStorage.removeItem("login_time"); // Si tu as ajouté la gestion du temps de session
//   window.location.href = "login.html";
// });
