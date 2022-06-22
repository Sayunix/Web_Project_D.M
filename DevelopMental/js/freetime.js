
//gives you the data from city=' '
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Vienna', {
    "method": "GET",
    "headers": {
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
        'X-RapidAPI-Key': '9163607a8cmsh985e32b02ec2db0p1783a0jsn80e0c6e6280c',
    }
})
    .then(response => response.json())
    .then(response => {
        console.log(response);

        document.getElementById('temp').innerHTML = 'Current temperature: ' + response.temp + '°C';
        document.getElementById('feels_like').innerHTML = 'Weather feels like: '+ response.feels_like+ '°C';
    })
    .catch(err => {
        console.log(err);
    });