//Profile code 
const minprompt = prompt("Enter the number of minutes each player should have:-")
if (!Number(minprompt) || minprompt === 0 ) {
  alert("Enter valid number.")
  location.reload();
}else{
  document.querySelector(".min").innerHTML = Number(minprompt) - 1;
  document.querySelector(".mins").innerHTML = Number(minprompt) - 1;

}
const captureAudio = new Audio('./asset/capture.mp3')
const castleAudio = new Audio('./asset/castle.mp3')
const gameEndAudio = new Audio('./asset/game-end.webm')
const checkAudio = new Audio('./asset/move-check.mp3')
const moveAudio = new Audio('./asset/move-self.mp3')
const promote_audio = new Audio('./asset/promote.mp3')
let intervalID = null; 
let isAnyAudioPlaying = false;

const endgame  = document.querySelector(".endgame")
const StateWin  = document.querySelector(".StateWin")
const stateWin  = document.querySelector(".stateWin")
const nameWhite  = document.querySelector(".nameWhite")
const white_set  = document.querySelector(".white-set")
const black_set  = document.querySelector(".black-set")
const nameBlack  = document.querySelector(".nameBlack")
const winnerTextDisplay  = document.querySelector(".winnerTextDisplay")



document.addEventListener('DOMContentLoaded', function() {
document.getElementById('wprofile').addEventListener('change',function(event) {
    const files = event.target.files[0]
    if (!files) {
   
        return;  // Exit if no file was selected
      }
    
      const reader = new FileReader(); // Create a FileReader instance
    
      // Set up the onload handler to handle the file after reading
      reader.onload = function(e) {
        const imageUrl = e.target.result;  // Get the result (data URL) from FileReader
        const imagePreview = document.getElementById('blackphoto');
        imagePreview.src = imageUrl;  // Set the image source to the data URL
        imagePreview.style.display = 'block';  // Make the image visible
      };
    
      // Handle errors if the file cannot be read
      reader.onerror = function(error) {

      };
    
      // Start reading the file as a data URL
      reader.readAsDataURL(files);
})
});
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('bprofile').addEventListener('change',function(event) {
    const files = event.target.files[0]
    if (!files) {
      
        return;  // Exit if no file was selected
      }
    
      const reader = new FileReader(); // Create a FileReader instance
    
      // Set up the onload handler to handle the file after reading
      reader.onload = function(e) {
        const imageUrl = e.target.result;  // Get the result (data URL) from FileReader
        const imagePreview = document.getElementById('whitephoto');
        imagePreview.src = imageUrl;  // Set the image source to the data URL
        imagePreview.style.display = 'block';  // Make the image visible
      };
    
      // Handle errors if the file cannot be read
      reader.onerror = function(error) {

      };
    
      // Start reading the file as a data URL
      reader.readAsDataURL(files);
})
});
var submitBtn = document.querySelector(".submit");
var clearBtn = document.querySelector(".clear");
var whitenam ,blacknam;

clearBtn.addEventListener('click',() =>{
  document.getElementById('whitetext').value = "";
  document.getElementById("blacktext").value = "";
} )
submitBtn.addEventListener('click',() => {

    var whitename = document.getElementById('whitetext').value;
    var blackname = document.getElementById('blacktext').value;
   whitenam = whitename;
   blacknam = blackname;
   
   var whiteplayer = document.querySelector('.blackname');
   var blackplayer = document.querySelector('.whitename');


   blackplayer.innerHTML = blackname;
   whiteplayer.innerHTML = whitename;
    const container = document.querySelector(".container")
    const contain = document.querySelector(".contain")
    contain.style.display = 'none';
    container.style.display = 'flex';
    board();

})

//Chess Engine Code
function board() {
    

var board = null;
var game = new Chess();
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');

function onDragStart(source,piece,position,orientation) {
    if (game.game_over()) return false;

    if ((game.turn() === 'w' && piece.search(/^b/) !== -1)||(game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;    
    }
    if (event && event.preventDefault) {
      event.preventDefault();
    }
}

function onDrop(source,target) {
    var move = game.move({
        from: source,
        to: target,
        promotion : 'q'
    })

    if (move === null) return 'snapback'


    if (move.promotion) {
      isAnyAudioPlaying = true;  
      promote_audio.play();
        
    }

    // Play capture audio if a piece is captured
    if (move.captured) {
      isAnyAudioPlaying = true;
        captureAudio.play();
    }

    updateStatus()
}

function onSnapEnd() {
    board.position(game.fen())


  
   
if (game.turn() === 'w') {

  clearInterval(intervalID);   
   
  const min = document.querySelector(".min")
  const sec = document.querySelector(".sec")
  
  var mins = min.innerHTML;
  var secs = sec.innerHTML;
 intervalID =  setInterval(() => {
  gameEnded = 'w'


    if (endgame.style.display === '') {
        secs -=1;
        if (secs<10) {
          secs = "0" + String(secs);
        }
      

        if (Number(secs) === 0) {
          secs = 60;
          mins -=1;
      
      }


        min.innerHTML = mins;
        sec.innerHTML = secs;



  }    
        if (Number(mins) === -1 && Number(secs) === 60) {
          gameEndAudio.play();
      isAnyAudioPlaying = true;
      
      document.getElementById('gameOverText').innerHTML = `Black won by time! `;
      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML ='Lose'; 
      StateWin.innerHTML = 'Win'; 
        white_set.classList.add('loser');
        black_set.classList.add('winner');
      winnerTextDisplay.innerHTML = 'Black Won by Time !🎉';
      min.innerHTML = 0;
      sec.innerHTML = 0;
      min.innerHTML = 0;
      sec.innerHTML = 0;
      mins = null;
      secs = null;
        }
      },1000)
} else if (game.turn() === 'b') {
  clearInterval(intervalID);
 
  const min = document.querySelector(".mins")
  const sec = document.querySelector(".secs")
  
  var mins = min.innerHTML;
  var secs = sec.innerHTML;
  intervalID = setInterval(() => {

    if (endgame.style.display === '') {
        secs -=1;
        if (secs<10) {
          secs = "0" + String(secs);
        }
        

        
        
        if (Number(secs) === 0) {
          secs = 60;
          mins -=1;
        }


        min.innerHTML = mins;
        sec.innerHTML = secs;
      
    
  }
        if (Number(mins) === -1 && Number(secs) === 60) {
          gameEndAudio.play();
      isAnyAudioPlaying = true;
      status = 'Game Over, ' + moveColor + ' is in checkmate.';
      document.getElementById('gameOverText').innerHTML = `White won by Time! `;
      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML ='Win'; 
      StateWin.innerHTML =  'Lose'; 
        black_set.classList.add('loser');
        white_set.classList.add('winner');
      winnerTextDisplay.innerHTML = 'White Won by Time !🎉'; 
      min.innerHTML = 0;
      sec.innerHTML = 0;
      mins = null;
      secs = null;
        }
      },1000)

      
      }

}



if (game.turn() === 'w') {

    clearInterval(intervalID);
  
  const min = document.querySelector(".min")
  const sec = document.querySelector(".sec")
  
  var mins = min.innerHTML;
  var secs = sec.innerHTML;
  intervalID = setInterval(() => {


    if (endgame.style.display === '') {
        secs -=1;
        if (secs<10) {
          secs = "0" + String(secs);
        }
      
        

        if (Number(secs) === 0) {
          secs = 60;
          mins -=1;
      
      }


        min.innerHTML = mins;
        sec.innerHTML = secs;



  }    
        if (Number(mins) === -1 && Number(secs) === 60) {
          gameEndAudio.play();
      isAnyAudioPlaying = true;
      
      document.getElementById('gameOverText').innerHTML = `Black won by time! `;
      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML ='Lose'; 
      StateWin.innerHTML = 'Win'; 
        white_set.classList.add('loser');
        black_set.classList.add('winner');
      winnerTextDisplay.innerHTML = 'Black Won by Time !🎉';
      min.innerHTML = 0;
      sec.innerHTML = 0;
      min.innerHTML = 0;
      sec.innerHTML = 0;
      mins = null;
      secs = null;
        }
      },1000)
} else if (game.turn() === 'b') {
  clearInterval(intervalID);
  const min = document.querySelector(".mins")
  const sec = document.querySelector(".secs")
  
  var mins = min.innerHTML;
  var secs = sec.innerHTML;
  intervalID = setInterval(() => {

    
    if (endgame.style.display === '') {
        secs -=1;
        if (secs<10) {
          secs = "0" + String(secs);
        }
        

        
        if (Number(secs) === 0) {
          secs = 60;
          mins -=1;
        }


        min.innerHTML = mins;
        sec.innerHTML = secs;
      
    
  }
        if (Number(mins) === -1 && Number(secs) === 60) {
          gameEndAudio.play();
      isAnyAudioPlaying = true;
      status = 'Game Over, ' + moveColor + ' is in checkmate.';
      document.getElementById('gameOverText').innerHTML = `White won by Time! `;
      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML ='Win'; 
      StateWin.innerHTML =  'Lose'; 
        black_set.classList.add('loser');
        white_set.classList.add('winner');
      winnerTextDisplay.innerHTML = 'White Won by Time !🎉'; 
      min.innerHTML = 0;
      sec.innerHTML = 0;
      mins = null;
      secs = null;
        }
      },1000)

      
      }

      
function updateStatus() {
    var status = '';
  
    var moveColor = 'White';
    if (game.turn() === 'b') {
      moveColor = 'Black';



    }
  
    if (game.in_checkmate()) {
      gameEndAudio.play();
      isAnyAudioPlaying = true;
      status = 'Game Over, ' + moveColor + ' is in checkmate.';
      document.getElementById('gameOverText').innerHTML = `${moveColor === 'Black' ? whitenam : blacknam} won! `;
      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML = moveColor === 'Black' ? 'Win' : 'Lose'; 
      StateWin.innerHTML = moveColor === 'Black' ? 'Lose' : 'Win'; 
        white_set.classList.add(moveColor === 'Black' ? 'winner' : 'loser');
        black_set.classList.add(moveColor === 'Black' ? 'loser' : 'winner');
      winnerTextDisplay.innerHTML = moveColor === 'Black' ? whitenam + ' Won!🎉' : blacknam + ' Won!🎉'
    } else if (game.in_draw()) {
      isAnyAudioPlaying = true;
      gameEndAudio.play();
      status = 'Game Over, drawn position.';
      document.getElementById('gameOverText').innerHTML = 'Game Draw!';

      endgame.style.display = 'block';
      endgame.classList.add('endgame-display');
      nameWhite.innerHTML = whitenam + " (White)";
      nameBlack.innerHTML = blacknam + " (Black)";
      stateWin.innerHTML = "Draw"; 
      StateWin.innerHTML = "Draw"; 
        white_set.classList.add('loser');
        black_set.classList.add('loser');
      winnerTextDisplay.innerHTML = 'Game Draw!'

    } else if(game.in_check()) {
      isAnyAudioPlaying= true;
      checkAudio.play();
      status += ', ' + moveColor  + ' is in check.';
      var name;
      if (moveColor === 'White') {
        name = whitenam;
      }else if (moveColor === 'Black') {
        name = blacknam;
      }
      document.getElementById('gameOverText').innerHTML = `${name} is in check!`;
    }else {
      // Check if any sound is currently playing
  if (isAnyAudioPlaying === false) {
    moveAudio.play();
  }else{
        isAnyAudioPlaying = false;
        
  
      }
      status = moveColor + ' to move.';
      document.getElementById('gameOverText').innerHTML = `${moveColor === 'Black' ? blacknam : whitenam}'s move`;
  
      // Play check audio if the current player is in check
   
    }
  
    $status.html(status);
    $fen.html(game.fen());
    $pgn.html(game.pgn());
  }
var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop:onDrop,
    onSnapEnd: onSnapEnd
}

board = Chessboard('board1',config)
 
updateStatus()

}

