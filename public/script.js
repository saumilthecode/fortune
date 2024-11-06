// script.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// ASCII art collection
const ASCII_ART = [
    `
  ,,,,,
 (0 o 0)
  |=^=|
  || ||
  || ||
  |___|
    `,
    `
   /\\___/\\
  (  o o  )
  (  =^=  )
   (---)
    `,
    `
   /\\_/\\
  ( o.o )
   > ^ <
    `,
    `
   /\\___/\\
  |  o o  |
  (  T_T  )
   |___|
    `,
    `
  .|||||||||.
  |         |
  |  ^   ^  |
  |  (o_o)  |
  |    U    |
  |_________|
    `
];

// DOM elements
const generateButton = document.getElementById('generateButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const fortuneDisplay = document.getElementById('fortuneDisplay');
const asciiArt = document.getElementById('asciiArt');
const fortuneText = document.getElementById('fortuneText');

// Initialize Gemini
let genAI;

async function initializeAPI() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        genAI = new GoogleGenerativeAI(config.apiKey);
    } catch (error) {
        console.error('Failed to initialize API:', error);
    }
}

async function generateFortune() {
    if (!genAI) {
        await initializeAPI();
    }

    // Show loading state
    generateButton.disabled = true;
    loadingIndicator.classList.remove('hidden');
    fortuneDisplay.classList.add('hidden');

    try {
        // Initialize model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Rest of the generate fortune code remains the same...
    } catch (error) {
        console.error('Error generating fortune:', error);
        fortuneText.textContent = 'Error: Could not connect to the fortune teller. They might be on a coffee break!';
        fortuneDisplay.classList.remove('hidden');
    } finally {
        generateButton.disabled = false;
        loadingIndicator.classList.add('hidden');
    }
}

// Initialize API when the page loads
initializeAPI();

// Event listeners
generateButton.addEventListener('click', generateFortune);
