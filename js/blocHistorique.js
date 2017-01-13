// rendu graphique de l'historique meilleurs scores
function historiquePartieMAJGraphique()
{
  localStorage.length > 4? doThis():doThatInstead();
  function doThis()
  {
    $('#RAZStorage').show("slow");
    $('.listeHighScores').prepend('<li class="historique">'+localStorage.key(localStorage.length-1)+" points</li>");
    $('.listeHighScores').prepend('<li class="historique">'+localStorage.key(localStorage.length-2)+" points</li>");
    $('.listeHighScores').prepend('<li class="historique">'+localStorage.key(localStorage.length-3)+" points</li>");
    $('.listeHighScores').prepend('<li class="historique">'+localStorage.key(localStorage.length-4)+" points</li>");
    $('.listeHighScores').prepend('<li class="historique">'+localStorage.key(localStorage.length-5)+" points</li>");
  }
  function doThatInstead()
  {
    $('#RAZStorage').show("slow");
    for (var i = localStorage.length-1;i>-1; --i)
    {
      classe = localStorage.getItem(localStorage.key(i)) === null ? "phantom" : "historique";
      $('.listeHighScores').prepend('<li class="'+classe+'">'+localStorage.getItem(localStorage.key(i))+" points</li>");
    }
  }
}

$('#RAZStorage').click(function(e)
{
  localStorage.clear();
  $('.historique').empty();
  $('#RAZStorage').hide("slow");
});
