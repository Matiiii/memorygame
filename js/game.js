var game = (function () {
    var config,
        totalNumberOfClicks = 0,
        numberOfFalseClicks = 0,
        numberOfPossibleFalseClicks = 0,
        initialNumberOfPieces = 4,
        currentNumberOfPieces,
        numberOfPiecesToGuess,
        currentPieces,
        level,
        Piece = function (number){
        this.toGuess = false;
        this.pieceNumber = number;
        },
        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }

        },
        getPieces = function () {
            var i,
                pieces = [],
                numbToEnd;

            numberOfPiecesToGuess = getNumberOfPiecesToGuess();
            numbToEnd = numberOfPiecesToGuess;
            for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push(new Piece(i));
            }
            while (numbToEnd > 0) {
                var indexNumber = getRandomIntFrom(currentNumberOfPieces);

                if (pieces[indexNumber].toGuess == false) { //   pieces[indexNumber].toGuess === undefined
                    pieces[indexNumber].toGuess = true;
                    numbToEnd--;
                }
            }
            currentPieces = pieces;
            return pieces;
        };


    function checkClick(index) {
        totalNumberOfClicks++;
        if (typeof currentPieces[index].toGuess === true) {
            currentPieces[index].toGuess = false;
            numberOfPiecesToGuess--;
            return true;
        }
        numberOfFalseClicks++;
        return false;
    }

    function isEndOfLevel() {
        if (numberOfPiecesToGuess === 0) {
            level++;
            controller.startNextLevel();
        }


    }

    function getNumberOfPiecesToGuess() {
        numberOfPiecesToGuess = Math.floor(currentNumberOfPieces / 2) - 1;
        return numberOfPiecesToGuess;
    }

    function getRandomIntFrom(max) {
        return Math.floor(Math.random() * max - 1);
    }

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'currentNumberOfPieces': currentNumberOfPieces,
        'checkClick':checkClick
    }
})();