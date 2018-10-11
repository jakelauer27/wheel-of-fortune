function newGameDom(){
  $('.player1-name').text($('.input-player1-name').val());
  $('.player2-name').text($('.input-player2-name').val());
  $('.player3-name').text($('.input-player3-name').val());
  $('.start-game-popup').addClass('hide');
  $('.dark-overlay').addClass('hide');
  $('.player1').addClass('highlight');
}