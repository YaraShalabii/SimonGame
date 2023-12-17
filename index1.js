var nextLevel;
var simon = [];
function randomNum() {
  nextLevel = Math.floor(Math.random() * 4);
}
function sounds(key) {
  switch (key) {
    case "green":
      var green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    default:
      break;
  }
}
function playRandomly() {
  var nextLevelID = $(".btn")[nextLevel].getAttribute("id");
  sounds(nextLevelID);
  var nextLevelIDPressed = "#" + nextLevelID;
  $(nextLevelIDPressed).addClass("pressed");
  setTimeout(unPress, 200);
  function unPress() {
    $(nextLevelIDPressed).removeClass("pressed");
  }
}

$(document).one("keydown", function startGame() {
  var gameLevel = 1;
  $("h1").html("Level " + gameLevel);
  randomNum();
  var simon = [$(".btn")[nextLevel]];
  playRandomly();
  var x = simon.length;

  $(".btn").on("click", function () {
    // Play the pressed button
    var pressedBtn = this;
    var buttonID = $(pressedBtn).attr("id");
    sounds(buttonID);
    $(pressedBtn).addClass("pressed");
    setTimeout(unPressThis, 200);
    function unPressThis() {
      $(pressedBtn).removeClass("pressed");
    }

    if (pressedBtn == simon[simon.length - x]) {
      x--;

      if (x == 0) {
        gameLevel++;
        randomNum();
        var nextLevelArray = $(".btn")[nextLevel];
        simon.push(nextLevelArray);
        setTimeout(playRandomly, 1000);
        $("h1").html("Level " + gameLevel);
        x = simon.length;
      }
    } else {
      gameLevel = 0;

      simon = [];
      $("h1").html("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(gameOver, 200);
      function gameOver() {
        $("body").removeClass("game-over");
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
      }
      $(document).one("keydown", function () {
        startGame();
      });
    }
  });
});
