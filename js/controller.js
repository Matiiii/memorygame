'use strict'

var controller = function () {
    var startGame = function () {
            view.addNonClickStyleToDocument(5);
            setTimeout(function () {
                var initialNumberOfPieces = parseInt(view.getInitialNumberOfPieces()),
                    numberOfPossibleFalseClicks = view.getNumberOfPossibleFalseClicks(),
                    delay = view.getDelay(),
                    pieces;

                game.clearGame();
                view.resetPieces();
                view.updateStats();
                view.viewMessage('Start Game!');
                game.startGame({
                    numberOfPieces: initialNumberOfPieces,
                    numberOfPossibleFalseClicks: numberOfPossibleFalseClicks,
                    delay: delay

                });
                pieces = game.getPieces();
                view.renderPieces(pieces);
                view.updateStats();
                view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));
            }, 500);
        },
        startNextLevel = function () {
            view.addNonClickStyleToDocument(5);
            view.viewMessage('Yeah! Next Level!');
            setTimeout(function () {
                var numberOfPiecesInThisLevel = parseInt(game.getCurrentNumberOfPieces(), 10) + 2,
                    numberOfPossibleFalseClicks = game.getNumberOfPossibleFalseClicks(),
                    delay = game.getDelay(),
                    pieces;

                view.resetPieces();
                game.startGame({
                    numberOfPieces: numberOfPiecesInThisLevel,
                    numberOfPossibleFalseClicks: numberOfPossibleFalseClicks,
                    delay: delay
                });

                pieces = game.getPieces();
                view.renderPieces(pieces);
                view.updateStats();
                view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));
            }, 500);
        },
        restartLevel = function () {
            view.addNonClickStyleToDocument(5);

            setTimeout(function () {
                var numberOfPiecesInThisLevel = game.getCurrentNumberOfPieces(),
                    delay = game.getDelay(),
                    pieces;

                view.resetPieces();
                game.startGame({
                    numberOfPieces: numberOfPiecesInThisLevel
                });
                pieces = game.getPieces();
                view.renderPieces(pieces);
                view.updateStats();
                view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));
            }, 500);
        },
        checkClick = function () {
            var id = event.target.id;
            var result = game.checkClick(id);
            if (result === 'red' || result === 'green') {
                view.setColorPiece(result, id);
            } else if (result === 'startNextLevel') {
                view.setColorPieceGreen(id);
                startNextLevel();
            } else if (result === 'gameOver') {
                view.viewMessage('Game Over!');
                view.setColorPieceRed(id);
                view.viewGameOver();
            }
            view.updateStats();
        },
        getTotalNumberOfClicks = function () {
            return game.getTotalNumberOfClicks();
        },
        getNumberOfFalseClicks = function () {
            return game.getNumberOfFalseClicks();
        },
        getNumberOfPossibleFalseClicks = function () {
            return game.getNumberOfPossibleFalseClicks();
        },
        getNumberOfPiecesToGuess = function () {
            return game.getNumberOfPiecesToGuess();
        };

    return {
        'startGame': startGame,
        'startNextLevel': startNextLevel,
        'restartLevel': restartLevel,
        'checkClick': checkClick,
        'gameOver': restartLevel,
        'getTotalNumberOfClicks': getTotalNumberOfClicks,
        'getNumberOfFalseClicks': getNumberOfFalseClicks,
        'getNumberOfPossibleFalseClicks': getNumberOfPossibleFalseClicks,
        'getNumberOfPiecesToGuess': getNumberOfPiecesToGuess
    }
}();
