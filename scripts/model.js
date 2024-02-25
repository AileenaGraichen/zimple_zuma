//The model will encapsulate the game logic, including the linked list to manage the balls in the game, 
//generating random balls, and implementing game mechanics like inserting balls and removing matches. 
//The model will also include methods to find sequences of matching balls and remove them from the linked list.
import LinkedList from './linkedList.js'; // Ensure this is correctly pointing to your LinkedList class file

class GameBall {
    constructor(number) {
        this.number = number; // Changed from color to number
    }
}

class ZumaModel {
    constructor() {
        this.ballsList = new LinkedList(); // Use your LinkedList class for the game's ball chain
        this.cannonBall = null; // The ball to be inserted next
        this.generateCannonBall(); // Initialize the first cannon ball
        this.maxBalls = 20; // Set the maximum number of balls allowed
        this.gameOver = false;
    }

    generateCannonBall() {
        const randomNumber = this.generateRandomNumber();
        this.cannonBall = new GameBall(randomNumber);
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 6) + 1; // Generates a number between 1 and 6
    }


    // Add a new method for adding a ball with a random color to the list
    addRandomBall() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        const newBall = new GameBall(randomNumber);
        this.ballsList.addLast(newBall); // Or use addFirst, depending on game logic
    }

    insertBallAtIndex(index) {
        if (index <= 0) {
            this.ballsList.addFirst(this.cannonBall);
        } else if (index >= this.ballsList.length()) {
            this.ballsList.addLast(this.cannonBall);
        } else {
            this.ballsList.insertBefore(index, this.cannonBall);
        }
        this.checkForMatches(index);
        this.generateCannonBall(); 
    }

    checkForMatches(startIndex) {
        let currentNode = this.ballsList.nodeAt(startIndex);
        if (!currentNode) return;
    
        let matches = [currentNode]; // Start with the current node
        let numberToMatch = currentNode.data.number; // Should be number, not color
    
        // Check left side for matches
        let leftNode = currentNode.prev;
        while (leftNode && leftNode.data.number === numberToMatch) {
            matches.unshift(leftNode); // Add to the beginning of matches
            leftNode = leftNode.prev;
        }
    
        // Check right side for matches
        let rightNode = currentNode.next;
        while (rightNode && rightNode.data.number === numberToMatch) {
            matches.push(rightNode); // Add to the end of matches
            rightNode = rightNode.next;
        }
    
        console.log(`Matches for number ${numberToMatch}:`, matches);
    
        if (matches.length >= 3) {
            this.removeMatches(matches);
        }
    }

    checkForNewMatches(index) {
        this.checkForMatches(index);
    }

    checkForGameOver() {
        if (this.ballsList.length() >= this.maxBalls) {
            this.gameOver = true;
            // Trigger a game-over action, such as showing a message
            if (this.onGameOver) {
                this.onGameOver();
            }
        }
    }

    removeMatches(matches) {
        let startCheckIndex = null;
        let endCheckIndex = null;
    
        if (matches.length > 0) {
            const firstMatchIndex = this.ballsList.indexOf(matches[0].data);
            const lastMatchIndex = this.ballsList.indexOf(matches[matches.length - 1].data);
    
            startCheckIndex = firstMatchIndex - 1 >= 0 ? firstMatchIndex - 1 : null;
            endCheckIndex = lastMatchIndex + 1 < this.ballsList.length() ? lastMatchIndex - matches.length + 2 : null;
        }
    
        matches.forEach(node => this.ballsList.removeNode(node));
    
        if (startCheckIndex !== null) {
            this.checkForNewMatches(startCheckIndex);
        }
        if (endCheckIndex !== null) {
            this.checkForNewMatches(endCheckIndex);
        }
    }
}

export default ZumaModel;