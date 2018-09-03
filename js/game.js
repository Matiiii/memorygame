'use strict'

var Piece = function (number) {
    this.toGuess = false;
    this.pieceNumber = number;
};


var game = (function () {
    var config,
        totalNumberOfClicks = 0,
        numberOfFalseClicks = 0,
        numberOfPossibleFalseClicks = 0,
        delay = 1,
        initialNumberOfPieces = 4,
        currentNumberOfPieces,
        numberOfPiecesToGuess = 0,
        currentLevel,
        currentPieces,
        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
            if ((config && config.numberOfPossibleFalseClicks)) {
                numberOfPossibleFalseClicks = config.numberOfPossibleFalseClicks;
            }
            if (config && config.delay) {
                delay = config.delay;
            }

        },
        getPieces = function () {
            var i,
                pieces = [],
                numbToEnd;
            setNumberOfPiecesToGuess();
            numbToEnd = numberOfPiecesToGuess;
            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push(new Piece(i));
            }
            while (numbToEnd > 0) {
                var indexNumber = getRandomIntFromToArray(currentNumberOfPieces);

                if (pieces[indexNumber].toGuess === false) { //   pieces[indexNumber].toGuess === undefined
                    pieces[indexNumber].toGuess = true;
                    numbToEnd--;
                }
            }
            currentPieces = pieces;
            return pieces;
        },
        clearGame = function () {
            totalNumberOfClicks = 0;
            numberOfFalseClicks = 0;
            numberOfPossibleFalseClicks = 0;
            delay = 1;
            initialNumberOfPieces = 4;
            currentNumberOfPieces = 0;
            numberOfPiecesToGuess = 0;
            currentLevel = 0;
            currentPieces = 0;
        },
        checkClick = function (index) {
            totalNumberOfClicks++;
            if (currentPieces[index].toGuess == true) {
                currentPieces[index].toGuess = false;
                numberOfPiecesToGuess--;
                if (isEndOfLevel() === 'startNextLevel') {
                    return 'startNextLevel'
                } else {
                    return 'green';
                }

            } else {
                numberOfPossibleFalseClicks--;
                numberOfFalseClicks++;
                if (isEndOfLevel() === 'gameOver') {
                    return 'gameOver'
                } else {
                    return 'red';
                }

            }

        },
        isEndOfLevel = function () {
            if (numberOfPiecesToGuess === 0) {
                return 'startNextLevel';
            }
            if (numberOfPossibleFalseClicks < 0) {
                return 'gameOver';
            }
        },
        setNumberOfPiecesToGuess = function () {
            return numberOfPiecesToGuess = Math.floor(currentNumberOfPieces / 2) - 1;
        },

        getNumberOfPiecesToGuess = function () {
            return numberOfPiecesToGuess;
        },
        getCurrentPieces = function () {
            return currentPieces;
        },
        getRandomIntFromToArray = function (max) {
            return Math.floor(Math.random() * max);
        },

        findPiecesToGuess = function (pieces) {
            return pieces.filter(function (piece) {
                return piece.toGuess;
            })
        },

        getCurrentNumberOfPieces = function () {
            return currentNumberOfPieces;
        },

        getNumberOfPossibleFalseClicks = function () {
            return numberOfPossibleFalseClicks;
        },

        getDelay = function () {
            return delay;
        },
        getTotalNumberOfClicks = function () {
            return totalNumberOfClicks;
        },
        getNumberOfFalseClicks = function () {
            return numberOfFalseClicks;
        };


    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'getCurrentNumberOfPieces': getCurrentNumberOfPieces,
        'checkClick': checkClick,
        'getNumberOfPiecesToGuess': getNumberOfPiecesToGuess,
        'getTotalNumberOfClicks': getTotalNumberOfClicks,
        'getNumberOfPossibleFalseClicks': getNumberOfPossibleFalseClicks,
        'getCurrentPieces': getCurrentPieces,
        'findPiecesToGuess': findPiecesToGuess,
        'getDelay': getDelay,
        'clearGame': clearGame,
        'getNumberOfFalseClicks': getNumberOfFalseClicks


    }
})();