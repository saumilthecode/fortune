import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  // Initialize the AI client
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = req.body.prompt || "Write a story about a magic backpack.";

  try {
    const result = await model.generateContent(prompt);
    res.status(200).json({ text: result.response });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
}
