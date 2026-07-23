import { Project, Skill, TimelineEvent, Certification, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Vishv Patel",
  taglines: [
    "Full Stack Developer",
    "Software Developer",
    "AI & ML Engineer"
  ],
  bio: "Computer Science Engineering student with a minor in Mechatronics, passionate about building end-to-end software systems that solve real problems. From engineering robust server backends and training custom NLP models to crafting polished mobile interfaces in Flutter, I bridge technologies together to deliver clean, optimized, and production-ready applications.",
  location: "Vadodara, Gujarat, India",
  email: "vishvpatel7005@gmail.com",
  github: "https://github.com/vishv-2005",
  linkedin: "https://linkedin.com/in/vishv-patel-",
  resumeUrl: "/resume.pdf",
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
  // Programming Languages
  { name: "C", category: "Programming Languages", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Terminal" },
  { name: "Python", category: "Programming Languages", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Code" },
  { name: "Java", category: "Programming Languages", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Binary" },
  { name: "HTML", category: "Programming Languages", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Code" },
  { name: "CSS", category: "Programming Languages", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Paintbrush" },
  { name: "JavaScript", category: "Programming Languages", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "FileJson" },

  // Frameworks & Libraries
  { name: "Flutter", category: "Frameworks & Libraries", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Smartphone" },
  { name: "React", category: "Frameworks & Libraries", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Layout" },
  { name: "Node.js", category: "Frameworks & Libraries", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Server" },
  { name: "Express.js", category: "Frameworks & Libraries", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Cpu" },
  { name: "Flask", category: "Frameworks & Libraries", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Flame" },
  { name: "EasyOCR", category: "Frameworks & Libraries", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Eye" },
  { name: "PyMuPDF", category: "Frameworks & Libraries", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "FileText" },

  // Databases & Tools
  { name: "MongoDB", category: "Databases & Tools", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Database" },
  { name: "MySQL", category: "Databases & Tools", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Columns4" },
  { name: "Git", category: "Databases & Tools", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "GitBranch" },
  { name: "GitHub", category: "Databases & Tools", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "GitBranch" },
  { name: "VS Code", category: "Databases & Tools", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Code" },
  { name: "Android Studio", category: "Databases & Tools", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Smartphone" },
  { name: "Jira", category: "Databases & Tools", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Layout" },
  { name: "Docker", category: "Databases & Tools", level: 3, experience: "", projectsUsedIn: [], description: "", iconName: "Server" },

  // APIs & Platforms
  { name: "WhatsApp Business Cloud API", category: "APIs & Platforms", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Globe" },
  { name: "MongoDB Atlas", category: "APIs & Platforms", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Globe" },
  { name: "Gemini API", category: "APIs & Platforms", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Sparkles" },
  { name: "RazorPay API", category: "APIs & Platforms", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Globe" },
  { name: "AWS Cloud", category: "APIs & Platforms", level: 4, experience: "", projectsUsedIn: [], description: "", iconName: "Cloud" },

  // Soft Skills
  { name: "Problem-solving", category: "Soft Skills", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Sparkles" },
  { name: "Logical thinking", category: "Soft Skills", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Sparkles" },
  { name: "Teamwork", category: "Soft Skills", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Sparkles" },
  { name: "Communication", category: "Soft Skills", level: 5, experience: "", projectsUsedIn: [], description: "", iconName: "Sparkles" }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "aws-ml",
    title: "AWS Academy Machine Learning Foundations",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/84fe7097-df0c-4fa9-b883-8a301a3577ee/AWS-Academy-Cloud-Foundations.png", // Credly placeholder
    credentialUrl: "https://1drv.ms/b/c/283f8787b1c38288/IQAkkpd1xC0hT6VIKMqZU2d8AaPcWyOsS2Dqj6sxKPuAh7A?e=moxwZR",
    skillsCovered: ["Computer Vision", "Natural Language Processing", "Amazon SageMaker", "Supervised Learning", "Linear Regression"]
  },
  {
    id: "aws-data",
    title: "AWS Academy Data Engineering",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/3d74bebf-d50d-45df-911e-0d85ee1fa9f1/AWS_Academy_Graduate_-_AWS_Academy_Cloud_Architecting.png", // Credly placeholder
    credentialUrl: "https://1drv.ms/b/c/283f8787b1c38288/IQARo78hK3oUQrpTLSwZfahVAf-Mcv6QPEkhegRRi4aC8LM?e=YxmqMp",
    skillsCovered: ["AWS Glue", "Amazon Athena", "Amazon EMR", "Data Lake Architecture", "ETL Pipelines", "S3 Storage Optimization"]
  },
  {
    id: "aws-foundations",
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    year: "2026",
    badgeUrl: "https://images.credly.com/images/84fe7097-df0c-4fa9-b883-8a301a3577ee/AWS-Academy-Cloud-Foundations.png",
    credentialUrl: "https://1drv.ms/b/c/283f8787b1c38288/IQA1DepsXxa2Tpva4GZ6tmVaARxn5fEATURtKAhdWUW_ne4?e=jg7cHe",
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
      { label: "Overhead Reduction", value: "~60%" },
      { label: "Platforms", value: "Web + Mobile" }
    ],
    accentColor: "emerald",
    highlights: [
      "Custom classification ML pipeline sorting message intents with minimal CPU latency.",
      "Gemini model generates personalized marketing campaigns and promotional graphics.",
      "Real-time, offline-cached MongoDB sync providing ultra-reliable conversation dashboards.",
      "Slick Flutter client for mobile notifications and live client management on the move."
    ],
    githubUrl: "https://github.com/vishv-2005/Walleto"
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
      { label: "NLP Accuracy", value: "89%" },
      { label: "Parsing Engine", value: "JobBERT + TF-IDF" }
    ],
    accentColor: "cyan",
    highlights: [
      "Hybrid JobBERT and TF-IDF pipeline to measure semantics and keyword density.",
      "Robust asynchronous document parsers handling heavy scanning tasks without blocking the server thread.",
      "Recruiter analytics displaying aggregate skill clouds, experience distributions, and candidate scores.",
      "Persistent cloud database storage in MongoDB Atlas ensuring fast queries and live sync."
    ],
    githubUrl: "https://github.com/vishv-2005/Hireflow"
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
    githubUrl: "https://github.com/vishv-2005/Chess"
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
    demoUrl: "https://societease.online",
    githubUrl: "https://github.com/vishv-2005/SocietEaseWeb"
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "hackathon",
    title: "MeshWorks Hackathon Contributor",
    category: "Hackathon",
    badge: "US Sponsor",
    description: "Participated in a MeshWorks (US-based) company-sponsored hackathon, contributing to a smart web scraping solution for real-time supplier price discovery.",
    icon: "Trophy"
  },
  {
    id: "deployment",
    title: "End-to-End Production Deployment",
    category: "Cloud & DevOps",
    badge: "societease.online",
    description: "Independently deployed a full-stack Java web application to production with custom domain setup and cloud infrastructure management.",
    link: "https://societease.online",
    linkText: "Visit Live Site",
    icon: "Globe"
  },
  {
    id: "freelance",
    title: "Freelance Travel Agency Platform",
    category: "Freelance",
    badge: "Active Client",
    description: "Undertaking a full-cycle freelance web development project for a travel agency client — independently managing requirements, UI design, and development.",
    icon: "Briefcase"
  },
  {
    id: "aws-certs",
    title: "3× AWS Academy Certified",
    category: "Certifications",
    badge: "AWS Cloud",
    description: "Earned 3 rigorous AWS Academy certifications spanning Cloud Foundations, Machine Learning Foundations, and Data Engineering workflows.",
    icon: "Award"
  },
  {
    id: "apps-built",
    title: "4+ Full-Stack & Mobile Apps",
    category: "Engineering",
    badge: "Web & Mobile",
    description: "Engineered 4+ production-ready web and cross-platform mobile applications utilizing React, Flutter, Node.js, Python NLP, and Java.",
    icon: "Layout"
  },
  {
    id: "meta-gemini",
    title: "Meta Cloud & Gemini API Integration",
    category: "AI & APIs",
    badge: "Production AI",
    description: "Built enterprise communication systems directly interfacing Meta’s WhatsApp Business Cloud API with Gemini Generative AI models.",
    icon: "Sparkles"
  }
];
