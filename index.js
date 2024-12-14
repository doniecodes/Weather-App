// get variables

let weatherCard = document.querySelector('.weather-card');
let searchCard = document.querySelector('.search-card');
let apiKey = "6e7cc4c0af462bdbfaa2456631d349bc";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

let serachBtn = document.querySelector('#submitBtn');
let cityName = document.querySelector('.city-name');
let weatherImg = document.querySelector('.weather-img');
let humidity = document.querySelector('.humidity-level');
let wind = document.querySelector('.wind-level');
let result = document.querySelector('.weather-result');
let weatherTemp = document.querySelector('.weather-temp');

let getWeather = async ()=>{
    let inputValue = document.querySelector('.input').value;
    let clearInput = document.querySelector('.input');
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputValue}&appid=${apiKey}`);

    if(!response.ok){
        clearInput.value = "";
        clearInput.placeholder = "Enter a valid city name";
        /* weatherCard.style.display = "none"; */
        weatherCard.classList.add('effect');
        setTimeout(() => {
            weatherCard.classList.remove('effect');
        }, 100);
        throw new Error("Could not find weather");
    }

    let data = await response.json();
    console.log(data);
    weatherCard.classList.remove('effect');
    weatherCard.style.display = "flex";
    cityName.innerHTML = data.name;
    weatherTemp.innerHTML = Math.round(data.main.temp) + '°C';
    wind.innerHTML =  `${data.wind.speed}km/h`;
    humidity.innerHTML = `${data.main.humidity}%`;
    result.innerHTML = `- ${data.weather[0].main}`;
    let condition = data.weather[0].main.toLowerCase();
    if(condition === "clouds"){
        weatherImg.src = "images/clouds.png";
    } else if(condition === "rain"){
        weatherImg.src = "images/rain.png";
    } else if(condition === "drizzle"){
        weatherImg.src = "images/drizzle.png";
    } else if(condition === "mist"){
        weatherImg.src = "images/mist.png";
    } else if(condition === "clear"){
        weatherImg.src = "images/clear.png";
    } else if(condition === "snow"){
        weatherImg.src = "images/snow.png";
    } else if(condition === "sun"){
        weatherImg.src = "images/sunny.png";
    } else if(condition === "sunny"){
        weatherImg.src = "images/sunny.png";
    } else if(condition === "storm"){
        weatherImg.src = "images/storm.png";
    } else if(condition === "wind"){
        weatherImg.src = "images/clouds.png";
    }

    }
    catch(error){
        console.error(`${inputValue} is not a city`);
    }
}
serachBtn.addEventListener('click', getWeather);

document.addEventListener('keypress', (event)=>{
    let pressed = event.key;
    if(pressed === "Enter"){
    getWeather();
    }
})
