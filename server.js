import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b",
        messages: [
          { role: "system", content: "Summarize scientific abstracts concisely." },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();
    res.json({ summary: data.choices?.[0]?.message?.content || "No summary" });
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Running on port 5000"));
