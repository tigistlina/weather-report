const state = {
    currentTemp: 70,
    backgroundColorTemp: document.getElementById('buttom--left--temp'),
    backgroundColorSky: document.getElementById('buttom--left--sky'),
    backgroundColorCity: document.getElementById('buttom-left--city'),
    landscapeImg: document.getElementById('buttom'),
    cityInput: document.getElementById('city-input'),
    location: null,
    lat: null,
    lon: null,
    skyCondition: document.getElementById('sky--options'),
    skyImg: document.getElementById('top'),
    cityDisplayColor: document.getElementById('city-display'),
}
// changes the temp on the page
const changesTempDisplay = () => {
    const tempControl = document.getElementById('temperature');
    tempControl.textContent = `${state.currentTemp}`
}
// CHANGES TEMP
const increaseTemp = () => {
    state.currentTemp++;
    changesTempDisplay()
};

const decreaseTemp = () => {
    state.currentTemp--;
    changesTempDisplay()
};

// sky background change with sky option
const skyBackground = () => {
    console.log('skyBackground')
    const condition = state.skyCondition.value
    if(condition == 'sunny') {
        console.log('sunny')
        state.skyImg.style.backgroundImage = 'url(assets/sky/rajiv-bajaj-i4QIqfcTkN8-unsplash.jpg)';
    } else if(condition == 'rainy') {
        state.skyImg.style.backgroundImage = 'url(assets/sky/eutah-mizushima-F-t5EpfQNpk-unsplash.jpg)';
    } else if(condition == 'snowy'){
        state.skyImg.style.backgroundImage = 'url(assets/sky/jainam-sheth-r0GVOKi-R1E-unsplash.jpg)';
    } else if(condition == 'cloudy') {
        state.skyImg.style.backgroundImage = 'url(assets/sky/daoudi-aissa-Pe1Ol9oLc4o-unsplash.jpg)';
    } else {
        state.skyImg.style.backgroundImage = 'url(assets/sky/jelleke-vanooteghem-gnxb59lGU1M-unsplash.jpg)';
    }
    }

// CHANGE BACKGROND COLOR  AND IMAGE WITH TEMP CHANGE
const changeBackgrounds = () => {
    if (state.currentTemp >= 80) {
        state.backgroundColorTemp.style.backgroundColor = 'red';
        state.backgroundColorSky.style.backgroundColor = 'red';
        state.backgroundColorCity.style.backgroundColor = 'red';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/cody-doherty-AeqlmVWtzFA-unsplash.jpg)';
        state.cityDisplayColor.style.color = "black";
    } else if (state.currentTemp >= 70) {
        state.backgroundColorTemp.style.backgroundColor = 'orange';
        state.backgroundColorSky.style.backgroundColor = 'orange';
        state.backgroundColorCity.style.backgroundColor = 'orange';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/alexandr-hovhannisyan-RkOtjbPuHZw-unsplash.jpg)';
        state.cityDisplayColor.style.color = "red";
    } else if (state.currentTemp >= 60) {
        state.backgroundColorTemp.style.backgroundColor = 'yellow';
        state.backgroundColorSky.style.backgroundColor = 'yellow';
        state.backgroundColorCity.style.backgroundColor = 'yellow';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/alysa-bajenaru-P103bmFilDA-unsplash.jpg)';
        state.cityDisplayColor.style.color = "black";
    } else if (state.currentTemp >= 50) {
        state.backgroundColorTemp.style.backgroundColor = 'green';
        state.backgroundColorSky.style.backgroundColor = 'green';
        state.backgroundColorCity.style.backgroundColor = 'green';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/andrew-neel-a_K7R1kugUE-unsplash.jpg)';
        state.cityDisplayColor.style.color = "white";
    } else {
        state.backgroundColorTemp.style.backgroundColor = 'teal';
        state.backgroundColorSky.style.backgroundColor = 'teal';
        state.backgroundColorCity.style.backgroundColor = 'teal';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/joel-jasmin-forestbird-4S3iMBIappo-unsplash.jpg)';
        state.cityDisplayColor.style.color = "white";
    }
}

// DISPLAY CITY CHANGES ON INPUT
const updateCity = () => {
    document.getElementById('city-display--name').textContent = state.cityInput.value
}

// reset city
const resetCity = () => {
    state.cityInput.value = "";
    updateCity();
}

// calling API
// Convert from Kel to Fahren
const handleRealTemp = async (kelvin) => {
    state.currentTemp = Math.floor((kelvin - 273.15) * 9/5 + 32 );
    changesTempDisplay()
};

// activated by submit button
const submitLocationInput = () => {
    state.location = state.cityInput.value;
    getLatLon();
}

// API CALLS
// loaction api
const getLatLon = () => {
    axios.get('https://weather-report-proxy-884k.onrender.com/location', {
        params: {
            q: state.location,
        },
    })
    .then((response) => {
        state.lon = response.data[0].lon;
        state.lat = response.data[0].lat;
    })
    .then(() => {
        getWeather()
    })
    .catch((error) => {
        console.log(error)
        console.log("error in get latlon")
    })
}

// weather api call
const getWeather = () => {
    axios.get('https://weather-report-proxy-884k.onrender.com/weather', {
        params: {
            lat: state.lat,
            lon: state.lon,
        },
    })
    .then((response) => {
        kelvin = response.data.main.temp;
        handleRealTemp(kelvin);
    })
    .then(() => {
        changeBackgrounds()
    })
    .catch((error) =>{
        console.log(error)
        console.log("error getWeather")
    })
}

// REGISTER EVENT LISTENER
const registerEventHandler = () => {
    const tempDecrease = document.getElementById('decrease-t');
    tempDecrease.addEventListener('click', decreaseTemp);
    tempDecrease.addEventListener('click', changeBackgrounds);

    const tempIncrease = document.getElementById('increase-t');
    tempIncrease.addEventListener('click', increaseTemp);
    tempIncrease.addEventListener('click', changeBackgrounds);

    const inputCity = document.getElementById('city-input');
    inputCity.addEventListener('keyup', updateCity);

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', submitLocationInput);

    state.skyCondition.addEventListener('change', skyBackground);

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetCity);

}

document.addEventListener('DOMContentLoaded', registerEventHandler)
