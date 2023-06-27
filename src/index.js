// Constants
let gameInterval;
const containerWidth = 400;
const containerHeight = 300;
const rodHeight = 10;
const rodSpeed = 5;
const ballSize = 10;
let ballSpeed = 1;

// Game state
let player1Score = 0;
let player2Score = 0;
let player1Name = "";
let player2Name = "";
let highestScore = 0;
let highestScorer = "";

// DOM elements
const player1Rod = document.getElementById("player1");
const player2Rod = document.getElementById("player2");
const ball = document.getElementById("ball");

// Initialize game
// function initGame() {
//   // Retrieve data from local storage
//   const storedData = localStorage.getItem('pingPongData');
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     highestScore = parsedData.highestScore;
//     highestScorer = parsedData.highestScorer;
//     if (highestScorer !== "") {
//       alert(`Highest Score: ${highestScore} by ${highestScorer}`);
//     } else {
//       alert("This is your first time.");
//     }
//   } else {
//     alert("This is your first time.");
//   }

//   // Set initial positions of rods and ball
//   player1Rod.style.left = `${(containerWidth - player1Rod.offsetWidth) / 2}px`;
//   player2Rod.style.left = player1Rod.style.left;
//   player2Rod.style.top = `${containerHeight - rodHeight}px`;
//   ball.style.left = `${(containerWidth - ballSize) / 2}px`;
//   ball.style.top = `${(containerHeight - ballSize) / 2}px`;
// }

// Event listener for key presses
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    startRound();
  } else if (event.key === "a" || event.key === "A") {
    moveRods(-rodSpeed);
  } else if (event.key === "d" || event.key === "D") {
    moveRods(rodSpeed);
  }
});

// Start a new round
function startRound() {
  // Reset score
  player1Score = 0;
  player2Score = 0;

  // Update score display
  updateScoreDisplay();

  if (gameInterval !== undefined) {
    clearInterval(gameInterval);
  }

  // Reset rod and ball positions
  player1Rod.style.left = `${(containerWidth - player1Rod.offsetWidth) / 2}px`;
  player2Rod.style.left = player1Rod.style.left;
  ball.style.left = `${(containerWidth - ballSize) / 4}px`;
  ball.style.top = `${(containerHeight - ballSize) / 4}px`;

  // Start the game loop
  gameInterval = setInterval(updateGame, 10);
}

// Move the rods
function moveRods(speed) {
  const player1RodPosition = player1Rod.offsetLeft + speed;
  const player2RodPosition = player2Rod.offsetLeft + speed;

  if (
    player1RodPosition >= 0 &&
    player1RodPosition <= containerWidth - player1Rod.offsetWidth
  ) {
    player1Rod.style.left = `${player1RodPosition}px`;
  }

  if (
    player2RodPosition >= 0 &&
    player2RodPosition <= containerWidth - player2Rod.offsetWidth
  ) {
    player2Rod.style.left = `${player2RodPosition}px`;
  }
}

// Update the game state
function updateGame() {
  // Move the ball
  const ballPositionX = ball.offsetLeft;
  const ballPositionY = ball.offsetTop;
  const ballNextPositionX = ballPositionX + ballSpeed;
  const ballNextPositionY = ballPositionY + ballSpeed;

  // Check for collision with rods
  if (ballNextPositionY >= containerHeight - rodHeight - ballSize) {
    // Collision with player2's rod
    if (
      ballNextPositionX >= player2Rod.offsetLeft &&
      ballNextPositionX <=
        player2Rod.offsetLeft + player2Rod.offsetWidth - ballSize
    ) {
      ball.style.top = `${containerHeight - rodHeight - ballSize}px`;
      ballSpeed *= -1;
      player2Score++;
    }
    // Player1 loses
    else if (ballNextPositionY >= containerHeight - ballSize) {
      endRound(player2Name, player2Score);
    }
  } else if (ballNextPositionY <= rodHeight) {
    // Collision with player1's rod
    if (
      ballNextPositionX >= player1Rod.offsetLeft &&
      ballNextPositionX <=
        player1Rod.offsetLeft + player1Rod.offsetWidth - ballSize
    ) {
      ball.style.top = `${rodHeight}px`;
      ballSpeed *= -1;
      player1Score++;
    }
    // Player2 loses
    else if (ballNextPositionY <= 0) {
      endRound(player1Name, player1Score);
    }
  }

  // Check for collision with container walls
  if (
    ballNextPositionX >= containerWidth - ballSize ||
    ballNextPositionX <= 0
  ) {
    ballSpeed *= -1;
  }

  // Update ball position
  ball.style.left = `${ballNextPositionX}px`;
  ball.style.top = `${ballNextPositionY}px`;
}

// End the round and display the winner
function endRound(winnerName, winnerScore) {
  // Display winner alert
  //alert(`Player ${winnerName} wins with a score of ${winnerScore}!`);

  // Check if the winner's score is the highest
  if (winnerScore > highestScore) {
    highestScore = winnerScore;
    highestScorer = winnerName;

    // Store the highest score in local storage
    // Store the highest score in local storage
    const data = {
      highestScore: highestScore,
      highestScorer: highestScorer
    };
    localStorage.setItem("pingPongData", JSON.stringify(data));
  }

  // Restart the game
  startRound();
}

// Update the score display
function updateScoreDisplay() {
  // Update player1's score
  const player1ScoreDisplay = document.getElementById("player1-score");
  player1ScoreDisplay.textContent = `Player ${player1Name}: ${player1Score}`;

  // Update player2's score
  const player2ScoreDisplay = document.getElementById("player2-score");
  player2ScoreDisplay.textContent = `Player ${player2Name}: ${player2Score}`;
}

// Initialize the game
function initGame() {
  // Retrieve data from local storage
  const storedData = localStorage.getItem("pingPongData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    highestScore = parsedData.highestScore;
    highestScorer = parsedData.highestScorer;
    if (highestScorer !== "") {
      alert(`Highest Score: ${highestScore} by ${highestScorer}`);
    } else {
      alert("This is your first time.");
    }
  } else {
    alert("This is your first time.");
  }

  // Set player names
  player1Name = prompt("Enter Player 1 Name:");
  player2Name = prompt("Enter Player 2 Name:");

  // Set initial positions of rods and ball
  player1Rod.style.left = `${(containerWidth - player1Rod.offsetWidth) / 2}px`;
  player2Rod.style.left = player1Rod.style.left;
  player2Rod.style.top = `${containerHeight - rodHeight}px`;
  ball.style.left = `${(containerWidth - ballSize) / 2}px`;
  ball.style.top = `${(containerHeight - ballSize) / 2}px`;

  // Start the game
  startRound();
}

// Event listener for key presses
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    startRound();
  } else if (event.key === "a" || event.key === "A") {
    moveRods(-rodSpeed);
  } else if (event.key === "d" || event.key === "D") {
    moveRods(rodSpeed);
  }
});

// Start the game when the page loads
window.addEventListener("load", initGame);
