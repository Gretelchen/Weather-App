function search(event) {
  event.preventDefault();
  city.innerHTML = searchInput.value;
}

let searchBar = document.querySelector("#search-bar");
let searchInput = document.querySelector("#search-input");
let city = document.querySelector("#city-display");

searchBar.addEventListener("submit", search);

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

function tempCelcius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = "14";
}

function tempFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = fahrenheitFormula;
}

let celsiusLink = document.querySelector("#celsius");
let temperature = document.querySelector("#temperature");
celsiusLink.addEventListener("click", tempCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", tempFahrenheit);
let fahrenheitFormula = Math.round((14 * 9) / 5 + 32);

//Anzeige der Temperatur beim Laden der Seite
// API Wetter je Stadt
//API Forecast
