import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const prompt = "Generate a bizarre fortune cookie message and some humorous ASCII art.";

    try {
        const result = await model.generateContent(prompt);
        res.status(200).json({ response: result.response.text() });
    } catch (error) {
        console.error("Error generating content:", error);
        // Respond with JSON containing the error message
        res.status(500).json({ error: "Error generating content." });
    }
}
