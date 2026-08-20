let score = 0;
let combo = 0;
let level = 1;

function startGame() {
    score = 0;
    combo = 0;
    level = 1;

    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("gameOver").style.display = "none";

    updateScore();
}

function scorePoint() {
    score++;
    combo++;

    if (score >= 10) {
        level = 2;
    }

    if (score >= 20) {
        level = 3;
    }

    updateScore();
}

function updateScore() {
    document.getElementById("score").textContent =
        `Score: ${score} | Combo: ${combo} | Level: ${level}`;
}