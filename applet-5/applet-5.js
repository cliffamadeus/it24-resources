class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.getLocationBtn = document.getElementById('getLocationBtn');
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');

        this.getWeatherBtn.addEventListener('click', () => this.fetchWeatherByLocation());
        this.getLocationBtn.addEventListener('click', () => this.fetchWeatherByLocation());
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

    async fetchWeatherByLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await this.getWeatherDataByCoordinates(latitude, longitude);
                    if (data) {
                        this.displayWeather(data);
                    } else {
                        alert('Unable to retrieve weather data for your location.');
                    }
                },
                () => {
                    alert('Unable to retrieve your location. Please allow location access.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
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

    async getWeatherDataByCoordinates(latitude, longitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data by coordinates:', error);
        }
        return null;
    }

    displayWeather(data) {
        this.cityName.textContent = data.name || `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        
        this.weatherCard.style.display = 'block';
    }
}

const apiKey = 'YOUR_API_KEY'; 
const weatherApp = new WeatherApp(apiKey);
