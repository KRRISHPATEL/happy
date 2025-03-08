// Global variables
let candlesBlown = 0;
const totalCandles = 5;
let allCandlesBlown = false;

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', function() {
    createCandles();
    createBalloons();
    createConfetti();
    createDecorations();
    
    // Add event listeners for candle interaction
    document.querySelectorAll('.candle').forEach(candle => {
        candle.addEventListener('click', blowOutCandle);
        candle.addEventListener('touchstart', blowOutCandle); // Better for mobile
        candle.addEventListener('mouseover', function(e) {
            if (e.buttons === 0) { // Only trigger on hover when not clicking
                blowOutCandle.call(this);
            }
        });
    });
    
    // For better mobile experience with touch
    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('candle') && !element.classList.contains('blown')) {
            blowOutCandle.call(element);
        }
    });
    
    // Optional: Listen for keyboard input 
    document.addEventListener('keypress', function(e) {
        if (e.key === 'b' || e.key === 'B') { // Press 'b' to simulate blowing
            blowRandomCandle();
        }
    });
});

// Create candles for the cake
function createCandles() {
    const candleContainer = document.getElementById('candleContainer');
    
    for (let i = 0; i < totalCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        
        candle.appendChild(flame);
        candle.appendChild(smoke);
        candleContainer.appendChild(candle);
    }
}

// Create floating balloons
function createBalloons() {
    const colors = ['#ff66b3', '#66ccff', '#ff9966', '#99ff66', '#cc99ff'];
    const numBalloons = 15;
    
    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${15 + Math.random() * 10}s`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(balloon);
    }
}

// Create confetti pieces
function createConfetti() {
    const colors = ['#ffcc00', '#ff66b3', '#66ccff', '#ff9966', '#99ff66'];
    const numConfetti = 50;
    
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.width = `${5 + Math.random() * 5}px`;
        confetti.style.height = `${5 + Math.random() * 10}px`;
        confetti.style.animationDuration = `${3 + Math.random() * 4}s`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(confetti);
    }
}

// Create cake decorations
function createDecorations() {
    const cake = document.querySelector('.cake');
    const colors = ['#ff3366', '#ffcc00', '#66ccff', '#ff9966', '#99ff66'];
    const numDecorations = 10;
    
    for (let i = 0; i < numDecorations; i++) {
        const decoration = document.createElement('div');
        decoration.className = 'decoration';
        decoration.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        decoration.style.top = `${-20 - Math.random() * 50}px`;
        decoration.style.left = `${Math.random() * 100}%`;
        cake.appendChild(decoration);
    }
}

// Blow out a candle when clicked or hovered
function blowOutCandle() {
    if (!this.classList.contains('blown')) {
        this.classList.add('blown');
        candlesBlown++;
        
        // Create sparkle effect
        createSparkleEffect(this);
        
        // Check if all candles are blown
        if (candlesBlown === totalCandles && !allCandlesBlown) {
            allCandlesBlown = true;
            setTimeout(showWishMessage, 1000);
        }
    }
}

// Simulate blowing a random candle
function blowRandomCandle() {
    const unblownCandles = Array.from(document.querySelectorAll('.candle:not(.blown)'));
    if (unblownCandles.length > 0) {
        const randomCandle = unblownCandles[Math.floor(Math.random() * unblownCandles.length)];
        blowOutCandle.call(randomCandle);
    }
}

// Create sparkle effect around the blown candle
function createSparkleEffect(candle) {
    const numSparkles = 10;
    const candleRect = candle.getBoundingClientRect();
    
    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${candleRect.left + Math.random() * candleRect.width}px`;
        sparkle.style.top = `${candleRect.top + Math.random() * (candleRect.height / 2)}px`;
        sparkle.style.animation = `sparkle ${0.5 + Math.random() * 0.5}s forwards`;
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Show the wish message when all candles are blown
function showWishMessage() {
    document.getElementById('wishMessage').classList.add('show');
    createFireworks();
}

// Close the wish message
function closeWishMessage() {
    document.getElementById('wishMessage').classList.remove('show');
}

// Create fireworks effect
function createFireworks() {
    const numFireworks = 10;
    const colors = ['#ff3366', '#ffcc00', '#66ccff', '#ff9966', '#99ff66'];
    
    for (let i = 0; i < numFireworks; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${10 + Math.random() * 80}%`;
            firework.style.top = `${10 + Math.random() * 60}%`;
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.animation = `firework ${1 + Math.random()}s forwards`;
            document.body.appendChild(firework);
            
            // Remove firework after animation
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 300);
    }
}

// Navigation functions
function goBack() {
    window.location.href = 'memory-lane.html';
}

function goNext() {
    window.location.href = 'letter.html';
}