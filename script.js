let is24HourFormat = true;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        hours = hours % 12 || 12; 
    }

    
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}


document.getElementById('clock').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
});


setInterval(updateClock, 1000);

const powerButton = document.getElementById("power-button");
const fridgeDisplay = document.getElementById("fridge-display");
let isPowerOn = true;

powerButton.addEventListener("click", () => {
    isPowerOn = !isPowerOn;

    
    Array.from(fridgeDisplay.children).forEach(child => {
        if (child.id !== "clock" && child.id !== "power-button") {
            child.style.display = isPowerOn ? "block" : "none";
        }
    });

    
    powerButton.style.backgroundColor = isPowerOn ? "#ff4444" : "green";
    powerButton.textContent = isPowerOn ? "ON/OFF" : "Power Off";
});



const timerButton = document.querySelector('.button-19.timer');
const fridgeCam = document.getElementById('fridge-cam');
let timerInterval;


function createTimerUI() {
    
    let timerUI = document.getElementById('timer-ui');
    if (!timerUI) {
        
        timerUI = document.createElement('div');
        timerUI.id = 'timer-ui';
        timerUI.innerHTML = `
            <div id="timer-display" style="font-size: 2em; margin-top: 20px;">01:00</div>
            <button id="start-timer" class="display-item button-19" style="margin-top: 10px;">Start</button>
            <audio id="timer-sound" src="alarm.wav" preload="auto"></audio>
        `;
        fridgeCam.appendChild(timerUI); 
    }

    const startButton = document.getElementById('start-timer');
    const timerSound = document.getElementById('timer-sound');

    startButton.addEventListener('click', () => {
        let timeLeft = 60;
        startButton.disabled = true; 

        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const seconds = String(timeLeft % 60).padStart(2, '0');
            document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerSound.play(); 
                startButton.disabled = false; 
            }
        }, 1000);
    });
}


timerButton.addEventListener('click', createTimerUI);


// https://www.scdn.co/i/_global/open-graph-default.png







const fridgeCamImage = document.getElementById('fridge-cam-image');
const controllerButtons = document.querySelectorAll('.controller .button-19');


controllerButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('inside')) {
            showFridgeImage();
        } else if (button.classList.contains('forecast')) {
            showForecastImage();
        } else if (button.classList.contains('television')) {
            showTelevisionImage();
        } else if (button.classList.contains('browser')) {
            showBrowserImage();
        } else if (button.classList.contains('music')) {
            showMusicImage();
        }
    });
});


function showFridgeImage() {
    fridgeCamImage.src = "https://media.istockphoto.com/id/1041825506/photo/opened-fridge-from-the-inside.webp?s=2048x2048&w=is&k=20&c=pCf-vAESsB4fY4DPxg9yugfuO2S3W-zSi1h_OIpHzbA=";
    fridgeCamImage.alt = "Inside Fridge";
}

function showForecastImage() {
    fridgeCamImage.src = "https://t9s9z3m3.rocketcdn.me/wp-content/uploads/2024/03/Online-Weather-Forecast.jpg";
    fridgeCamImage.alt = "Weather Forecast";
}

function showTelevisionImage() {
    fridgeCamImage.src = "https://duet-cdn.vox-cdn.com/thumbor/0x0:1920x1080/2400x1350/filters:focal(960x540:961x541):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/25479488/netflix_homepage_2.jpg";
    fridgeCamImage.alt = "Netflix Screenshot";
    playSound();
}

function showBrowserImage() {
    fridgeCamImage.src = "https://searchengineland.com/wp-content/seloads/2024/09/Google-Search-on-a-mobile-device.png.webp";
    fridgeCamImage.alt = "Browser Screenshot";
}

function showMusicImage() {
    fridgeCamImage.src = "https://www.scdn.co/i/_global/open-graph-default.png";
    fridgeCamImage.alt = "Spotify Screenshot";
    playJake();
}


function playSound() {
    const sound = new Audio('movie.wav');
    sound.play();
}

function playJake() {
    const jake = new Audio('jake.mp3');
    jake.play();
}







// Adding item to the list
const addButton = document.querySelector('.add');
const itemInput = document.getElementById('item');
const itemsList = document.querySelector('.items');

addButton.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        const listItem = document.createElement('li');
        listItem.textContent = newItem;
        itemsList.appendChild(listItem);
        itemInput.value = ''; // Clear the input
    }
});

// Temperature control and unit toggle
let currentTemp = 4; // Starting temperature in Celsius
let isCelsius = true;
const currentTempDisplay = document.querySelector('.currentTemp');
const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');

function updateTemperatureDisplay() {
    const temp = isCelsius ? currentTemp : (currentTemp * 9/5) + 32;
    const unit = isCelsius ? '°C' : '°F';
    currentTempDisplay.textContent = `${Math.round(temp)}${unit}`;
}

// Event listener to increase temperature
upButton.addEventListener('click', () => {
    currentTemp++;
    updateTemperatureDisplay();
});

// Event listener to decrease temperature
downButton.addEventListener('click', () => {
    currentTemp--;
    updateTemperatureDisplay();
});

// Toggle between Celsius and Fahrenheit
currentTempDisplay.addEventListener('click', () => {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
});

// Initial temperature display
updateTemperatureDisplay();















