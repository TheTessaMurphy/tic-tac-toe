$(document).ready(function() {
 
  var varPlayer;
  var varComputer;
  var count = 0;
  var varSymbol;
  var sw = 0; //counter for showWin so it only executes once per game
  var game;  //one player or two
  var vScore = 0;
  var vOne = 0;
  var vTwo = 0;
  
  $(".lblPlayer").hide();
  $(".score").hide();
  //When button clicked, hide .yesNo buttons, show .xo buttons. 
  $(".yesNo").click(function(){
    
    $(".yesNo").hide();
    $(this).attr("id") === "left"?game = "playComputer":game = "twoPlayers";
    $("p").text("x or o?");
    $(".xo").fadeIn('slow');

   //Create scoreboard
     
     game === "playComputer"?($("#plOne").html("Player:"),$("#plTwo").html("Computer:") ):
     ($("#plOne").html("Player 1:"), $("#plTwo").html("Player 2:"));
     $("#scOne").html(vScore);
     $("#scTwo").html(vScore); 
     $(".lblPlayer").fadeIn("slow");
     $(".score").fadeIn("slow");
  });
  //click to choose x or o
  $(".xo").click(function(){
    $("#cover").hide();
    $(this).attr("id") === "x"?varSymbol = "x":varSymbol="o";
    game === "playComputer"?playComputer():twoPlayers();    
  });
 
  function playComputer(){
    if(varSymbol === "x") {
      varPlayer="x";
      varComputer="o";
    }else {
      varPlayer = "o";
      varComputer = "x";
    }    
  
    //if the player gets o, choose randomly between the numbers 1, 3, and 5. These are the best squares
    //to start in. count = 1  
    if(varPlayer === "o"){
      var r;
      var rand = Math.floor(Math.random() * 3);   // returns a number between 0 and 3
      rand === 0?r = "#1":rand === 1?r = "#3":r = "#5";  //assigns id's
  
      //disables the table, displays x, enables the table and disables only selected square
      $(".square").prop("disabled", true);
      $(r).html(varComputer).fadeIn(1000).animate({color: "white"});
      $(".square").prop("disabled", false);
      $(r).prop("disabled", true);
      count++
    }

    //button click plays player
    $(".square").click(function(){
   
      //if count is 0 and player is x, 
      if (count === 0){
        $(".square").prop("disabled", false);
        $(this).html(varPlayer).fadeIn(1000).animate({color: "white"});
   
        //if Player plays square 5, computer plays square 1, else computer plays square 5
        $(this).attr("id") === "5"?
          $("#1").html(varComputer).prop("disabled", true).fadeIn(1000).animate({color: "white"}):
          $("#5").html(varComputer).prop("disabled", true).fadeIn(1000).animate({color: "white"});
   
      }else if (count >= 1 && count < 4){
        $(this).html(varPlayer).fadeIn(300).animate({color: "white"});
        $(this).prop("disabled", true);
 
        winLose();

        var square;
        var arrWin = getArrWin(arrWin);
        for(var i = 0; i<arrWin.length; i++){
          var a = "#" + arrWin[i][0];
          var b = "#" +arrWin[i][1];
          var c = "#" + arrWin[i][2];

          if($(a).text()== varPlayer &&  $(b).text() ==varPlayer  &&  $(c).text() ==""){
            square = c.toString(); 
            break;
          }else if($(a).text()== varPlayer &&  $(b).text() == "" && $(c).text()== varPlayer){
            square = b.toString();
            break;
          }else if($(a).text()=="" && $(b).text()== varPlayer &&  $(c).text()== varPlayer){
            square = a.toString(); 
            break;
          }else if($(a).text()== varComputer && $(b).text()  ==varComputer && $(c).text()   == ""){
            square = c.toString(); 
            break;
          }else if($(a).text()== varComputer && $(b).text()== "" &&  $(c).text()== varComputer){
            square = b.toString(); 
            break;
          }else if($(a).text()== "" && $(b).text()== varComputer && $(c).text()  == varComputer){
            square = a.toString(); 
            break;
          }else { //find the first empty square and play it.
            for(var x = 1; x < 9 + 1; x++){
              var xs = "#" + x;   
              if ($(xs).text() == ""){
                square = xs;  
              }
            }
          }
        }
  
        $(square).html(varComputer).fadeIn(1000).animate({color: "white"}).prop("disabled", true, );  
        winLose(); 

      }else if(count === 4) {
        $(this).html(varPlayer);
    
       $(".yesNo").hide();
       $(".xo").hide();
       $(".square").delay(50).fadeIn(3000).animate({color: "red"});
       $(this).attr("id") === "left"?game = "playComputer":game = "twoPlayers";
       $("p").text("It's a draw");
       $("#cover").delay(250).css("background-color", "rgba(0,0,0,0.9)").slideDown(1500, function() {
          goAgain();
        }); 
      }
      
        count++
      });  
  } //Play Computer

  function twoPlayers(){
    if(varSymbol === "x"){
      varPlayer="x";
      varComputer="o";
    }else{
      varPlayer = "o";
      varComputer = "x";
    }    

    $(".square").click(function(){ 
      if (count == 0 && varSymbol == 'x'){
        $(this).html(varSymbol).animate({color: "white"}).fadeIn(1000);  
      }else if (count >= 0 && count < 4){
        varSymbol == "x"?varSymbol = "o":varSymbol="x"; 
        $(this).html(varSymbol).fadeIn(1000).animate({color: "white"});
      }else if (count >= 4 && count < 8) {
        varSymbol == "x"?varSymbol = "o":varSymbol="x"; 
        $(this).html(varSymbol).fadeIn(1000).animate({color: "white"});
        winLose()
      }else{
       $(this).html(varSymbol).fadeIn(1000).animate({color: "white"});
       $(this).html(varPlayer);
       $(".square").delay(500).fadeIn(3000).animate({color: "red"});
  
       $(".yesNo").hide();
       $(".xo").hide();
 
       $(this).attr("id") === "left"?game = "playComputer":game = "twoPlayers";
       $("p").text("It's a draw")
       $("#cover").delay(250).css("background-color", "rgba(0,0,0,0.9)").slideDown(1500, function(){
         goAgain();
      });
      }
      count++
    });
  }

  function winLose(){
    var arrWin = getArrWin(arrWin)
    var varWin;
    for(var i = 0; i<arrWin.length; i++){
      var a = "#" + arrWin[i][0];
      var b = "#" + arrWin[i][1];
      var c = "#" + arrWin[i][2];
      
      if($(a).text()== varPlayer && $(b).text()==varPlayer && $(c).text() == varPlayer){
        game == "playComputer"?varWin = "You Win!" :varWin = "Player 1 Wins!";
        vOne++
        vScore = vOne;
        $(".square").prop("disabled", true);
        setTimeout(showWin(a, b, c, varWin), 6000)
        return;
      }else if ($(a).text()== varComputer && $(b).text()==varComputer && $(c).text() == varComputer){
        game == "playComputer"?varWin = "Computer Wins... Bummer":varWin = "Player 2 Wins!";
        vTwo++
        vScore = vTwo
        $(".square").prop("disabled", true);
        setTimeout(showWin(a, b, c, varWin), 6000)
      }
    }
  }

  function showWin(a, b, c, varWin){
    if(sw === 0){
      $(a).fadeIn(3000).animate({color: "red"});
      $(b).fadeIn(3000).animate({color: "red"});
      $(c).animate({color: "red"});
      $(".yesNo").hide();
      $(".xo").hide();

      $("p").text(varWin)
      $("#cover").delay(250).css("background-color", "rgba(0,0,0,0.9)").slideDown(1500, function(){
        varWin == "You Win!" || varWin == "Player 1 Wins!"?$("#scOne").html(vScore):$("#scTwo").html(vScore);

        goAgain();});
        sw = 1;
    }
  }

  function getArrWin(arrWin){
   arrWin =[ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ]; 
    return arrWin;
  }


  function goAgain(){
    count = 0;
    sw = 0;
    $(".square").empty().prop("disabled", false).css("color", "white"); 
    $("#cover").delay(1000).fadeOut(1000);
    if(game === "varComputer" && varPlayer === "o"){
      var r;
      var rand = Math.floor(Math.random() * 3);   // returns a number between 0 and 3
      rand === 0?r = "#1":rand === 1?r = "#3":r = "#5";  //assigns id's
      $(".square").prop("disabled", true);
      $(r).html(varComputer).delay(1000).fadeIn(1000).animate({color: "white"});
      $(".square").prop("disabled", false);
      $(r).prop("disabled", true);
      count++
    }
  }

  $("#end").click(function(){
    $("#bottom").fadeOut(300);
    $("#holder").fadeOut(300).fadeIn(300);
    //$("#bottom").fadeout(300);
    timeoutID = window.setTimeout(function (){location.reload(true);}, 200);  
  });
});