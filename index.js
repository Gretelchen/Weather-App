function getCurrentDayTime() {
  dayTime.innerHTML = `${day} ${hour}:${minute}`;
}

let current = new Date();
let dayTime = document.querySelector("#update-day-time");
let hour = current.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = current.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[current.getDay()];

getCurrentDayTime();

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getLocationData);
}

function getLocationData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2fed1584ca3221a55333f6e6fcb1d723";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

let button = document.querySelector("#buttonCurrentPosition");
button.addEventListener("click", getCurrentPosition);

function displayWeather(event) {
  console.log(event.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city-display");
  let iconElement = document.querySelector("#icon");
  let iconUrl = event.data.weather[0].icon;

  celsiusTemperature = event.data.main.temp;

  temperatureElement.innerHTML = Math.round(event.data.main.temp);
  cityElement.innerHTML = event.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconUrl}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
<div class="col-2">
      <div>
          ${formatHours(forecast.dt * 1000)}
      </div>
      <div><strong>
          ${Math.round(forecast.main.temp)}° <strong/>
      </div>
      <div style="display: flex; justify-content: center;">
      <img
         src="http://openweathermap.org/img/wn/${
           forecast.weather[0].icon
         }@2x.png" alt="" style="width= 50px; height: 60px;"
         />
         <div/>
      
  </div>`;
  }
}

function search(city) {
  let apiKey = "2fed1584ca3221a55333f6e6fcb1d723";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(displayForecast);
}

function handleSumbmit(submit) {
  submit.preventDefault();
  let cityInput = document.querySelector("#city-display");
  let searchInput = document.querySelector("#search-input");
  cityInput.innerHTML = searchInput.value;
  search(searchInput.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSumbmit);

function displayCelcius(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitFormula = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = fahrenheitFormula;
}

let celsiusLink = document.querySelector("#celsius");
let temperature = document.querySelector("#temperature");
celsiusLink.addEventListener("click", displayCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusTemperature = null;

search("Andorra");
