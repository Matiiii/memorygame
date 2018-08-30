var view;
view = (function () {


    var getInitialNumberOfPieces = function () {
            return document.getElementById('inputPieces').value;
        },
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
        },
        getDelay = function () {
            return document.getElementById('inputDelay').value;
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
            console.log('show pieces! with delay : '+delay.toString());
            viewPiece();
            addNonClickStyleToDocument(delay);
            //setTimeout(function () {},delay*1000);
            setTimeout(function () {
                hidePieceToGuess()
            }, parseInt(delay,10)*1000);

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
                console.log('hid element');

            }


        },
        addNonClickStyleToDocument = function (delay) {
        var style = document.getElementById('styleBox');
        console.log('style : ' + style.toString());
        style.innerHTML = "* {pointer-events: none;}";
        setTimeout(function () {style.innerHTML = ""},parseInt(delay)*1000);
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
        'addNonClickStyleToDocument':addNonClickStyleToDocument

    }
})();