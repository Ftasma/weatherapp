"use strict";
const apiKey = "08a34b8700519f43b2fc78271ab544a7";
const inputText = document.querySelector("input");
const search = document.querySelector("button");
const body = document.querySelector(".body");
const changeImage = document.querySelector(".weatherImage");
const DescriptionText = document.querySelector(".descrip");
const errorText = document.querySelector(".error");

let data;
const weatherData = function () {
  let theInput = inputText.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${theInput}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data);
      let changeImg = "";
      const weatherFunction = function () {
        if (data?.weather[0]?.main === "Clouds") {
          changeImg = "./images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
          changeImg = "./images/clear.png";
        } else if (data.weather[0].main === "Rain") {
          changeImg = "./images/rain.png";
        } else if (data.weather[0].main === "Mist") {
          changeImg = "./images/mist.png";
        } else if (data.weather[0].main === "Snow") {
          changeImg = "./images/snow.png";
        } else if (data.weather[0].main === "Drizzle") {
          changeImg = "./images/drizzle.png";
        } else if (data.weather[0].main === "Thunderstorm") {
          changeImg = "./images/images.png";
        } else if (
          data.weather[0].main === "Tornado" ||
          "Ash" ||
          "Smoke" ||
          "Haze" ||
          "Squall"
        ) {
          changeImg = "./images/download(1).jfif";
        } else {
          changeImg = "./images/clear.png";
        }
      };
      weatherFunction();
      const omoo = `<div class="w-[90%] mx-auto">
<img class="mx-auto w-[12rem] mt-5" src=${changeImg} alt="" />
</div>
<p class="descrip"> ${data.weather[0].description}</p>
<div
class="flex flex-col mt-3 md:flex-row md:justify-around md:w[60%] md:mx-auto space-y-3"
>
<h1 class="md:text-6xl text-4xl">${Math.round(
        data?.main?.temp - 273
      )}&#8451;</h1>
<h1 class="md:text-5xl text-3xl">${data?.name}</h1>
</div>
<div class="flex justify-between w-[90%] mx-auto mt-11">
<div class="flex space-x-2 items-center">
  <img class="h-8" src="./images/humidity.png" alt="" />
  <div class="flex mt-5 flex-col">
    <h1 class="text-2xl">${data?.main?.humidity}%</h1>
    <p>humidity</p>
  </div>
</div>
<div class="flex space-x-2 items-center">
  <img class="h-8" src="./images/wind.png" alt="" />
  <div class="flex mt-5 flex-col">
    <h1 class="text-2xl">${data?.wind?.speed}km/h</h1>
    <p>wind speed</p>
  </div>
</div>
</div>
<div class="flex justify-between w-[90%] mx-auto mt-11">
          <div class="flex space-x-2 items-center">
            <h1 class="text-1xl md:text-3xl">Country code :</h1>
            <h1 class="text-1xl md:text-3xl">${data?.sys?.country}</h1>
          </div>
          <div class="flex space-x-2 items-center">
            <h1 class="text-1xl md:text-3xl">Description :</h1>
            <h1 class="text-1xl md:text-3xl">${data?.weather[0]?.main}</h1>
          </div>
        </div>`;
      body.innerHTML = omoo;
    })
    .catch((error) => {
      if (error) {
        errorText.textContent = "something went wrong😔😔";
      }

      setTimeout(() => {
        errorText.textContent = "";
      }, 2000);
    })
    .finally(() => {
      inputText.value = "";
    });
};
// theInput = "portugal";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// weatherData();
search.addEventListener("click", weatherData);
inputText.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    weatherData();
  }
});
