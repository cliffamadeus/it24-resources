class WeatherApp {
    constructor() {
        // Text Input
        this.apiInput = document.getElementById('apiKeyInput');
        this.cityInput = document.getElementById('cityInput');
        this.getWeatherBtn = document.getElementById('getWeatherBtn');
        this.suggestionsContainer = document.getElementById('suggestions');

        // Weather Card
        this.weatherCard = document.getElementById('weatherCard');
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');

        // Event Listeners
        this.getWeatherBtn.addEventListener('click', () => this.fetchWeather());
        this.cityInput.addEventListener('input', () => this.fetchCitySuggestions());
        this.suggestionsContainer.addEventListener('click', (event) => this.selectCity(event));
    }

    displayWeather(data) {
        this.cityName.textContent = `${data.name}, ${data.sys.country} (${data.coord.lat}, ${data.coord.lon})`;
        this.temperature.textContent = `Temperature: ${data.main.temp} °C`;
        this.description.textContent = `Weather: ${data.weather[0].description}`;
        this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
        this.windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        this.weatherCard.style.display = 'block';
    }

    async fetchCitySuggestions() {
        const query = this.cityInput.value;
        const apiKey = this.apiInput.value;

        if (query && apiKey) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${apiKey}&units=metric`);
                if (response.ok) {
                    const data = await response.json();
                    this.showCitySuggestions(data.list);
                }
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
            }
        } else {
            this.suggestionsContainer.style.display = 'none';
        }
    }

    showCitySuggestions(cities) {
        this.suggestionsContainer.innerHTML = '';
        if (cities.length > 0) {
            cities.forEach(city => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = `${city.name}, ${city.sys.country}`;
                suggestionItem.dataset.cityId = city.id; // Store city ID for later use
                this.suggestionsContainer.appendChild(suggestionItem);
            });
            this.suggestionsContainer.style.display = 'block';
        } else {
            this.suggestionsContainer.style.display = 'none';
        }
    }

    selectCity(event) {
        const selectedCity = event.target.dataset.cityId;
        if (selectedCity) {
            const cityName = event.target.textContent.split(',')[0].trim();
            this.cityInput.value = cityName;
            this.suggestionsContainer.style.display = 'none';
        }
    }
}

class WeatherService extends WeatherApp {
    async fetchWeather() {
        const city = this.cityInput.value;
        const apiKey = this.apiInput.value;

        if (city && apiKey) {
            const data = await this.getWeatherData(city, apiKey);
            if (data) {
                this.displayWeather(data);
                // Close the modal after fetching weather
                const modal = bootstrap.Modal.getInstance(document.getElementById('inputModal'));
                modal.hide();
            } else {
                alert('City not found. Please try again.');
            }
        } else {
            alert('Please enter both API key and city name.');
        }
    }

    async getWeatherData(city, apiKey) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        return null;
    }
}

const weatherApp = new WeatherService();