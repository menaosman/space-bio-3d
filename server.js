import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  try {
    const { text, title, link } = req.body;

    // Validate input
    if (!text && !title) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = text
      ? text
      : `Summarize this research paper titled "${title}". The link is: ${link}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful scientific research summarizer." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenRouter raw response:", data);
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    const summary = data?.choices?.[0]?.message?.content?.trim() || "No summary generated.";
    res.json({ summary });
  } catch (err) {
    console.error("❌ Summarization failed:", err);
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
