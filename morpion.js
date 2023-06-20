(function($) {
    $.fn.morpion = function() {
        var grid = this;
        var currentPlayer = 'X';
        var gameOver = false;

        function createGrid() {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var cell = $('<div>').addClass('cell').attr('data-x', i).attr('data-y', j);
                    grid.append(cell);
                }
            }
        }

        function switchPlayer() {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            $('#current-player').text(currentPlayer);
        }

        function checkVictory() {
            function checkLine(a, b, c) {
                return a.hasClass(currentPlayer) && b.hasClass(currentPlayer) && c.hasClass(currentPlayer);
            }

            for (var i = 0; i < 3; i++) {
                if (checkLine($('.cell[data-x="' + i + '"][data-y="0"]'), $('.cell[data-x="' + i + '"][data-y="1"]'), $('.cell[data-x="' + i + '"][data-y="2"]')) ||
                    checkLine($('.cell[data-x="0"][data-y="' + i + '"]'), $('.cell[data-x="1"][data-y="' + i + '"]'), $('.cell[data-x="2"][data-y="' + i + '"]'))) {
                    return true;
                }
            }

            return checkLine($('.cell[data-x="0"][data-y="0"]'), $('.cell[data-x="1"][data-y="1"]'), $('.cell[data-x="2"][data-y="2"]')) ||
            checkLine($('.cell[data-x="2"][data-y="0"]'), $('.cell[data-x="1"][data-y="1"]'), $('.cell[data-x="0"][data-y="2"]'));
    }

    function checkDraw() {
        return $('.cell.X, .cell.O').length === 9;
    }

    function cellClickHandler() {
        if (!gameOver && !$(this).hasClass('X') && !$(this).hasClass('O')) {
            $(this).addClass(currentPlayer);
            if (checkVictory()) {
                $('#message').text('Le joueur ' + currentPlayer + ' a gagné !');
                gameOver = true;
            } else if (checkDraw()) {
                $('#message').text('Match nul !');
                gameOver = true;
            } else {
                switchPlayer();
            }
        }
    }

    function resetGame() {
        $('.cell').removeClass('X O');
        currentPlayer = 'X';
        $('#current-player').text(currentPlayer);
        gameOver = false;
        $('#message').empty();
    }

    createGrid();
    grid.on('click', '.cell', cellClickHandler);
    $('#reset').on('click', resetGame);

    return this;
};
})(jQuery);