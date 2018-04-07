var apiKey = "&appid=ab21ffd5722a6cc09f75c1e7343683b0";
var unit = "&units=metric";
var loc;
var degree, speed;
var today = new Date();
function getWeatherData(event) {
    event.preventDefault();
    loc = document.getElementById("place").value;
    degree = "C";
    speed = " mps"
    unit = "&units=metric";
    if (document.getElementById("f").checked){
        degree = "F";
        unit = "&units=imperial"
        speed = " mph";
    }
    getWeatherToday();
    getWeatherForecast();
}

function getWeatherToday() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + loc + unit + apiKey;
    
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            changeDataToday(myArr);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getWeatherForecast() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + loc + unit + apiKey;
            
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            changeDataForecast(myArr);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function changeDataToday(myArr) {
    var weatherBubble = document.getElementsByClassName("weather-local")[0];

    var url = "url(weather-" + myArr.weather[0].main + ".jpg)";
    
    weatherBubble.style.backgroundImage = url;
    
    weatherBubble = weatherBubble.children[0];
    
    weatherBubble.children[1].innerHTML = myArr.name + ", " + myArr.sys.country;
    weatherBubble.children[2].innerHTML = myArr.main.temp + "°" + degree;
    weatherBubble.children[3].innerHTML = "Humidity: " + myArr.main.humidity + "%";
    weatherBubble.children[4].innerHTML = "Wind: " + myArr.wind.speed + speed;
    weatherBubble.children[6].innerHTML = "High: " + myArr.main.temp_max + "°" + degree;
    weatherBubble.children[7].innerHTML = "Low: " +       myArr.main.temp_min + "°" + degree;
}

function changeDataForecast(myArr) {
    var i, j, k, url, date, weatherBubble = document.getElementsByClassName("weather-local");
    for (j = 0; j < 40; j += 1) {
        date = new Date(myArr.list[j].dt * 1000);
        if (date.getDate() > today.getDate()) {
            break;
        }
    }
            
    for (i = 1; i < 5; i += 1) {
        
        weatherBubble[i].children[0].children[1].innerHTML = myArr.city.name + ", " + myArr.city.country;
        for (k = 0; k < 4; k += 1) {
            weatherBubble[i].children[0].children[6].children[k].children[1].innerHTML = myArr.list[j].main.temp + "°" + degree;
            if (k === 1) {
                url = "url(weather-" + myArr.list[j].weather[0].main + ".jpg)";
                weatherBubble[i].style.background = url;
                weatherBubble[i].children[0].children[3].innerHTML = "Humidity: " + myArr.list[j].main.humidity + "%";
                weatherBubble[i].children[0].children[4].innerHTML = "Wind: " + myArr.list[j].wind.speed + speed;
            }
            url = "icon-" + myArr.list[j].weather[0].main + ".png";
            weatherBubble[i].children[0].children[6].children[k].children[2].src = url;
            j += 2;
        }
        
    }
}

function changeMetric(){
    degree = "C";
    unit = "&units=metric";
    speed = " mps";
    if (document.getElementById("f").checked){
        degree = "F";
        unit = "&units=imperial"
        speed = " mph";
    }
    getWeatherToday();
    getWeatherForecast();
}