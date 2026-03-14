async function getWeather() {
  const cityInput = document.getElementById("city");
  const weatherContainer = document.getElementById("weather");
  const city = cityInput.value.trim(); // .trim() prevents errors from accidental spaces
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // 1. Basic validation: Don't fetch if the input is empty
  if (!city) {
    weatherContainer.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    // 2. Clear previous results or show a loading state
    weatherContainer.innerHTML = "<p>Loading...</p>";

    const response = await fetch(url);
    const data = await response.json();

    // 3. Handle the 404 (City not found)
    if (data.cod === "404") {
      weatherContainer.innerHTML = "<p>❌ City not found. Try again!</p>";
      return;
    }

    // 4. Handle other API errors (like an expired API key or limit reached)
    if (!response.ok) {
      weatherContainer.innerHTML = `<p>⚠️ Error: ${data.message}</p>`;
      return;
    }

    // 5. Success! Render the UI
    weatherContainer.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
        <h3>${Math.round(data.main.temp)}°C</h3>
        <div class="weather-details">
          <span>💧 Humidity: ${data.main.humidity}%</span>
          <span>🌬 Wind: ${data.wind.speed} m/s</span>
        </div>
      </div>
    `;

  } catch (error) {
    // 6. Handle network/connection errors
    console.error("Fetch error:", error);
    weatherContainer.innerHTML = "<p>🌐 Network error. Please check your connection.</p>";
  }
}
