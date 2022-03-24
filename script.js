"use strict";

const reactionGame = {
    isRunning: false,
    splashScreen: $('#splash-screen'),
    gameScreen: $('#game-screen'),
    gameoverScreen: $('#gameover-screen'),
    winScreen: $('#win-screen'),
    nameInput: $('#name-input'),
    addNameBtn: $('#add-name'),
    playerNameDisplay: $('.player-name'),
    scoreDisplay: $('.score'),
    playBtn: $('#play-game'),
    startBtn:$('#start-game'),
    resetBtn: $('.reset-game'),
    hole: $('.hole'),
    cat: $('.cat'),
    imgSrc: ["orange-cat.svg", "oscar.svg", "angy-orangecat.svg", "oscar.svg"],
    score: 0,
    playerName: "",

    setup: () => {
        
        reactionGame.playBtn.on('click', event => {
            if (reactionGame.playerName !== "") {
                reactionGame.switchScreen("play-game");
            } else {
                alert("Please input a name.");
            }
        });
        
        reactionGame.startBtn.on('click', event => {
            reactionGame.startGame();
        });

        reactionGame.resetBtn.on('click', event => {
            reactionGame.switchScreen('splash-screen');
            reactionGame.score = 0;
            reactionGame.round = 0;
            reactionGame.escapedOscars = 0;
            reactionGame.timeoutId = null;
        });
        reactionGame.addNameBtn.on('click', event => {
            reactionGame.addName();
            reactionGame.updatePlayerName();
            reactionGame.nameInput.val("");
        });

        reactionGame.hole.on('click', event => {

            if ($(event.currentTarget).children().first().hasClass('oscar')) {
                reactionGame.score++
                reactionGame.updateScoreDisplay();
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
    switchScreen: (currentScreen) => {
        if (currentScreen === "play-game") {
            reactionGame.splashScreen.hide();
            reactionGame.gameoverScreen.hide();
            reactionGame.winScreen.hide();
            reactionGame.gameScreen.show();
        } else if (currentScreen === "game-over") {
            reactionGame.splashScreen.hide();
            reactionGame.gameScreen.hide();
            reactionGame.winScreen.hide();
            reactionGame.gameoverScreen.show();
        } else {
            reactionGame.gameScreen.hide();
            reactionGame.gameoverScreen.hide();
            reactionGame.winScreen.hide();
            reactionGame.splashScreen.show();
        }
    },
    addName: () => {
        if (reactionGame.nameInput.val().length > 0) {
            reactionGame.playerName = reactionGame.nameInput.val();
        } else {
            alert('please input your name!');
        }
    },
    updatePlayerName: () => {
        reactionGame.playerNameDisplay.text(reactionGame.playerName);
    },
    updateScoreDisplay: () => {
        reactionGame.scoreDisplay.text(reactionGame.score);
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

            } else if (reactionGame.round === 61) {
                reactionGame.winScreen.show();
                reactionGame.gameScreen.hide();
            } else {
                alert("Error! Sorry, please refresh page");
            }       
    }
}

$(() => {
    reactionGame.setup();
});