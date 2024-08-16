// script.js

let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;
const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const formatSelect = document.getElementById('format');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
    lapCount = 1;
}

function recordLap() {
    if (running) {
        let lapTime = display.innerHTML;
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    let timeFormat = formatSelect.value;
    
    if (timeFormat === 'hms') {
        display.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    } else if (timeFormat === 'ms') {
        display.innerHTML = formatTime(minutes) + ":" + formatTime(seconds);
    } else if (timeFormat === 's') {
        display.innerHTML = formatTime(seconds);
    }
}

function formatTime(value) {
    return value < 10 ? "0" + value : value;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
formatSelect.addEventListener('change', updateTime);
