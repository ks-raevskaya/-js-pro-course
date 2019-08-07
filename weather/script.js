const buttonSearch = document.getElementById('buttonSearch');
const buttonClear = document.getElementById('buttonClear');
const result = document.getElementById('result');
const inputValue = document.getElementById('inputValue');
const config = {
    baseUrl:"http://api.apixu.com/v1/current.json?key=2f85cd8f13da458a841180955193007&q="
};

buttonSearch.addEventListener('click', function(event){
    getWeather(inputValue.value);
});

buttonClear.addEventListener('click', function(event){
    clearWeather();
});

function clearWeather() {
    result.innerHTML = '';
}

function getWeather(value){
    fetch(config.baseUrl + value)
    .then(response => response.json())
    .then((data) => {
        const weatherBlock = document.createElement('div');
        weatherBlock.classList.add('weather-container');
        const img = document.createElement('img');
        const p = document.createElement('p');
        const weather = JSON.parse(localStorage.getItem('weather')) || {};
        weather[data.location.name] = {
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            text: data.current.condition.text,
            icon: data.current.condition.icon
        };
        localStorage.setItem('weather', JSON.stringify(weather));

        p.innerHTML =`${data.location.name} : ${data.current.temp_c} °C <br \/> ${data.current.temp_f} °F <br \/> ${data.current.condition.text}`;
        img.src=`http:${data.current.condition.icon}`;
        
        weatherBlock.appendChild(img);
        weatherBlock.appendChild(p);
        result.appendChild(weatherBlock);
    }).catch((error) => {
        console.error(error);
    })
};

(function () {
    const weather = JSON.parse(localStorage.getItem('weather')) || {};

    Object.keys(weather).forEach(item => {
        const weatherBlock = document.createElement('div');
        weatherBlock.classList.add('weather-container');
        const img = document.createElement('img');
        const p = document.createElement('p');
        p.innerHTML =`${item} : ${weather[item].temp_c} °C <br \/> ${weather[item].temp_f} °F <br \/> ${weather[item].text}`;
        img.src=`http:${weather[item].icon}`;
        
        weatherBlock.appendChild(img);
        weatherBlock.appendChild(p);
        result.appendChild(weatherBlock);
    });
})()