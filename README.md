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
- `assets/`: Folder containing images and sounds used in the game.
- `libs/`: Folder containing the Bootstrap framework files used for modals and buttons.The game uses Bootstrap 5 for styling and modals. Download the Bootstrap CSS and JS files from Bootstrap Download. Alternatively, you can link directly to the Bootstrap CDN in index.html

## Controls:
- **Left Arrow**: Move paddle left.
- **Right Arrow**: Move paddle right.
- **Mouse Click**: Start a new game.
