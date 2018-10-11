///////INDEX DOM

function newGameDom(){
  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());
  $('.start-game-popup').addClass('hide');
  $('.dark-overlay').addClass('hide');
  $('.player1').addClass('highlight');
}

function attemptSolve() {
  $('.solve-popup').removeClass('hide');
  $('.dark-overlay').removeClass('hide');
}

function submitGuessDom() {
  $('.solve-popup').addClass('hide');
  $('.dark-overlay').addClass('hide');
  $('.solve-input').val('');
}

function instruct(action) {
  $('.instructions-current-player').text(`${game.playerNames[game.currentPlayerNameIndex]}:`);
  $('.instructions-content').text(action)
}

/////GAME DOM

function nextPlayerDom() {
  $(`.${currentPlayer.name}`).addClass('highlight');
}

