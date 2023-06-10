const state = {
    currentTemp: 70,
    backgroundColor: document.getElementById('buttom--left'),
    landscapeImg: document.getElementById('buttom--right'),
}

// CHANGES TEMP
const increaseTemp = () => {
    state.currentTemp++;
    const tempControl = document.getElementById('temperature');
    tempControl.textContent = `${state.currentTemp}`
};

const decreaseTemp = () => {
    state.currentTemp--;
    const tempControl = document.getElementById('temperature');
    tempControl.textContent = `${state.currentTemp}`
};
// CHANGE BACKGROND COLOR  AND IMAGE WITH TEMP CHANGE
const changeBackgrounds = () => {
    if (state.currentTemp >= 80) {
        state.backgroundColor.style.backgroundColor = 'red';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/cody-doherty-AeqlmVWtzFA-unsplash.jpg)';

    } else if (state.currentTemp >= 70) {
        state.backgroundColor.style.backgroundColor = 'orange';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/alexandr-hovhannisyan-RkOtjbPuHZw-unsplash.jpg)';
    } else if (state.currentTemp >= 60) {
        state.backgroundColor.style.backgroundColor = 'yellow';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/andrew-neel-a_K7R1kugUE-unsplash.jpg)';
    } else if (state.currentTemp >= 50) {
        state.backgroundColor.style.backgroundColor = 'green';
        state.landscapeImg.style.backgroundImage = 'url(assets/landscape/joel-jasmin-forestbird-4S3iMBIappo-unsplash.jpg)';
    } else {
        state.backgroundColor.style.backgroundColor = 'teal';
    }
}
// DISPLAY CITY CHANGES ON INPUT
const updateCity = () => {
    let cityInput = document.getElementById('city-input').value
    document.getElementById('city-display--name').textContent = cityInput
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
}

document.addEventListener('DOMContentLoaded', registerEventHandler)
