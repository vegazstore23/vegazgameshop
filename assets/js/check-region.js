// Check Region Form Handler
const checkForm = document.getElementById('checkForm');
const checkResult = document.getElementById('checkResult');
const checkError = document.getElementById('checkError');
const checkButtonText = document.getElementById('checkButtonText');
const checkLoader = document.getElementById('checkLoader');
const playerNameEl = document.getElementById('playerName');
const errorMessageEl = document.getElementById('errorMessage');

if (checkForm) {
    checkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const zoneId = document.getElementById('zoneId').value;
        
        // Show loading
        checkButtonText.style.display = 'none';
        checkLoader.style.display = 'block';
        checkResult.style.display = 'none';
        checkError.style.display = 'none';
        
        // Simulate API call (in production, replace with actual API)
        setTimeout(() => {
            // Mock response
            const mockPlayers = [
                'Player123', 'GamerPro', 'MLBBMaster', 'LegendPlayer', 
                'EpicGamer', 'MythicHero', 'VegazPlayer', 'ProGamer88',
                'MobileLegend', 'DiamondKing'
            ];
            const randomPlayer = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
            
            // Show result
            playerNameEl.textContent = randomPlayer;
            checkResult.style.display = 'block';
            
            // Store for topup page
            sessionStorage.setItem('mlbb_userId', userId);
            sessionStorage.setItem('mlbb_zoneId', zoneId);
            sessionStorage.setItem('mlbb_username', randomPlayer);
            
            // Reset button
            checkButtonText.style.display = 'inline';
            checkLoader.style.display = 'none';
        }, 1500);
    });
}
