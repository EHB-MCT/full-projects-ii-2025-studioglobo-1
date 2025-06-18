let currentStep = 0;
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");

// Rendre la fonction globale pour l'utiliser avec onclick dans le HTML
window.changeStep = function(direction) {
  steps[currentStep].classList.remove("active");
  currentStep += direction;
  steps[currentStep].classList.add("active");

  backBtn.style.display = currentStep === 0 ? "none" : "inline";
  nextBtn.style.display =
    currentStep === steps.length - 1 ? "none" : "inline";
  submitBtn.style.display =
    currentStep === steps.length - 1 ? "inline" : "none";
};

document.addEventListener("DOMContentLoaded", () => {
  backBtn.style.display = "none";
});

const form = document.getElementById("inschrijfformulier");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Validation des mots de passe
  const password = form.elements["password"].value;
  const password1 = form.elements["password1"].value;
  if (password !== password1) {
    alert("De wachtwoorden komen niet overeen.");
    return;
  }
  if (password.length < 8) {
    alert("Het wachtwoord moet minstens 8 tekens bevatten.");
    return;
  }

  // Construction de l’adresse pour géocodage
  const straat = form.elements["straat"].value;
  const postcode = form.elements["postcode"].value;
  const gemeente = form.elements["gemeente"].value;
  const address = `${straat}, ${postcode} ${gemeente}, België`;

  // Géocodage via OpenStreetMap Nominatim
  let lat = null, lon = null;
  try {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(geocodeUrl, { headers: { 'Accept-Language': 'nl' } });
    const data = await res.json();
    if (data && data.length > 0) {
      lat = parseFloat(data[0].lat);
      lon = parseFloat(data[0].lon);
    } else {
      alert("Adres niet gevonden. Controleer je gegevens.");
      return;
    }
  } catch (err) {
    alert("Fout bij geocodering.");
    return;
  }

  // Prépare les données à envoyer à Pocketbase
  const body = {
    school: form.elements["school"].value,
    straat,
    postcode,
    gemeente,
    kleuter: form.elements["kleuter"].checked,
    lager: form.elements["lager"].checked,
    hoger: form.elements["hoger"].checked,
    secundair: form.elements["secundair"].checked,
    naam: form.elements["naam"].value,
    voornaam: form.elements["voornaam"].value,
    email: form.elements["email"].value,
    telefoon: form.elements["telefoon"].value,
    password: password,
    passwordConfirm: password,
    toestemming: form.elements["toestemming"].checked,
    latitude: lat,
    longitude: lon
  };

  // Envoi à Pocketbase
  try {
    const pbUrl = "http://127.0.0.1:8090/api/collections/inschrijvingen/records";
    const response = await fetch(pbUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      alert("Inschrijving geslaagd!");
      form.reset();
      // Retour à la première étape
      steps[currentStep].classList.remove("active");
      currentStep = 0;
      steps[currentStep].classList.add("active");
      backBtn.style.display = "none";
      nextBtn.style.display = "inline";
      submitBtn.style.display = "none";
    } else {
      const error = await response.json();
      alert("Fout bij inschrijven: " + JSON.stringify(error));
      console.error(error);
    }
  } catch (err) {
    alert("Kon niet verbinden met Pocketbase.");
  }
});
