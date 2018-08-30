var controller = function () {
    var startGame = function () {
        var initialNumberOfPieces = view.getInitialNumberOfPieces(),
        pieces;

        view.resetPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces

        });

        view.renderPieces(game.getPieces());
        view.addOnClicksForPieces();

    },
    startNextLevel = function () {
        var numberOfPiecesInThisLevel = game.currentNumberOfPieces + 5;

        view.resetPieces();
        game.startGame({
            numberOfPieces: numberOfPiecesInThisLevel
        });

        view.renderPieces(game.getPieces());
        view.addOnClicksForPieces();
    },
    restartLevel = function () {
        var numberOfPiecesInThisLevel = game.currentNumberOfPieces;

        view.resetPieces();
        game.startGame({
            numberOfPieces: numberOfPiecesInThisLevel
        });

        view.renderPieces(game.getPieces());
        view.addOnClicksForPieces();

    },
     checkClick = function (id) {
         if(game.checkClick(id) === true){

         }
             ;
     }

    return {
        'startGame': startGame,
        'startNextLevel': startNextLevel,
        'restartLevel':restartLevel,
        'checkClick':checkClick
    }
}();
