import express from "express";
import axios from "axios";

const router = express.Router();

const GEMINI_URL =
"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";



const geminiRequest = async (text) => {

  const res = await axios.post(
    `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              text
            }
          ]
        }
      ]
    }
  );

  return res.data.candidates[0].content.parts[0].text;
};



router.post("/", async (req, res) => {

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

Answer professionally and briefly.

User question: ${message}
`;


    const reply = await geminiRequest(prompt);


    res.json({
      success: true,
      reply
    });

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Chatbot failed"
    });

  }

});

export default router;
