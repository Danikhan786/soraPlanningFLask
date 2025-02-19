// Initialize the Leaflet map
var map = L.map('map').setView([ 30.3753, 69.3451], 5   ); // Set default view coordinates

// Add a tile layer (using Esri World Imagery for Hybrid and Satellite view)
var hybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors',
    // maxZoom: 22, 
}).addTo(map);

// Add OpenStreetMap layer for Street View
var streetViewLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// Add zoom control (this is added by default)
map.zoomControl.setPosition('topleft'); // Adjust zoom control position if needed
// Add a base layer control for switching between map types (Street View, Satellite, Hybrid)
L.control.layers({
    "Satellite": hybridLayer,
    "Hybrid": hybridLayer, // Using the same hybridLayer for simplicity
    "Street View": streetViewLayer,
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

