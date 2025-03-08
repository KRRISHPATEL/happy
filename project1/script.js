// Play birthday song
const audio = document.getElementById('birthday-song');
const playPauseBtn = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume');
let isPlaying = false;

// Set initial volume
audio.volume = volumeControl.value;

// Play audio when page loads but wait a bit
window.addEventListener('load', () => {
    setTimeout(() => {
        audio.play()
            .then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="play-icon">⏸️</i>';
            })
            .catch(error => {
                console.log("Audio play failed due to autoplay restrictions:", error);
            });
    }, 1000);
});

// Play/Pause button
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="play-icon">▶️</i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="play-icon">⏸️</i>';
    }
    isPlaying = !isPlaying;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Function to go to next page
function goToNextPage() {
    // Add a bounce effect before navigating
    gsap.to('.next-button', {
        scale: 1.2,
        yoyo: true,
        repeat: 1,
        duration: 0.3,
        onComplete: () => {
            // Change this URL to your next page
            window.location.href = "memorylane.html";
            // For demonstration, we'll just show an alert
        }
    });
}

// Create confetti, balloons, hearts, and stars
function createFloatingElements() {
    const colors = ['#FF1493', '#8A2BE2', '#FFD700', '#FF4500', '#00BFFF', '#32CD32'];
    const elements = ['confetti', 'balloon', 'heart', 'star'];
    const confettiShapes = ['▲', '■', '●', '★', '♥', '♦', '✦', '✧'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            
            // Randomly pick an element type
            const elementType = elements[Math.floor(Math.random() * elements.length)];
            element.className = elementType;
            
            // Set random position
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = -30 + 'px';
            
            // Set random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Different styling based on element type
            if (elementType === 'confetti') {
                const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                element.innerHTML = shape;
                element.style.color = color;
                element.style.fontSize = (Math.random() * 20 + 10) + 'px';
                element.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else if (elementType === 'balloon') {
                element.innerHTML = '🎈';
                element.style.fontSize = (Math.random() * 30 + 20) + 'px';
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            } else if (elementType === 'heart') {
                element.innerHTML = '❤️';
                element.style.fontSize = (Math.random() * 20 + 10) + 'px';
                element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            } else if (elementType === 'star') {
                element.innerHTML = '✨';
                element.style.fontSize = (Math.random() * 15 + 10) + 'px';
            }
            
            // Add to body
            document.body.appendChild(element);
            
            // Animate with GSAP
            gsap.to(element, {
                y: window.innerHeight + 100,
                x: '+=' + (Math.random() * 200 - 100),
                rotation: Math.random() * 360,
                duration: Math.random() * 10 + 5,
                ease: "power1.out",
                onComplete: () => {
                    document.body.removeChild(element);
                }
            });
            
            // Add some sparkle animation
            if (Math.random() > 0.7) {
                gsap.to(element, {
                    opacity: 0.5,
                    yoyo: true,
                    repeat: -1,
                    duration: 0.5,
                    ease: "sine.inOut"
                });
            }
            
        }, i * 200); // Staggered start times
    }
}

// Start floating elements on load
window.addEventListener('load', createFloatingElements);

// Create new elements periodically
setInterval(createFloatingElements, 5000);

// Add a subtle sparkle effect to the heading
gsap.to('h1', {
    textShadow: "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 20, 147, 0.6)",
    repeat: -1,
    yoyo: true,
    duration: 2
});

// Responsive adjustments
function handleResize() {
    // Add responsive adjustments if needed
}

window.addEventListener('resize', handleResize);
handleResize();