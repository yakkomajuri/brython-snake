/*
 Original Code Credits: Chris DeLeon of HomeTeam GameDev 
 Modified by: Yakko Majuri
*/

'use strict'

let canvas, ctx;

window.onload = function () {
    canvas = document.getElementById("game-board");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
    let instructionsBtn = document.getElementById("instructions-btn");
    instructionsBtn.addEventListener("click", showInstructions)
}

let score = 0;
let highScore = 0;

let px = 10;
let py = 10;
let gs = 20;
let tc = 20;
let ax = 15;
let ay = 15;
let xv = 0;
let yv = 0;
let trail = [];
let tail = 5;

let paused = false
let pre_pause = [0, 0]



function game() {
    px += xv;
    py += yv;
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; ++i) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == px && trail[i].y == py) {
            tail = 5;

            score = paused ? score : 0;
        }
    }
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }

    if (ax == px && ay == py) {
        ++score;
        ++tail;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
    updateScore(score)
}

function updateScore(newScore) {
    document.getElementById("score").innerHTML = "Score: " + String(newScore);
    if (newScore > highScore) {
        document.getElementById("high-score").innerHTML = "High Score: " + String(newScore);
        highScore = newScore;
    }
}

function keyPush(evt) {
    if (!paused) {
        switch (evt.keyCode) {
            case 37:
                xv = -1; yv = 0;
                break;
            case 38:
                xv = 0; yv = -1;
                break;
            case 39:
                xv = 1; yv = 0;
                break;
            case 40:
                xv = 0; yv = 1;
                break;
        }
    }
    if (evt.keyCode === 32) {
        let temp = [xv, yv];
        xv = pre_pause[0];
        yv = pre_pause[1];
        pre_pause = [...temp];
        paused = !paused;
    }
}

function showInstructions() {
    window.alert("Use the arrow keys to move and press spacebar to pause the game.")
}