"use strict";

const reactionGame = {
    isRunning: false,
    splashScreen: $('#splash-screen'),
    gameScreen: $(''),
    gameoverScreen: $('#gameover-screen'),
    nameInput: $('#name-input'),
    addNameBtn: $('#add-name'),
    playerDisplay: $('#player-display'),
    playerName: $('#player-name'),
    scoreDisplay: $('#score'),
    playBtn: $('#play-game'),
    startBtn:$('#start-game'),
    pauseBtn: $(''),
    hole: $('.hole'),
    cat: $('.cat'),
    imgSrc: ["orange-cat.svg", "angy-orangecat.svg", "grey-cat.svg"],
    score: 0,
    restartBtn: $('#reset-game'),
    setup: () => {
        
        reactionGame.playBtn.on('click', event => {
            reactionGame.playGame();
        });
        
        reactionGame.startBtn.on('click', event => {
            reactionGame.startGame();
        });
        
        reactionGame.pauseBtn.on('click', event => {
            reactionGame.pauseGame();
        });
    },


}

$(() => {
    catchGame.setup();
});