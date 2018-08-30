var view;
view = (function () {


    var getInitialNumberOfPieces = function () {
            return document.getElementById('inputPieces').value;
        },
        getTimeFor,
        renderPieces = function (pieces) {
            var i;
            for (i = 0; i < pieces.length; i++) {
                var piece = document.createElement("div");
                piece.setAttribute('onclick', 'controller.checkClick(this.id)');
                piece.setAttribute('class', 'piece');
                piece.setAttribute('id', i);
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
        };
    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'renderPieces': renderPieces,
        'resetPieces': resetPieces,
        'getNumberOfPossibleFalseClicks': getNumberOfPossibleFalseClicks
    }
})();