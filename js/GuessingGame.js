
function generateWinningNumber(){
    var num =  Math.floor(Math.random()*100) + 1;
    return num;
}

function shuffle(array){
  var m = array.length, t, i; //remember m is elements remaining to shuffle

  while(m){
      //picks a random remaining element
      i = Math.floor(Math.random() * m--); //i is the random index

      //very last card is array[m] which moves to temporary
      t = array[m]; //remember m has been incremented so it is array[m-1] on first pass
      array[m] = array[i]; //random card goes to very last unshuffled cards place
      array[i] = t;  //temporary goes to where random card used to be
      }

    return array;
}
/*first time you shuffle the random pick will go to the very last cards place while other 
hand has grabbed the very last card and put it where the random card used to be */

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function(){
    if(this.playersGuess-this.winningNumber>=0){
        return false;
    }
    return true;
}

Game.prototype.playersGuessSubmission = function(num){
  if( num>=1 && num<100 && Number.isInteger(num)){
    this.playersGuess = num;
  } else {
    throw 'That is an invalid guess.';
  }
  return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    if(this.playersGuess===this.winningNumber){
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text('Click the reset button to play again.');
        $("#title").text('You win!');
        return 'You Win!';
    }
    else{
        if(this.pastGuesses.indexOf(this.playersGuess) > -1){
            $("#title").text('You already guessed that number!');
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length>4){
                $("#title").text('You lose!');
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text('Click the reset button to play again.')
                return 'You Lose.'
            } else{ 
                var difference = this.difference();
                    if(this.isLower()){
                        $('#subtitle').text('Guess Higher!')
                    } else {
                        $('#subtitle').text('Guess Lower!');
                    }
                
                    if(Math.abs(this.playersGuess-this.winningNumber)<10){
                      $('#title').text('You\'re burning up!')
                      return 'You\'re burning up!';
                    }
                    if(Math.abs(this.playersGuess-this.winningNumber)>=10 && Math.abs(this.playersGuess-this.winningNumber)<25){
                      $('#title').text('You\'re lukewarm.');
                      return 'You\'re lukewarm.';
                    } 
                    if(Math.abs(this.playersGuess-this.winningNumber)>=25 && Math.abs(this.playersGuess-this.winningNumber)<50){
                      $('#title').text('You\'re a bit chilly.');
                      return 'You\'re a bit chilly.';
                    }
                    if(Math.abs(this.playersGuess-this.winningNumber)>=50 && Math.abs(this.playersGuess-this.winningNumber)<100){
                      $('#title').text('You\'re ice cold!');
                      return 'You\'re ice cold!';
                    } 

            }

        }
    }
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    var arr = new Array(3);
    arr[0] = this.winningNumber;
    arr[1] = generateWinningNumber();
    arr[2] = generateWinningNumber();

    var shuffled = shuffle(arr);

    return shuffled;
}

function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    console.log(output);
}


  


$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function(e){
      console.log('hit submit');
    });

    $('#submit').click(function(e){
        makeAGuess(game);
    });

    $('#player-input').keypress(function(event) {
        if(event.which == 13){
            makeAGuess(game);
        }
    });
    
    $('#hint').click(function(){
        var hint = game.provideHint();
        $('#title').text('The winning number is ' +hint[0]+', ' +hint[1]+', or '  +hint[2]);
    })
  
    $('#reset').on('click', function(){
      var game = newGame();
      $('#title').text('Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100');
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled", false);
    });
    
  });
