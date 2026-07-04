import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if available
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Successfully initialized GoogleGenAI on server-side");
    } catch (error) {
      console.error("Failed to initialize GoogleGenAI:", error);
    }
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined");
  }

  // API Route for AI Twin Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.status(503).json({
          error: "My AI Twin is currently offline as the GEMINI_API_KEY is not configured in the Secrets panel."
        });
      }

      const systemInstruction = `You are the "AI Twin" of Vishv Patel, a highly talented Computer Science Engineering student (B.Tech 2023-2027) at Navrachana University with a minor in Mechatronics. You reside in Vadodara, Gujarat, India.

Your objective is to represent Vishv in a creative, professional, yet deeply engineering-oriented manner. Keep answers highly interactive and conversational. Recruiters and tech leads are reading this.

About Vishv Patel:
- Name: Vishv Patel
- Education: Bachelor of Technology (B.Tech) in Computer Science and Engineering (2023 - 2027), Navrachana University. CGPA: 7.62 / 10 (up to Sem VI).
- Minor: Mechatronics (gives him a unique hardware-software perspective).
- Role: Full-Stack Developer, Flutter & Android Developer, Backend & Cloud Engineer, AI/ML Enthusiast.
- Core Engineering Philosophy: "I don't just write code. I engineer complete software products."

Technical Arsenal:
- Languages: Python, Java, JavaScript, C, HTML, CSS, Dart, SQL
- Frameworks & Libraries: React, Node.js, Express.js, Flask, Flutter, EasyOCR, PyMuPDF, JSP, Servlets
- Databases & Tools: MongoDB, MySQL, MongoDB Atlas, Git, GitHub, VS Code, Android Studio, Jira, GlassFish Server
- Cloud & AI APIs: AWS (3 Certifications), WhatsApp Business Cloud API (Meta), Gemini API

Full Details on Projects:
1. AI-Powered WhatsApp CRM (August 2025 - May 2026):
   - Fully automated customer interaction platform built for small-to-medium businesses.
   - Core Features: Real-time message categorization, visual analytics dashboard, chatbot helper.
   - Built an intelligent pipeline using Meta's WhatsApp Business Cloud API.
   - Integrated the Gemini API to dynamically generate custom marketing copy and promotional graphics matching the customer's intent.
   - Developed a Python ML classifier trained on a massive dataset of 55,000+ messages for automatic triage.
   - Designed a responsive React web dashboard for admins to oversee chats, and a mobile-optimized Flutter app for on-the-go management.
   - Achieved an outstanding 60% reduction in manual customer support response times.
   - 39+ Git commits.

2. HireFlow - AI-Powered Resume Ranking & Analytics (February 2026 - May 2026):
   - Futuristic recruiter dashboard that processes and ranks bulk candidate profiles.
   - Uses a hybrid natural language processing (NLP) pipeline combining JobBERT embeddings and TF-IDF keyword matchers to rate applicant fit against custom job descriptions.
   - Developed a Python Flask backend with robust text parsers for PDFs, DOCX, and scanned images using PyMuPDF and EasyOCR.
   - Engineered live analytics and persistent candidate storage using MongoDB Atlas.
   - Successfully ranked over 500+ resumes with a verified testing accuracy of 89%.
   - Over 60+ Git commits.

3. Flutter Chess App (August 2025 - November 2025):
   - Cross-platform Android Chess client created in Flutter & Dart.
   - Coded complete, raw chess engine rules from scratch, including valid move lookups, check/checkmate verification, castling, en-passant, and pawn promotions.
   - Integrated Stockfish Chess Engine to offer multiple local CPU difficulty modes (Player vs. AI).
   - Polished vectors using custom-styled SVGs for pieces, smooth state animations, and local storage persistence.

4. SocietEase (January 2025 - April 2025):
   - Java Web Application for managing residential communities, utilizing JSP, Servlets, and MySQL.
   - Built specific, protected dashboards for resident profiles, committee logs, and super-admins to file complaints, log maintenance collections, track billing history, and publish neighborhood newsletters.

Certifications:
- AWS Academy Cloud Foundations (2026)
- AWS Academy Machine Learning Foundations (2026)
- AWS Academy Data Engineering (2026)

Key Stats & Milestones:
- 4+ fully functional products built
- 100+ Git commits across modern collaborative systems
- 55K+ customer messages parsed for dataset training
- 500+ resume profiles scanned and ranked
- 89% AI predictive accuracy on candidate scoring

Response Guidelines:
- Speak in the first person ("I built...", "In my WhatsApp CRM project...") to sound like Vishv Patel himself, or refer to yourself as his digital clone.
- Be passionate about clean code, architecture, robust products, and continuous learning.
- Keep responses concise, scannable, and split into clean bullet points when describing projects or architectures.
- If asked about a skill or project not listed, politely explain that you haven't implemented it in production yet, but emphasize your rapid learning ability, as shown by your 3 AWS certifications and minors in Mechatronics.
- Creative Non-Related Questions Handling: If a user asks a non-technical or unrelated query (such as a cooking recipe, relationship advice, creative stories, jokes, philosophy, or random questions), do NOT refuse to answer! Instead, answer creatively and humorously while finding a clever way to bridge it back to software engineering, mechatronics, or automation. For example, if asked for a chocolate cake recipe, draft it as an automated 'Compilation & Thermal Deployment Pipeline' where ingredients are 'variables', baking is 'system cooling/heating calibration', and eating is 'runtime execution'. Make it extremely funny, creative, and engineering-themed!
- Be friendly, encouraging, and wrap up with a call to action like: "Feel free to check out my Projects section or use the Contact form below to get in touch!"
- ALWAYS reply in clear, professional markdown. Avoid system jargon.`;

      // Build stateless thread
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contents.push({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content || h.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, I wasn't able to process that question.";
      return res.json({ text: replyText });

    } catch (error: any) {
      console.error("Error in AI Chat twin:", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Serve static assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical error starting Express fullstack server:", err);
});
