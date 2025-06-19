document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const naam = document.getElementById('naam').value;
  const voornaam = document.getElementById('voornaam').value;
  const email = document.getElementById('email').value;
  const telefoon = document.getElementById('telefoon').value;
  const onderwerp = document.getElementById('onderwerp').value;
  const bericht = document.getElementById('bericht').value;

  const to = "tonadresse@gmail.com"; // <-- À remplacer par ton adresse
  const subject = encodeURIComponent(onderwerp || "Contactformulier");
  const body = encodeURIComponent(
    `Naam: ${naam}\nVoornaam: ${voornaam}\nE-mail: ${email}\nTelefoon: ${telefoon}\n\nBericht:\n${bericht}`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;

  window.open(gmailUrl, '_blank');
});


// Accordéon comportement
      document.querySelectorAll(".faq-question").forEach((question, idx) => {
        question.addEventListener("click", function () {
          const item = this.parentElement;
          // Fermer les autres
          document.querySelectorAll(".faq-item").forEach((el, i) => {
            if (el !== item) el.classList.remove("open");
          });
          // Toggle celui cliqué
          item.classList.toggle("open");
        });
      });