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
    escapedOscarsDisplay: $('.escapedOscars-display'),
    playBtn: $('#play-game'),
    startBtn: $('#start-game'),
    pauseBtn: $('#pause-game'),
    resetBtn: $('.reset-game'),
    message: $('#message'),
    hole: $('.hole'),
    cat: $('.cat'),
    imgSrc: ["orange-cat.png", "oscar.png", "calico-cat.png", "oscar.png"],
    score: 0,
    playerName: "",
    setup: () => {

        // Click event checks if player name input is empty. If not empty, proceed to game screen.
        reactionGame.playBtn.on('click', event => {
            if (reactionGame.playerName !== "") {
                reactionGame.switchScreen("play-game");
            } else {
                reactionGame.message.text('Please input a name to proceed.');
            }
        });

        // Click event checks if pause button is pressed which will then pause game and show/hide appropriate buttons
        reactionGame.pauseBtn.on('click', event => {
            if (reactionGame.isRunning == true) {
                reactionGame.isRunning = false;
                reactionGame.pauseBtn.hide();
                reactionGame.startBtn.show();

            }
        });

        // Click event starts game
        reactionGame.startBtn.on('click', event => {
            reactionGame.isRunning = true;
            reactionGame.peep();
            reactionGame.startBtn.hide();
            reactionGame.pauseBtn.show();
        });

        // Click event resets game and game elements
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
            reactionGame.updateScoreDisplay();
            reactionGame.updateEscapedOscarsDisplay();
        });

        // Click event adds/updates name to screen if name input is not empty
        reactionGame.addNameBtn.on('click', event => {
            if (reactionGame.nameInput.val().length > 0) {
                reactionGame.message.remove();
            }
            reactionGame.addName();
            reactionGame.updatePlayerName();
            reactionGame.nameInput.val("");
        });

        // Click event on a hole during the game
        reactionGame.hole.on('click', event => {

            // If Oscar is present on hole, add points, update display, and remove oscar and cats
            if ($(event.currentTarget).children().first().hasClass('oscar')) {
                reactionGame.soundHit();
                reactionGame.score++
                reactionGame.updateScoreDisplay();
                $('.cat').remove();
                $('oscar').remove();

            } else {
                $('.cat').remove();
                reactionGame.soundMiss();

                // Score cannot be negative, even if miss while score is 0
                if (reactionGame.score === 0) {
                    reactionGame.score

                } else {
                    reactionGame.score--
                    reactionGame.updateScoreDisplay();
                }
            }

        });
    },

    // Screen Switching function
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
    soundHit: () => {
        const hitAudio = new Audio('./media/sounds/clean.mp3');
        hitAudio.play();
    },
    soundMiss: () => {
        const missAudio = new Audio('./media/sounds/angry.mp3');
        missAudio.play();
    },
    // Add name on Screen if name input is not empty
    addName: () => {
        if (reactionGame.nameInput.val().length > 0) {
            reactionGame.playerName = reactionGame.nameInput.val();
        } else {
            reactionGame.message.text('Please input a name to proceed.');
        }
    },
    // Update name on Screen
    updatePlayerName: () => {
        reactionGame.playerNameDisplay.text(reactionGame.playerName);
    },
    // Update score on Screen
    updateScoreDisplay: () => {
        reactionGame.scoreDisplay.text(reactionGame.score);
    },
    // Update escaped Oscars count on Screen
    updateEscapedOscarsDisplay: () => {
        reactionGame.escapedOscarsDisplay.text(reactionGame.escapedOscars);
    },
    lastHole: $(),

    // Randomize hole and cat functionality
    randomHole: () => {
        // Randomize index of hole to select random hole
        const index = Math.floor(Math.random() * reactionGame.hole.length);
        const hole = reactionGame.hole[index];

        // If src = oscar.png is in array then add to escapedOscars count
        if ($('[src$="oscar.png"]').length) {
            reactionGame.escapedOscars++
            reactionGame.updateEscapedOscarsDisplay();

            if (reactionGame.escapedOscars >= 4) {
                reactionGame.isRunning = false;
                reactionGame.gameScreen.hide();
                reactionGame.gameoverScreen.show();
            }
        }

        // Call to peep function (a timeout function written below)
        reactionGame.peep();

        // Check if latest random hole is already current hole
        if (hole === reactionGame.lastHole) {
            // Restart randomize
            reactionGame.randomHole(hole)

        } else if (reactionGame.lastHole != hole) {
            // Make latest random hole into current hole and remove active class and cat img
            reactionGame.lastHole = hole
            reactionGame.hole.removeClass('active')
            $('.cat').remove()

            // Pick random cat from imgSrc array
            const randCat = reactionGame.imgSrc[Math.floor(Math.random() * reactionGame.imgSrc.length)];
            let img = `<img class='cat ${randCat.split('.')[0]}' src='./media/images/${randCat}' alt='${randCat}'/>`;

            // Add random cat img to hole
            $(hole).addClass('active')
            $(hole).html(img)

        } else {
            reactionGame.isRunning = false;
        }

    },
    escapedOscars: 0,
    round: 0,
    timeoutId: null,
    
    // Peep timeout functionality
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
                reactionGame.updateEscapedOscarsDisplay();
                reactionGame.updateScoreDisplay();
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