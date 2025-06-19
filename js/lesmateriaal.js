// Vérification du token au chargement
        if (!localStorage.getItem("pb_token")) {
            window.location.href = "login.html";
        }

        // Récupération et affichage de l'utilisateur connecté
        async function fetchUserInfo() {
            const token = localStorage.getItem("pb_token");
            const userId = localStorage.getItem("user_id");
            if (!token || !userId) {
                window.location.href = "login.html";
                return;
            }
            try {
                const response = await fetch(
                    `http://127.0.0.1:8090/api/collections/inschrijvingen/records/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.ok) {
                    const user = await response.json();
                    document.getElementById(
                        "welcome"
                    ).textContent = `Welkom, ${user.voornaam} ${user.naam}!`;
                } else {
                    // Token expiré, utilisateur supprimé ou accès refusé
                    localStorage.removeItem("pb_token");
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("login_time");
                    window.location.href = "login.html";
                }
            } catch (e) {
                console.error("JS error (catch):", e);
            }
        }
        document.addEventListener("DOMContentLoaded", fetchUserInfo);

        // Logout
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("pb_token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("login_time");
            window.location.href = "login.html";
        });