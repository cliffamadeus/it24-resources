class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.cityInput = document.getElementById('city');
        this.resultsContainer = document.getElementById('weatherResults');
        this.init();
    }

    init() {
        document.getElementById('getWeather').addEventListener('click', () => {
            const city = this.cityInput.value;
            this.fetchWeather(city);
        });
    }

    async fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
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
    
        // Group data by day
        const groupedData = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });
    
        // Get the keys (dates) and sort them
        const dates = Object.keys(groupedData).slice(0, daysToDisplay);
    
        // Create a function to get the day name
        const getDayName = (dateString) => {
            const options = { weekday: 'long' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };
    
        dates.forEach(date => {
            const items = groupedData[date];
            const icon = items[0].weather[0].icon; // Use the icon of the first item
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length; // Average temperature
            const dayName = getDayName(date); // Get day name
    
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

// Initialize the WeatherApp with your API key
const app = new WeatherApp(''); // Replace with your API key