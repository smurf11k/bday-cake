document.addEventListener('DOMContentLoaded', function () {
    const candlesContainer = document.getElementById('candles');
    const blowArea = document.getElementById('blowArea');

    // Initially hide candles and disable interaction
    candlesContainer.style.opacity = '0';
    blowArea.style.pointerEvents = 'none';

    // Create 9 candles with flames
    for (let i = 0; i < 9; i++) {
        const candle = document.createElement('div');
        candle.className = 'velas';
        candle.style.opacity = '0';

        // Create 5 flames for each candle
        for (let j = 0; j < 5; j++) {
            const flame = document.createElement('div');
            flame.className = 'fuego';
            candle.appendChild(flame);
        }

        candlesContainer.appendChild(candle);
    }

    // Wait for the final cake animation to complete
    const cremaAnimation = document.getElementById('crema');
    cremaAnimation.addEventListener('endEvent', function () {
        // Show candles container
        candlesContainer.style.opacity = '1';

        // Animate candles one by one
        const candles = document.querySelectorAll('.velas');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.style.animation = `candle-appear 0.4s ease-out forwards`;
                candle.style.animationDelay = `${index * 0.15}s`;
            }, 0);
        });

        // Enable interaction after all candles appear
        setTimeout(() => {
            blowArea.style.pointerEvents = 'auto';
        }, candles.length * 150 + 400);
    });

    let blownCandles = 0;
    const totalCandles = 9;

    // Detect blowing (mouse click or touch)
    blowArea.addEventListener('click', blowCandles);
    blowArea.addEventListener('touchstart', blowCandles);

    function blowCandles() {
        if (blownCandles >= totalCandles) return;
        blownCandles = totalCandles;

        // Disable further clicks during animation
        blowArea.style.pointerEvents = 'none';

        // Group flames by candle for more realistic blowing
        const candles = document.querySelectorAll('.velas');

        candles.forEach((candle, candleIndex) => {
            const flames = candle.querySelectorAll('.fuego');

            // Add a slight delay between candles (shorter than before)
            setTimeout(() => {
                // First make the flame flicker
                flames.forEach(flame => {
                    flame.style.animation = 'flicker 0.2s 2 alternate';
                });

                // Then extinguish after flickering
                setTimeout(() => {
                    flames.forEach(flame => {
                        flame.style.opacity = '0';
                        flame.style.transform = 'scale(0)';
                        flame.style.transition = 'all 0.1s ease-out';
                    });
                }, 400);

            }, candleIndex * 50); // Reduced delay between candles
        });

        // Start confetti after all candles are blown
        setTimeout(createConfetti, candles.length * 80 + 500);

        // Update instructions
        setTimeout(() => {
            document.querySelector('.instructions').textContent = "Now your wish will come true!";
        }, candles.length * 80 + 300);
    }

    function createConfetti() {
        const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ff8800', '#ff0088', '#8800ff'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }

        setTimeout(onConfettiEnd, 3000);
    }
});

function onConfettiEnd() {
    document.getElementById('gifContainer').style.display = 'block';
}
