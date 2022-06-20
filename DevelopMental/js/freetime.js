
var city = "Vienna";


$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=9a1c823bb134e526c910c71e27d83319", function (data) {
    console.log(data);

    var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    var temp = data.main.temp;
    var weather = data.weather[0].main;

    $(".icon").attr("src", icon);
    $(".weather").append(weather);
    $(".temp").append(temp);
});