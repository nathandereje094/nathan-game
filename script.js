let score = 0;
let combo = 0;
let level = 1;
let timeLeft = 30;
let timer;
let gameRunning = false;

let highScore = Number(localStorage.getItem("nathanHighScore")) || 0;

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const gameOver = document.getElementById("gameOver");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const highScoreText = document.getElementById("highScore");
const target = document.getElementById("clickButton");

function startGame() {
    score = 0;
    combo = 0;
    level = 1;
    timeLeft = 30;
    gameRunning = true;

    menu.style.display = "none";
    game.style.display = "block";
    gameOver.style.display = "none";

    target.style.display = "block";

    updateScore();
    updateTimer();
    moveTarget();

    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function scorePoint() {
    if (!gameRunning) return;

    score++;
    combo++;

    if (score >= 10) {
        level = 2;
    }

    if (score >= 25) {
        level = 3;
    }

    if (score >= 45) {
        level = 4;
    }

    if (score >= 70) {
        level = 5;
    }

    updateScore();
    moveTarget();
    playClickSound();

    target.classList.remove("hit");
    void target.offsetWidth;
    target.classList.add("hit");
}

function moveTarget() {
    const padding = 40;

    const maxX = window.innerWidth - target.offsetWidth - padding;
    const maxY = window.innerHeight - target.offsetHeight - padding;

    const x = Math.max(padding, Math.random() * maxX);
    const y = Math.max(120, Math.random() * maxY);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

function updateScore() {
    scoreText.textContent =
        `Score: ${score} | Combo: ${combo} | Level: ${level}`;

    highScoreText.textContent = `High Score: ${highScore}`;
}

function updateTimer() {
    timerText.textContent = `Time: ${timeLeft}s`;
}

function endGame() {
    gameRunning = false;
    clearInterval(timer);

    target.style.display = "none";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("nathanHighScore", highScore);
    }

    document.getElementById("finalScore").textContent =
        `Final Score: ${score}`;

    document.getElementById("finalHighScore").textContent =
        `High Score: ${highScore}`;

    game.style.display = "none";
    gameOver.style.display = "block";

    updateScore();
}

function playClickSound() {
    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 500 + level * 100;

    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.12
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
}

window.addEventListener("resize", () => {
    if (gameRunning) {
        moveTarget();s
    }
});

highScoreText.textContent = `High Score: ${highScore}`;