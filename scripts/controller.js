// Adjust imports based on the actual export methods used in linkedList.js and view.js
import ZumaModel from './model.js'; // Assuming you have ZumaModel that extends LinkedList with game logic
import View from './view.js';

class Controller {
    constructor() {
        this.model = new ZumaModel(); // Using ZumaModel which should encapsulate game-specific logic
        this.view = new View(this); // Passing 'this' so View can call controller methods
        document.addEventListener('DOMContentLoaded', () => this.initGame()); // Ensure DOM is ready
    }

    initGame() {
        for (let i = 0; i < 5; i++) { // Start with 5 balls for demonstration
            this.model.addRandomBall();
        }
        this.updateView();
        console.log('Game initialized');
    }

    handleClickEvent(index) {
        // Logic to insert the cannonball at the clicked position
        this.model.insertBallAtIndex(index);
        this.updateView(); // Refresh the view to reflect the model's new state
    }

    updateView() {
        // Convert model's linked list to an array for easier rendering
        let ballsArray = [];
        let currentNode = this.model.ballsList.head;
        while (currentNode) {
            ballsArray.push(currentNode.data);
            currentNode = currentNode.next;
        }
        this.view.displayBalls(ballsArray); // Update the view with the current state of balls
        
        const nextMarbleElement = document.getElementById('nextMarble');
        if (nextMarbleElement && this.model.cannonBall) {
            nextMarbleElement.style.backgroundImage = `url('assets/marble${this.model.cannonBall.number}.png')`;
        }
    }
}

// Instantiate the Controller to kick things off
new Controller();

