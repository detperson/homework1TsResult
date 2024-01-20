"use strict";
const body = document.querySelector(".body");
const summerBtn = document.querySelector(".summer-btn");
const winterBtn = document.querySelector(".winter-btn");
const rainBtn = document.querySelector(".rain-btn");
const audioSound = document.querySelector(".audio-sound");
const volumeScale = document.querySelector(".audio-volume");
const summerIcon = document.querySelector(".summer-btn__icon");
const rainIcon = document.querySelector(".rain-btn__icon");
const winterIcon = document.querySelector(".winter-btn__icon");
let paused = true;
let currentSound = audioSound.getAttribute("src");
const pauseIconImgTag = `<img src="./assets/icons/pause.svg" alt="pause_logo" />`;
const summerIconImgTag = `<img src="./assets/icons/sun.svg" alt="sun_logo" />`;
const rainIconImgTag = `<img src="./assets/icons/cloud-rain.svg" alt="rain_logo" />`;
const winterIconImgTag = `<img src="./assets/icons/cloud-snow.svg" alt="snow_logo" />`;
function changeBgAndSound(bgName, sound) {
    body.style.background = `url(./assets/${bgName}.jpg) no-repeat center / cover`;
    audioSound.setAttribute("src", `./assets/sounds/${sound}.mp3`);
}
function playPauseTooggle(iconElement, imgWeatherTag) {
    if (paused) {
        audioSound.play();
        paused = false;
        changeIcon(iconElement, pauseIconImgTag);
    }
    else {
        audioSound.pause();
        paused = true;
        changeIcon(iconElement, imgWeatherTag);
    }
}
function changeIcon(parentNodeElement, imgIconTag) {
    parentNodeElement.innerHTML = imgIconTag;
}
summerBtn.addEventListener("click", () => {
    changeBgAndSound("summer-bg", "summer");
    //Отслеживаем переключение с одной кнопки на другую (нужно что бы при первом нажатии включался звук)
    if (currentSound !== audioSound.getAttribute("src")) {
        paused = true;
        currentSound = audioSound.getAttribute("src");
        //Убираем иконку паузы у других двух кнопок (методом установки обычных иконок погоды)
        changeIcon(rainIcon, rainIconImgTag);
        changeIcon(winterIcon, winterIconImgTag);
    }
    playPauseTooggle(summerIcon, summerIconImgTag);
});
rainBtn.addEventListener("click", () => {
    changeBgAndSound("rainy-bg", "rain");
    if (currentSound !== audioSound.getAttribute("src")) {
        paused = true;
        currentSound = audioSound.getAttribute("src");
        //Убираем иконку паузы у других двух кнопок
        changeIcon(summerIcon, summerIconImgTag);
        changeIcon(winterIcon, winterIconImgTag);
    }
    playPauseTooggle(rainIcon, rainIconImgTag);
});
winterBtn.addEventListener("click", () => {
    changeBgAndSound("winter-bg", "winter");
    if (currentSound !== audioSound.getAttribute("src")) {
        paused = true;
        currentSound = audioSound.getAttribute("src");
        //Убираем иконку паузы у других кнопок (методом установки обычных иконок погоды)
        changeIcon(summerIcon, summerIconImgTag);
        changeIcon(rainIcon, rainIconImgTag);
    }
    playPauseTooggle(winterIcon, winterIconImgTag);
});
volumeScale.addEventListener("change", () => {
    let volume = volumeScale.value;
    audioSound.volume = Number(volume);
});
