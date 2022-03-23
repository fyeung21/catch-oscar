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
    imgSrc: ["orange-cat.svg", "oscar.svg", "angy-orangecat.svg", "oscar.svg"],
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
                $('.cat').remove();
                $('oscar').remove();

            } else {
                $('.cat').remove();

                if(reactionGame.score === 0) {
                    reactionGame.score
                } else {
                    reactionGame.score--
                }
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

        if ($('[src$="oscar.svg"]').length) {
            reactionGame.escapedOscars++

            if (reactionGame.escapedOscars >= 3) {
                alert('oscar escaped!')
                return
            }
        }

        reactionGame.peep();

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
    escapedOscars: 0,
    round: 0,
    timeoutId: null,
    peep: () => {
        reactionGame.round++

            if (reactionGame.round <= 5) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 3000);
                
            } else if (reactionGame.round <= 30) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 2000)

            } else if (reactionGame.round <= 60) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 1000)

            } else if (reactionGame.round <= 100) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 800)

            } else {
                return
            }        
    }
}

$(() => {
    reactionGame.setup();
});