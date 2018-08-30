var controller = function () {
    var startGame = function () {
        var initialNumberOfPieces = view.getInitialNumberOfPieces(),
        numberOfPossibleFalseClicks = view.getNumberOfPossibleFalseClicks();

        view.resetPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces,
            numberOfPossibleFalseClicks: numberOfPossibleFalseClicks

        });

        view.renderPieces(game.getPieces());


    },
    startNextLevel = function () {
        var numberOfPiecesInThisLevel = game.currentNumberOfPieces + 5;

        view.resetPieces();
        game.startGame({
            numberOfPieces: numberOfPiecesInThisLevel
        });

        view.renderPieces(game.getPieces());

    },
    restartLevel = function () {
        var numberOfPiecesInThisLevel = game.currentNumberOfPieces;

        view.resetPieces();
        game.startGame({
            numberOfPieces: numberOfPiecesInThisLevel
        });

        view.renderPieces(game.getPieces());

    },
     checkClick = function (id) {
         if(game.checkClick(id) === true){
            return console.log(id.toString()+true);
         }else{
             return  console.log(id.toString()+false);
         }

     };
    return {
        'startGame': startGame,
        'startNextLevel': startNextLevel,
        'restartLevel':restartLevel,
        'checkClick':checkClick
    }
}();
