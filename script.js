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
    escapedOscarsDisplay: $('#escapedOscars-display'),
    playBtn: $('#play-game'),
    startBtn: $('#start-game'),
    pauseBtn: $('#pause-game'),
    resetBtn: $('.reset-game'),
    message: $('#message'),
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
                reactionGame.message.text('Please input a name to proceed.');
            }
        });

        reactionGame.pauseBtn.on('click', event => {
            if (reactionGame.isRunning == true) {
                reactionGame.isRunning = false;
                reactionGame.pauseBtn.hide();
                reactionGame.startBtn.show();

            }
        });

        reactionGame.startBtn.on('click', event => {
            reactionGame.isRunning = true;
            reactionGame.peep();
            reactionGame.startBtn.hide();
            reactionGame.pauseBtn.show();
        });

        reactionGame.resetBtn.on('click', event => {
            reactionGame.switchScreen('splash-screen');
            reactionGame.pauseBtn.hide();
            reactionGame.startBtn.show();
            $('.cat').remove();
            $('oscar').remove();
            reactionGame.isRunning = false;
            reactionGame.score = 0;
            reactionGame.round = 0;
            reactionGame.escapedOscars = 0;
            reactionGame.timeoutId = null;
            reactionGame.scoreDisplay = 0;
        });

        reactionGame.addNameBtn.on('click', event => {
            if (reactionGame.nameInput.val().length > 0) {
                reactionGame.message.remove();
            }
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

                if (reactionGame.score === 0) {
                    reactionGame.score

                } else {
                    reactionGame.score--
                    reactionGame.updateScoreDisplay();
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
            reactionGame.message.text('Please input a name to proceed.');
        }
    },
    updatePlayerName: () => {
        reactionGame.playerNameDisplay.text(reactionGame.playerName);
    },
    updateScoreDisplay: () => {
        reactionGame.scoreDisplay.text(reactionGame.score);
    },
    updateEscapedOscarsDisplay: () => {
        reactionGame.escapedOscarsDisplay.text(reactionGame.escapedOscars);
    },
    lastHole: $(),
    randomHole: () => {
        const index = Math.floor(Math.random() * reactionGame.hole.length);
        const hole = reactionGame.hole[index];

        if ($('[src$="oscar.svg"]').length) {
            reactionGame.escapedOscars++
            reactionGame.updateEscapedOscarsDisplay();

            if (reactionGame.escapedOscars >= 4) {
                reactionGame.isRunning = false;
                reactionGame.gameScreen.hide();
                reactionGame.gameoverScreen.show();
            }
        }

        reactionGame.peep();

        if (hole === reactionGame.lastHole) {
            reactionGame.randomHole(hole)

        } else if (reactionGame.lastHole != hole) {
            reactionGame.lastHole = hole
            reactionGame.hole.removeClass('active')
            $('.cat').remove()

            const randCat = reactionGame.imgSrc[Math.floor(Math.random() * reactionGame.imgSrc.length)];
            let img = `<img class='cat ${randCat.split('.')[0]}' src='./media/images/${randCat}' alt='${randCat}'/>`;

            $(hole).addClass('active')
            $(hole).html(img)

        } else {
            reactionGame.isRunning = false;
        }

    },
    escapedOscars: 0,
    round: 0,
    timeoutId: null,
    peep: () => {

        if (reactionGame.isRunning == true) {
            reactionGame.round++

            if (reactionGame.round <= 5) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 3000);

            } else if (reactionGame.round <= 20) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 2000)

            } else if (reactionGame.round <= 30) {
                window.clearTimeout(reactionGame.timeoutId)
                reactionGame.timeoutId = window.setTimeout(reactionGame.randomHole, 1000)

            } else if (reactionGame.round === 31) {
                reactionGame.isRunning = false;
                reactionGame.winScreen.show();
                reactionGame.gameScreen.hide();

            } else {
                alert("maximum rounds met");
            }

        } else {
            reactionGame.isRunning = false;
        }

    }
}

$(() => {
    reactionGame.setup();
});