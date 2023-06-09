const state = {
    currentTemp: 70,
}

// CHANGES TEMP
const increaseTemp = () => {
    state.currentTemp++;
    const tempControl = document.getElementById("temperature");
    tempControl.textContent = `${state.currentTemp}`
};

const registerIncreaseTempClick = () => {
    const tempIncrease = document.getElementById("increase-t");
    tempIncrease.addEventListener('click', increaseTemp)

}
document.addEventListener('DOMContentLoaded', registerIncreaseTempClick)

const decreaseTemp = () => {
    state.currentTemp--;
    const tempControl = document.getElementById("temperature");
    tempControl.textContent = `${state.currentTemp}`
};

const registerDecreaseTemp = () => {
    const tempIncrease = document.getElementById("decrease-t");
    tempIncrease.addEventListener('click', decreaseTemp)

}

document.addEventListener('DOMContentLoaded', registerDecreaseTemp)