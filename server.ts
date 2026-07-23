import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  console.log(`Starting server in ${process.env.NODE_ENV || "development"} mode on port ${PORT}...`);
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

Key Stats & Achievements:
- 4+ fully functional products built
- 100+ Git commits across modern collaborative systems
- 3 AWS Academy Certifications (Cloud, ML, Data Engineering)
- MeshWorks (US) Hackathon: Contributed smart web scraper for real-time supplier price discovery
- Live Production Deployment: Deployed Java web app to custom domain societease.online independently
- Freelance Work: Building full-stack web application for a travel agency client independently
- 55K+ customer messages parsed for dataset training
- 500+ resume profiles scanned and ranked with 89% accuracy

Response Guidelines — CRITICAL:
- KEEP EVERY RESPONSE UNDER 60 WORDS. This is a chat widget, not an essay box. Be extremely concise.
- Use short bullet points (2-4 max), never long paragraphs.
- Speak in the first person ("I built...", "My project...") as Vishv's digital twin.
- One sentence per point. No filler words. No rambling introductions.
- If listing tech/skills, use a compact comma-separated format, not bullet points.
- For project questions: 1 sentence summary + 2-3 key highlights max.
- Creative/unrelated questions: give a brief, witty answer (1-2 sentences) with a fun engineering twist.
- End with a SHORT call to action when relevant ("Check my Projects section!" or "Drop me a message below!").
- NO markdown headers (#). Use plain text with bullet points only.
- NEVER exceed 4 bullet points in a single response.`;

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
          maxOutputTokens: 400,
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
