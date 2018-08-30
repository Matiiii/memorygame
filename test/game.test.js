describe('Game', function () {
    it('shoud have 4 squares after game start', function () {
        var pieces;
        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();

        piecesToGuess = game.findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces;
        config = {
            numberOfPieces: 6
        };
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });

    it('two pieces should be to guess when start with 6 pieces', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 6
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(2);
    });
    it('when click in piece to guess, check function should return true', function () {
        var piecesToGuess,
            pieceClass,
            number,
            config = {
                numberOfPieces: 4,
                numberOfPossibleFalseClicks: 0
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());
        number = piecesToGuess[0].pieceNumber;

        expect(game.checkClick(number)).toBe(true);
    });
    it('when click in piece not to guess, check function should return false', function () {
        var piecesToGuess,
            pieceClass,
            number,
            config = {
                numberOfPieces: 4,
                numberOfPossibleFalseClicks: 0
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());
        number = piecesToGuess[0].pieceNumber;
        if (number > 2) {
            number = 1;
        } else {
            number = 3;
        }
        expect(game.checkClick(number)).toBe(false);
    });
    it('when click in piece to guess, checkClick function should decrement piecesToGuess and increment total clicks', function () {
        var piecesToGuess,
            pieces,
            number,
            click,
            config = {
                numberOfPieces: 4,
                numberOfPossibleFalseClicks: 3,
                delay: 2
            };
        game.startGame(config);
        expect(game.totalNumberOfClicks).toBe(0);
        expect(game.numberOfPossibleFalseClicks).toBe(0);

        pieces = game.getPieces();
        //expect(game.numberOfPiecesToGuess).toBe(1);
        piecesToGuess = game.findPiecesToGuess(pieces);
        number = piecesToGuess[0].pieceNumber;

        click = game.checkClick(number);
        expect(click).toBe(true);
        // expect(game.totalNumberOfClicks).toBe(1);
        // expect(game.numberOfPiecesToGuess).toBe(0);
        expect(game.numberOfPossibleFalseClicks).toBe(0);
    });



});
