var buttonSearch = document.getElementById('buttonSearch');
var inputValue;
var test;
var config = {
    baseUrl:"http://api.apixu.com/v1/current.json?key=2f85cd8f13da458a841180955193007&q="
};

buttonSearch.addEventListener('click', function(event){
    inputValue = document.getElementById('inputValue').value;
    console.log(getWeather(inputValue));
});

function getWeather(value){
    return fetch(config.baseUrl + value);
};