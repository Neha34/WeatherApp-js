/**
 * Created by Neha.
 */
/*This code works with only http due to the few things used in writing the code*/

var API_KEY ="a414ce59e7718d91ea668ff99c644197";
var cel = false;
var wd;

function displayTemp(fTemp,c){
    if(c) return Math.round((fTemp - 32)*(5/9))+ "&deg;C";
    return Math.round(fTemp) + "&deg;F";
}


function render(wd, cel){
    var currentLocation = wd.name;
    var currentCountry = wd.sys.country;
    var currentWeather = wd.weather[0].description;
    var currentTemp = displayTemp(wd.main.temp, cel);
    var high = displayTemp(wd.main.temp_max, cel);
    var low = displayTemp(wd.main.temp_min, cel);
    var currentHumidity = wd.main.humidity;
    var icon = wd.weather[0].icon;
    $('#currentLocation').html(currentLocation+','+currentCountry);
    $('#currentWeather').html(currentWeather);
    $('#currentTemp').html(currentTemp);
    $('#high-low').html(high+"/"+low);
    $('#currentHumidity').html("     Humidity:"+currentHumidity+"%");

    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#currentWeather').append('</br><img src = "'+ iconSrc +'">');
}

$(function(){
    var loc;
    $.getJSON('http://ipinfo.io', function(d){
        console.log("assigning data");
        loc = d.city;
        console.log(loc);
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&q='+loc+'&APPID='+API_KEY, function(apiData){
            wd = apiData;

            render(apiData, cel);
            $('#toggle').click(function(){
                cel = !cel;
                render(wd,cel);
            })

        })
        //call to the weather API

    })
})
