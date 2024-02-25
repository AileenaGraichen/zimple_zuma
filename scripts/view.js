// View.js
class View {
    constructor(controller) {
        this.controller = controller;
        this.gameContainer = document.getElementById('gameContainer');
    }

    displayBalls(ballList) {
        this.gameContainer.innerHTML = '';
        ballList.forEach((ball, index) => {
            const marbleElement = document.createElement('div');
            marbleElement.classList.add('marble');
            marbleElement.style.backgroundImage = `url('assets/marble${ball.number}.png')`;
            marbleElement.addEventListener('click', () => this.controller.handleClickEvent(index));
            this.gameContainer.appendChild(marbleElement);
        });
    }

    animateInsertion(index) {
        const marbleElement = this.gameContainer.children[index];
        if (marbleElement) {
            marbleElement.classList.add('fade-in');
        }
    }

    animateRemoval(indices) {
        indices.forEach(index => {
            const marbleElement = this.gameContainer.children[index];
            if (marbleElement) {
                marbleElement.classList.add('fade-out-scale-down');
                marbleElement.addEventListener('animationend', () => {
                    if (marbleElement && marbleElement.parentNode) {
                        marbleElement.parentNode.removeChild(marbleElement);
                    }
                });
            }
        });
    }

    shootCannonBall(cannonBall, toIndex) {
        const cannonBallElement = document.createElement('div');
        cannonBallElement.classList.add('marble', 'cannon-ball');
        cannonBallElement.style.backgroundImage = `url('assets/marble${cannonBall.number}.png')`;
        this.gameContainer.appendChild(cannonBallElement);

        // Trigger the shoot animation
        // You'll need to adjust the `left` and `top` values according to your layout and animation needs
        cannonBallElement.style.left = '50%'; // Example value
        cannonBallElement.style.top = '50%'; // Example value
        // Trigger animation with a class or directly with JS
        
        // After the animation, call the controller's method to insert the ball into the model
        setTimeout(() => {
            if (cannonBallElement) {
                cannonBallElement.remove();
            }
            this.controller.insertBallAfterAnimation(toIndex);
        }, 500); // Match this timeout to the duration of your shooting animation
    }

    explodeBalls(indices) {
        indices.forEach(index => {
            const marbleElement = this.gameContainer.children[index];
            if (marbleElement) {
                marbleElement.classList.add('explode');
                marbleElement.addEventListener('animationend', () => {
                    if (marbleElement && marbleElement.parentNode) {
                        marbleElement.parentNode.removeChild(marbleElement);
                    }
                });
            }
        });
    }

    displayGameOver() {
        const gameOverElement = document.createElement('div');
        gameOverElement.classList.add('game-over');
        gameOverElement.textContent = 'Game Over!';
        document.body.appendChild(gameOverElement);

        // Optionally, animate the game over message
        gameOverElement.classList.add('fade-in');
    }
}

export default View;

