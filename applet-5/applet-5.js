class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');

        this.getWeatherBtn.addEventListener('click', () => this.fetchWeather());
    }

    async fetchWeather() {
        const city = this.cityInput.value;
        if (city) {
            const data = await this.getWeatherData(city);
            if (data) {
                this.displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        } else {
            alert('Please enter a city name.');
        }
    }

    async getWeatherData(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        return null;
    }

    displayWeather(data) {
        this.cityName.textContent = data.name;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        
        this.weatherCard.style.display = 'block';
    }
}

const apiKey = 'b32786b808e33a9e3d7051cd1a10ad6f'; 
const weatherApp = new WeatherApp(apiKey);
