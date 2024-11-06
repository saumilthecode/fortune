import fetch from "node-fetch";

export default async function handler(req, res) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch("https://api.gemini.com/v1/fortune", {
      headers: { Authorization: `Bearer ${GEMINI_API_KEY}` },
    });

    const data = await response.json();
    console.log("Response status:", response.status);  // Log response status
    console.log("Response data:", data);               // Log response data

    if (!response.ok) throw new Error("Failed to fetch fortune");

    res.status(200).json({ fortune: data.fortune, ascii_art: data.ascii_art });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching fortune" });
  }
}
