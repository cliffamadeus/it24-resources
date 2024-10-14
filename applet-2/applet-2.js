class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.marker = null; 
        this.map.on('click', (e) => this.onMapClick(e));
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    
    onMapClick(event) {
        const { lat, lng } = event.latlng;
        this.addDynamicMarker(lat, lng);
    }

    addDynamicMarker(lat, lng) {
        if (this.marker) {
            this.map.removeLayer(this.marker); 
        }
        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.marker.bindPopup(`Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

/*
myMap.addMarker(8.359735, 124.869206, 'CCS Faculty Office');
myMap.addMarker(8.359639,124.869179, 'CCS Laboratory 1');
myMap.addMarker(8.359554,124.869153, 'CCS Laboratory 2');
*/

myMap.loadMarkersFromJson('applet-2.json');