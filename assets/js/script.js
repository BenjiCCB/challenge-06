var cityFormEl = document.querySelector('#city-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#cityname');
var forecastContainerEl = document.querySelector('#forecasts-container');
var citySearchTerm = document.querySelector('#city-search-term');

// Form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchCity = cityInputEl.value.trim();

  if (searchCity) {
    updateHistoryButtons(searchCity);
    getForecastData(searchCity);

    forecastContainerEl.textContent = '';
    cityInputEl.value = '';

  } else {
    alert('Please enter a valid city name');
  }
};

// Buttons
function displayHistoryButtons(){
  var searchCitiesArray = JSON.parse(localStorage.getItem("searchCities")) || [];
  var searchCitiesArraySorted = searchCitiesArray.reverse();
  cityButtonsEl.textContent = "";

  for(var i = 0; i < 10 && i < searchCitiesArraySorted.length; i++){
    var cityButtonEL = document.createElement("button");
    cityButtonEL.setAttribute("class", "btn");
    cityButtonEL.setAttribute("data-city", searchCitiesArraySorted[i]);
    cityButtonEL.innerHTML = searchCitiesArraySorted[i];
    cityButtonsEl.appendChild(cityButtonEL);  
  }
}

function updateHistoryButtons(queryCity){
  var searchCitiesArray = JSON.parse(localStorage.getItem("searchCities")) || [];
  searchCitiesArray.push(queryCity);
  localStorage.setItem("searchCities", JSON.stringify(searchCitiesArray));

  displayHistoryButtons();
}

var buttonClickHandler = function (event) {
  var buttonCity = event.target.getAttribute('data-city');

  if (buttonCity) {
    getForecastData(buttonCity);
    forecastContainerEl.textContent = '';
  }
};

// Forecast Data
function getForecastData(searchCity){
  var searchUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity +"&units=imperial&appid=78e5804b571e08c79ef4568f6738f1c2"

  fetch(searchUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayForecast(data, searchCity);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};


// Display
var displayForecast = function (forecastInfo, searchTerm) {
  if (forecastInfo.length === 0) {
    forecastContainerEl.textContent = 'No forecast data found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < 5; i++) {
    
    var cityName = forecastInfo.city.name;
    var forecastDay = forecastInfo.list[i*8];
    var dateFormatted = dayjs(forecastDay.dt_txt).format('dddd MMMM D');
    
    // forecast top line (cityname/date/temp & icon)
    var forecastEl = document.createElement('div');
    forecastEl.classList = 'list-item';
    
      //main info
    var topLine = document.createElement('div');
    topLine.classList = 'topline flex-row justify-space-between align-center';
    
    var forecastTextLine = cityName + " - " + dateFormatted;
    var infoSpan = document.createElement('span');
    infoSpan.textContent = forecastTextLine;
    
      // icon
    var forecastIcon = document.createElement('span');
    
    if (forecastDay.weather[0].main == "Clear"){
      forecastIcon.innerHTML = "<i class='fas fa-sun'></i>"
    } else if(forecastDay.weather[0].main == "Clouds"){
      forecastIcon.innerHTML = "<i class='fas fa-cloud'></i>"
    } else {
      forecastIcon.innerHTML = "<i class='fas fa-cloud-rain'></i>"
    }

    topLine.appendChild(infoSpan);
    topLine.appendChild(forecastIcon);

    // temp, humidity, & windspeed
    var temp = (forecastDay.main.temp).toFixed(0) + "\u00B0";
    var humidity = forecastDay.main.humidity;
    var wind = forecastDay.wind.speed;

    var tempEl = document.createElement('div');
    tempEl.classList = 'tempEl';
    tempEl.textContent = temp;

    var humidityEl = document.createElement('div');
    humidityEl.textContent = "Humidity: " + humidity;

    var windEl = document.createElement('div');
    windEl.textContent = "Wind: " + wind;

    // add elements to forecastEl and forecastEL to container div

    forecastEl.appendChild(topLine);
    forecastEl.appendChild(tempEl);
    forecastEl.appendChild(humidityEl);
    forecastEl.appendChild(windEl);

    forecastContainerEl.appendChild(forecastEl);
  }
}

displayHistoryButtons();
cityFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
