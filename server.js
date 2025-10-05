// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173'], // add your frontend port
  credentials: true
}));

app.use(express.json());
const PORT = 5000;

// === Summarization API ===
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, title, link } = req.body;
    const prompt = text || `Summarize this NASA bioscience paper titled "${title}". Link: ${link}`;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful scientific summarizer for space biology research." },
          { role: "user", content: prompt },
        ],
      }),
    });
    const data = await response.json();
    const summary = data?.choices?.[0]?.message?.content?.trim() || "No summary generated.";
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === What-If Chat API ===
// === What-If Chat API (with Smart CSV Search) ===
app.post("/api/whatif", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    console.log("📥 Received question:", question);

    // Load NASA CSV data
    const csvPath = path.join(process.cwd(), "public", "data", "nasa_papers_meta_cleaned.csv");
    let csv = "";
    if (fs.existsSync(csvPath)) {
      csv = fs.readFileSync(csvPath, "utf8");
    }

    // ✅ Parse CSV and search for relevant papers
    const lines = csv.split("\n");
    const headers = lines[0];
    const rows = lines.slice(1);

    // Extract keywords from the question
    const questionLower = question.toLowerCase();
    const keywords = [
      'microgravity', 'gravity', 'space', 'radiation', 'astronaut',
      'bone', 'muscle', 'cell', 'dna', 'gene', 'protein', 'immune',
      'mars', 'moon', 'iss', 'orbit', 'cosmic', 'solar'
    ];

    // Find relevant papers (simple keyword matching)
    const relevantPapers = rows
      .filter(row => {
        const rowLower = row.toLowerCase();
        // Check if question keywords appear in the paper
        return keywords.some(kw => 
          questionLower.includes(kw) && rowLower.includes(kw)
        ) || rowLower.includes(questionLower.split(' ')[0]);
      })
      .slice(0, 3); // ✅ Only take top 3 relevant papers

    // Format the relevant papers nicely
    const paperContext = relevantPapers.length > 0 
      ? `\n\nRelevant papers from NASA database:\n${headers}\n${relevantPapers.join("\n")}`
      : "\n\n(No directly matching papers found in database, but you can still provide expert analysis)";

    const prompt = `You are a space biology expert with access to NASA research papers.

${paperContext}

Question: "${question}"

Instructions:
1. Provide a scientifically reasoned answer (150-200 words)
2. If relevant papers were provided above, cite at least one by its title or PMC_ID
3. Format as:

**Answer:** [your explanation]

**References:** [list paper titles/IDs if available, or say "Based on general space biology principles"]`;

    console.log(`🔍 Found ${relevantPapers.length} relevant papers`);
    console.log("🚀 Sending request to OpenRouter...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "SpaceBio What-If Chat",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a space biology expert. Cite papers when available." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    
    console.log("📦 Response status:", response.status);

    if (!response.ok) {
      console.error("❌ API Error:", data.error);
      throw new Error(data.error?.message || "API request failed");
    }

    const answer = data?.choices?.[0]?.message?.content?.trim() || "No answer generated.";
    
    console.log("✅ Answer generated with references");
    res.json({ answer });
    
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
