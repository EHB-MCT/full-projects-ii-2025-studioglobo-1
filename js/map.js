var map = L.map("map").setView([50.85, 4.35], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Charger les écoles depuis Pocketbase
async function loadMarkers() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/inschrijvingen/records?perPage=100"
    );
    const data = await response.json();
    data.items.forEach((item) => {
      if (item.latitude && item.longitude) {
        L.marker([item.latitude, item.longitude]).addTo(map).bindPopup(`
    <div class="school-popup">
      <h3>${item.school}</h3>
      <div>
        ${item.straat}, ${item.gemeente}
      </div>
    </div>
  `);
      }
    });
  } catch (e) {
    alert("Fout bij het laden van de markers!");
    console.error(e);
  }
}

loadMarkers();
