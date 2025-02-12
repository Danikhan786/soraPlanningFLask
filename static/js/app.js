// Initialize the Leaflet map
var map = L.map('map').setView([51.505, -0.09], 2); // Set default view coordinates

// Add a tile layer (using Esri World Imagery for Hybrid and Satellite view)
var hybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors',
    minZoom: 2,
}).addTo(map);

// Add OpenStreetMap layer for Street View
var streetViewLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// Add zoom control (this is added by default)
map.zoomControl.setPosition('topleft'); // Adjust zoom control position if needed
// Add a base layer control for switching between map types (Street View, Satellite, Hybrid)
L.control.layers({
    "Street View": streetViewLayer,
    "Satellite": hybridLayer,
    "Hybrid": hybridLayer // Using the same hybridLayer for simplicity
}, {}, {
    position: 'topleft' // Controls the position (e.g., top right for this example)
}).addTo(map);
// Set default layer (can choose whichever one you prefer as default)
streetViewLayer.addTo(map);


// Track the markers to clear them when a new search is made
var markers = [];

// Function to remove all existing markers
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Function to place the source and destination coordinates on the map
function placeCoordinatesOnMap(sourceLat, sourceLon, destLat, destLon) {
    clearMarkers();

    var sourceMarker = L.marker([sourceLat, sourceLon]).addTo(map)
        .bindPopup("Source: (" + sourceLat + ", " + sourceLon + ")").openPopup();
    var destMarker = L.marker([destLat, destLon]).addTo(map)
        .bindPopup("Destination: (" + destLat + ", " + destLon + ")").openPopup();

    markers.push(sourceMarker, destMarker);
    map.fitBounds([[sourceLat, sourceLon], [destLat, destLon]]);
}

// Handle coordinate form submission
document.getElementById('submitCoordinates').addEventListener('click', function () {
    var sourceLat = parseFloat(document.getElementById('sourceLat').value);
    var sourceLon = parseFloat(document.getElementById('sourceLon').value);
    var destLat = parseFloat(document.getElementById('destLat').value);
    var destLon = parseFloat(document.getElementById('destLon').value);

    if (isNaN(sourceLat) || isNaN(sourceLon) || isNaN(destLat) || isNaN(destLon)) {
        alert('Please enter valid coordinates for both source and destination.');
        return;
    }

    var modal = bootstrap.Modal.getInstance(document.getElementById('coordinatesModal'));
    modal.hide();

    placeCoordinatesOnMap(sourceLat, sourceLon, destLat, destLon);
});

// Handle placing markers on map
let sourceMarker = null;
let destMarker = null;
let isPlacingSource = true;

document.getElementById('placeMarkerBtn').addEventListener('click', function () {
    alert("Click the map to place source and destination markers.");
    map.on('click', onMapClick);
});

function onMapClick(e) {
    const { lat, lng } = e.latlng;

    if (isPlacingSource) {
        if (sourceMarker) map.removeLayer(sourceMarker);
        sourceMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup("Source: (" + lat.toFixed(5) + ", " + lng.toFixed(5) + ")").openPopup();
        isPlacingSource = false;
    } else {
        if (destMarker) map.removeLayer(destMarker);
        destMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup("Destination: (" + lat.toFixed(5) + ", " + lng.toFixed(5) + ")").openPopup();
        map.off('click', onMapClick);
        isPlacingSource = true;
    }
}
