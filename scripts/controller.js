// Adjust imports based on the actual export methods used in linkedList.js and view.js
import ZumaModel from './model.js'; // Assuming you have ZumaModel that extends LinkedList with game logic
import View from './view.js';

class Controller {
    constructor() {
        this.model = new ZumaModel();
        this.view = new View(this);
        document.addEventListener('DOMContentLoaded', () => this.initGame());
        this.model.onMatchesFound = this.onMatchesFound.bind(this);
        this.model.onGameOver = this.onGameOver.bind(this);
    }

    initGame() {
        for (let i = 0; i < 5; i++) {
            this.model.addRandomBall();
        }
        this.updateView();
        console.log('Game initialized');
    }

    onGameOver() {
        // Instead of alert, you can use the view to display a game over screen
        this.view.displayGameOver();
    }

    handleClickEvent(index) {
        if (this.model.gameOver) return; // Prevent clicks after game over

        // Animate cannonball shooting
        this.view.shootCannonBall(this.model.cannonBall, index);

        // After the shooting animation ends, insert the ball and check for matches
        setTimeout(() => {
            const matches = this.model.insertBallAtIndex(index);
            if (matches) {
                this.onMatchesFound(matches);
            }
            this.updateView();
        }, 500); // Timing should match the shooting animation duration
    }

    onMatchesFound(matches) {
        // Animate the removal of matched balls
        this.view.explodeBalls(matches);
        // Update the view after the explosions have finished
        setTimeout(() => this.updateView(), 500); // Delay should match explosion animation duration
    }

    updateView() {
        // Convert model's linked list to an array for easier rendering
        let ballsArray = [];
        let currentNode = this.model.ballsList.head;
        while (currentNode) {
            ballsArray.push(currentNode.data);
            currentNode = currentNode.next;
        }
    
        // Update the view with the current state of balls
        this.view.displayBalls(ballsArray);
        
        // Display the next cannonball
        const nextMarbleElement = document.getElementById('nextMarble');
        if (nextMarbleElement && this.model.cannonBall) {
            nextMarbleElement.style.backgroundImage = `url('assets/marble${this.model.cannonBall.number}.png')`;
        }
    }
}

new Controller();
