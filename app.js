var buttonCols = ['red','blue','green','yellow'];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

////////////////////// Event Handleres/////////////////////
$('.btn').click(function(){
    var userColor = $(this).attr('id');
    userPattern.push(userColor);
    soundProduce(userColor);
    animatePress(userColor);
    // console.log(userPattern);
    verifyAnswer(userPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $('h1').text('Level: ' + level);
        nextSequence();
        started = true;
    }
});

///////////////////// Randomly Generated Next Sequence Function /////////////////////////// 

function nextSequence(){
    userPattern = [];
    level++;
    $('h1').text('Level: ' + level);
    var randomNum = Math.floor(Math.random()*4);
    var randomColor = buttonCols[randomNum];
    gamePattern.push(randomColor);
    $('#'+ randomColor).fadeOut(100).fadeIn(100);
    soundProduce(randomColor);
    // console.log(gamePattern);
    console.log('level is ' + level);
}


 ///////////////////// Sound Function /////////////////////////// 
function soundProduce(sound){
    var music = new Audio('sounds/' + sound + '.mp3');
    music.play();
}


 ///////////////////// Animate Function /////////////////////////// 
function animatePress(currentCol){
    $('#' + currentCol).addClass('pressed');
    setTimeout(function(){ $('#' + currentCol).removeClass('pressed'); },150);
}


 ///////////////////// Answer Checker Function /////////////////////////// 
function verifyAnswer(currentLevel){
       if(gamePattern[currentLevel] === userPattern[currentLevel]){
           console.log("Correct");

           if(gamePattern.length === userPattern.length){
               setTimeout(nextSequence(),1000);
           }
       }
       else{
           console.log('Wrong');
           $('body').addClass('game-over');
           var audio = new Audio('sounds/wrong.mp3');
           audio.play();
           $('h1').text('Game Over, Press Any Key to Start Again');
           startAgain();
       }
}


 ///////////////////// Restart Game Function /////////////////////////// 
function startAgain(){
    level = 0;
    started = false;
    gamePattern = [];
    
}


