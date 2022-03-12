
// grab a reference of our "canvas" using its id
const canvas = document.getElementById('canvas');
/* get a "context". Without "context", we can't draw on canvas */
const ctx = canvas.getContext('2d');
/*Setting up canvas adjustment*/
ctx.canvas.width = 450;
var w = true;


/*Ends*/


/* some extra variables */
const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

const colour_list = ['#059D59', '#F1ADDD', '#05EDFF', 'magenta', 'lime', 'cyan','yellow'];
const random_color_index = Math.floor(Math.random() * 8);

var text_colour1 = 'black',text_colour2 = 'black';

var counter = 0,counter2 = 0;

var message = ' GOT A POINT';
/* some extra variables ends */

/* objects */
// net
const net = {
  x: canvas.width / 2 - netWidth / 2,
  y: 0,
  width: netWidth,
  height: netHeight,
  color: "#FFF"
};

// user paddle
const user = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: colour_list[Math.floor(Math.random() * 8)],
  score: 0
};

const ai = {
  x: canvas.width - (paddleWidth + 10),
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: colour_list[Math.floor(Math.random() * 8)],
  score: 0
};

// ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 7,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: colour_list[Math.floor(Math.random() * 8)],
};

/* objects declaration ends */

/* drawing functions */
// function to draw net
function drawNet() {
  // set the color of net
  ctx.fillStyle = colour_list[counter2];
  if (counter2 == 6){
    counter2 = 0;
  }
  if (counter % 100 == 0){
    counter2 += 1;
  }

  // syntax --> fillRect(x, y, width, height)
  ctx.fillRect(canvas.width / 2, 0 / 2, 8, canvas.height);
  ctx.fillRect(0,0,canvas.width, 8)
  ctx.fillRect(0,canvas.height - 8 ,canvas.width, 8)
  ctx.fillRect(0,0 ,8, canvas.height)
  ctx.fillRect(canvas.width - 8,0,8, canvas.height)


}

// function to draw score
function drawScore(x, y, score) {
  ctx.fillStyle = colour_list[counter2];
  if (counter2 == 6){
    counter2 = 0;
  }
  if (counter % 50 == 0){
    counter2 += 1;
  }
  ctx.font = '35px sans-serif';

  // syntax --> fillText(text, x, y)
  ctx.fillText(score, x, y);
}

// function to draw paddle
function drawPaddle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// function to draw ball
function drawBall(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
  ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
  ctx.closePath();
  ctx.fill();
}

function drawMessage(name, color, message){
  ctx.fillStyle = color;
  ctx.font = '20px sans-serif';
  ctx.fillText(name + message, canvas.width / 3, canvas.height / 8) 
  
}

/* drawing functions end */

/* moving Paddles */
// add an eventListener to browser window
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// gets activated when we press down a key
function keyDownHandler(event) {
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // set upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
  }
}

// gets activated when we release the key
function keyUpHandler(event) {
  switch (event.keyCode) {
    // "up arraow" key
    case 38:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = false;
      break;
  }
}

/* moving paddles section end */

// reset the ball
function reset() {
  // reset ball's value to older values
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  // changes the direction of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;  
}


function stop(){
  ball.velocityX = 0;
  ball.velocityY = 0;
  ball.speed = 0;
  ai.x = canvas.width - (paddleWidth + 10);
  ai.y = canvas.height / 2 - paddleHeight / 2;
  h = null;
  w = null;
  
}



function resetcolour(){
  text_colour1 = 'black';
  text_colour2 = 'black';
}

// collision Detect function
function collisionDetect(player, ball) {
  // returns true or false
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
  
}

// update function, to update things position
function update() {
  // move the paddle
  if (upArrowPressed && user.y > 0) {
    user.y -= 8;
  } else if (downArrowPressed && (user.y < canvas.height - user.height)) {
    user.y += 8;
  }
  
  // check if ball hits top or bottom wall
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    ctxfillStyle = colour_list[Math.floor(Math.random() * 8)];
    ball.velocityY = -ball.velocityY;
    user.color = colour_list[Math.floor(Math.random() * 8)];
    ai.color = colour_list[Math.floor(Math.random() * 8)];
    ball.color = colour_list[Math.floor(Math.random() * 8)];
    
  }
   // if ball hit on right wall
   if (ball.x + ball.radius >= canvas.width) {
    // play scoreSound
    // then user scored 1 point
    user.score += 1;
    setTimeout(resetcolour, 1000);
    text_colour1 = colour_list[Math.floor(Math.random() * 8)];
    reset();
    if (user.score == 20){
      stop()
      text_colour1 = colour_list[Math.floor(Math.random() * 8)];
      message = ' HAS WON, GAME FINISHED!';
    } 
  }

  // if ball hit on left wall
  if (ball.x - ball.radius <= 0) {
    // play scoreSound
    // then ai scored 1 point
    ai.score += 1;
    text_colour2 = colour_list[Math.floor(Math.random() * 8)];
    setTimeout(resetcolour, 1000);
    reset();
    if (ai.score == 20){
      stop()
      text_colour2 = colour_list[Math.floor(Math.random() * 8)];
      message = ' HAS WON, GAME OVER!';
    }
    
  }

  // move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //new ai that moves faster based on how many points you have
  ai.y += ((ball.y - (ai.y + ai.height / 2))) * (user.score/100);
  if (user.score == 0){
    ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.009;
  }
  // collision detection on paddles
  let player = (ball.x < canvas.width / 2) ? user : ai;

  if (collisionDetect(player, ball)) {
    // default angle is 0deg in Radian
    let angle = 0;
    user.color = colour_list[Math.floor(Math.random() * 8)];
    ai.color = colour_list[Math.floor(Math.random() * 8)];
    ball.color = colour_list[Math.floor(Math.random() * 8)];

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;
  }
}




function render() {
  // set a style
  ctx.fillStyle = "#000"; /* whatever comes below this acquires black color (#000). */
  // draws the black board
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw net
  drawNet();

  // draw user score
  drawScore(canvas.width / 4, canvas.height / 6, user.score);
    // draw ai score
  drawScore(3 * canvas.width / 4, canvas.height / 6, ai.score);
  // render function draws everything on to canvas

  // draw user paddle
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  // draw ai paddle
  drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
  // draw ball
  drawBall(ball.x, ball.y, ball.radius, ball.color);

  drawMessage('User',text_colour1, message);
  drawMessage('AI',text_colour2, message)
}
// gameLoop
function gameLoop() {
  //update counter
  counter += 1;

  //update canvas size
  
  if (canvas.width < 900 && w == true){
    canvas.width += 1;
    ai.x += 1;
  }
  if (canvas.width == 900){
    w = false;
  }
  if (canvas.width > 450 && w == false){
    canvas.width -= 1;
    ai.x -= 1;
  }
  if (canvas.width == 450){
    w = true
  }
  
  
  
  // update() function here
  update();
  // render() function here
  render();
}

// calls gameLoop() function 60 times per second
setInterval(gameLoop, 1000 / 60);
