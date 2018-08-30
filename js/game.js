Piece = function (number) {
    this.toGuess = false;
    this.pieceNumber = number;
};


var game = (function () {
    var config,
        totalNumberOfClicks = 0,
        numberOfFalseClicks = 0,
        numberOfPossibleFalseClicks = 0,
        delay,
        initialNumberOfPieces = 4,
        currentNumberOfPieces,
        numberOfPiecesToGuess = 0,
        currentLevel,
        currentPieces,
        level = 0,
        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
                console.log('currentNumberOfPieces : ' + currentNumberOfPieces);
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
                console.log('currentNumberOfPieces : ' + currentNumberOfPieces);
            }
            if ((config && config.numberOfPossibleFalseClicks)) {
                numberOfPossibleFalseClicks = config.numberOfPossibleFalseClicks;
                console.log('numberOfPossibleFalseClicks : ' + numberOfPossibleFalseClicks);
            }
            if (config && config.delay) {
                delay = config.delay;
                console.log('delay : ' + delay);
            }

        },
        getPieces = function () {
            var i,
                pieces = [],
                numbToEnd;


            getNumberOfPiecesToGuess();
            numbToEnd = numberOfPiecesToGuess;
            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push(new Piece(i));
            }
            while (numbToEnd > 0) {
                var indexNumber = getRandomIntFrom(currentNumberOfPieces);

                if (pieces[indexNumber].toGuess === false) { //   pieces[indexNumber].toGuess === undefined
                    pieces[indexNumber].toGuess = true;
                    numbToEnd--;
                }
            }
            currentPieces = pieces;
            return pieces;
        };


    function checkClick(index) {
        totalNumberOfClicks++;
        console.log('totalNumberOfClicks : ' + totalNumberOfClicks);
        if (currentPieces[index].toGuess == true) {
            currentPieces[index].toGuess = false;
            numberOfPiecesToGuess--;
            console.log('numberOfPiecesToGuess : ' + numberOfPiecesToGuess);
            isEndOfLevel();
            return true;
        } else {
            numberOfPossibleFalseClicks--;
            console.log('numberOfPossibleFalseClicks : ' + numberOfPossibleFalseClicks);
            numberOfFalseClicks++;
            console.log('numberOfFalseClicks : ' + numberOfFalseClicks);
            isEndOfLevel();
            return false;
        }

    }

    function isEndOfLevel() {
        if (numberOfPiecesToGuess === 0) {
            level++;
            setTimeout(function () {
                controller.startNextLevel()
            }, 500);


        }
        if (numberOfPossibleFalseClicks < 0) {
            console.log('............................GAME OVER..............................');
            setTimeout(function () {
                controller.startGame()
            }, 500);
        }
    }

    function getNumberOfPiecesToGuess() {
        numberOfPiecesToGuess = Math.floor(currentNumberOfPieces / 2) - 1;

    }

    function getRandomIntFrom(max) {
        return Math.floor(Math.random() * (max - 1));
    }

    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        })
    }

    function getCurrentNumberOfPieces() {
        return currentNumberOfPieces;

    }

    function getNumberOfPossibleFalseClicks() {
        return numberOfPossibleFalseClicks;

    }

    function getDelay() {
        return delay;

    }


    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'getCurrentNumberOfPieces': getCurrentNumberOfPieces,
        'checkClick': checkClick,
        'numberOfPiecesToGuess': numberOfPiecesToGuess,
        'totalNumberOfClicks': totalNumberOfClicks,
        'getNumberOfPossibleFalseClicks': getNumberOfPossibleFalseClicks,
        'currentPieces': currentPieces,
        'findPiecesToGuess': findPiecesToGuess,
        'getDelay': getDelay


    }
})();