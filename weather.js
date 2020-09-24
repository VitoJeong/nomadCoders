const weather = document.querySelector(".js-weather");

const API_KEY = "37038f0a3483e29cfab630ed84d59a44";
const COORDS = 'coords';

function getWeather(latitude, longitude){
 fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
     ).then(function(response){
         return response.json();
     }).then(function(json){
         console.log(json);
         const temperature = json.main.temp;
         const place = json.name;
         weather.innerText = `${temperature} @ ${place}`;
     });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        /* 
        현재 위도, 경도 Object타입으로 저장
        latitude: latitude,
        longitude : longitude
        */

        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
     
}

function init(){
    loadCoords();
}

init();