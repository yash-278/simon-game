var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; //Game Pattern Gets Updated Here
var userClickedPattern = []; //User Pattern Gets Stored Here

var started = false;
var level = 0;

$("#score-number").text(
  window.localStorage.getItem("highScore") ? window.localStorage.getItem("highScore") : 0
);

//------------------------------------------------------Detects Key Presses-------------------------------------------------------------
$(".start").click(function () {
  if (!started) {
    $("level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//-------------------------------------------------Detects In-Game Button Clicks---------------------------------------------------------
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//-----------------------------------------------Checks Answers Section (Game Logic)-----------------------------------------------------

function checkAnswer(currentLevel) {
  let lvl = currentLevel;
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over");

    startOver(lvl);
    console.log(currentLevel);
  }
}

//--------------------------------------------------Random Color Generator Logic---------------------------------------------------------

function nextSequence() {
  userClickedPattern = [];
  if (!parseInt(window.localStorage.getItem("highScore"))) {
    window.localStorage.setItem("highScore", level);
  }
  if (level > parseInt(window.localStorage.getItem("highScore"))) {
    window.localStorage.setItem("highScore", level);
  }

  $("#score-number").text(window.localStorage.getItem("highScore"));

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//---------------------------------------------------Button Animation & Sounds-----------------------------------------------------------

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//---------------------------------------------------------Level Restart-----------------------------------------------------------------
function startOver(highScore) {
  console.log(highScore);
  console.log(parseInt(window.localStorage.getItem("highScore")));
  level = 0;
  gamePattern = [];
  started = false;
}
