const apiKey = `e0a31a5975a05a014d2d77b9bb6d2162`
//const apiKey = 'REPLACE YOUR OWN API KEY HERE'
// FOR API KEY
// Go to the link-  https://home.openweathermap.org/api_keys
// Sign in
// find your api key
//const city = "Mumbai"
async function fetchWeatherData(city){
   try{ const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
     if (!Response.ok){
        throw new Error("Unable to fetch weather data");
     }
    const data = await Response.json()
    console.log(data)
   // console.log(data.main.temp);
    //console.log(data.name);
    //console.log(data.wind.speed);
    //console.log(data.main.humidity);
    //console.log(data.visibility);
    updateWeatherUI(data); 
}
catch(error){
    console.error(error);
    
};
    
}

const windSpeed = document.querySelector(".wind-speed");
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity")
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date")
const descriptionIcon = document.querySelector(".description i")


//fetchWeatherData()
function updateWeatherUI(data){

    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed}km/h`;
    humidity.textContent = `${data.main.humidity}%`
    visibility.textContent = `${data.visibility/1000}km`;
    descriptionText.textContent =data.weather[0].description;
    
    const currentDate =new Date();
    const weatherIconName = getWeathericonName(data.weather[0].main)
    date.textContent = currentDate.toDateString();
    descriptionIcon.innerHTML=`<i class="material-icons">${weatherIconName}</i>`


}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector('.city-input');
formElement.addEventListener('submit', function(e){
    e.preventDefault();
    const city = inputElement.value;
    if(city!==""){
        fetchWeatherData(city);
        inputElement.value="";
    }
})

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}
