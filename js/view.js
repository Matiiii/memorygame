'use strict'

var view = (function () {


    var getInitialNumberOfPieces = function () {
            return document.getElementById('inputPieces').value;
        },
        renderPieces = function (pieces) {
            var i;
            for (i = 0; i < pieces.length; i++) {
                var piece = document.createElement("div");
                piece.addEventListener('click', controller.checkClick);
                piece.classList.add('piece');
                piece.id = i;
                document.getElementById('pieces').appendChild(piece);
            }
        },
        resetPieces = function () {
            var pieces = document.getElementById('pieces');
            while (pieces.firstChild) {
                pieces.removeChild(pieces.firstChild);
            }
        },
        getNumberOfPossibleFalseClicks = function () {
            return document.getElementById('inputFalseClicks').value;
        },
        getDelay = function () {
            return document.getElementById('inputDelay').value * 10;
        },
        setColorPieceBlue = function (id) {
            var piece = document.getElementById(id.toString());
            piece.setAttribute('class', 'piece blue');
        },
        setColorPieceRed = function (id) {
            var piece = document.getElementById(id);
            piece.setAttribute('class', 'piece red');
        },
        setColorPieceGreen = function (id) {
            var piece = document.getElementById(id);
            piece.setAttribute('class', 'piece green');
        },
        viewPiecesToGuess = function (delay, pieces) {
            viewPiece();
            addNonClickStyleToDocument(delay);
            setTimeout(function () {
                hidePieceToGuess()
            }, parseInt(delay, 10) * 100);

            function viewPiece() {
                var i;
                for (i = 0; i < pieces.length; i++) {
                    var id = pieces[i].pieceNumber,
                        piece = document.getElementById(id);
                    piece.setAttribute('class', 'piece blue');
                }
            }

            function hidePieceToGuess() {
                var i;
                for (i = 0; i < pieces.length; i++) {
                    var id = pieces[i].pieceNumber,
                        piece = document.getElementById(id);
                    piece.setAttribute('class', 'piece');
                }
            }
        },
        addNonClickStyleToDocument = function (delay) {
            var style = document.getElementById('styleBox');
            style.innerHTML = "* {pointer-events: none;}";
            setTimeout(function () {
                style.innerHTML = ""
            }, parseInt(delay) * 100);
        },
        setColorPiece = function (color, id) {
            if (color == 'green') {
                setColorPieceGreen(id);
            } else {
                viewMessage('Bad!');
                setColorPieceRed(id);
            }
        },
        viewTotalClicks = function () {
            var total = document.getElementById('total');
            total.innerHTML = controller.getTotalNumberOfClicks().toString();
        },
        viewAccuracy = function () {
            var accuracyContainer = document.getElementById('accuracy'),
                falseAccuracy = Math.round(parseInt(controller.getNumberOfFalseClicks())/parseInt(controller.getTotalNumberOfClicks()) * 10000) / 100,
                accuracy = 100 - falseAccuracy;
                if(isNaN(accuracy)){
                    accuracy = 0;
                }
            accuracyContainer.innerHTML = accuracy.toString() + '%';
        },
        viewFalseClicks = function () {
            var falseClickContainer = document.getElementById('falseClick');

            falseClickContainer.innerHTML = controller.getNumberOfFalseClicks().toString();
        },
        viewPossibleFalseClicks = function () {
            var viewPossibleFalseClicksContainer = document.getElementById('posFalse'),
            numberOfPossibleFalseClicks = controller.getNumberOfPossibleFalseClicks();
            if(numberOfPossibleFalseClicks < 0){
                numberOfPossibleFalseClicks = 'game over';
            }
            viewPossibleFalseClicksContainer.innerHTML = numberOfPossibleFalseClicks.toString();
        },
        viewNumberPiecesToGuess = function () {
            var toGuess = document.getElementById('toGuess');
            toGuess.innerHTML = controller.getNumberOfPiecesToGuess().toString();
        },
        updateStats = function () {
            viewTotalClicks();
            viewAccuracy();
            viewFalseClicks();
            viewPossibleFalseClicks();
            viewNumberPiecesToGuess();
        },
        viewMessage = function (message) {

        var titleContener = document.getElementById('game-title');
        titleContener.innerHTML = message;
        setTimeout( function () {
            titleContener.innerHTML = 'Memory Game!';
        }, 1500);

        },
        viewGameOver = function () {
        setTimeout(function () {
            var piecesContainer = document.getElementById('pieces');
            piecesContainer.innerHTML = '<p class = "gameOver">Game Over!! <br>' +
                ' <a class="gameOver-button btn btn-blue" onclick="controller.startGame()">Try Again!</a></p>';
        },500);
        };


    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'renderPieces': renderPieces,
        'resetPieces': resetPieces,
        'getNumberOfPossibleFalseClicks': getNumberOfPossibleFalseClicks,
        'setColorPieceBlue': setColorPieceBlue,
        'setColorPieceRed': setColorPieceRed,
        'setColorPieceGreen': setColorPieceGreen,
        'getDelay': getDelay,
        'viewPiecesToGuess': viewPiecesToGuess,
        'addNonClickStyleToDocument': addNonClickStyleToDocument,
        'setColorPiece': setColorPiece,
        'updateStats': updateStats,
        'viewMessage': viewMessage,
        'viewGameOver': viewGameOver
    }
})();