let score = 0;
const tapArea = document.getElementById('tap-area');
const scoreDisplay = document.getElementById('score');
const userInfo = document.getElementById('user-info');

// Initialize Telegram Web App
Telegram.WebApp.ready();

// Get user info from Telegram
const user = Telegram.WebApp.initDataUnsafe.user;

if (user) {
    // Display user information on the screen
    userInfo.textContent = `Welcome, ${user.first_name}! Your ID: ${user.id}`;
} else {
    userInfo.textContent = 'User info not available';
}

// Increase score on tap
tapArea.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    
    // Send score to the server to save it
    fetch('/save_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user.id,
            score: score
        })
    });

    // Visual feedback
    tapArea.style.backgroundColor = '#f44336'; // change color to red on tap
    setTimeout(() => {
        tapArea.style.backgroundColor = '#ffeb3b'; // revert to yellow
    }, 200);
});
