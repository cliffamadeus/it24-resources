class WeatherApp {
    constructor() {
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.cityInput = document.getElementById('city');
        this.resultsContainer = document.getElementById('weatherResults');
        this.init();
    }

    init() {
        document.getElementById('getWeather').addEventListener('click', () => {
            const city = this.cityInput.value;
            const apiKey = this.apiKeyInput.value; // Get the API key from input
            this.fetchWeather(city, apiKey);
        });
    }

    async fetchWeather(city, apiKey) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            alert('Error fetching weather data: ' + error.message);
        }
    }

    displayWeather(data) {
        this.resultsContainer.innerHTML = ''; 
        const daysToDisplay = 7; 
        const groupedData = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });
        const dates = Object.keys(groupedData).slice(0, daysToDisplay);
        const getDayName = (dateString) => {
            const options = { weekday: 'long' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };
        dates.forEach(date => {
            const items = groupedData[date];
            const icon = items[0].weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
            const dayName = getDayName(date);
            const card = `
                <div class="col-md-6 weather-card">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${dayName} (${date})</h5>
                            <img src="${iconUrl}" alt="${items[0].weather[0].description}" width="100">
                            <p class="card-text">Average Temperature: ${avgTemp.toFixed(1)} °C</p>
                            <p class="card-text">Weather: ${items[0].weather[0].description}</p>
                        </div>
                    </div>
                </div>
            `;
            this.resultsContainer.innerHTML += card;
        });
    }
}

// Initialize the WeatherApp
const app = new WeatherApp();
