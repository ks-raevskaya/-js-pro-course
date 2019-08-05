const buttonSearch = document.getElementById('buttonSearch');
const result = document.getElementById('result');
const text = document.getElementById('text');
const img = document.createElement('img');
let inputValue;
const config = {
    baseUrl:"http://api.apixu.com/v1/current.json?key=2f85cd8f13da458a841180955193007&q="
};

buttonSearch.addEventListener('click', function(event){
    inputValue = document.getElementById('inputValue').value;
    getWeather(inputValue);
});

function getWeather(value){
    return fetch(config.baseUrl + value)
    .then(response => response.json())
    .then((data) => {
        text.innerHTML =`${data.location.name} : ${data.current.temp_c} °C <br \/> ${data.current.temp_f} °F <br \/> ${data.current.condition.text}`;
        img.src=`http:${data.current.condition.icon}`;
        result.append(img);
        result.append(text);
    }).catch((error) => {
        console.error(error);
    })
};