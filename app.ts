const body = document.querySelector(".body") as HTMLElement;
const summerBtn = document.querySelector(".summer-btn") as HTMLElement;
const winterBtn = document.querySelector(".winter-btn") as HTMLElement;
const rainBtn = document.querySelector(".rain-btn") as HTMLElement;
const audioSound = document.querySelector(".audio-sound") as HTMLAudioElement;
const volumeScale = document.querySelector(".audio-volume") as HTMLInputElement;
const summerIcon = document.querySelector(".summer-btn__icon") as HTMLElement;
const rainIcon = document.querySelector(".rain-btn__icon") as HTMLElement;
const winterIcon = document.querySelector(".winter-btn__icon") as HTMLElement;

let paused: boolean = true;
let currentSound: string = audioSound.getAttribute("src")!;

const pauseIconImgTag: string = `<img src="./assets/icons/pause.svg" alt="pause_logo" />`;
const summerIconImgTag: string = `<img src="./assets/icons/sun.svg" alt="sun_logo" />`;
const rainIconImgTag: string = `<img src="./assets/icons/cloud-rain.svg" alt="rain_logo" />`;
const winterIconImgTag: string = `<img src="./assets/icons/cloud-snow.svg" alt="snow_logo" />`;

function changeBgAndSound(bgName: string, sound: string): void {
    body.style.background = `url(./assets/${bgName}.jpg) no-repeat center / cover`;
    audioSound.setAttribute("src", `./assets/sounds/${sound}.mp3`);
}

function playPauseTooggle(
    iconElement: HTMLElement,
    imgWeatherTag: string
): void {
    if (paused) {
        audioSound.play();
        paused = false;
        changeIcon(iconElement, pauseIconImgTag);
    } else {
        audioSound.pause();
        paused = true;
        changeIcon(iconElement, imgWeatherTag);
    }
}

function changeIcon(parentNodeElement: HTMLElement, imgIconTag: string): void {
    parentNodeElement.innerHTML = imgIconTag;
}

summerBtn.addEventListener("click", () => {
    changeBgAndSound("summer-bg", "summer");
    //Отслеживаем переключение с одной кнопки на другую (нужно что бы при первом нажатии включался звук)
    if (currentSound !== audioSound.getAttribute("src")) {
        paused = true;
        currentSound = audioSound.getAttribute("src")!;
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
        currentSound = audioSound.getAttribute("src")!;
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
        currentSound = audioSound.getAttribute("src")!;
        //Убираем иконку паузы у других кнопок (методом установки обычных иконок погоды)
        changeIcon(summerIcon, summerIconImgTag);
        changeIcon(rainIcon, rainIconImgTag);
    }
    playPauseTooggle(winterIcon, winterIconImgTag);
});

volumeScale.addEventListener("change", () => {
    let volume: string = volumeScale.value;
    audioSound.volume = Number(volume);
});
