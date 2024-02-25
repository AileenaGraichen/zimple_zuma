// View.js
class View {
    constructor(controller) {
        this.controller = controller;
        this.gameContainer = document.getElementById('gameContainer');
    }

    displayBalls(ballList) {
        // Clear existing marbles
        this.gameContainer.innerHTML = '';
    
        // Iterate through the ballList and create an element for each
        ballList.forEach((ball, index) => {
            const marbleElement = document.createElement('div');
            marbleElement.classList.add('marble');
            // Correct the path to match the number with the asset
            marbleElement.style.backgroundImage = `url('assets/marble${ball.number}.png')`;
            marbleElement.addEventListener('click', () => this.controller.handleClickEvent(index)); // Fix the method name here
            this.gameContainer.appendChild(marbleElement);
        });
    }

    animateInsertion(index) {
        // Ensure the element exists before trying to animate it
        const marbleElement = this.gameContainer.children[index];
        if (marbleElement) {
            marbleElement.classList.add('fade-in');
        }
    }

    animateRemoval(indices) {
        // Animate and remove each marble specified by indices
        indices.forEach(index => {
            const marbleElement = this.gameContainer.children[index];
            if (marbleElement) {
                marbleElement.classList.add('fade-out-scale-down');
                // Wait for animation to finish before removing the element
                marbleElement.addEventListener('animationend', () => {
                    if (marbleElement && marbleElement.parentNode) {
                        marbleElement.parentNode.removeChild(marbleElement);
                    }
                });
            }
        });
    }
}

export default View;

