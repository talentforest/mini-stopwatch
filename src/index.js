// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

// 1. 시작, 중단 기능 구현
const stopwatch = new Stopwatch();

const $startStopBtn = document.getElementById('start-stop-btn');
const $timer = document.getElementById('timer');
const $startStopbtnLabel = document.getElementById('start-stop-btn-label');
const $lapResetLabel = document.getElementById('lap-reset-btn-label');

const updateTime = (time) => {
    $timer.innerText = time;
};

let isRunning = false;
let interval;

const onClickStartStopBtn = () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
    isRunning = !isRunning;
    toggleBtnStyle();
};

const toggleBtnStyle = () => {
    $startStopBtn.classList.toggle('bg-green-600');
    $startStopBtn.classList.toggle('bg-red-600');
};

const startTimer = () => {
    stopwatch.start();
    interval = setInterval(() => {
        updateTime(stopwatch._centisecond);
    });

    $startStopbtnLabel.innerText = '중단';
    $lapResetLabel.innerText = '랩';
};

const stopTimer = () => {
    stopwatch.pause();
    clearInterval(interval);

    $startStopbtnLabel.innerText = '시작';
    $lapResetLabel.innerText = '리셋';
};

$startStopBtn.addEventListener('click', onClickStartStopBtn);
