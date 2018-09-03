describe('Game', function () {

    afterEach(function () {
       game.clearGame();
    });

    it('shoud have 4 squares after game start', function () {
        var pieces;

        game.startGame();

        pieces = game.getPieces();

        expect(game.getCurrentNumberOfPieces()).toBe(4);
        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();

        piecesToGuess = game.findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
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
    it('when click in piece to guess, check function should return "green"', function () {
        var piecesToGuess,
            pieceClass,
            number,
            config = {
                numberOfPieces: 6,
                numberOfPossibleFalseClicks: 0
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());
        number = piecesToGuess[0].pieceNumber;

        expect(game.checkClick(number)).toBe('green');
    });

    it('when click in last piece to guess, check function should return "startNextLevel"', function () {
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

        expect(game.checkClick(number)).toBe('startNextLevel');
    });
    it('when click in piece not to guess and have not more possible false clicks, check function should return "gameOver"', function () {
        var piecesToGuess,
            numberToCheck,
            number,
            number2,
            config = {
                numberOfPieces: 6,
                numberOfPossibleFalseClicks: 0
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());
        number = piecesToGuess[0].pieceNumber;
        number2 =  piecesToGuess[1].pieceNumber;

        if (number > 0 && number2 > 0) {
             numberToCheck = 0;
        } else if(number<3&&number2<3){
            numberToCheck = 3;
        }else{
            numberToCheck = 2;
        }
        expect(game.checkClick(numberToCheck)).toBe('gameOver');
    });

    it('when click in piece not to guess, check function should return "red"', function () {
        var piecesToGuess,
            numberToCheck,
            number,
            number2,
            config = {
                numberOfPieces: 6,
                numberOfPossibleFalseClicks: 1
            };
        game.startGame(config);

        piecesToGuess = game.findPiecesToGuess(game.getPieces());
        number = piecesToGuess[0].pieceNumber;
        number2 =  piecesToGuess[1].pieceNumber;

        if (number > 0 && number2 > 0) {
            numberToCheck = 0;
        } else if(number<3&&number2<3){
            numberToCheck = 3;
        }else{
            numberToCheck = 2;
        }
        expect(game.checkClick(numberToCheck)).toBe('red');
    });
    it('when click in piece to guess, checkClick function should decrement piecesToGuess and increment total clicks', function () {
        var piecesToGuess,
            pieces,
            number,
            click,
            totalClicks,
            numberToGuess,
            config = {
                numberOfPieces: 6,
                numberOfPossibleFalseClicks: 3,
                delay: 2
            };
        game.startGame(config);
        expect(game.getTotalNumberOfClicks()).toBe(0);
        expect(game.getNumberOfPiecesToGuess()).toBe(0);

        pieces = game.getPieces();
        piecesToGuess = game.findPiecesToGuess(pieces);
        number = piecesToGuess[0].pieceNumber;
        click = game.checkClick(number);
        expect(game.getNumberOfPiecesToGuess()).toBe(1);
        expect(click).toBe('green');
        expect(game.getTotalNumberOfClicks()).toBe(1);
        expect(game.getNumberOfPossibleFalseClicks()).toBe(3);
    });




});
