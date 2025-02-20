# Breakout Game

This is a classic Breakout-style game built using HTML5, CSS, and JavaScript. The player controls a paddle to bounce a ball, break bricks, and score points. The game features two levels, with increasingly challenging brick arrangements, sound effects, and a modal system for game status.

## Features
- **Level System:** Two levels with different brick configurations and indestructible bricks.
- **Game Over & Win:** Display a modal showing the score when the game ends.
- **Responsive Canvas:** The game canvas dynamically adjusts, and gameplay can be started by clicking the "Play" button.
- **Paddle Control:** Use the arrow keys to move the paddle left or right to catch the ball.
- **Brick Interaction:** Break bricks by bouncing the ball off them. Indestructible bricks remain on the screen.

### Project Structure:
- `index.html`: The main HTML file containing the game layout and canvas.
- `styles/`: Folder containing `style.css` for the page's appearance.
- `scripts/`: Folder containing `game.js` which holds the game logic.
- `libs/`: Folder containing the Bootstrap framework files used for modals and buttons.
- `assets/`: Folder containing images and sounds used in the game.

## Controls:
- **Left Arrow**: Move paddle left.
- **Right Arrow**: Move paddle right.
- **Mouse Click**: Start a new game.

## Game Overview:
### **Canvas**:
- The main game canvas (`<canvas id="breakOut">`) is used to display the game.
- The paddle, ball, and bricks are drawn within this canvas.

### **Game Logic**:
- **Bricks:** Initially, there are rows of bricks arranged in the game. Some bricks are indestructible and require a special strategy to break.
- **Ball:** The ball bounces off walls, the paddle, and bricks. When the ball hits a brick, the brick is removed, and the score increases.
- **Paddle:** The player controls the paddle using the arrow keys to keep the ball in play.
- **Score & Level Display:** The score and current level are displayed at the top corners of the canvas.
  
### **Sounds:**
- Sound effects are played when the ball hits bricks, the paddle, or when the game is over. These sounds enhance the overall gaming experience.

### **Modals:**
- After the game ends, a modal appears showing the player's score and the option to retry the game.

## Game Status:
- The modal will display a message indicating whether the game is over or if the player has won, along with the score.
