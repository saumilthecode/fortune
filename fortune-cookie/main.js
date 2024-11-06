import { GoogleGenerativeAI } from "@google/generative-ai";
import { ASCII_ART } from './ascii-art';
import './style.css';

// DOM elements
const generateButton = document.getElementById('generateButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const fortuneDisplay = document.getElementById('fortuneDisplay');
const asciiArt = document.getElementById('asciiArt');
const fortuneText = document.getElementById('fortuneText');

// Initialize Gemini with environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateFortune() {
    // Show loading state
    generateButton.disabled = true;
    loadingIndicator.classList.remove('hidden');
    fortuneDisplay.classList.add('hidden');

    try {
        // Initialize model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate fortune
        const prompt = "Generate a single absurd, humorous fortune cookie message that's unexpected and slightly weird. Keep it under 100 characters and family-friendly. Don't use quotes.";
        const result = await model.generateContent(prompt);
        const fortune = result.response.text();

        // Get random ASCII art
        const randomArt = ASCII_ART[Math.floor(Math.random() * ASCII_ART.length)];

        // Update display
        asciiArt.textContent = randomArt;
        fortuneText.textContent = fortune;
        fortuneDisplay.classList.remove('hidden');
    } catch (error) {
        console.error('Error generating fortune:', error);
        fortuneText.textContent = 'Error: Could not connect to the fortune teller. They might be on a coffee break!';
        fortuneDisplay.classList.remove('hidden');
    } finally {
        // Hide loading state
        generateButton.disabled = false;
        loadingIndicator.classList.add('hidden');
    }
}

// Event listeners
generateButton.addEventListener('click', generateFortune);

// src/ascii-art.js
export const ASCII_ART = [
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
