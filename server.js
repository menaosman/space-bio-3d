// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ========== ROUTE: Summarization ==========
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, title, link } = req.body;

    if (!text && !title) {
      console.log("⚠️ No text or title provided in request body:", req.body);
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = text
      ? text
      : `Summarize this space biology paper titled "${title}". Paper link: ${link}`;

    console.log("➡️ Sending to OpenRouter with prompt:", prompt.slice(0, 150), "...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpaceBio Dashboard Summarizer"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful scientific summarizer for space biology papers." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("📩 OpenRouter raw response:", data);

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${JSON.stringify(data)}`);
    }

    const summary = data?.choices?.[0]?.message?.content?.trim() || "No summary generated.";
    res.json({ summary });
  } catch (err) {
    console.error("❌ Summarization failed:", err.message);
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
