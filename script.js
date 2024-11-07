import { GoogleGenerativeAI } from "@google/generative-ai";

const fortuneButton = document.getElementById('fortuneButton');
const fortuneDisplay = document.getElementById('fortuneDisplay');

const backupFortunes = [
    "You will soon embark on a thrilling adventure!",
    "Good luck is on its way to you.",
    "An unexpected opportunity will bring you joy.",
    "Your hard work will soon pay off.",
    "A pleasant surprise awaits you.",
    "Embrace change; it will lead to great things.",
    "Happiness is around the corner.",
    "Today is a good day for self-reflection."
];

let genAI;
let model;

async function initializeAPI() {
    try {
        const response = await fetch('/api/config');
        const data = await response.json();

        if (!data.apiKey) {
            throw new Error('No API key found');
        }

        genAI = new GoogleGenerativeAI(data.apiKey);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (error) {
        console.error('Failed to initialize API:', error);
    }
}

async function fetchFortune() {
    fortuneButton.disabled = true;
    fortuneButton.innerText = "Fetching your fortune...";

    try {
        if (!model) {
            throw new Error('API not initialized');
        }

        const prompt = "Give me a playful and uplifting fortune.";
        const result = await model.generateContent(prompt);
        const fortune = result.response.text();
        fortuneDisplay.innerText = fortune;

    } catch (error) {
        console.error("Error fetching fortune:", error);
        const fallbackFortune = backupFortunes[Math.floor(Math.random() * backupFortunes.length)];
        fortuneDisplay.innerText = fallbackFortune;

    } finally {
        fortuneButton.disabled = false;
        fortuneButton.innerText = "Give Me My Fortune!";
    }
}

initializeAPI();

fortuneButton.addEventListener('click', fetchFortune);
