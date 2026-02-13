import express from "express";
import axios from "axios";
import https from "https";

const router = express.Router();


/* =========================
   KEEP-ALIVE AGENT (CRITICAL)
========================= */

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 10
});


/* =========================
   GEMINI CONFIG
========================= */

const GEMINI_URL =
"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";


/* =========================
   GEMINI REQUEST FUNCTION
========================= */

const geminiRequest = async (text) => {

  const response = await axios.post(

    `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,

    {
      contents: [
        {
          role: "user",
          parts: [{ text }]
        }
      ],

      /* SPEED OPTIMIZATION */
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 200,
        topP: 0.8,
        topK: 40
      }

    },

    {
      httpsAgent,        // reuse connection
      timeout: 10000     // prevent long waiting
    }

  );

  return response.data.candidates[0].content.parts[0].text;

};


/* =========================
   CHAT ROUTE
========================= */

router.post("/", async (req, res) => {

  const start = Date.now();

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({
        success: false,
        message: "Message required"
      });

    }


    const prompt = `
You are the official assistant of Prime Origin Exports.

Company exports:
- Ashwagandha Powder
- Shilajit
- Herbal Products
- Natural Supplements

Rules:
- Reply in 1–3 sentences
- Be professional
- Be concise

User question: ${message}
`;


    const reply = await geminiRequest(prompt);


    console.log("Gemini response time:", Date.now() - start, "ms");


    res.json({
      success: true,
      reply
    });

  }

  catch (error) {

    console.error("Gemini error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Chatbot failed"
    });

  }

});


export default router;
