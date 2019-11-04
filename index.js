function getCurrentDayTime() {
  dayTime.innerHTML = `${day} ${hour}:${minute}`;
}

let current = new Date();
let dayTime = document.querySelector("#update-day-time");
let hour = current.getHours();
let minute = current.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[current.getDay()];

getCurrentDayTime();

function displayCelcius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = temperature.innerHTML;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitFormula = Math.round((temperature.innerHTML * 9) / 5 + 32);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = fahrenheitFormula;
}

let celsiusLink = document.querySelector("#celsius");
let temperature = document.querySelector("#temperature");
celsiusLink.addEventListener("click", displayCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

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

  temperatureElement.innerHTML = Math.round(event.data.main.temp);
  cityElement.innerHTML = event.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconUrl}@2x.png`
  );
}

function search(city) {
  let apiKey = "2fed1584ca3221a55333f6e6fcb1d723";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSumbmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-display");
  let searchInput = document.querySelector("#search-input");
  cityInput.innerHTML = searchInput.value;
  search(searchInput.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSumbmit);

search("Andorra");
