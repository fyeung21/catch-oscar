"use strict";

const catchGame = {
    isRunning: false,
    splashScreen: $('#splash-screen'),
    gameScreen: $(''),
    gameoverScreen: $('#gameover-screen'),
    nameInput: $('#name-input'),
    addNameBtn: $('#add-name'),
    playerDisplay: $('#player-display'),
    playerName: $('#player-name'),
    score: $('#score'),
    playBtn: $('#play-game'),
    startBtn:$('#start-game'),
    pauseBtn: $(''),
    patch: $('patch'),
    cat: $('cat'),
    restartBtn: $('#reset-game'),
    setup: () => {

        catchGame.playBtn.on('click', event => {
            game.playGame();
        });

        catchGame.startBtn.on('click', event => {
            game.startGame();
        });

    
        catchGame.pauseBtn.on('click', event => {
            game.pauseGame();
        });

    },


}

$(() => {
    game.setup();
});