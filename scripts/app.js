const cityForm = document.querySelector('form');

const card = document.querySelector('.card');

const details = document.querySelector('.details');

const time = document.querySelector('img.time');

const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;

    //update details template

    details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
      <div class="my-3">${weatherDetails.WeatherText}</div>
      <div class="display-4 my-4">
      <span>${weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      </div>`;

    //update day and night images

    if(weatherDetails.IsDayTime){
        time.src = 'img/day.svg'
    } else {
        time.src = 'img/night.svg'
    }

    //update icon

    const iconSource = `img/icons/${weatherDetails.WeatherIcon}.svg`

    icon.setAttribute('src', iconSource);

    //remove display: none if

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return {cityDetails, weatherDetails};
}

cityForm.addEventListener('submit', (e) => {

    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();

    cityForm.reset();

    //update UI with new city

    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error))

    // set local storage

    localStorage.setItem('city', city);
})

if (localStorage.city){
    updateCity(localStorage.city).then(data => updateUI(data)).catch(error => console.log(error))
}


