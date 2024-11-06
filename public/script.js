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
        const resp