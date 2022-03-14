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
    imgSrc: ["orange-cat.svg", "angy-orangecat.svg", "oscar.svg"],
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

        reactionGame.hole.on('click', event => {

            if ($(event.currentTarget).children().first().hasClass('oscar')) {
                reactionGame.score++
                $('.cat').remove()

            } else {
                reactionGame.score--
                $('.cat').remove()
            }

        });
    },
    randomTime: (min, max) => {
        Math.round(Math.random()*(max-min)+min);
    },
    lastHole: $(),
    randomHole: () => {
        const index = Math.floor(Math.random()*reactionGame.hole.length);
        const hole = reactionGame.hole[index];

        if (hole === reactionGame.lastHole) {
            reactionGame.randomHole(hole)

        } else if (reactionGame.lastHole != hole) {
            reactionGame.lastHole = hole
            reactionGame.hole.removeClass('active')
            $('.cat').remove()
            
            const randCat = reactionGame.imgSrc[Math.floor(Math.random()*reactionGame.imgSrc.length)];
            let img = `<img class='cat ${randCat.split('.')[0]}' src='./media/images/${randCat}' alt='${randCat}'/>`;
            
            $(hole).addClass('active')
            $(hole).html(img)

        } else {
            alert("error");
        }

    },


}

$(() => {
    reactionGame.setup();
});