var cityFormEl = document.querySelector('#city-form');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityInputEl = document.querySelector('#cityname');
var forecastContainerEl = document.querySelector('#forecasts-container');
var citySearchTerm = document.querySelector('#city-search-term');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchCity = cityInputEl.value.trim();

  if (searchCity) {
    getForecastData(searchCity);

    forecastContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a valid city name');
  }
};

var buttonClickHandler = function (event) {
  var buttonCity = event.target.getAttribute('data-city');

  if (buttonCity) {
    getForecastData(buttonCity);

    forecastContainerEl.textContent = '';
  }
};

function getForecastData(searchCity){
  var testUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=78e5804b571e08c79ef4568f6738f1c2"

  fetch(testUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // for(var i = 0; i < 5 ; i++){
        //   console.log(data.list[i*8].dt_txt +": " + data.list[i*8].main.temp)  
        // }
        displayForecast(data, searchCity);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

// var getForecastData = function (city) {
//   var apiUrl = 'https://api.github.com/users/' + city + '/repos';

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayForecast(data, city);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to OpenWeather');
//     });
// };

// var getFeaturedRepos = function (language) {
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

var displayForecast = function (forecastInfo, searchTerm) {
  if (forecastInfo.length === 0) {
    forecastContainerEl.textContent = 'No forecast data found.';
    return;
  }

  // console.log(forecastInfo.list[0].main.temp);

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < 5; i++) {
    var forecastItem = forecastInfo.city.name + " - " + forecastInfo.list[i*8].dt_txt + "... " + forecastInfo.list[i*8].main.temp;

    var focecastEl = document.createElement('div');
    focecastEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = forecastItem;

    focecastEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // if (forecastInfo[i].open_issues_count > 0) {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" + forecastDays[i].open_issues_count + ' issue(s)';
    // } else {
    //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

    focecastEl.appendChild(statusEl);

    forecastContainerEl.appendChild(focecastEl);
  }
};




// var testUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=78e5804b571e08c79ef4568f6738f1c2' -- lat/long
// var testUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=40.7128&lon=74.0060&cnt=5&appid=78e5804b571e08c79ef4568f6738f1c2' -- lat/long daily (doesn't work)
// var testUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=london&appid=78e5804b571e08c79ef4568f6738f1c2' - city search
// var testUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=78e5804b571e08c79ef4568f6738f1c2' - city info (for geocoding)


// function showTestData(){
//   var testUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=78e5804b571e08c79ef4568f6738f1c2'

//   fetch(testUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data[0].lat);
//         console.log(data[0].lon);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };


getForecastData("New york");

cityFormEl.addEventListener('submit', formSubmitHandler);
cityButtonsEl.addEventListener('click', buttonClickHandler);
