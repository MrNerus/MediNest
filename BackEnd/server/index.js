const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI with API Key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // NEVER hardcode keys in source code
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  // Validate input
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: "Invalid messages format" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content;
    res.json({ message: reply });
  } catch (err) {
    console.error("OpenAI Error:", JSON.stringify(err, null, 2));

    res.status(500).json({
      message: "An error occurred while processing your request",
      error: err?.message || "Unknown error",
    });
  }
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
