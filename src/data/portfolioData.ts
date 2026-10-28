export interface KPICard {
  value: string;
  label: string;
  source: string;
  tooltip: string;
}

export interface FrameworkStep {
  step: number;
  emoji: string;
  title: string;
  description: string;
}

export interface ExperienceRole {
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  businessContext?: string;
  bullets: string[];
  techStack: string[];
  impactCallout?: string;
}

export interface ProjectItem {
  icon: string;
  type: string;
  title: string;
  description: string;
  stack: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
  period: string;
  gradeBadge: string;
  highlights: string[];
}

export interface CertificationItem {
  org: string;
  name: string;
  status: 'Completed' | 'In Progress';
}

export interface ContactItem {
  icon: string;
  type: string;
  value: string;
  href: string;
}

export interface TestimonialItem {
  name: string;
  title: string;
  company: string;
  avatar: string;
  text: string;
  relationship: string;
  date: string;
}


export const kpiCards: KPICard[] = [
  {
    value: "€2.6M",
    label: "Annual Cost Savings",
    source: "Wired Mode · Operational & Data Analysis",
    tooltip: "Delivered by diagnosing where Sales, Quality, and Supply Chain workflows broke down, mapping decision points end-to-end, and implementing automation recommendations across all three departments."
  },
  {
    value: "35%",
    label: "Reduction in Inventory Stockouts",
    source: "Wired Mode · Supply Chain Forecasting",
    tooltip: "Achieved by evaluating the reliability of historical sales data patterns before trusting them as forecasting inputs — screening out noise signals to produce inputs the model could actually trust."
  },
  {
    value: "40%",
    label: "Faster Reporting Turnaround",
    source: "Wired Mode · Tableau & Python Dashboards",
    tooltip: "Tableau and Python dashboards made the reasoning behind key operational decisions transparent to senior stakeholders, giving leadership a clear basis for judging recommendation quality."
  },
  {
    value: "20%",
    label: "Reduction in Budget Overruns",
    source: "Wired Mode · Finance & Operations",
    tooltip: "Achieved by running structured sessions with Finance and Operations stakeholders to pressure-test resource allocation assumptions and translate findings into prioritised, decision-ready recommendations."
  },
  {
    value: "200+",
    label: "Man-Hours Reclaimed Per Quarter",
    source: "Wired Mode · Workflow Automation",
    tooltip: "Reclaimed through automation of manual processes across Sales, Quality, and Supply Chain decision workflows."
  },
  {
    value: "9+",
    label: "Analytics Projects Delivered",
    source: "UCD Smurfit MSc & Industry Capstones",
    tooltip: "Spanning AI governance, supply chain forecasting, sustainability DSS, geospatial analytics, network optimisation, and financial analysis."
  }
];

export const frameworkSteps: FrameworkStep[] = [
  {
    step: 1,
    emoji: "🎯",
    title: "Business Problem",
    description: "Frame the decision, not the data question"
  },
  {
    step: 2,
    emoji: "👥",
    title: "Stakeholders",
    description: "Map who decides and what they need to act"
  },
  {
    step: 3,
    emoji: "📥",
    title: "Data Collection",
    description: "Source data, assess reliability, surface gaps"
  },
  {
    step: 4,
    emoji: "🔬",
    title: "Analysis",
    description: "Descriptive → Diagnostic → Predictive → Prescriptive"
  },
  {
    step: 5,
    emoji: "📈",
    title: "Forecasting",
    description: "Model uncertainty, not just point estimates"
  },
  {
    step: 6,
    emoji: "💡",
    title: "Recommendation",
    description: "Decision-ready, prioritised, tradeoffs explicit"
  },
  {
    step: 7,
    emoji: "📊",
    title: "Business Impact",
    description: "Measure outcomes, close the feedback loop"
  }
];

export const experienceData: ExperienceRole[] = [
  {
    role: "Artificial Intelligence Intern",
    company: "Flyrank AI",
    location: "Dublin, Ireland",
    period: "August 2026 – Present",
    badge: "Current Role",
    businessContext: "Flyrank AI works with client websites and needed a better way to decide which pages to review first. The existing approach was a hand-written prioritisation rule. The task was to test whether machine learning could rank pages more accurately, and to make sure any model was validated properly before anyone relied on it.",
    bullets: [
      "Built and evaluated an ML pipeline in Python (logistic regression, decision tree, random forest) on a 30,000-row structured content-performance dataset with 44 features, using client-holdout validation to prevent cross-client leakage.",
      "The random forest model reached Precision@50 of 0.74 vs. 0.24 for the hand-written baseline rule, a 3.1x improvement in correctly prioritising pages for review.",
      "Diagnosed and corrected a data-leakage issue in an interpretable decision-tree model by identifying a feature that directly encoded the target label.",
      "Use Claude, ChatGPT and Gemini in daily work, plus n8n for workflow automation when needed, to frame findings and polish write-ups while keeping client data out of AI tools."
    ],
    techStack: ["Python", "Machine Learning", "Random Forest", "Model Evaluation", "Claude", "ChatGPT", "Gemini", "n8n"],
    impactCallout: "✦ 3.1x improvement in page prioritisation precision · data leakage caught and fixed"
  },
  {
    role: "Industry Capstone Project Consultant",
    company: "Stonehouse Marketing Ltd",
    location: "Dublin, Ireland",
    period: "May 2026 – August 2026",
    businessContext: "Stonehouse is a Distribution company requiring structured analysis of the carbon footprint of its product portfolio. The engagement centres on calculating Product Carbon Footprints (PCF) per product using historical packaging and product data, building forecasting models to project future emissions, and delivering a standards-aligned reporting process compliant with GHG Protocol and ISO 14064:2018.",
    bullets: [
      "Map end-to-end emissions data flows and decision points across the product lifecycle to pinpoint exactly where human oversight is still required before any automation, surfacing data constraints and traceability gaps that would otherwise only emerge after deployment.",
      "Build relational data schemas and reporting pipelines in Python, SQL, and Azure/M365 with embedded handoff instrumentation, turning fragmented sustainability data into an auditable, standards-aligned reporting process (GHG Protocol, ISO 14064:2018).",
      "Develop a structured PCF calculation framework and forecasting logic from historical product and packaging data, defining the specific data-readiness thresholds a future AI model would need to clear before its output can be trusted for production forecasting."
    ],
    techStack: ["Python", "SQL", "Azure", "M365", "GHG Protocol", "ISO 14064:2018"],
    impactCallout: "✦ GHG protocol and PCF data analysis and forecasting"
  },
  {
    role: "Management Trainee — Data & Operational Analyst",
    company: "Wired Mode",
    location: "Bengaluru, India",
    period: "October 2024 – July 2025",
    businessContext: "A fast-moving operational environment where Sales, Quality, and Supply Chain workflows were generating bottlenecks and budget overruns. The mandate was to diagnose root causes, evaluate which data patterns were reliable enough to act on, and convert analytical findings into recommendations that leadership could actually execute.",
    bullets: [
      "Tasked with finding where Sales, Quality, and Supply Chain workflows broke down mapped decision points and data gaps end-to-end, then judged which automation candidates were actually reliable enough to act on. Recommendations implemented delivered €2.6M in annual savings and 200+ reclaimed man-hours per quarter.",
      "Evaluated the reliability of patterns in historical sales data before trusting them as forecasting inputs, screening out unreliable signals and shaping the inputs that ultimately cut inventory stockouts by 35%.",
      "Ran structured sessions with Finance and Operations stakeholders to pressure-test resource allocation assumptions, then translated the findings into prioritised, decision-ready recommendations that cut budget overruns by 20%.",
      "Designed Tableau and Python dashboards that made the reasoning behind key operational decisions transparent to senior stakeholders, cutting reporting turnaround by 40% and giving leadership a clear basis for judging recommendation quality."
    ],
    techStack: ["Python", "SQL", "Tableau", "Power BI", "ETL Pipelines", "Time-Series Forecasting", "Process Improvement", "Stakeholder Management"],
    impactCallout: "✦ €2.6M annual savings · 35% stockout reduction · 40% faster reporting · 200+ man-hours/quarter · 20% fewer budget overruns"
  }
];

export const projectItems: ProjectItem[] = [
  {
    icon: "🔐",
    type: "AI Architecture · Privacy-First Design",
    title: "Secure Offline AI-Assisted Analytics Platform",
    description: "Tested whether an LLM could assist analytics interpretation without compromising numerical accuracy. Integrated a locally hosted LLaMA3 model via Ollama — all inference on-device, zero data leaving the machine. Designed a four-layer architecture (data processing, AI reasoning, visualisation, human decision) enforcing strict separation between deterministic calculations and probabilistic AI reasoning. Every AI-generated insight is independently reproducible from the raw data — any output not matching the underlying evidence is flagged automatically.",
    stack: ["Python", "LLaMA3", "Ollama", "Pandas", "Matplotlib", "Human-in-the-Loop", "Responsible AI"]
  },
  {
    icon: "🌍",
    type: "AI Governance · Data Architecture · Consulting",
    title: "Orion Food Group — AI & Data Governance Consulting",
    description: "Investigated a failed AI forecasting deployment across 12 countries. Profiled 35–45% missing data mechanics and mapped failures across system fragmentation, metadata lineage, and governance dimensions. Created a Semantic Reference Layer (SRL) at the Azure Lakehouse boundary to standardise product and customer domains, targeting a reduction in data errors from 18% to below 5%. Specified pipeline handoff instrumentation for model auditability and pioneered a data readiness gate framework — quality thresholds must be cleared before data ingestion.",
    stack: ["Azure Lakehouse", "SQL", "Data Governance", "Metadata Lineage", "SRL Architecture", "AI Auditability"]
  },
  {
    icon: "🌲",
    type: "Decision Support · Environmental Analytics",
    title: "Ireland Forestry DSS — Afforestation Scheme Modelling",
    description: "Analysed 19,000+ biomass records to model carbon sequestration over a 200-year horizon, delivering evidence-based insights to support national afforestation policy. Developed a Decision Support System integrating carbon, soil, and species datasets, enabling data-driven planning toward Ireland's 2023–2027 targets of 18% forest cover. Applied multi-criteria decision analysis (MCDA) to evaluate and rank tree species, identifying an optimal mix balancing carbon capture, biodiversity, and financial returns. Translated complex environmental and financial data into actionable insights using the FDIKW framework.",
    stack: ["Python", "Tableau", "MCDA", "DSS", "Time-Series Analysis", "Environmental Data"]
  },
  {
    icon: "🍽️",
    type: "Prescriptive Analytics · Optimisation",
    title: "Urban Eats — Restaurant Chain Expansion Decision Model",
    description: "Performed descriptive demand analysis (2021–2025) across multiple branches using spatial, temporal, and seasonal analytics. Built ETS (Exponential Smoothing State Space) time-series forecasting models to predict district-level demand for 2026–2028, selecting optimal models using AIC and validating with MAE and RMSE. Designed a prescriptive optimisation model using Linear Programming (Simplex with binary decision variables) to maximise demand under budget and distance constraints. Identified optimal expansion districts: D8, D12, D16, D20, D24.",
    stack: ["Python", "ETS Forecasting", "Linear Programming", "Geospatial Analytics", "AIC", "Simplex"]
  },
  {
    icon: "💶",
    type: "Statistical Analysis · Policy Insights",
    title: "Income vs Cost of Living in Ireland — Economic Analysis",
    description: "Analysed income growth versus inflation in Ireland (2023–2024) using CSO CPI and EHA04 datasets to assess real changes in household purchasing power. Performed descriptive and inferential statistical analysis including confidence intervals, one-sample t-tests, and ANOVA to evaluate inflation stability and sectoral wage differences. Calculated real earnings adjusted for inflation — finding a 5.93% increase in real wages as nominal earnings outpaced CPI growth. Translated statistical findings into actionable business and policy insights.",
    stack: ["Python", "Pandas", "NumPy", "ANOVA", "Confidence Intervals", "CSO Data"]
  },
  {
    icon: "📡",
    type: "Mathematical Optimisation · Network Theory",
    title: "Probabilistic Network Reliability Optimisation — Telecom Case Study",
    description: "Conducted comprehensive reliability analysis of a telecommunications network using deterministic and probabilistic optimisation models. Applied max-flow algorithms, node-disjoint path analysis, and scenario enumeration to assess network resilience under random node failures. Evaluated 512 probabilistic failure scenarios to quantify connectivity probability and expected network performance. Formulated and solved a budget-constrained hardening optimisation problem using mathematical programming to identify critical infrastructure nodes — improving network reliability to near-perfect levels.",
    stack: ["Python", "Network Theory", "Max-Flow Algorithms", "Mathematical Programming", "Probabilistic Modelling"]
  },
  {
    icon: "💣",
    type: "Software Engineering · Game Analytics",
    title: "Minesweeper — Game Engine with Statistical Analytics Module",
    description: "Designed and developed a Python-based Minesweeper application with a modular architecture separating GUI, game logic, and analytics. Implemented an event-driven graphical interface using Tkinter supporting difficulty levels, real-time timers, flagging logic, and high-score tracking. Applied Depth-First Search (DFS) to identify and analyse mine clusters. Developed a statistical analytics module to compute mine density, empty cell distributions, cluster frequencies, and neighbourhood heatmaps.",
    stack: ["Python", "Tkinter", "Matplotlib", "DFS Algorithm", "Statistical Analytics", "OOP"]
  },
  {
    icon: "🌿",
    type: "ESG Analytics · Strategic Consulting",
    title: "Systematic Thinking & Analytics-Driven Sustainability Strategy",
    description: "Applied a structured analytics framework (descriptive, predictive, prescriptive) to evaluate a sustainability-focused business initiative. Developed stakeholder personas including Chief Sustainability Officer and mapped key decisions, business questions, and pain points. Designed actionable sustainability metrics and composite scores — Product Sustainability Score, Energy Transition Score, and Investor ESG Confidence Score — to support measurable decision-making and link sustainability initiatives to ROI, employee engagement, and investor confidence.",
    stack: ["Analytics Framework", "ESG Metrics", "Stakeholder Mapping", "KPI Design", "Strategic Analysis"]
  },
  {
    icon: "💱",
    type: "Financial Analytics · Data Visualisation",
    title: "Forex Exchange Rates Dashboard & Analysis",
    description: "Designed and deployed interactive dashboards in Streamlit + Plotly analysing daily forex data across 50+ currencies, featuring trend analysis, gainers/losers, volatility ranking, and heatmaps. Performed data cleaning, transformation, and statistical analysis (percent change, volatility, high/low values) using Python. Delivered insights on safe-haven assets (BTC, Gold, CHF) vs. hyperinflated currencies (VEF, ARS, LBP) — translating complex financial data into actionable business recommendations for risk management, hedging strategies, and investment planning.",
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "NumPy", "SQL", "Financial Analytics"]
  }
];

export const skillsData: SkillCategory[] = [
  {
    category: "Programming",
    skills: ["Python (Pandas, NumPy, Matplotlib)", "SQL (BigQuery)", "ETL Pipelines"]
  },
  {
    category: "Visualisation",
    skills: ["Tableau", "Power BI", "Looker Studio", "Streamlit", "Plotly"]
  },
  {
    category: "Cloud & Data",
    skills: ["Google Cloud Platform", "Azure", "M365", "Google Dataflow", "Data Governance"]
  },
  {
    category: "Analytics",
    skills: ["Statistical Analysis", "Time-Series Forecasting (ETS)", "Linear Programming", "MCDA", "Network Analysis", "Confidence Intervals", "ANOVA"]
  },
  {
    category: "AI & Governance",
    skills: ["LLM Integration (LLaMA3, Ollama)", "Human-in-the-Loop Design", "AI Auditability", "Metadata Lineage", "Data Readiness Frameworks"]
  },
  {
    category: "Business",
    skills: ["Stakeholder Management", "Process Improvement", "Decision Support Design", "Root Cause Analysis", "KPI Tracking", "Cross-functional Collaboration"]
  }
];

export const educationData: EducationEntry[] = [
  {
    degree: "Master of Science in Business Analytics",
    school: "University College Dublin — Michael Smurfit Graduate Business School",
    location: "Dublin 4, Dublin, Ireland",
    period: "September 2025 – Present",
    gradeBadge: "2:1",
    highlights: [
      "UCD Advantage Award & UCD Future Skills Award",
      "Participated in Creative Hackathon",
      "Statistics score: 93/100",
      "Core modules: Machine Learning, Forecasting & Optimisation, Geospatial Analytics, Responsible AI Governance, Decision Support Systems, Business Intelligence"
    ]
  },
  {
    degree: "Bachelor of Engineering in Electronics & Communication",
    school: "Visvesvaraya Technological University (VTU) — JSS Academy Of Technical Education",
    location: "Bengaluru, Karnataka, India",
    period: "August 2019 – June 2023",
    gradeBadge: "1:1",
    highlights: [
      "Co-founded AI Club at undergraduate institution",
      "Machine Learning research paper published in EMMITTER Journal",
      "Secured Best Project Award",
      "Engineering foundation in systems thinking, signal processing, and mathematics"
    ]
  }
];

export const certificationsData: CertificationItem[] = [
  { org: "Google Cloud", name: "BigQuery for Data Analysts", status: "Completed" },
  { org: "Google Cloud", name: "Introduction to Data Analytics on Google Cloud", status: "Completed" },
  { org: "Bloomberg", name: "Bloomberg Spreadsheet Analysis", status: "Completed" },
  { org: "JPMorgan Chase", name: "Quantitative Research Job Simulation", status: "Completed" },
  { org: "BCG", name: "Introduction to Strategy Consulting", status: "Completed" },
  { org: "Deloitte", name: "Data Analytics Job Simulation", status: "Completed" },
  { org: "SAP", name: "SAP Professional Fundamentals", status: "Completed" },
  { org: "CSSC", name: "Lean Six Sigma Yellow Belt", status: "Completed" },
  { org: "McKinsey", name: "McKinsey Forward Program", status: "Completed" },
  { org: "PMI", name: "PMI Essentials M.O.R.E. — Maximising Project Success", status: "In Progress" }
];

export const contactData: ContactItem[] = [
  { icon: "📱", type: "Phone (IE)", value: "+353 899 713 371", href: "tel:+353899713371" },
  { icon: "📱", type: "Phone (IN)", value: "+91 7349309041", href: "tel:+917349309041" },
  { icon: "✉️", type: "Email (UCD)", value: "sudarshan.ellora@ucdconnect.ie", href: "mailto:sudarshan.ellora@ucdconnect.ie" },
  { icon: "✉️", type: "Email (Personal)", value: "sudarshanelluru01@gmail.com", href: "mailto:sudarshanelluru01@gmail.com" },
  { icon: "💼", type: "LinkedIn", value: "linkedin.com/in/sudarshane", href: "https://linkedin.com/in/sudarshane" },
  { icon: "💻", type: "GitHub", value: "github.com/sudarshanellora", href: "https://github.com/sudarshanellora" },
  { icon: "🌐", type: "Portfolio", value: "sudarshanellora.com", href: "https://www.sudarshanellora.com" },
  { icon: "📍", type: "Location", value: "Dublin, Ireland", href: "https://www.google.com/maps/place/Dublin,+Ireland" }
];

export const testimonialsData: TestimonialItem[] = [
  {
    name: "Abhijith Ravikumar",
    title: "General Manager",
    company: "Wired Mode",
    avatar: "AR",
    text: "I had the pleasure of working with Sudarshan, and I can confidently say he is a dedicated, reliable, and highly professional individual. He brings great energy to the team, takes ownership of his work, and consistently delivers quality results. Any team would be lucky to have him.",
    relationship: "July 20, 2025, Abhijith managed Sudarshan directly",
    date: "July 2025"
  },
  {
    name: "Sridevi R",
    title: "Intellectual Property (IP) Operations Specialist",
    company: "Prasa IP",
    avatar: "SR",
    text: "Sudarshan was a valuable asset to our team, demonstrating a keen aptitude for patent searching and analysis. He consistently produced high-quality patent search reports that were well-organized, comprehensive. His attention to detail and commitment to accuracy ensured that our team had the information needed to make informed decisions.\n\nBeyond his technical skills, Sudarshan was a pleasure to work with. He was a team player, always willing to lend a hand and contribute to the success of the team. His positive attitude and enthusiasm were contagious and helped to create a positive work environment.",
    relationship: "November 27, 2024, Sridevi worked with Sudarshan on the same team",
    date: "November 2024"
  }
];

export const previousExperienceData: ExperienceRole[] = [
  {
    role: "Patent Associate Trainee",
    company: "Prasa IP LLP",
    location: "Bengaluru, India / Remote",
    period: "September 2024 – October 2024",
    techStack: ["Market Research", "Intellectual Property & Patents", "Competitive Intelligence", "Data Analysis", "Risk Assessment", "Strategic Reporting"],
    bullets: [
      "Conducted in-depth research and analysis of global innovation and market trends, producing reports that influenced strategies impacting €5M+ in business decisions.",
      "Analyzed large datasets to identify risks, overlaps, and opportunities, enabling a 20% reduction in potential compliance risks.",
      "Translated complex technical findings into clear, data-driven reports, improving stakeholder decision-making efficiency by 30%.",
      "Provided strategic recommendations from research insights that enhanced competitive positioning and supported market entry worth €2M+ potential revenue."
    ]
  },
  {
    role: "Marketing Analyst Intern",
    company: "Clear Tax",
    location: "Bengaluru, India",
    period: "July 2023 – August 2023",
    techStack: ["Excel", "SQL", "Data Visualization", "Marketing Analytics", "ROI Optimization", "Stakeholder Dashboards"],
    bullets: [
      "Conducted data-driven market and customer analysis using Excel, SQL, and visualization tools, providing actionable insights that guided strategic business decisions.",
      "Analyzed campaign performance metrics and customer behavior trends, enabling teams to optimize marketing strategies and improve ROI by 20%.",
      "Prepared comprehensive analytical reports and dashboards for stakeholders, supporting informed decision-making and operational improvements.",
      "Collaborated with cross-functional teams to identify business opportunities, mitigate risks, and recommend process improvements, translating marketing data into business insights."
    ]
  },
  {
    role: "Imagery Analyst Intern",
    company: "Autoyos Pvt Ltd",
    location: "Bengaluru, India",
    period: "September 2022 - October 2022",
    techStack: ["Python", "Machine Learning", "Image Processing", "Feature Engineering", "Data Workflows", "Deep Learning"],
    bullets: [
      "Collected, processed, and maintained a structured dataset of 170+ images, enabling accurate predictive analysis and model-driven insights for classification tasks.",
      "Engineered features and applied machine learning techniques to analyze complex datasets, transforming technical outputs into actionable insights for decision-making.",
      "Developed data-driven workflows and visualizations to interpret ML model results, supporting stakeholders in understanding trends and patterns.",
      "Collaborated on deploying ML pipelines and deep learning models, translating technical results into business-relevant recommendations for process improvement and strategy planning."
    ]
  },
  {
    role: "Co-founder & Events Lead",
    company: "JSSATE Bengaluru AI Club",
    location: "Bengaluru, India",
    period: "August 2021 - June 2023",
    techStack: ["Project Coordination", "Public Speaking", "Community Building", "Stakeholder Collaboration", "Event Management", "Feedback Evaluation"],
    bullets: [
      "Organized and delivered 5 major student events, including workshops and interactive sessions, with strong participation across the department.",
      "Collaborated with students, alumni, faculty, and industry professionals to design impactful events and activities.",
      "Facilitated connections between students and teachers, helping 1000+ students to build a strong learning community.",
      "Co-hosted and often served as the face and lead of the club, representing the team in front of peers and faculty.",
      "Collected and evaluated participant feedback which improved the quality and increased the student interaction by 30% every event.",
      "Prepared event reports, summaries, and presentations, and regularly acted as a speaker or presenter during sessions."
    ]
  }
];

