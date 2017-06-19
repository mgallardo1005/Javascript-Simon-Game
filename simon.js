// button sounds  
  var Sound1 = $("#red")[0];
  var Sound2 = $("#blue")[0];
  var Sound3 = $("#green")[0];
  var Sound4 = $("#yellow")[0];

  var sequence;
  var playerSequence; //array of buttons the player has pressed
  var strict = false;
  
  $("#start").click(startNewGame); //when player clicks start, run function startNewGame. This function is available at any time
  
  $("#strict").click(toggleStrict); //when player clicks button for strict mode, toggle strict mode.

  function toggleStrict(){
    $("#strictLight").toggleClass('strict-light-on'); //toggle the light on and off. change the color from black(off) to red(on)
    $("#strictLight").hasClass('strict-light-on') ? strict = true : strict = false; // toggle true/false of strict mode
  }

  $(".square").on('click', playerTurn).on('click', function(){ //when the player presses one of the buttons
    var buttonID =  $(this).data("index-number"); //take the ID of that button and store it in buttonID
    playMove(buttonID); //send that ID through the playMove function
  }); 

function getRandom(min, max){ //function to generate a random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function startNewGame() { //when we call to start a new game
    $("#start").off();
    
    sequence = [getRandom(1, 4)]; //get a new random number for the sequence
    playSequence(); // and then run this function to cycle thgough the pattern
    playerSequence = []; //and empty the array of buttons played by the player
  }
  
  function playSequence() { //function to cycle through the pattern
    $("#start").off();
    
    $("#start").click(function() { //if we click start, at the beginning of the play sequence
    clearInterval(interval); //we first clear the previous steps
    startNewGame(); //then we run the function to start a new game
    }); 

    var count = sequence.length; 
    $("#count").text(count); //the count displayed on the game is the length of the sequence

    var i = 0;
    var interval = setInterval(function() { //setInterval function sets a delay for function to be executed again and again
      if (count > 0){ //as long as there is still moves that need to be shown
        playMove(sequence[i]); //run this function on element 0
        count--; //we have to subtract what has already been played
        i++; //and increment the i to move to the next element

      } else { //once the entire sequence has been played
        playerSequence = []; //empty the array of the players pushed buttons
        clearInterval(interval); //this clears the timer we set up with setInterval
      }
    }, 1000); //the delay we specify for the sequence is 1 second
  }

  function playMove(move){ //function that will play the current move passed in from playSequence function
    var button = ('#'+ move + 'go'); //"move" will be a number from 1-4
    var pushedButton = 'Pushed-' + move; 
    
    //play sound for corresponding button-move
    if (move === 1) { 
      Sound1.play();
    } else if (move === 2) {
      Sound2.play();
    } else if (move === 3) {
      Sound3.play();
    } else if (move === 4) {
      Sound4.play();
    }
    
    $(button).addClass(pushedButton); //add the class determined above which makes the button light up
    setTimeout(function() { //sets up a function to run with delay
      $(button).removeClass(pushedButton); //this function will remove the designated class after a specified amount of time
    }, 500); //time specified is half a second
  }

  function playerTurn() { 
    $("#start").click(startNewGame); //leave the start button active during this function

      var id = $(this).data("index-number"); //store the ID of the button pressed as the ID
      playerSequence.push(id); //push that number to the playerSequence array
         
           if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]){ //if the button pressed does not equal the button we are testing
           $("#count").text("XX"); //display double XX on the screen
           playerSequence = []; //reset the playerSequence array back to empty
             if (strict) { //if we are in strict mode and mess the sequence up
                setTimeout(startNewGame, 2000); //run the startNewGame function in 3 seconds and begin again
              } else { //if not in strict mode
                setTimeout(playSequence, 1000); //run the playSequence function after 1 second to show the sequence again
              }
         } else {
            var exp = sequence.length; 
            var exp2 = playerSequence.length;
             if (exp === exp2) { //if the length of the pattern equals the length of what the player played
                  if (sequence.length === 20) { //and if we are at 20 moves
                   alert("You Win!"); 
                   setTimeout(startNewGame, 3000); //start a new game in 3 seconds
                  } else if (sequence.length < 20) { //if we are not at 20 moves yet
                    playerSequence = []; //empty the array
                    sequence.push(getRandom(1,4)); //push a new random number to the sequence array
                    setTimeout(playSequence, 1000); //play the new sequence after 1 second
                  }
                }//close if (exp)
             } //close if/else
  }  //close function playerTurn