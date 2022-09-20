// TODO: 이 곳에 정답 코드를 작성해주세요.
import Stopwatch from './stopwatch.js';

// 1. 시작, 중단 기능 구현
const stopwatch = new Stopwatch();

const $timer = document.getElementById('timer');
const $startStopBtn = document.getElementById('start-stop-btn');
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
        updateTime(formatTime(stopwatch._centisecond));
    }, 10);

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

// 2. 시간 포맷팅 구현
const formatString = (num) => (num < 10 ? '0' + num : num);
const formatTime = (centisecond) => {
    const min = parseInt(centisecond / 6000);
    const sec = parseInt((centisecond - 6000 * min) / 100);
    const centisec = centisecond % 100;

    return `${formatString(min)}:${formatString(sec)}.${formatString(
        centisec
    )}`;
};

// 3. 랩 기능 구현
const $lapResetBtn = document.getElementById('lap-reset-btn');
const $laps = document.getElementById('laps');

const onClickLapResetBtn = () => {
    if (isRunning) {
        createLapElement();
    } else {
        resetTimer();
    }
};

const createLapElement = () => {
    const [lapCount, lapTime] = stopwatch.createLap();
    const $lap = document.createElement('li');
    $lap.setAttribute('data-time', lapTime);
    $lap.classList.add('flex', 'justify-between', 'py-2', 'px-3', 'border-b-2');
    $lap.innerHTML = `
      <span>랩 ${lapCount}</span>
      <span>${formatTime(lapTime)}</span>
    `;

    $laps.prepend($lap);
};

$lapResetBtn.addEventListener('click', onClickLapResetBtn);

// 4. 리셋 기능 구현
const resetTimer = () => {
    stopwatch.reset();
    updateTime(formatTime(0));
    $laps.innerHTML = '';
};
