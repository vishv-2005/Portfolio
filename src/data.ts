import { Project, Skill, TimelineEvent, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Vishv Patel",
  taglines: [
    "Software Engineer",
    "Full Stack Developer",
    "Flutter Developer",
    "AI & Machine Learning Enthusiast",
    "Cloud Computing Learner",
    "Big Data Student"
  ],
  bio: "I am a Computer Science Engineering student minor in Mechatronics, deeply passionate about building end-to-end software systems that solve tangible problems. From engineering robust server backends and training custom NLP models, to compiling slick mobile interfaces in Flutter, I love bridging technologies together to deliver clean, highly optimized, and production-ready applications.",
  location: "Vadodara, Gujarat, India",
  email: "vishvpatel7005@gmail.com",
  github: "https://github.com/vishv-2005",
  linkedin: "https://linkedin.com/in/vishv-patel-",
  resumeUrl: "#", // Placeholder or dynamic view
};

export const PORTFOLIO_STATS = [
  { value: 4, label: "Applications Built", prefix: "", suffix: "+" },
  { value: 100, label: "Collaborative Git Commits", prefix: "", suffix: "+" },
  { value: 3, label: "AWS Academy Certifications", prefix: "", suffix: "" },
  { value: 55000, label: "Messages Used to Train AI", prefix: "", suffix: "+" },
  { value: 500, label: "Resumes Evaluated & Ranked", prefix: "", suffix: "+" },
  { value: 89, label: "AI Parsing Model Accuracy", prefix: "", suffix: "%" },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2023",
    title: "B.Tech in Computer Science & Engineering",
    institution: "Navrachana University, Vadodara",
    description: "Began academic journey in computer engineering with a minor in Mechatronics, fusing heavy software architectures with mechanical principles and automation controls.",
    skills: ["C", "Java", "Mechatronics Fundamentals", "Logical Thinking"],
    type: "education"
  },
  {
    year: "2024",
    title: "Pivoted to Full Stack & Mobile Engineering",
    institution: "Academic & Personal Projects",
    description: "Mastered frontend design, backend servers, and database schemas. Started working on robust cross-platform applications.",
    skills: ["React", "Node.js", "Express.js", "MySQL", "JavaScript", "HTML/CSS"],
    type: "milestone"
  },
  {
    year: "2025",
    title: "SocietEase Society Management",
    institution: "Project Milestone",
    description: "Built and deployed a full-stack Java society portal serving multiple user tiers to resolve neighborhood issues, payment workflows, and committee bulletins.",
    skills: ["Java", "JSP", "Servlets", "MySQL", "GlassFish Server"],
    type: "project"
  },
  {
    year: "2025",
    title: "Flutter Chess Mobile Application",
    institution: "Mobile Engineering Research",
    description: "Created a gorgeous Dart-based chess system with complete manual move logic validation, local caching, and multi-tier Stockfish AI integration.",
    skills: ["Flutter", "Dart", "Stockfish Engine", "SVG Rendering", "Local Caching"],
    type: "project"
  },
  {
    year: "2026",
    title: "AWS Academy Certifications",
    institution: "Amazon Web Services",
    description: "Earned 3 rigorous cloud engineering certifications covering Cloud Foundations, Machine Learning Foundations, and Data Engineering workflows to host production-ready architectures.",
    skills: ["AWS Cloud", "Data Pipelines", "SageMaker", "EC2/S3/RDS", "EMR"],
    type: "milestone"
  },
  {
    year: "2026",
    title: "HireFlow: AI Resume Ranker",
    institution: "NLP Product Launch",
    description: "Developed and optimized an enterprise candidate scanning dashboard evaluating 500+ documents with 89% accuracy using JobBERT NLP and TF-IDF scoring pipelines.",
    skills: ["Python", "Flask", "JobBERT Embeddings", "TF-IDF", "EasyOCR", "PyMuPDF", "MongoDB Atlas"],
    type: "project"
  },
  {
    year: "2026",
    title: "AI WhatsApp CRM (Flagship Product)",
    institution: "Full-Stack Enterprise CRM",
    description: "Crafted a multi-faceted system serving micro-enterprises. Automated message classification on a 55,000+ text dataset, deploying Gemini API tools for instant copy/image generations on Meta's WhatsApp API.",
    skills: ["Gemini API", "WhatsApp Cloud API", "Express.js", "MongoDB Sync", "Python ML", "Flutter", "React"],
    type: "project"
  }
];

export const SKILLS_DATA: Skill[] = [
  // Programming
  {
    name: "Python",
    category: "Programming",
    level: 5,
    experience: "3 Years",
    projectsUsedIn: ["WhatsApp CRM Classifier", "HireFlow Resume Ranker", "Data Pipelines"],
    description: "Core language used for training machine learning networks, text parsing, OCR processing, and API web scraping.",
    iconName: "Code"
  },
  {
    name: "Java",
    category: "Programming",
    level: 4,
    experience: "3 Years",
    projectsUsedIn: ["SocietEase", "Data Structures Curriculums"],
    description: "Heavy Object-Oriented patterns, serving backend server environments (Servlets/JSP) and low-level computational algorithms.",
    iconName: "Binary"
  },
  {
    name: "JavaScript",
    category: "Programming",
    level: 5,
    experience: "3 Years",
    projectsUsedIn: ["WhatsApp CRM Dashboard", "HireFlow Frontend", "Portfolio Server"],
    description: "Core of modern interactive web development, writing responsive nodes, Express server runtimes, and complex client structures.",
    iconName: "FileJson"
  },
  {
    name: "C",
    category: "Programming",
    level: 4,
    experience: "4 Years",
    projectsUsedIn: ["Mechatronics Firmware", "Algorithm Optimization"],
    description: "Enforces memory-safe low-level logic, controller interfaces for hardware nodes, and optimal CPU execution paradigms.",
    iconName: "Terminal"
  },

  // Frontend
  {
    name: "React",
    category: "Frontend",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["WhatsApp CRM Web", "HireFlow Dashboard", "Interactive Portfolios"],
    description: "Component modularity, optimized hook lifecycle triggers, and responsive glassmorphic interfaces layered with state libraries.",
    iconName: "Layout"
  },
  {
    name: "Flutter",
    category: "Frontend",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["Flutter Chess App", "WhatsApp CRM Mobile Client"],
    description: "Multi-platform client compiling, custom rendering engines, state tracking, and native Android integrations.",
    iconName: "Smartphone"
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 5,
    experience: "3 Years",
    projectsUsedIn: ["HireFlow UI", "AI CRM Web App", "Portfolio Theme"],
    description: "Utility-first design flow, fluid bento grids, layout adjustments, and custom animations for responsive high-end designs.",
    iconName: "Paintbrush"
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["WhatsApp CRM Server", "Interactive APIs"],
    description: "Scalable event-driven server execution, background event streaming, and custom secure route handling.",
    iconName: "Server"
  },
  {
    name: "Express.js",
    category: "Backend",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["WhatsApp CRM Server", "Custom Portfolios"],
    description: "Minimalist, robust routing frame, middleware integrations, error logging, and high-performance endpoints.",
    iconName: "Cpu"
  },
  {
    name: "Flask",
    category: "Backend",
    level: 4,
    experience: "2 Years",
    projectsUsedIn: ["HireFlow Resume Parser"],
    description: "Lightweight Python web gateway to host machine learning inference pipes, text embeddings, and text parsing endpoints.",
    iconName: "Flame"
  },

  // Databases
  {
    name: "MongoDB",
    category: "Databases",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["WhatsApp CRM Sync", "HireFlow Candidates"],
    description: "Highly scaleable document-based datastore, handling unstructured chat logs and nested candidate profile maps.",
    iconName: "Database"
  },
  {
    name: "MySQL",
    category: "Databases",
    level: 4,
    experience: "3 Years",
    projectsUsedIn: ["SocietEase Resident Logs"],
    description: "Strict relational structures, structured query optimization, custom transactional triggers, and schema migrations.",
    iconName: "Columns4"
  },

  // Cloud & platforms
  {
    name: "AWS Cloud",
    category: "Cloud",
    level: 4,
    experience: "2 Years",
    projectsUsedIn: ["SageMaker ML Flows", "AWS Academy Tasks", "S3 & EC2 Deployments"],
    description: "Cloud-native designs utilizing virtual servers (EC2), secure database storage (RDS), S3 bucketing, IAM structures, and scalable ML workflows.",
    iconName: "Cloud"
  },
  {
    name: "MongoDB Atlas",
    category: "Cloud",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["HireFlow Persistent Storage", "CRM Databases"],
    description: "Cloud database-as-a-service, handling global distribution, backup pipelines, and auto-scaling schemas.",
    iconName: "Globe"
  },

  // AI & ML APIs
  {
    name: "Gemini API",
    category: "AI",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["AI WhatsApp CRM Copy Generator", "Portfolio AI Twin"],
    description: "Generates high-performance context-aware text, localized marketing scripts, image prompt generations, and structured JSON structures.",
    iconName: "Sparkles"
  },
  {
    name: "EasyOCR",
    category: "AI",
    level: 4,
    experience: "1 Year",
    projectsUsedIn: ["HireFlow Scanned Resume Parser"],
    description: "Optical Character Recognition parsing of text blocks embedded inside scanned files, images, and visual application forms.",
    iconName: "Eye"
  },
  {
    name: "PyMuPDF",
    category: "AI",
    level: 5,
    experience: "2 Years",
    projectsUsedIn: ["HireFlow PDF Parsing Suite"],
    description: "Extremely rapid PDF binary parsing, structure mapping, metadata extractions, and inline image splits.",
    iconName: "FileText"
  },

  // Tools
  {
    name: "Git & GitHub",
    category: "Tools",
    level: 5,
    experience: "4 Years",
    projectsUsedIn: ["All Collaborative Products"],
    description: "Distributed code versioning, commit hygiene, team branches, pull requests, automated webhooks, and actions.",
    iconName: "GitBranch"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "aws-ml",
    title: "AWS Academy Machine Learning Foundations",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/84fe7097-df0c-4fa9-b883-8a301a3577ee/AWS-Academy-Cloud-Foundations.png", // Credly placeholder
    credentialUrl: "https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-machine-learning-foundations",
    skillsCovered: ["Computer Vision", "Natural Language Processing", "Amazon SageMaker", "Supervised Learning", "Linear Regression"]
  },
  {
    id: "aws-data",
    title: "AWS Academy Data Engineering",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/3d74bebf-d50d-45df-911e-0d85ee1fa9f1/AWS_Academy_Graduate_-_AWS_Academy_Cloud_Architecting.png", // Credly placeholder
    credentialUrl: "https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-data-engineering",
    skillsCovered: ["AWS Glue", "Amazon Athena", "Amazon EMR", "Data Lake Architecture", "ETL Pipelines", "S3 Storage Optimization"]
  },
  {
    id: "aws-foundations",
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/84fe7097-df0c-4fa9-b883-8a301a3577ee/AWS-Academy-Cloud-Foundations.png",
    credentialUrl: "https://www.credly.com/org/amazon-web-services/badge/aws-academy-graduate-aws-academy-cloud-foundations",
    skillsCovered: ["Cloud Economics", "IAM Policies", "Amazon EC2", "VPC Networking Security", "AWS Billing & Pricing Systems"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "whatsapp-crm",
    title: "AI-Powered WhatsApp CRM",
    subtitle: "Enterprise Conversational CRM Platform",
    description: "An end-to-end intelligent customer relations console driven by a massive custom Python classifier and Meta's official WhatsApp Business Cloud API.",
    longDescription: "Automates complex client triage for small-to-medium businesses. Integrating Meta's Cloud API, the system uses a custom Python classification model trained on a curated dataset of 55,000+ messages. If a query requires human intervention, it syncs with a web interface. Otherwise, a server-side Gemini system answers queries, generates product graphics, and drafts marketing copy on the fly.",
    tags: ["Gemini API", "WhatsApp Cloud API", "Python ML", "Node.js", "React", "MongoDB Sync", "Flutter"],
    metrics: [
      { label: "Training Dataset", value: "55,000+ messages" },
      { label: "Git Commits", value: "39+ commits" },
      { label: "Manual Overhead Reduction", value: "~60%" }
    ],
    accentColor: "emerald",
    highlights: [
      "Custom classification ML pipeline sorting message intents with minimal CPU latency.",
      "Gemini model generates personalized marketing campaigns and promotional graphics.",
      "Real-time, offline-cached MongoDB sync providing ultra-reliable conversation dashboards.",
      "Slick Flutter client for mobile notifications and live client management on the move."
    ],
    githubUrl: "https://github.com/vishv-2005"
  },
  {
    id: "hireflow",
    title: "HireFlow: AI Resume Screener",
    subtitle: "Smart Candidate Screening & NLP Analytics Suite",
    description: "Futuristic recruiting dashboard that scores, ranks, and matches resume pools against job profiles using natural language embeddings and keywords.",
    longDescription: "Saves recruiters countless screening hours. The platform processes PDF, DOCX, and scanned documents, using custom parsers (PyMuPDF) and optical readers (EasyOCR). It ranks matches by processing text through a custom JobBERT and TF-IDF compound rating model, presenting a sorted dashboard complete with candidate summaries, matched keywords, and graphical metrics.",
    tags: ["JobBERT Embeddings", "TF-IDF", "Python Flask", "EasyOCR", "React", "MongoDB Atlas", "PyMuPDF"],
    metrics: [
      { label: "Profiles Screened", value: "500+" },
      { label: "Testing Accuracy", value: "89%" },
      { label: "Development Commits", value: "60+ commits" }
    ],
    accentColor: "cyan",
    highlights: [
      "Hybrid JobBERT and TF-IDF pipeline to measure semantics and keyword density.",
      "Robust asynchronous document parsers handling heavy scanning tasks without blocking the server thread.",
      "Recruiter analytics displaying aggregate skill clouds, experience distributions, and candidate scores.",
      "Persistent cloud database storage in MongoDB Atlas ensuring fast queries and live sync."
    ],
    githubUrl: "https://github.com/vishv-2005"
  },
  {
    id: "flutter-chess",
    title: "Flutter Chess for Android",
    subtitle: "Cross-Platform Chess Game with Stockfish AI",
    description: "Polished chess application combining custom-engineered game logic with the world-famous Stockfish engine for progressive local matches.",
    longDescription: "A beautifully responsive Android mobile client built from scratch using Flutter and Dart. Engineered all chess logic including move maps, checkmate evaluations, en-passant tracking, castling states, and pawn promotions. Integrates Stockfish using specialized thread pools to enable challenging Player-vs-Computer modes.",
    tags: ["Flutter", "Dart", "Stockfish Chess Engine", "SVG Vectors", "Local Storage State"],
    metrics: [
      { label: "Platform target", value: "Android (Cross-platform Ready)" },
      { label: "AI Levels", value: "Multiple (Stockfish)" },
      { label: "Graphics", value: "Scalable Vector SVGs" }
    ],
    accentColor: "indigo",
    highlights: [
      "Engineered clean state tracking using custom board coordinate validation algorithms.",
      "Smooth visual chess animations with custom SVG vector icons.",
      "Stockfish AI thinking animations and glow indicators mapping valid legal moves in real-time.",
      "Robust state caching allowing matches to be saved and resumed dynamically."
    ],
    githubUrl: "https://github.com/vishv-2005"
  },
  {
    id: "societease",
    title: "SocietEase Management",
    subtitle: "Full-Stack Enterprise Residential Portal",
    description: "Classic Java-enterprise application designed to centralize complaints, billing cycles, security protocols, and announcements.",
    longDescription: "Fulfills the administrative needs of housing societies. Built with Java Servlets, JSPs, and MySQL, running on a GlassFish web container. Separate user roles (Resident, Committee, Admin) ensure logical isolation. Features automated maintenance due logging, dynamic discussion boards, and structured complaint resolutions.",
    tags: ["Java", "JSP", "Servlets", "MySQL Database", "GlassFish Web Server"],
    metrics: [
      { label: "User Roles", value: "Resident, Committee, Admin" },
      { label: "Database Engine", value: "MySQL" },
      { label: "Web Container", value: "GlassFish" }
    ],
    accentColor: "amber",
    highlights: [
      "Role-based view filters isolating administrative commands from resident records.",
      "Interactive complaining forums allowing residents to upload problems and track resolutions.",
      "Automated monthly maintenance logs and receipts linked to an integrated database.",
      "Centralized notice boards and meeting schedule logs to ensure coordination."
    ],
    githubUrl: "https://github.com/vishv-2005"
  }
];
