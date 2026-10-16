export const dom = {

    // MAIN MENU SCREEN
    menu: {
        screen: document.getElementById("menu"),
        startBtn: document.getElementById("start"),
        controlsBtn: document.getElementById("controlsBtn")
    },

    // CONTROLS SCREEN
    controls: {
        screen: document.getElementById("controls"),
        backBtn: document.getElementById("back")
    },

    // DIFFICULTY OPTIONS SCREEN
    difficulty: {
        screen: document.getElementById("difficulty"),
        options: document.querySelectorAll(".option")
    },

    // GAMEPLAY SCREEN
    game: {
        screen: document.getElementById("game")
    },

    // SCORE
    score: document.getElementById("score"),
    highscore: document.getElementById("highscore"),

    // CANVAS
    canvas: document.getElementById("canvas"),

    // PAUSE SCREEN
    pause: {
        screen: document.getElementById("pause")
    },

    // PAUSE / RESUME BUTTON
    pauseResumeBtn: document.querySelectorAll(".pause-resume"),

    // GAME OVER SCREEN
    over: {
        screen: document.getElementById("over")
    },

    // WIN SCREEN
    win: {
        screen: document.getElementById("win")
    },

    // RESTART BUTTON
    restartBtn: document.querySelectorAll(".restart")
};

// CELL SIZE
export const size = 32;