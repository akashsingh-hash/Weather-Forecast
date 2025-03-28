const API_KEY = "ceb8a9256a6bca61d7a69b94a74e2075"; // Replace with your API key

async function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weather-info").innerHTML = `<p>${data.message}</p>`;
            return;
        }

        // Determine weather icon based on weather condition
        let weatherIcon = getWeatherIcon(data.weather[0].main);

        document.getElementById("weather-info").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <img src="${weatherIcon}" alt="${data.weather[0].main}" class="weather-icon">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data.</p>`;
    }
}

// Function to determine weather icon based on weather condition
function getWeatherIcon(weatherCondition) {
    switch (weatherCondition) {
        case "Clear":
            return "https://openweathermap.org/img/wn/01d.png"; // Sunny icon
        case "Clouds":
            return "https://openweathermap.org/img/wn/02d.png"; // Cloudy icon
        case "Rain":
        case "Drizzle":
            return "https://openweathermap.org/img/wn/09d.png"; // Rainy icon
        case "Thunderstorm":
            return "https://openweathermap.org/img/wn/11d.png"; // Thunderstorm icon
        case "Snow":
            return "https://openweathermap.org/img/wn/13d.png"; // Snow icon
        default:
            return "https://openweathermap.org/img/wn/01d.png"; // Default to sunny icon
    }
}