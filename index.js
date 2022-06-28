let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = document.querySelector("#current-date");
date.innerHTML = `${day} </br> ${now.getDate()}th ${hours}:${minutes}`;
let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

let currentcity = document.querySelector("#current-city");
function showWeather(response) {
  let tempCurrentcity = document.querySelector("#temp");
  tempCurrentcity.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let windCurrentCity = document.querySelector("#windspeed");
  windCurrentCity.innerHTML = `${response.data.wind.speed}`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  currentcity.innerHTML = `${response.data.name}`;
}
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  currentcity.innerHTML = `${input.value}`;
  let apiFinalUrl = `${apiUrl}?q=${currentcity.innerHTML}&appid=${apiKey}&units=metric`;
  axios.get(`${apiFinalUrl}`).then(showWeather);
}
let form = document.querySelector(".search");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let current = document.querySelector(".current-button");
current.addEventListener("click", showCurrentWeather);
