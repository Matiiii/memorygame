var controller = function () {
    var startGame = function () {
            var initialNumberOfPieces = view.getInitialNumberOfPieces(),
                numberOfPossibleFalseClicks = view.getNumberOfPossibleFalseClicks(),
                delay = view.getDelay(),
                pieces;


            view.resetPieces();
            console.log('Start Game! ................................................');
            game.startGame({
                numberOfPieces: initialNumberOfPieces,
                numberOfPossibleFalseClicks: numberOfPossibleFalseClicks,
                delay: delay

            });
            pieces = game.getPieces();
            view.renderPieces(pieces);
            view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));


        },
        startNextLevel = function () {
            var numberOfPiecesInThisLevel = parseInt(game.getCurrentNumberOfPieces(),10)+1,
                numberOfPossibleFalseClicks = game.getNumberOfPossibleFalseClicks(),
                delay = game.getDelay(),
                pieces;

            view.resetPieces();
            console.log('New Level! ................................................');
            game.startGame({
                numberOfPieces: numberOfPiecesInThisLevel,
                numberOfPossibleFalseClicks: numberOfPossibleFalseClicks,
                delay: delay
            });

            pieces = game.getPieces();
            view.renderPieces(pieces);
            view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));


        },
        resetView = function(){
        view.resetPieces();
        },

        restartLevel = function () {
            var numberOfPiecesInThisLevel = game.getCurrentNumberOfPieces(),
                delay = game.getDelay(),
            pieces;

            view.resetPieces();

            game.startGame({
                numberOfPieces: numberOfPiecesInThisLevel
            });

            pieces = game.getPieces();
            view.renderPieces(pieces);
            view.viewPiecesToGuess(delay, game.findPiecesToGuess(pieces));

        },
        checkClick = function (id) {
            if (game.checkClick(id) === true) {
                view.setColorPieceGreen(id);
            } else {
                view.setColorPieceRed(id)
            }

        },
        disableClicks = function () {
        var delay = view.getDelay();
        view.addNonClickStyleToDocument(delay);

        };
    return {
        'startGame': startGame,
        'startNextLevel': startNextLevel,
        'restartLevel': restartLevel,
        'checkClick': checkClick,
        'resetView': resetView,
        'gameOver':restartLevel,
        'disableClicks':disableClicks
    }
}();
