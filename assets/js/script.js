var cityFormEl = document.querySelector('#city-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#cityname');
var forecastContainerEl = document.querySelector('#forecasts-container');
var citySearchTerm = document.querySelector('#city-search-term');
var subtitleText = document.querySelector('.subtitle');


// Form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchCity = cityInputEl.value.trim();

  if (searchCity) {
    updateHistoryButtons(searchCity);
    getForecastData(searchCity);

    // subtitleText.style.display = 'inline'
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
  // subtitleText.style.display = 'inline'

  if (buttonCity) {
    getForecastData(buttonCity);
    forecastContainerEl.textContent = '';
  }
};

// Forecast Data
function getForecastData(searchCity){
  var testUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity +"&units=imperial&appid=78e5804b571e08c79ef4568f6738f1c2"

  fetch(testUrl).then(function (response) {
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


var displayForecast = function (forecastInfo, searchTerm) {
  if (forecastInfo.length === 0) {
    forecastContainerEl.textContent = 'No forecast data found.';
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < 5; i++) {
    var forecastItem = forecastInfo.city.name + " - " + forecastInfo.list[i*8].dt_txt + "... " + forecastInfo.list[i*8].main.temp;

    console.log("1671256800".format('MMM D'));

    var focecastEl = document.createElement('div');
    focecastEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = forecastItem;

    focecastEl.appendChild(titleEl);

    // var statusEl = document.createElement('span');
    // statusEl.classList = 'flex-row align-center';

    // // if (forecastInfo[i].open_issues_count > 0) {
    // //   statusEl.innerHTML =
    // //     "<i class='fas fa-times status-icon icon-danger'></i>" + forecastDays[i].open_issues_count + ' issue(s)';
    // // } else {
    // //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // // }

    // focecastEl.appendChild(statusEl);

    forecastContainerEl.appendChild(focecastEl);
  }
};


displayHistoryButtons();
cityFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
