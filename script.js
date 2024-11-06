async function generateFortune() {
    document.getElementById("loading").style.display = 'block';
    document.getElementById("ascii-art").textContent = '';
    document.getElementById("fortune").textContent = '';

    try {
        // Replace `/api/generate-fortune` with the path to your Vercel serverless function
        const response = await fetch('/api/generate-fortune', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        const [art, fortune] = data.response.split('\n\n');

        document.getElementById("ascii-art").textContent = art || "🍪";
        document.getElementById("fortune").textContent = fortune || "Your future is full of mysteries...";
    } catch (error) {
        console.error("Error fetching fortune:", error);
        document.getElementById("fortune").textContent = "An error occurred. Please try again.";
    } finally {
        document.getElementById("loading").style.display = 'none';
    }
}
