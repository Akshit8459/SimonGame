var buttonColours=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

// set animation on buttons when clicked
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 150);
}

// define what happens when button is clicked
$(".btn").click(function () {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound($(this).attr("id"));
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// play sound of buttons when clicked
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}   

// play the next sequence to be shown to player
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$("body").keypress(function () { 
    if(started==false){
        nextSequence();
        $("h1").text("Level "+level);
        started=true;
    }
});

function startOver(){
     gamepattern=[];
     level=0;
    started=false;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamepattern[currentLevel]){
        if (userClickedPattern.length === gamepattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over,Press any key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}