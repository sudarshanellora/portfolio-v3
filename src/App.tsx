import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  animate 
} from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  ArrowLeft,
  ExternalLink, 
  Download, 
  Printer,
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  User,
  Activity,
  Copy,
  Check,
  Sun,
  Moon,
  Quote,
  TrendingUp,
  Cpu,
  BarChart3,
  ThumbsUp,
  Code,
  Database,
  Terminal,
  Shield,
  Layers,
  Send
} from 'lucide-react';

import {
  kpiCards,
  frameworkSteps,
  experienceData,
  previousExperienceData,
  projectItems,
  skillsData,
  educationData,
  certificationsData,
  achievementsData,
  contactData,
  testimonialsData,
  KPICard,
  FrameworkStep,
  ExperienceRole,
  ProjectItem,
  SkillCategory,
  EducationEntry,
  CertificationItem,
  ContactItem,
  TestimonialItem
} from './data/portfolioData';

// @ts-ignore
import profileImg from './assets/images/sudarshan_profile.jpg';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom counter component for metric statistics
function Counter({ value, isDecimal = false, suffix = "" }: { value: string; isDecimal?: boolean; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      // Extract number from value string, e.g. "€2.6M" -> 2.6, "35%" -> 35
      const numericString = value.replace(/[^0-9.]/g, '');
      const targetNum = parseFloat(numericString);
      
      if (!isNaN(targetNum)) {
        const countValue = { val: 0 };
        const isFloat = numericString.includes('.') || isDecimal;
        
        const controls = animate(0, targetNum, {
          duration: 2,
          ease: "easeOut",
          onUpdate(latest) {
            if (isFloat) {
              setDisplayValue(latest.toFixed(1));
            } else {
              setDisplayValue(Math.floor(latest).toString());
            }
          }
        });
        
        return () => controls.stop();
      }
    }
  }, [inView, value, isDecimal]);

  // Extract prefix like € or symbol
  const prefix = value.match(/^[^\d]*/)?.[0] || "";
  // Extract trailing non-numeric characters e.g. "M", "%" if not in suffix
  const valSuffix = value.match(/[^\d.]*$/)?.[0] || "";

  return (
    <span ref={ref} className="font-serif inline-block">
      {prefix}{displayValue}{valSuffix}
    </span>
  );
}

interface CollapsibleExperienceCardProps {
  exp: ExperienceRole;
  key?: React.Key | number;
}

function CollapsibleExperienceCard({ exp }: CollapsibleExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`border rounded-xl transition-all duration-300 relative overflow-hidden bg-[rgba(255,255,255,0.01)] ${
        isOpen 
          ? 'border-[rgba(79,126,255,0.4)] bg-[rgba(79,126,255,0.02)] shadow-lg' 
          : 'border-[var(--border)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.02)]'
      }`}
    >
      {/* Header, Clickable block */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-1.5">
            <span className="text-label text-[10px] text-[var(--accent-blue)] block tracking-widest uppercase font-extrabold">
              {exp.company}
            </span>
            <span className="text-[var(--text-dim)] text-[11px] select-none">•</span>
            <span className="text-sans text-xs text-[var(--text-secondary)]">
              {exp.location}
            </span>
          </div>
          <h4 className="font-serif text-[17px] md:text-lg font-bold text-[var(--text-primary)]">
            {exp.role}
          </h4>
        </div>

        <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end w-full md:w-auto border-t md:border-t-0 border-[rgba(255,255,255,0.05)] pt-3 md:pt-0">
          <span className="font-mono text-xs text-[var(--text-secondary)] font-medium">
            {exp.period}
          </span>
          <div className={`p-1.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] transition-transform duration-300 ${isOpen ? 'rotate-90 bg-[rgba(79,126,255,0.1)] border-[rgba(79,126,255,0.2)] text-[var(--accent-blue)]' : 'text-[var(--text-secondary)]'}`}>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Tech tags list (always visible, helping ATS readability and quick recruiter preview!) */}
      <div className="px-5 md:px-6 pb-5 flex flex-wrap gap-1.5 border-b border-[rgba(255,255,255,0.03)]">
        {exp.techStack.map((tech, z) => (
          <span 
            key={z}
            className="px-2 py-0.5 text-[10px] font-mono leading-none rounded border"
            style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Accordion expand contents using Framer Motion */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-6 bg-[rgba(0,0,0,0.1)] border-t border-[rgba(255,255,255,0.02)]">
              <ul className="flex flex-col gap-3">
                {exp.bullets.map((bullet, k) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 select-none mt-2" style={{ backgroundColor: 'var(--accent-blue)' }} />
                    <span className="font-sans text-[13px] md:text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResumeView() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-900 font-sans py-8 px-4 sm:px-6 relative selection:bg-[#4f7eff]/30 selection:text-white">
      {/* Print-specific style block */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .resume-paper {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            background: white !important;
            color: black !important;
          }
          .bullet-point {
            color: black !important;
          }
        }
      `}</style>

      {/* Floating Action Header Bar */}
      <div className="no-print max-w-[850px] mx-auto mb-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--accent-blue)]" /> Back to Portfolio
          </a>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-mono text-[var(--text-dim)] mr-2 hidden md:inline">
            📍 Tip: Select "Save as PDF" to download your copy
          </span>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[var(--accent-blue)] hover:bg-[#3d6df2] text-white flex items-center gap-2 transition cursor-pointer shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] font-sans"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Structured CV Paper Sheet */}
      <div className="resume-paper max-w-[850px] mx-auto p-8 sm:p-12 md:p-14 bg-white text-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-xl border border-gray-150 flex flex-col gap-6 text-left leading-relaxed">
        
        {/* Name Header and Contacts */}
        <div className="text-center border-b border-gray-200 pb-5">
          <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2 font-sans">
            SUDARSHAN ELLORA
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-gray-600 font-sans tracking-wide">
            <span>📍 Dublin, Ireland</span>
            <span className="text-gray-300">•</span>
            <a href="tel:+353899713371" className="hover:text-blue-600 transition">📞 +353 899713371</a>
            <span className="text-gray-300">•</span>
            <a href="mailto:sudarshan.ellora@ucdconnect.ie" className="hover:text-blue-600 transition">✉️ sudarshan.ellora@ucdconnect.ie</a>
            <span className="text-gray-300">•</span>
            <a href="https://linkedin.com/in/sudarshane" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">linkedin.com/in/sudarshane</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.sudarshanellora.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">sudarshanellora.com</a>
          </div>
        </div>

        {/* Profile statement */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-[#1a365d] uppercase border-b border-[#1a365d] pb-0.5 mb-2">
            Profile
          </h2>
          <p className="text-[12.5px] leading-relaxed text-gray-700">
            MSc Business Analytics candidate at UCD Smurfit with experience driving operational improvements through data analysis, forecasting, and performance monitoring. Delivered measurable business impact, including <strong>€2.6M cost savings</strong>, <strong>15% efficiency gains</strong>, and <strong>40% faster reporting cycles</strong> through cross-functional collaboration and analytics-driven decision support.
          </p>
        </div>

        {/* Education Row-Block */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-[#1a365d] uppercase border-b border-[#1a365d] pb-0.5 mb-2">
            Education
          </h2>
          <div className="flex flex-col gap-3.5">
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">
                  Master of Science in Business Analytics | Grade: 2:1
                </h3>
                <span className="text-xs text-gray-500 font-mono">September 2025 – Present</span>
              </div>
              <p className="text-[12px] text-gray-600 font-semibold">University College Dublin Michael Smurfit Graduate Business School, Dublin 4, Dublin, Ireland</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>UCD Advantage award, UCD Future Skills award, Participated in Creative Hackathon</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">
                  Bachelor of Engineering in Electronics and Communication | Grade: 1:1
                </h3>
                <span className="text-xs text-gray-500 font-mono">August 2019 - June 2023</span>
              </div>
              <p className="text-[12px] text-gray-600 font-semibold">Visvesvaraya Technological University (VTU) — JSS Academy Of Technical Education, Bengaluru, Karnataka, India</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Co-founded AI Club, research paper published in EMITTER International Journal of Engineering Technology, secured the best project and presented at IEEE</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Work Experience with Previous Roles Added */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-[#1a365d] uppercase border-b border-[#1a365d] pb-0.5 mb-2">
            Experience
          </h2>
          <div className="flex flex-col gap-4">
            
            {/* Active role 1 */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Industry Capstone Project Consultant</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">May 2026 - Present</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">Stonehouse Marketing Ltd, Dublin, Ireland</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Map end-to-end emissions data flows and decision points across the product lifecycle to pinpoint exactly where human oversight is still required before any automation, surfacing data constraints and traceability gaps that would otherwise only emerge after deployment</li>
                <li>Build relational data schemas and reporting pipelines in Python, SQL, and Azure/M365 with embedded handoff instrumentation, turning fragmented sustainability data into an auditable, standards-aligned reporting process (GHG Protocol, ISO 14064:2018)</li>
                <li>Develop a structured PCF calculation framework and forecasting logic from historical product and packaging data, defining the specific data-readiness thresholds a future AI model would need to clear before its output can be trusted for production forecasting</li>
              </ul>
            </div>

            {/* Active role 2 */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Management Trainee (Data & Operational Analyst)</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">October 2024 - July 2025</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">Wired Mode, Bengaluru</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Tasked with finding where Sales, Quality, and Supply Chain workflows broke down, mapped decision points and data gaps end-to-end, then judged which automation candidates were actually reliable enough to act on recommendations that were implemented and delivered €2.6M in annual savings and 200+ reclaimed man-hours per quarter</li>
                <li>Evaluated the reliability of patterns in historical sales data before trusting them as forecasting inputs, screening out unreliable signals and shaping the inputs that ultimately cut inventory stockouts by 35%</li>
                <li>Ran structured sessions with Finance and Operations stakeholders to pressure-test resource allocation assumptions, then translated the findings into prioritised, decision-ready recommendations that cut budget overruns by 20%</li>
                <li>Designed Tableau and Python dashboards that made the reasoning behind key operational decisions transparent to senior stakeholders, cutting reporting turnaround by 40% and giving leadership a clear basis for judging recommendation quality</li>
              </ul>
            </div>

            {/* Prasa IP LLP */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Patent Associate Trainee</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">September 2024 – October 2024</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">Prasa IP LLP, Bengaluru, India</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Conducted in-depth research and analysis of global innovation and market trends, producing reports that influenced strategies impacting €5M+ in business decisions.</li>
                <li>Analyzed large datasets to identify risks, overlaps, and opportunities, enabling a 20% reduction in potential compliance risks.</li>
                <li>Translated complex technical findings into clear, data-driven reports, improving stakeholder decision-making efficiency by 30%.</li>
                <li>Provided strategic recommendations from research insights that enhanced competitive positioning and supported market entry worth €2M+ potential revenue.</li>
              </ul>
            </div>

            {/* Clear Tax */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Marketing Analyst Intern</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">July 2023 – August 2023</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">Clear Tax, Bengaluru, India</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Conducted data-driven market and customer analysis using Excel, SQL, and visualization tools, providing actionable insights that guided strategic business decisions.</li>
                <li>Analyzed campaign performance metrics and customer behavior trends, enabling teams to optimize marketing strategies and improve ROI by 20%.</li>
                <li>Prepared comprehensive analytical reports and dashboards for stakeholders, supporting informed decision-making and operational improvements.</li>
                <li>Collaborated with cross-functional teams to identify business opportunities, mitigate risks, and recommend process improvements, translating marketing data into business insights.</li>
              </ul>
            </div>

            {/* Autoyos */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Imagery Analyst Intern</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">September 2022 - October 2022</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">Autoyos Pvt Ltd, Bengaluru, India</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Collected, processed, and maintained a structured dataset of 170+ images, enabling accurate predictive analysis and model-driven insights for classification tasks.</li>
                <li>Engineered features and applied machine learning techniques to analyze complex datasets, transforming technical outputs into actionable insights for decision-making.</li>
                <li>Developed data-driven workflows and visualizations to interpret ML model results, supporting stakeholders in understanding trends and patterns.</li>
                <li>Collaborated on deploying ML pipelines and deep learning models, translating technical results into business-relevant recommendations for process improvement and strategy planning.</li>
              </ul>
            </div>

            {/* JSSATE AI Club */}
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-[13px] font-bold text-gray-900">Co-founder & Events Lead</h3>
                <span className="text-[11.5px] text-gray-500 font-mono">August 2021 - June 2023</span>
              </div>
              <p className="text-[12px] text-blue-800 font-semibold">JSSATE Bengaluru AI Club, Bengaluru, India</p>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 mt-0.5 space-y-0.5">
                <li>Organized and delivered 5 major student events, including workshops and interactive sessions, with strong department-wide participation.</li>
                <li>Collaborated with students, alumni, faculty, and industry professionals to design impactful events and activities.</li>
                <li>Facilitated connections between students and teachers, helping 1000+ students to build a strong learning community.</li>
                <li>Co-hosted and often served as the face and lead of the club, representing the team in front of peers and faculty.</li>
                <li>Collected and evaluated participant feedback which improved the quality and increased student interaction by 30% every event.</li>
                <li>Prepared event reports, summaries, presentations, and regularly acted as a speaker or presenter during sessions.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Academic and Personal Projects */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-[#1a365d] uppercase border-b border-[#1a365d] pb-0.5 mb-2">
            Projects
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-[12.5px] font-bold text-gray-900">Secure Offline AI-Assisted Analytics Platform</h3>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 space-y-0.5 mt-0.5">
                <li>Set out to test whether an LLM could assist with analytics interpretation without compromising numerical accuracy, so integrated a locally hosted LLaMA3 model via Ollama, keeping all inference on-device and every deterministic calculation cleanly separated from the model's probabilistic reasoning</li>
                <li>Designed a four-layer architecture (data processing, AI reasoning, visualisation, human decision) specifically so a human could check the model's interpretation against the underlying verified numbers at every stage, rather than accepting AI output on faith</li>
                <li>Built the full pipeline so every AI-generated insight was independently reproducible from the raw data, making it possible to catch and flag any AI output that didn't match the underlying evidence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[12.5px] font-bold text-gray-900">Orion Food Group AI & Data Governance Consulting Project</h3>
              <ul className="list-disc pl-5 text-[11.5px] text-gray-700 space-y-0.5 mt-0.5">
                <li>Investigated why an AI forecasting model had failed across a 12-country deployment, traced the failure to data quality (35–45% missing fields) rather than model design, and documented exactly where the model's outputs couldn't be trusted</li>
                <li>Used structured prompt engineering with Microsoft Copilot to generate and test hypotheses about governance failure patterns, comparing AI-generated hypotheses against the actual data evidence to separate plausible-sounding explanations from the real root cause</li>
                <li>Designed a data readiness gate and semantic reference layer to catch unreliable data before it reached the model, targeting a reduction in error rate from 18% to below 5% across the federated organisation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Skills section */}
        <div>
          <h2 className="text-xs font-bold tracking-wider text-[#1a365d] uppercase border-b border-[#1a365d] pb-0.5 mb-2">
            Key Skills
          </h2>
          <ul className="list-disc pl-5 text-[11.5px] text-gray-700 space-y-1">
            <li><strong>Technical Skills:</strong> Python, SQL (BigQuery), Statistical Analysis (Forecasting, Time-Series Analysis), ETL Pipelines, Data Interpretation, Data Visualization, Tableau, Power BI, Looker Studio, Google Cloud, Dataflow, Excel, PowerPoint</li>
            <li><strong>Analytics & Business:</strong> Business Analysis, KPI Tracking, Decision Support, Process Improvement, Stakeholder Management, Cross-functional Collaboration, Performance Monitoring, Root Cause Analysis, Reporting (MIS), Process Documentation</li>
            <li><strong>Data & Governance:</strong> Data Governance, Metadata Lineage, Data Quality Analysis, Process Implementation, Matrixed Collaboration</li>
            <li><strong>Certifications:</strong> Google Cloud: Data Analytics & BigQuery, Lean Six Sigma Yellow Belt (CSSC), SAP Professional Fundamentals, McKinsey Forward Program (In Progress), PMI Essentials M.O.R.E. (In Progress)</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange); // general catch for manual navigation hook
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  if (currentPath === '/resume') {
    return <ResumeView />;
  }

  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Decision Intelligence Lab state outputs
  const [automationLevel, setAutomationLevel] = useState(75);
  const [forecastAccuracy, setForecastAccuracy] = useState(80);
  const [stakeholderAlignment, setStakeholderAlignment] = useState(70);

  // Testimonial Carousel state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Carousel slide state & hover variables
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const toolkitContainerRef = useRef<HTMLDivElement>(null);
  const [projectsIsHovered, setProjectsIsHovered] = useState(false);
  const [toolkitIsHovered, setToolkitIsHovered] = useState(false);

  // Terminal Contact state
  const [terminalHistory, setTerminalHistory] = useState<any[]>([
    { type: 'system', text: "Sudarshan's Interactive Intelligence Console v1.0 [Ready]" },
    { type: 'system', text: "Type any command or click the shortcuts below to execute:" },
    { type: 'input', text: "guest@sudarshan:~$ run contact-intelligence" },
    { type: 'output', text: "📱 Phone (IE): +353 899 713 371", copyValue: "+353 899 713 371", actionText: "[Copy]" },
    { type: 'output', text: "📱 Phone (IN): +91 7349309041", copyValue: "+91 7349309041", actionText: "[Copy]" },
    { type: 'output', text: "✉️ Email (UCD): sudarshan.ellora@ucdconnect.ie", link: "mailto:sudarshan.ellora@ucdconnect.ie", actionText: "[Send]" },
    { type: 'output', text: "✉️ Email (Gmail): sudarshanelluru01@gmail.com", link: "mailto:sudarshanelluru01@gmail.com", actionText: "[Send]" },
    { type: 'output', text: "💼 LinkedIn:  linkedin.com/in/sudarshane", link: "https://linkedin.com/in/sudarshane", actionText: "[Open Profile]" },
    { type: 'output', text: "💻 GitHub:    github.com/sudarshanellora", link: "https://github.com/sudarshanellora", actionText: "[Open GitHub]" },
    { type: 'output', text: "🌐 Website:   sudarshanellora.com", link: "https://www.sudarshanellora.com", actionText: "[Open Site]" },
    { type: 'output', text: "📍 Location:  Dublin, Ireland", link: "https://www.google.com/maps/place/Dublin,+Ireland", actionText: "[Open Map]" }
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // References for GSAP animations
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // Toggle classes and theme variables when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check user preferences for animations
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Register standard scroll listener to toggle header translucent style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Auto-scroll Projects
  useEffect(() => {
    if (loading || projectsIsHovered) return;
    
    const interval = setInterval(() => {
      const el = projectsContainerRef.current;
      if (!el) return;
      
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 10) {
        // Wrap around smoothly to the start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by approx one card width + gap
        el.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 4500); // give plenty of reading time (4.5s) and then move
    
    return () => clearInterval(interval);
  }, [loading, projectsIsHovered]);

  // Auto-scroll Technical Toolkit
  useEffect(() => {
    if (loading || toolkitIsHovered) return;
    
    const interval = setInterval(() => {
      const el = toolkitContainerRef.current;
      if (!el) return;
      
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 10) {
        // Wrap around smoothly to the start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by approx one card width + gap
        el.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 4500); // give plenty of reading time (4.5s) and then move
    
    return () => clearInterval(interval);
  }, [loading, toolkitIsHovered]);

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Scroll Animations for experience card entry and timeline
  useEffect(() => {
    if (loading || prefersReducedMotion) return;

    // Experience Card Animations
    const cards = gsap.utils.toArray('.exp-card');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Experience timeline line scaling
    if (timelineProgressRef.current && timelineContainerRef.current) {
      gsap.fromTo(timelineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineContainerRef.current,
            start: "top 25%",
            end: "bottom 75%",
            scrub: true
          }
        }
      );
    }

    // Rotating data-node backdrops
    gsap.to(".nodes-svg", {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading, prefersReducedMotion]);

  // Intersection observer setup to update current active navigation item
  useEffect(() => {
    const sections = ['hero', 'impact', 'about', 'journey', 'projects', 'toolkit', 'education', 'awards', 'certifications', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    showToast(`Copied ${label} to clipboard!`);
  };

  const getCompanyLogo = (org: string) => {
    switch (org) {
      case 'Google Cloud':
      case 'Google':
        return (
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center relative overflow-hidden group/logo">
            <div className="flex flex-wrap w-6 h-6 items-center justify-center relative">
              <span className="font-sans font-bold text-xs tracking-tighter text-[#4285F4]">G</span>
              <span className="font-sans font-bold text-xs tracking-tighter text-[#34A853]">C</span>
              <span className="font-sans font-bold text-xs tracking-tighter text-[#FBBC05]">P</span>
            </div>
            <div className="absolute inset-0 border border-transparent hover:border-blue-500 rounded-lg transition-colors" />
          </div>
        );
      case 'Bloomberg':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#111111] flex items-center justify-center relative border border-black overflow-hidden">
            <span className="font-mono font-black text-[9px] tracking-tight text-[#FF5E00]">Bberg</span>
          </div>
        );
      case 'JPMorgan Chase':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#221F1F] border border-[#C4A462]/30 flex items-center justify-center">
            <span className="font-serif italic font-bold text-[11px] text-[#C4A462] tracking-wider">JPM</span>
          </div>
        );
      case 'BCG':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#00875A] flex items-center justify-center border border-black/10">
            <span className="font-sans font-bold text-[10px] text-white">BCG</span>
          </div>
        );
      case 'Deloitte':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#111111] border border-neutral-800 flex items-center justify-center relative">
            <span className="font-sans font-black text-[13px] text-white">D<span className="text-[#86BC25]">.</span></span>
          </div>
        );
      case 'SAP':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#1266F1] flex items-center justify-center transform skew-x-[-10deg] border border-blue-700/30">
            <span className="font-sans font-black text-[10px] text-white transform skew-x-[10deg] tracking-tight">SAP</span>
          </div>
        );
      case 'CSSC':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#FFD54F] border border-[#F5B041] flex items-center justify-center">
            <span className="font-mono font-black text-[10px] text-[#E65100]">CSSC</span>
          </div>
        );
      case 'McKinsey':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#051C2C] border border-white/5 flex items-center justify-center">
            <span className="font-serif italic font-bold text-xs text-white">McK</span>
          </div>
        );
      case 'PMI':
        return (
          <div className="w-10 h-10 rounded-lg bg-[#E65100] border border-orange-700 flex items-center justify-center">
            <span className="font-sans font-black text-[10.5px] text-white tracking-wider">PMI</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center">
            <Award className="w-5 h-5 text-[var(--accent-blue)]" />
          </div>
        );
    }
  };

  // Scroll terminal logs automatically
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalCommand = (text: string) => {
    const rawVal = text.trim();
    if (!rawVal) return;
    const cleanCmd = rawVal.toLowerCase();

    const nextLogs = [...terminalHistory, { type: 'input', text: `guest@sudarshan:~$ ${rawVal}` }];

    switch (cleanCmd) {
      case 'help':
        nextLogs.push(
          { type: 'system', text: "SYSTEM COMPILER DIRECTORY:" },
          { type: 'output', text: "  about      - Display student profile & scroll to About section" },
          { type: 'output', text: "  contact    - Print verified contact numbers & mailbox" },
          { type: 'output', text: "  linkedin   - Access professional LinkedIn directory" },
          { type: 'output', text: "  github     - Browse active software repositories on GitHub" },
          { type: 'output', text: "  projects   - Auto-scroll to Applied Engineering Labs" },
          { type: 'output', text: "  toolkit    - Auto-scroll to Technical Toolkit assets" },
          { type: 'output', text: "  clear      - Erase console output buffer logs" }
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case 'about':
        nextLogs.push(
          { type: 'output', text: "STUDENT PROFILE:" },
          { type: 'output', text: "Sudarshan Ellora is a master's candidate in Business Analytics at the Michael Smurfit Graduate Business School, University College Dublin." },
          { type: 'output', text: "Focus sectors: Prescriptive Decision Support, Linear Programming optimization, Machine Learning forecasting models, and Systematic System Governance." },
          { type: 'system', text: "Scrolling to About section..." }
        );
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'contact':
        nextLogs.push(
          { type: 'output', text: "📱 Phone (IE): +353 899 713 371", copyValue: "+353 899 713 371", actionText: "[Copy]" },
          { type: 'output', text: "📱 Phone (IN): +91 7349309041", copyValue: "+91 7349309041", actionText: "[Copy]" },
          { type: 'output', text: "✉️ Email (UCD): sudarshan.ellora@ucdconnect.ie", link: "mailto:sudarshan.ellora@ucdconnect.ie", actionText: "[Send]" },
          { type: 'output', text: "✉️ Email (Gmail): sudarshanelluru01@gmail.com", link: "mailto:sudarshanelluru01@gmail.com", actionText: "[Send]" },
          { type: 'output', text: "💼 LinkedIn:  linkedin.com/in/sudarshane", link: "https://linkedin.com/in/sudarshane", actionText: "[Open Profile]" },
          { type: 'output', text: "💻 GitHub:    github.com/sudarshanellora", link: "https://github.com/sudarshanellora", actionText: "[Open GitHub]" },
          { type: 'output', text: "🌐 Website:   sudarshanellora.com", link: "https://www.sudarshanellora.com", actionText: "[Open Site]" },
          { type: 'output', text: "📍 Location:  Dublin, Ireland", link: "https://www.google.com/maps/place/Dublin,+Ireland", actionText: "[Open Map]" }
        );
        break;
      case 'linkedin':
        nextLogs.push({ type: 'system', text: "Opening LinkedIn profile external directory..." });
        window.open("https://linkedin.com/in/sudarshane", "_blank");
        break;
      case 'github':
        nextLogs.push({ type: 'system', text: "Opening GitHub repositories directory..." });
        window.open("https://github.com/sudarshanellora", "_blank");
        break;
      case 'projects':
        nextLogs.push({ type: 'system', text: "Scrolling to Analytical Work..." });
        setTimeout(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'toolkit':
        nextLogs.push({ type: 'system', text: "Scrolling to Technical Toolkit..." });
        setTimeout(() => {
          document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      default:
        nextLogs.push({ type: 'error', text: `Command not recognized: "${rawVal}". Type "help" to list valid instructions.` });
    }

    setTerminalHistory(nextLogs);
    setTerminalInput("");
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stagger configurations for Framer Motion
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 32 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen relative text-[#e6ecf5]" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Dynamic Toast Notifications */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="px-6 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-auto border border-[rgba(255,255,255,0.15)]"
              style={{ 
                background: 'rgba(8,14,28,0.95)',
                backdropFilter: 'blur(16px)',
                color: 'var(--accent-teal)'
              }}
            >
              <Check className="w-3.5 h-3.5" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-base)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-serif text-3xl font-extrabold relative shadow-2xl"
                style={{ background: 'var(--gradient-main)' }}
              >
                <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--gradient-main)" }}
                >
                <img
                src="/logo.svg"
                alt="Sudarshan Ellora Logo"
                className="w-16 h-16 object-contain"
                />
                </div>
                <div className="absolute inset-0 rounded-2xl border border-[rgba(255,255,255,0.2)] animate-pulse" />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-label text-center color-text-secondary pr-[2.5px]"
              >
                Sudarshan Ellora
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Render */}
      {!loading && (
        <>
          {/* STICKY GLASS HEADER NAVIGATION */}
          <header 
            className={`fixed top-0 left-0 w-full z-40 ${scrolled ? 'glass-header-active py-4' : 'glass-header py-6'}`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
              {/* Left Logo Monogram */}
              <a 
                href="#hero" 
                onClick={(e) => handleSmoothScroll(e, 'hero')}
                className="flex items-center gap-3.5 group focus:outline-none"
                id="header-home-link"
              >
              <div
              className="w-[42px] h-[42px] flex items-center justify-center"
              >
              <img
              src="/favicon.svg"
              alt="Sudarshan Ellora Logo"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              </div>
                <span className="font-sans text-[15px] font-medium tracking-tight hover:text-white transition-colors duration-200">
                  Sudarshan Ellora
                </span>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {['Impact', 'About', 'Journey', 'Projects', 'Toolkit', 'Education', 'Awards', 'Certifications', 'Contact'].map((section) => {
                  const targetId = section.toLowerCase();
                  const isActive = activeSection === targetId;
                  return (
                    <a
                      key={section}
                      href={`#${targetId}`}
                      onClick={(e) => handleSmoothScroll(e, targetId)}
                      className="font-sans text-[13.5px] font-medium tracking-wide relative py-1.5 transition-colors duration-200 focus:outline-none"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {section}
                      {isActive && (
                        <motion.div 
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                          style={{ background: 'var(--gradient-main)' }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Right Resume Button & Mobile Menu Icon */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle Button */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)] transition-all cursor-pointer focus:outline-none relative overflow-hidden"
                  aria-label="Toggle light/dark theme"
                  id="theme-toggle-desktop"
                >
                  <motion.div
                    key={isDarkMode ? 'dark' : 'light'}
                    initial={{ y: 15, rotate: 45, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: -15, rotate: -45, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="flex items-center justify-center"
                  >
                    {isDarkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                  </motion.div>
                </button>

                <a 
                  href="/resume" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hidden sm:inline-flex btn-ghost px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-all focus:outline-none border border-[var(--border)] rounded-lg"
                >
                  Download Resume
                </a>

                {/* Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex lg:hidden w-10 h-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-primary)] focus:outline-none"
                  aria-label="Toggle menu"
                  id="mobile-nav-toggle"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* MOBILE NAVIGATION DRAWER */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Overlay backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
                />

                {/* Sidebar Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] z-40 flex flex-col p-8 justify-between shadow-2xl border-l border-[var(--border)] lg:hidden overflow-y-auto"
                  style={{ background: 'var(--bg-raised)' }}
                >
                  <div className="flex flex-col gap-10 mt-12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-[linear-gradient(135deg,#4f7eff_0%,#7c5cfc_100%)] flex items-center justify-center font-serif text-[11px] font-bold text-white">
                          SE
                        </div>
                        <span className="font-sans text-sm font-semibold text-[var(--text-primary)]">Sudarshan_E</span>
                      </div>

                      {/* Theme Toggle & Close buttons */}
                      <div className="flex items-center gap-1.5 animate-fade-in">
                        <button
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] cursor-pointer focus:outline-none"
                          aria-label="Toggle mobile theme"
                        >
                          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-[var(--accent-teal)]" /> : <Moon className="w-3.5 h-3.5 text-[var(--accent-blue)]" />}
                        </button>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] transition-colors cursor-pointer focus:outline-none"
                          aria-label="Close menu"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <nav className="flex flex-col gap-3">
                      {['Impact', 'About', 'Journey', 'Projects', 'Toolkit', 'Education', 'Awards', 'Certifications', 'Contact'].map((sec) => {
                        const targetId = sec.toLowerCase();
                        const isActive = activeSection === targetId;
                        return (
                          <a
                            key={sec}
                            href={`#${targetId}`}
                            onClick={(e) => handleSmoothScroll(e, targetId)}
                            className="font-sans text-base font-semibold py-2 relative flex items-center justify-between transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            style={{ color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
                          >
                            {sec}
                            <ChevronRight className="w-4 h-4 opacity-40 text-[var(--text-primary)]" />
                          </a>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="flex flex-col gap-4">
                    <a 
                      href="/resume" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full btn-primary py-3.5 text-center text-xs font-semibold uppercase tracking-wider"
                    >
                      Download Resume
                    </a>
                    <div className="text-center font-sans text-[11px] text-[#3e4e66]">
                      📍 Dublin, Ireland
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* SECTION 1: HERO */}
          <section 
            id="hero" 
            className="min-h-screen flex items-center relative pt-28 pb-16 lg:py-0 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
              
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                
                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: prefersReducedMotion ? 0 : 80 }}
                  className="self-start inline-flex items-center gap-2 px-[18px] py-[6px] rounded-full border border-[rgba(0,201,167,0.35)] bg-[rgba(0,201,167,0.08)] mb-8"
                  id="availability-pill"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-ping" />
                  <span className="font-sans text-[12.5px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-teal)' }}>
                    🟢 Open to Opportunities - 2026
                  </span>
                </motion.div>

                {/* Heading (Monogram Words Staggered) */}
                <h1 className="mb-6 flex flex-col gap-1">
                  <motion.span
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 20 }}
                    className="text-display block tracking-tighter"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    SUDARSHAN
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, type: "spring", stiffness: 80, damping: 20 }}
                    className="text-display block text-gradient-main tracking-tighter"
                  >
                    ELLORA
                  </motion.span>
                </h1>

                {/* Role Pills Row */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap gap-2.5 mb-8"
                  id="role-pills-container"
                >
                  {[
                    "Business Analyst", 
                    "Decision Intelligence", 
                    "Business Analytics", 
                    "Artificial Intelligence", 
                    "Business Intelligence"
                  ].map((p, idx) => (
                    <span 
                      key={idx}
                      className="border border-[var(--border)] hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] rounded-md px-3.5 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-all duration-200"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                    >
                      {p}
                    </span>
                  ))}
                </motion.div>

                {/* Verbatim Subheading Prose */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-body-lg mb-10 max-w-[540px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  MSc Business Analytics candidate at UCD Smurfit with industry experience applying Python, SQL, statistical analysis and AI to solve operational and financial decision-making problems delivering <strong className="text-[var(--text-primary)] font-bold hover:text-[var(--accent-blue)] transition-colors">€2.6M</strong> in annual cost savings, <strong className="text-[var(--text-primary)] font-bold">35%</strong> reduction in stockouts and <strong className="text-[var(--text-primary)] font-bold">40%</strong> faster reporting through analytics-driven solutions.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-4 items-center mb-10"
                >
                  <a
                    href="#impact"
                    onClick={(e) => handleSmoothScroll(e, 'impact')}
                    className="btn-primary px-8 py-[13px] text-[14.5px] font-semibold shadow-xl transition-all inline-flex items-center gap-2 group hover:scale-[1.03] duration-150"
                  >
                    Explore My Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href="https://linkedin.com/in/sudarshane"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost px-8 py-[13px] text-[14.5px] inline-flex items-center gap-2 font-semibold hover:scale-[1.02] duration-150"
                  >
                    LinkedIn ↗
                  </a>

                  <a
                    href="/resume"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost px-8 py-[13px] text-[14.5px] font-semibold hover:scale-[1.02] duration-150"
                  >
                    Download Resume
                  </a>
                </motion.div>

                {/* Status Strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex flex-wrap gap-x-6 gap-y-2 mt-2 pt-4 border-t border-[rgba(255,255,255,0.05)] text-[13px] font-medium"
                  style={{ color: 'var(--text-dim)' }}
                >
                  <span>📍 Dublin, Ireland</span>
                  <span>🎓 UCD Smurfit — MSc Business Analytics</span>
                  <span>🟢 Available 2026</span>
                </motion.div>

              </div>

              {/* Right Column (45%) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative items-center py-8">
                
                {/* Floating Core Card */}
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
                  transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-[300px] h-[365px] rounded-[20px] bg-[linear-gradient(145deg,rgba(79,126,255,0.06)_0%,rgba(124,92,252,0.04)_100%)] border border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden relative shadow-2xl z-20 hover:border-[rgba(255,255,255,0.18)] transition-all duration-300"
                >
                  {/* Photo area with actual professional headshot */}
                  <div className="h-[220px] w-full relative overflow-hidden select-none border-b border-[rgba(255,255,255,0.05)] bg-[var(--bg-raised)]">
                    <img 
                      src={profileImg} 
                      alt="Sudarshan Ellora Professional Portrait" 
                      className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-500 hover:scale-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle top/bottom overlay/shading */}
                    <div className="absolute inset-x-0 bottom-0 h-10 w-full opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '10px 10px' }} />
                  </div>

                  {/* Identification texts */}
                  <div className="flex-1 p-[22px] flex flex-col justify-center">
                    <h3 className="font-sans font-semibold text-base leading-snug">Sudarshan Ellora</h3>
                    <p className="font-sans text-[13px] leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Business Analyst · UCD Smurfit
                    </p>
                    <span className="font-sans text-xs leading-relaxed mt-2 uppercase tracking-wide flex items-center gap-1.5" style={{ color: 'var(--text-dim)' }}>
                      <MapPin className="w-3 h-3 text-[var(--accent-blue)]" /> Dublin, Ireland
                    </span>
                  </div>
                </motion.div>

                {/* Glow Backdrop */}
                <div 
                  className="absolute z-10 w-[420px] h-[420px] rounded-full pointer-events-none filter blur-[48px]"
                  style={{
                    background: 'radial-gradient(circle, rgba(79,126,255,0.09) 0%, transparent 70%)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />

                {/* Animated Node Connection Canvas/SVG */}
                <svg className="nodes-svg absolute w-[360px] h-[360px] z-0 opacity-30 select-none pointer-events-none transform origin-center">
                  <circle cx="100" cy="80" r="3" fill="var(--accent-blue)" />
                  <circle cx="280" cy="110" r="3.5" fill="var(--accent-blue)" />
                  <circle cx="240" cy="290" r="3" fill="var(--accent-blue)" />
                  <circle cx="70" cy="260" r="4" fill="var(--accent-blue)" />
                  <circle cx="180" cy="50" r="2.5" fill="var(--accent-blue)" />
                  <circle cx="150" cy="320" r="3.5" fill="var(--accent-blue)" />

                  <line x1="100" y1="80" x2="280" y2="110" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="280" y1="110" x2="240" y2="290" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="240" y1="290" x2="150" y2="320" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="150" y1="320" x2="70" y2="260" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="70" y1="260" x2="100" y2="80" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="180" y1="50" x2="280" y2="110" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                  <line x1="100" y1="80" x2="180" y2="50" stroke="rgba(79,126,255,0.12)" strokeWidth="1" />
                </svg>

              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 select-none">
              <div className="w-[2px] h-[36px] bg-[linear-gradient(180deg,#4f7eff,#7c5cfc)] pulse-opacity rounded-full block" />
              <span className="text-label text-[10px] color-text-dim lowercase tracking-[3px] pr-[3px]">scroll to explore</span>
            </div>
          </section>

          {/* SECTION 2: IMPACT STATS */}
          <section 
            id="impact" 
            className="py-24 relative" 
            style={{ backgroundColor: 'var(--bg-raised)' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Dual-layer header animation */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">VERIFIED OUTCOMES</p>
                <h2 className="text-h2 color-text-primary mb-4">Business Impact Delivered</h2>
                <p className="font-sans text-body-lg max-w-[550px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Every metric is verified from live professional engagements not estimates.
                </p>
              </div>

              {/* 6 KPI Cards responsive grid */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
              >
                {kpiCards.map((card, i) => {
                  const isDec = card.value.includes('.');
                  return (
                    <motion.div
                      variants={fadeInUp}
                      key={i}
                      className="custom-card relative p-8 cursor-default flex flex-col group overflow-visible"
                    >
                      {/* Interactive top custom glow indicator */}
                      <div className="absolute top-0 inset-x-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none" style={{ background: 'var(--gradient-main)' }} />
                      
                      {/* Metric Display Counter */}
                      <div className="text-display tracking-tight text-gradient-main font-black leading-none mb-4 flex items-baseline">
                        <Counter value={card.value} isDecimal={isDec} />
                      </div>

                      <h4 className="font-sans font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                        {card.label}
                      </h4>
                      <p className="font-sans text-xs uppercase tracking-wider font-semibold opacity-60 mb-10" style={{ color: 'var(--accent-blue)' }}>
                        {card.source}
                      </p>

                      {/* Explicit Tooltip block */}
                      <div className="absolute top-4 right-4 text-xs font-mono select-none" style={{ color: 'var(--text-dim)' }}>
                        ✨
                      </div>

                      {/* Tooltip trigger animation */}
                      <div className="absolute bottom-4 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-30 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] shadow-[0_12px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
                        <p className="font-sans text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                          {card.tooltip}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* DECISION INTELLIGENCE LAB (ROI SIMULATOR) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 p-8 md:p-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] relative overflow-hidden"
              >
                {/* Background decorative grid */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]" style={{ backgroundSize: '16px 16px' }} />

                <div className="relative z-10 flex flex-col xl:flex-row gap-12 items-start">
                  
                  {/* Left Column: Interactive Controls (50%) */}
                  <div className="w-full xl:w-1/2 flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                      <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-[var(--accent-teal)]">Interactive Sandbox</span>
                    </div>
                    <h3 className="font-serif text-[24px] md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                      Decision Intelligence Lab
                    </h3>
                    <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                      Adjust the key operational parameters below to simulate how systems automation, diagnostic noise-filtration, and stakeholder alignment multiply into direct financial savings and efficiency.
                    </p>

                    {/* Slider 1: Sales / Admin Automation */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[var(--accent-blue)]" />
                          Sales & Quality Workflow Automation
                        </span>
                        <span className="font-mono text-sm font-bold text-[var(--accent-blue)]">{automationLevel}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={automationLevel}
                        onChange={(e) => setAutomationLevel(parseInt(e.target.value))}
                        className="w-full h-1.5 rounded-lg bg-[var(--border)] accent-[var(--accent-blue)] cursor-pointer focus:outline-none"
                      />
                      <p className="font-sans text-[11.5px] text-[var(--text-dim)] mt-1.5 leading-normal">
                        Reduces manual reporting turnaround and order validation latency across department units.
                      </p>
                    </div>

                    {/* Slider 2: Forecasting Signal Filtration */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[var(--accent-teal)]" />
                          Predictive Signal Quality & Noise Filtration
                        </span>
                        <span className="font-mono text-sm font-bold text-[var(--accent-teal)]">{forecastAccuracy}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={forecastAccuracy}
                        onChange={(e) => setForecastAccuracy(parseInt(e.target.value))}
                        className="w-full h-1.5 rounded-lg bg-[var(--border)] accent-[var(--accent-teal)] cursor-pointer focus:outline-none"
                      />
                      <p className="font-sans text-[11.5px] text-[var(--text-dim)] mt-1.5 leading-normal">
                        Screens historical sales anomalies to produce clean modeling inputs the systems can trust.
                      </p>
                    </div>

                    {/* Slider 3: Stakeholder Alignment */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-[var(--accent-purple)]" />
                          Organizational Decision Alignment
                        </span>
                        <span className="font-mono text-sm font-bold text-[var(--accent-purple)]">{stakeholderAlignment}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={stakeholderAlignment}
                        onChange={(e) => setStakeholderAlignment(parseInt(e.target.value))}
                        className="w-full h-1.5 rounded-lg bg-[var(--border)] accent-[var(--accent-purple)] cursor-pointer focus:outline-none"
                      />
                      <p className="font-sans text-[11.5px] text-[var(--text-dim)] mt-1.5 leading-normal">
                        Aligns Finance and Quality leads to challenge allocation bias and prevent project overruns.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Real-time Outcomes (50%) */}
                  <div className="w-full xl:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                    
                    {/* Simulated KPI Card 1 */}
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] flex flex-col justify-between text-left">
                      <div>
                        <div className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">Simulated Annual Savings</div>
                        <div className="font-serif text-[28px] md:text-3.5xl font-black text-[var(--accent-blue)] mb-3">
                          €{((automationLevel / 100 * 1.4) + (forecastAccuracy / 100 * 1.2)).toFixed(2)}M
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1">
                          <motion.div 
                            className="h-full bg-[var(--accent-blue)]"
                            animate={{ width: `${((automationLevel * 1.4 + forecastAccuracy * 1.2) / 2.6).toFixed(0)}%` }}
                            transition={{ type: "spring", stiffness: 80 }}
                          />
                        </div>
                        <span className="text-[10px] font-sans text-[var(--text-secondary)]">Max Capacity: €2.60M</span>
                      </div>
                    </div>

                    {/* Simulated KPI Card 2 */}
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] flex flex-col justify-between text-left">
                      <div>
                        <div className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">Simulated Stockout Drop</div>
                        <div className="font-serif text-[28px] md:text-3.5xl font-black text-[var(--accent-teal)] mb-3">
                          {Math.round(forecastAccuracy / 100 * 35)}%
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1">
                          <motion.div 
                            className="h-full bg-[var(--accent-teal)]"
                            animate={{ width: `${forecastAccuracy}%` }}
                            transition={{ type: "spring", stiffness: 80 }}
                          />
                        </div>
                        <span className="text-[10px] font-sans text-[var(--text-secondary)]">Max Capacity: 35% reduction</span>
                      </div>
                    </div>

                    {/* Simulated KPI Card 3 */}
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] flex flex-col justify-between text-left">
                      <div>
                        <div className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">Hours Reclaimed / Qtr</div>
                        <div className="font-serif text-[28px] md:text-3.5xl font-black text-[var(--accent-purple)] mb-3">
                          {Math.round(automationLevel / 100 * 200)}h
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1">
                          <motion.div 
                            className="h-full bg-[var(--accent-purple)]"
                            animate={{ width: `${automationLevel}%` }}
                            transition={{ type: "spring", stiffness: 80 }}
                          />
                        </div>
                        <span className="text-[10px] font-sans text-[var(--text-secondary)]">Max Capacity: 200+ hours</span>
                      </div>
                    </div>

                    {/* Simulated KPI Card 4 */}
                    <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] flex flex-col justify-between text-left">
                      <div>
                        <div className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">Budget Overrun Saved</div>
                        <div className="font-serif text-[28px] md:text-3.5xl font-black text-white dark:text-white mb-3" style={{ color: 'var(--text-primary)' }}>
                          {Math.round(stakeholderAlignment / 100 * 20)}%
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden mb-1">
                          <motion.div 
                            className="h-full bg-[var(--text-primary)]"
                            animate={{ width: `${stakeholderAlignment}%` }}
                            transition={{ type: "spring", stiffness: 80 }}
                          />
                        </div>
                        <span className="text-[10px] font-sans text-[var(--text-secondary)]">Max Capacity: 20% reduction</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Analytical breakdown footer */}
                <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                  <span className="font-mono text-xs text-[var(--text-dim)] text-left">
                    [System Status] Prescriptive DSS Model Online · 0.00ms latency
                  </span>
                  <div className="flex gap-4">
                    <span className="text-[11px] font-sans font-medium text-[var(--accent-teal)]">✓ Multi-Criteria Decision Framework</span>
                    <span className="text-[11px] font-sans font-medium text-[var(--accent-blue)]">✓ Verified Business ROI Mapping</span>
                  </div>
                </div>

              </motion.div>

            </div>
          </section>

          {/* SECTION 3: ABOUT */}
          <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              
              {/* Column 1: Enhanced Portrait Card (col-span-4) */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-stretch gap-6 self-start">
                <div className="relative w-[280px] h-[340px] md:w-[325px] md:h-[395px] lg:w-full lg:h-[365px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[var(--bg-raised)] shadow-2xl group">
                  <img 
                    src={profileImg} 
                    alt="Sudarshan Ellora" 
                    className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-500 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle profile gradient & label overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-left flex flex-col justify-end">
                    <span className="text-[10px] font-mono tracking-widest text-[var(--accent-teal)] uppercase mb-0.5">MSc Candidate</span>
                    <h3 className="font-sans font-bold text-base text-white">Sudarshan Ellora</h3>
                    <p className="font-sans text-[11px] text-gray-300">Dublin, Ireland</p>
                  </div>
                </div>

                {/* Verification & Location Badge Cards */}
                <div className="flex flex-col gap-3.5 font-sans text-[11.5px] leading-relaxed text-[var(--text-secondary)] bg-[rgba(255,255,255,0.01)] border border-[var(--border)] rounded-xl p-4.5 w-full max-w-[280px] md:max-w-[325px] lg:max-w-full">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-blue)] shrink-0" />
                    <span>Dublin, Ireland (Available Globally)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--accent-teal)] shrink-0" />
                    <span>MSc Business Analytics — UCD Smurfit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    <span>UCD Advantage & Future Skills Awardee</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Narrative Biography (col-span-4) */}
              <div className="lg:col-span-4 flex flex-col text-left">
                <p className="text-label color-accent-blue mb-2.5">BEYOND ANALYTICS</p>
                <h2 className="text-h2 color-text-primary mb-6" style={{ fontSize: "clamp(22px, 3.5vw, 28px)", lineHeight: "1.25" }}>I Help Businesses Make Better Decisions</h2>
                <div className="w-[48px] h-[2px] rounded-full mb-6" style={{ background: 'var(--gradient-main)' }} />

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col gap-5 text-[13.5px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <motion.p variants={fadeInUp}>
                    I bridge the gap between <span className="text-[#4f7eff] font-medium">raw data and confident decision-making</span>. My background in Electronics & Communication Engineering gave me a rigorous, systems-level way of thinking one I've applied directly to business operations, supply chains, financial planning, and AI governance.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    At Wired Mode, I didn't just build dashboards. I mapped where decisions were breaking down, identified which data patterns were trustworthy enough to act on, and translated analytical findings into recommendations that delivered €2.6M in savings and 200+ reclaimed man-hours per quarter.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    At Stonehouse Marketing, I specialize in <span className="text-[#4f7eff] font-medium">Product Carbon Footprint (PCF) data analysis</span> and forecasting in accordance with the <span className="text-[#4f7eff] font-medium">GHG Protocol</span> designing compliant, structured, and <span className="text-[#4f7eff] font-medium">GDPR-aligned data pipelines</span> to enable precise environmental reporting and predictive carbon analytics.
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    I believe the hardest part of analytics is not building the model. It's knowing what question to ask, <span className="text-[#4f7eff] font-medium">which signals to trust</span>, and how to communicate uncertainty to decision-makers clearly.
                  </motion.p>
                </motion.div>
              </div>

              {/* Column 3: Analytical Framework Flow (col-span-4) */}
              <div className="lg:col-span-4 relative flex flex-col pl-0 lg:pl-4 self-start">
                <div className="text-label tracking-[3px] color-text-dim uppercase text-[11px] mb-8 select-none">
                  My Analytical Framework
                </div>

                {/* Vertically Connecting Steps */}
                <div className="flex flex-col relative">
                  {frameworkSteps.map((step, idx) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 100 }}
                      className="flex items-start gap-4 pb-[22px] relative group"
                    >
                      {/* Connection Line */}
                      {idx !== frameworkSteps.length - 1 && (
                        <div className="absolute top-[40px] left-[20px] w-[2px] h-[calc(100%-4px)] pointer-events-none" style={{ backgroundColor: 'var(--border)' }} />
                      )}

                      {/* Icon */}
                      <div 
                        className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center font-serif text-base select-none transition-transform duration-300 group-hover:scale-105 z-10"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        {step.emoji}
                      </div>

                      {/* Label details */}
                      <div className="flex-1 pt-1.5">
                        <h4 className="font-sans font-semibold text-sm leading-tight text-[var(--text-primary)] mb-0.5">{step.title}</h4>
                        <p className="font-sans text-[12px] leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4: EXPERIENCE / TIMELINE */}
          <section 
            id="journey" 
            className="py-24 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-raised)' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="mb-16">
                <p className="text-label color-accent-blue mb-2.5">PROFESSIONAL FOOTPRINT</p>
                <h2 className="text-h2 color-text-primary mb-3">Business Challenges I've Solved</h2>
                <p className="font-sans text-body-lg" style={{ color: 'var(--text-secondary)' }}>
                  Every engagement treated as a consulting mission with a measurable outcome.
                </p>
              </div>

              {/* Connecting stacked experience container */}
              <div 
                ref={timelineContainerRef} 
                className="max-w-[900px] mx-auto relative flex flex-col gap-12 mt-4 pl-8 md:pl-12"
              >
                {/* Scroll-driven Progress Indicator Line */}
                <div 
                  className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] origin-top opacity-30 pointer-events-none"
                  style={{ backgroundColor: 'var(--border)' }}
                />
                <div 
                  ref={timelineProgressRef}
                  className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[2px] origin-top bg-[linear-gradient(to_bottom,#4f7eff,#7c5cfc)] pointer-events-none"
                />

                {/* Engagement cards */}
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="relative exp-card group">
                    
                    {/* Floating attachment point identifier */}
                    <div 
                      className="absolute left-[-34px] md:left-[-46px] top-2.5 w-2.5 h-2.5 rounded-full z-10"
                      style={{ background: 'var(--gradient-main)' }}
                    />

                    {/* Consulting Card Wrapper */}
                    <div className="custom-card p-6 md:p-10 flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] rounded-2xl relative shadow-xl transition-all duration-300">
                      
                      {/* Card meta tags */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                          <span className="text-label text-[10.5px] text-[var(--text-secondary)] block tracking-widest uppercase mb-1 font-bold">
                            {exp.company} · {exp.location}
                          </span>
                          <h3 className="font-serif text-[21px] md:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 md:text-right">
                          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
                            {exp.period}
                          </span>
                          {exp.badge && (
                            <span className="px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-wider border border-[rgba(0,201,167,0.25)] bg-[rgba(0,201,167,0.06)] text-[var(--accent-teal)]">
                              {exp.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Business Context block */}
                      <div 
                        className="py-4 px-5 rounded-r-lg border-l-3 border-[var(--accent-blue)] mb-6"
                        style={{ background: 'var(--bg-surface)' }}
                      >
                        <p className="font-sans text-[13.5px] md:text-sm leading-relaxed text-[var(--text-secondary)]">
                          {exp.businessContext}
                        </p>
                      </div>

                      {/* Checklist Responsibility Bullets */}
                      <ul className="flex flex-col gap-3.5 mb-8">
                        {exp.bullets.map((bullet, k) => (
                          <li key={k} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 select-none mt-2.5" style={{ backgroundColor: 'var(--accent-blue)' }} />
                            <span className="font-sans text-[13.5px] md:text-sm leading-relaxed text-[var(--text-secondary)]">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Horizontal Tech Tag Wrap */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.techStack.map((tech, z) => (
                          <span 
                            key={z}
                            className="px-2.5 py-1 text-[11px] font-mono leading-none rounded"
                            style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Highlighted Cyan Impact block */}
                      <div 
                        className="p-4 md:p-5 rounded-xl border border-[rgba(0,201,167,0.18)] flex items-center gap-3.5"
                        style={{ backgroundColor: 'rgba(0,201,167,0.03)' }}
                      >
                        <Activity className="w-5 h-5 text-[var(--accent-teal)] shrink-0 animate-pulse" />
                        <p className="font-sans text-[12.5px] md:text-xs font-semibold leading-relaxed tracking-wide text-[var(--accent-teal)] uppercase">
                          {exp.impactCallout}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Professional Experience & Internships Section */}
              <div className="max-w-[900px] mx-auto mt-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-6">
                  <div>
                    <h3 className="font-serif text-[20px] md:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                      Additional Industry & Leadership Experience
                    </h3>
                    <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1">
                      Click on any role to expand achievements, analytical methodologies, and quantitative outcomes.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                    <span className="font-sans text-[11px] font-semibold text-[var(--text-secondary)] tracking-wider uppercase">
                      Expandable History
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {previousExperienceData.map((exp, kIdx) => (
                    <CollapsibleExperienceCard key={kIdx} exp={exp} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4.5: TESTIMONIALS */}
          <section id="testimonials" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">TRUSTED RECOMMENDATIONS</p>
                <h2 className="text-h2 color-text-primary mb-3">LinkedIn Testimonials</h2>
                <p className="font-sans text-body-lg max-w-[550px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Verified recommendations from directors, academic coordinators, and stakeholders on professional engagements.
                </p>
              </div>

              {/* Slider Panel with Quote Frame */}
              <div className="relative min-h-[380px] md:min-h-[340px] flex flex-col justify-between p-8 md:p-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
                <Quote className="absolute top-6 left-6 w-24 h-24 text-[var(--accent-blue)] opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonialIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <p className="font-sans text-[#7a8ba8] text-base md:text-[17px] leading-relaxed italic text-left mb-8 min-h-[160px] md:min-h-[120px]">
                      "{testimonialsData[activeTestimonialIdx].text}"
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-[var(--border)] pt-8">
                      <div className="flex items-center gap-4 text-left">
                        {/* Avatar initials with background color mapping */}
                        <div className="w-[50px] h-[50px] rounded-full bg-[linear-gradient(135deg,#4f7eff_0%,#7c5cfc_100%)] flex items-center justify-center font-serif text-sm font-bold text-white shadow-md">
                          {testimonialsData[activeTestimonialIdx].avatar}
                        </div>
                        <div>
                          <h4 className="font-sans text-base font-bold text-[var(--text-primary)]">
                            {testimonialsData[activeTestimonialIdx].name}
                          </h4>
                          <p className="font-sans text-[12px] text-[var(--text-secondary)] font-medium">
                            {testimonialsData[activeTestimonialIdx].title} · <strong className="text-[var(--accent-blue)]">{testimonialsData[activeTestimonialIdx].company}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end text-left sm:text-right">
                        <span className="font-sans text-[11px] font-bold tracking-wider uppercase text-[var(--accent-teal)] bg-[rgba(0,201,167,0.06)] border border-[rgba(0,201,167,0.2)] px-2.5 py-1 rounded-full mb-1">
                          {testimonialsData[activeTestimonialIdx].relationship}
                        </span>
                        <span className="font-mono text-[10.5px] text-[var(--text-dim)]">
                          Recommendation Date: {testimonialsData[activeTestimonialIdx].date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Action Arrows and Status Bubbles */}
                <div className="flex items-center justify-between mt-8 pt-4">
                  
                  {/* Bullet indicators */}
                  <div className="flex gap-2">
                    {testimonialsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonialIdx(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none cursor-pointer ${activeTestimonialIdx === idx ? 'bg-[var(--accent-blue)] w-6' : 'bg-[var(--border)]'}`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation trigger button group */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                      className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface)] focus:outline-none transition-colors cursor-pointer"
                      aria-label="Previous Recommendation"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length)}
                      className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface)] focus:outline-none transition-colors cursor-pointer"
                      aria-label="Next Recommendation"
                    >
                      →
                    </button>
                  </div>
                </div>

              </div>

              {/* LinkedIn Verify Badge */}
              <div className="mt-8 flex justify-center">
                <a 
                  href="https://linkedin.com/in/sudarshane" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0a66c2]/35 bg-[#0a66c2]/8 hover:bg-[#0a66c2]/16 text-[#0a66c2] text-xs font-semibold tracking-wide uppercase font-sans transition-all focus:outline-none cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 fill-[#0a66c2]" />
                  Verify on LinkedIn Profile ↗
                </a>
              </div>

            </div>
          </section>

          {/* SECTION 5: ANALYTICS PROJECTS */}
          <section id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">RESEARCH & APPLIED LABS</p>
                <h2 className="text-h2 color-text-primary mb-3">Analytics Projects</h2>
                <p className="font-sans text-body-lg max-w-[620px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Nine projects spanning AI architecture, governance, forecasting, optimisation, and financial analytics.
                </p>
              </div>

              {/* Dynamic Horizontal Auto-Scrolling Carousel */}
              <div className="relative group/projects">
                {/* Left navigation arrow */}
                <button 
                  onClick={() => {
                    projectsContainerRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
                  }}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center justify-center opacity-0 group-hover/projects:opacity-100 transition-opacity duration-300 shadow-lg cursor-pointer focus:outline-none focus:ring-0"
                  aria-label="Previous Projects"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {/* Right navigation arrow */}
                <button 
                  onClick={() => {
                    projectsContainerRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
                  }}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center justify-center opacity-0 group-hover/projects:opacity-100 transition-opacity duration-300 shadow-lg cursor-pointer focus:outline-none focus:ring-0"
                  aria-label="Next Projects"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Horizontal scrolling viewport */}
                <div 
                  ref={projectsContainerRef}
                  onMouseEnter={() => setProjectsIsHovered(true)}
                  onMouseLeave={() => setProjectsIsHovered(false)}
                  className="flex overflow-x-auto scrollbar-hide snap-x gap-6 py-6 px-1"
                  style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {projectItems.map((proj, idx) => (
                    <motion.div
                      key={idx}
                      className="min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start custom-card p-8 flex flex-col bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.06)] rounded-xl relative overflow-hidden group shadow-md shrink-0 select-none hover:translate-y-[-6px] transition-all duration-300"
                    >
                      {/* Top hover indicator */}
                      <div className="absolute top-0 inset-x-0 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--gradient-main)' }} />

                      {/* Meta section */}
                      <div className="flex items-center gap-3.5 mb-6">
                        <div 
                          className="w-11 h-11 rounded-lg flex items-center justify-center font-serif text-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] select-none z-10"
                          style={{ backgroundColor: 'var(--bg-raised)' }}
                        >
                          {proj.icon}
                        </div>

                        <span className="font-sans text-[11px] font-semibold uppercase tracking-wider block" style={{ color: idx % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)' }}>
                          {proj.type}
                        </span>
                      </div>

                      <h3 className="font-sans font-bold text-base leading-snug text-[var(--text-primary)] mb-2.5">
                        {proj.title}
                      </h3>

                      <p className="font-sans text-[13.5px] leading-relaxed text-[var(--text-secondary)] mb-6">
                        {proj.description}
                      </p>

                      {/* Tech tag list */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {proj.stack.map((tag, k) => (
                          <span 
                            key={k}
                            className="px-2 py-0.5 text-[10px] font-mono rounded"
                            style={{ color: 'var(--text-secondary)', background: 'var(--bg-raised)', border: '1px solid var(--border)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Custom Sweep glow sweep effect */}
                      <div className="absolute inset-0 w-full h-full shimmer-sweep pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 6: TOOLKIT */}
          <section 
            id="toolkit" 
            className="py-24 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-raised)' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">INTELLIGENCE SUITE</p>
                <h2 className="text-h2 color-text-primary mb-3">Technical Toolkit</h2>
                <p className="font-sans text-body-lg max-w-[600px] mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  State-of-the-art analytical engines, cloud models, and automation patterns applied to production business problems.
                </p>
              </div>

              {/* Dynamic Horizontal Auto-Scrolling Carousel */}
              <div className="relative group/toolkit">
                {/* Left navigation arrow */}
                <button 
                  onClick={() => {
                    toolkitContainerRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
                  }}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center justify-center opacity-0 group-hover/toolkit:opacity-100 transition-opacity duration-300 shadow-lg cursor-pointer focus:outline-none focus:ring-0"
                  aria-label="Previous Toolkit"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {/* Right navigation arrow */}
                <button 
                  onClick={() => {
                    toolkitContainerRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
                  }}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] flex items-center justify-center opacity-0 group-hover/toolkit:opacity-100 transition-opacity duration-300 shadow-lg cursor-pointer focus:outline-none focus:ring-0"
                  aria-label="Next Toolkit"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Horizontal scrolling viewport */}
                <div 
                  ref={toolkitContainerRef}
                  onMouseEnter={() => setToolkitIsHovered(true)}
                  onMouseLeave={() => setToolkitIsHovered(false)}
                  className="flex overflow-x-auto scrollbar-hide snap-x gap-6 py-6 px-1"
                  style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                  {
                    category: "Programming & Engineering",
                    icon: <Code className="w-5 h-5 text-[#4f7eff]" />,
                    description: "Production pipelines, ETL flows, and custom automation scripts.",
                    badge: "Core Engine",
                    accentColor: "bg-[#4f7eff]",
                    borderColor: "hover:border-[#4f7eff]/40",
                    skills: ["Python (Pandas, NumPy, Matplotlib)", "SQL (BigQuery, PostgreSQL)", "ETL Pipelines"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-center justify-center p-3 border border-[var(--border)] font-mono text-[10px] text-left text-[var(--text-secondary)]">
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#4f7eff] animate-ping" />
                        <div className="w-full">
                          <span className="text-[#4f7eff]">import</span> pandas <span className="text-[#4f7eff]">as</span> pd<br/>
                          df = pd.read_gbq(<span className="text-[#00c9a7]">"sales_forecast"</span>)<br/>
                          model.fit(df.clean_signals())
                        </div>
                      </div>
                    )
                  },
                  {
                    category: "Forecasting & Optimisation",
                    icon: <TrendingUp className="w-5 h-5 text-[#00c9a7]" />,
                    description: "Prescriptive models, time-series forecasting, and mathematical solvers.",
                    badge: "Prescriptive",
                    accentColor: "bg-[#00c9a7]",
                    borderColor: "hover:border-[#00c9a7]/40",
                    skills: ["Statistical Analysis", "Time-Series Forecasting (ETS)", "Linear Programming", "MCDA Theory", "Network Theory", "Confidence Intervals", "ANOVA testing"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-center justify-center border border-[var(--border)]">
                        <svg className="w-[85%] h-12" viewBox="0 0 100 30" fill="none">
                          <path d="M0,15 Q15,4 30,22 T60,8 T90,18 T100,10" stroke="var(--accent-blue)" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-40" />
                          <path d="M0,15 Q15,1 30,19 T60,5 T90,14 T100,6" stroke="var(--accent-teal)" strokeWidth="1.7" className="animate-pulse" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    category: "Modern Visualisation",
                    icon: <BarChart3 className="w-5 h-5 text-[#cf9c18]" />,
                    description: "High-end corporate dashboards and real-time operations telemetry.",
                    badge: "Executive",
                    accentColor: "bg-[#cf9c18]",
                    borderColor: "hover:border-[#cf9c18]/40",
                    skills: ["Tableau Desktop", "Power BI", "Looker Studio", "Streamlit Apps", "Plotly Graphics"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-end justify-around p-3 border border-[var(--border)]">
                        <div className="h-[45%] w-[12%] rounded-t bg-[#cf9c18]/60 transition-all hover:bg-[#cf9c18]" />
                        <div className="h-[80%] w-[12%] rounded-t bg-[#4f7eff]/60 transition-all hover:bg-[#4f7eff]" />
                        <div className="h-[60%] w-[12%] rounded-t bg-[#00c9a7]/80 transition-all hover:bg-[#00c9a7]" />
                        <div className="h-[95%] w-[12%] rounded-t bg-[var(--text-primary)]/40 transition-all" />
                        <div className="h-[35%] w-[12%] rounded-t bg-stone-500/30 transition-all" />
                      </div>
                    )
                  },
                  {
                    category: "Cloud & Warehouse Assets",
                    icon: <Database className="w-5 h-5 text-[#7c5cfc]" />,
                    description: "Secure data warehouses, active pipelines, and system configuration.",
                    badge: "Scale & Trust",
                    accentColor: "bg-[#7c5cfc]",
                    borderColor: "hover:border-[#7c5cfc]/40",
                    skills: ["Google Cloud Platform", "Microsoft Azure", "Office 365 Pro", "Google Dataflow", "Governance Standards"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-center justify-around px-4 border border-[var(--border)] font-mono text-[9px] text-[var(--text-secondary)]">
                        <div className="px-2 py-1 rounded bg-[#7c5cfc]/10 border border-[#7c5cfc]/20 text-[#7c5cfc] font-bold">GCP</div>
                        <span>⟷</span>
                        <div className="px-2 py-1 rounded bg-[#00c9a7]/10 border border-[#00c9a7]/20 text-[#00c9a7] font-bold">Lakehouse</div>
                        <span>⟷</span>
                        <div className="px-2 py-1 rounded bg-blue-600/10 border border-blue-500/20 text-blue-500 font-bold">BI</div>
                      </div>
                    )
                  },
                  {
                    category: "Responsible AI & Systems",
                    icon: <Shield className="w-5 h-5 text-[#4f7eff]" />,
                    description: "Probabilistic LLM models bound by deterministic compliance gates.",
                    badge: "Security-First",
                    accentColor: "bg-[#4f7eff]",
                    borderColor: "hover:border-[#4f7eff]/40",
                    skills: ["LLM Integration (LLaMA3, Ollama)", "Human-in-the-Loop Safeguards", "Pipeline Auditability", "Schema Metadata Lineage", "Data Readiness Gates"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-center justify-between px-3 border border-[var(--border)]">
                        <div className="flex flex-col text-left">
                          <span className="text-[8px] font-mono uppercase tracking-wider text-[#00c9a7]">OLLAMA3 REASONER</span>
                          <span className="text-[10px] font-sans font-bold text-[var(--text-primary)]">Human Verification Active</span>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00c9a7] animate-pulse" />
                      </div>
                    )
                  },
                  {
                    category: "Prompt Engineering & GenAI",
                    icon: <Terminal className="w-5 h-5 text-[#00c9a7]" />,
                    description: "Advanced context assembly, alignment safeguards, and prompt pattern compilation.",
                    badge: "Context Design",
                    accentColor: "bg-[#00c9a7]",
                    borderColor: "hover:border-[#00c9a7]/40",
                    skills: ["Claude", "Google AI Studio", "Gemini", "GPT (GPT-4o)"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex flex-col justify-center px-3 border border-[var(--border)] font-mono text-[9px] text-left">
                        <div className="flex items-center justify-between text-[8px] uppercase text-[#00c9a7] font-semibold mb-1">
                          <span>SYSTEM TEMPLATE</span>
                          <span className="w-1.5 h-1.5 bg-[#00c9a7] rounded-full animate-pulse" />
                        </div>
                        <div className="truncate text-[10.5px] text-[var(--text-primary)]">
                          "System: You are an agentic compiler in UCD... [Temp=0.1]"
                        </div>
                      </div>
                    )
                  },
                  {
                    category: "Business Strategy & Consulting",
                    icon: <Layers className="w-5 h-5 text-[#cf9c18]" />,
                    description: "Cross-functional consulting, process mapping, and strategic value trees.",
                    badge: "C-Suite Alignment",
                    accentColor: "bg-[#cf9c18]",
                    borderColor: "hover:border-[#cf9c18]/40",
                    skills: ["Stakeholder Facilitation", "Process Optimization", "Decision Support Systems", "Root Cause Analysis", "KPI Value Trees", "Collaborative Roadmaps"],
                    renderGraphic: () => (
                      <div className="h-16 w-full rounded-lg bg-black/5 dark:bg-black/25 relative overflow-hidden flex items-center justify-center border border-[var(--border)] font-mono text-[9px]">
                        <div className="flex gap-2 items-center text-[var(--text-dim)]">
                          <span className="text-[#00c9a7] font-bold">RAW DATA</span>
                          <span>➔</span>
                          <span className="text-[#4f7eff] font-bold">STATISTICS</span>
                          <span>➔</span>
                          <span className="text-[#cf9c18] font-bold">DECIDED ACTION</span>
                        </div>
                      </div>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--bg-raised)] ${item.borderColor} transition-all duration-350 flex flex-col group relative overflow-hidden shadow-sm shrink-0 select-none`}
                  >
                    {/* Glowing Accent line top left */}
                    <div className={`absolute top-0 left-0 w-16 h-[2px] ${item.accentColor} opacity-70`} />

                    {/* Badge & Icon Title row */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border)] flex items-center justify-center">
                          {item.icon}
                        </div>
                        <h3 className="font-sans font-bold text-[15px] text-[var(--text-primary)]">
                          {item.category}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-[var(--border)] text-[var(--text-dim)]">
                        {item.badge}
                      </span>
                    </div>

                    <p className="font-sans text-[12.5px] leading-relaxed text-[var(--text-secondary)] text-left mb-6">
                      {item.description}
                    </p>

                    {/* Graphic Feature */}
                    <div className="mb-6 w-full">
                      {item.renderGraphic()}
                    </div>

                    {/* List tag chips */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--border)]/40">
                      {item.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-[var(--bg-surface)] hover:bg-black/5 dark:hover:bg-white/5 border border-[var(--border)] text-[11px] font-sans font-medium text-[var(--text-primary)] transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            </div>
          </section>

          {/* SECTION 7: EDUCATION */}
          <section id="education" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">ACADEMIC FOUNDATION</p>
                <h2 className="text-h2 color-text-primary">Education</h2>
              </div>

              {/* Two Premium Stacked Cards */}
              <div className="max-w-[820px] mx-auto flex flex-col gap-8 relative mt-4">
                
                {educationData.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="custom-card p-8 md:p-10 flex flex-col md:flex-row gap-6 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] hover:translate-x-1 duration-300 rounded-xl relative overflow-hidden"
                  >
                    {/* Left Accent indicator line wrapper */}
                    <div className="absolute top-0 bottom-0 left-0 w-[4px]" style={{ background: 'var(--gradient-main)' }} />

                    {/* Main Degree Meta column */}
                    <div className="flex-1 pl-2">
                      <div className="flex flex-wrap items-baseline gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold font-sans uppercase bg-[rgba(0,201,167,0.08)] text-[var(--accent-teal)] border border-[rgba(0,201,167,0.2)]">
                          Grade: {edu.gradeBadge}
                        </span>
                        
                        <span className="font-sans text-xs font-medium uppercase tracking-wider text-[var(--text-dim)] ml-auto">
                          {edu.period}
                        </span>
                      </div>

                      <h3 className="font-serif text-[20px] md:text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-2 leading-snug">
                        {edu.degree}
                      </h3>
                      <h4 className="font-sans text-sm font-semibold tracking-wide color-accent-blue mb-1">
                        {edu.school}
                      </h4>
                      <p className="font-sans text-[12.5px] font-medium text-[var(--text-dim)] leading-relaxed mb-6">
                        📍 {edu.location}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="flex flex-col gap-2.5">
                        {edu.highlights.map((hlt, hidx) => (
                          <li key={hidx} className="flex items-start gap-2.5">
                            <span className="text-[var(--accent-blue)] text-sm leading-none shrink-0 mt-[1px]">✦</span>
                            <span className="font-sans text-[13px] md:text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                              {hlt}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}

              </div>

            </div>
          </section>

          {/* SECTION 7B: AWARDS & ACHIEVEMENTS */}
          <section id="awards" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">BEYOND THE CLASSROOM</p>
                <h2 className="text-h2 color-text-primary mb-3">Awards &amp; Achievements</h2>
                <p className="font-sans text-body-lg" style={{ color: 'var(--text-secondary)' }}>
                  Recognition, leadership and research from UCD Smurfit and my engineering degree.
                </p>
              </div>

              {Array.from(new Set(achievementsData.map((a) => a.group))).map((group) => (
                <div key={group} className="mb-12 last:mb-0">
                  <h3 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-dim)] mb-5">
                    {group}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {achievementsData.filter((a) => a.group === group).map((item, idx) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ delay: (idx % 2) * 0.06 }}
                        className="custom-card p-6 md:p-7 flex flex-col gap-3 relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl group transition-all hover:translate-y-[-4px]"
                      >
                        <div className="absolute top-0 inset-x-0 h-[2px] rounded-full bg-[linear-gradient(90deg,#4f7eff,#7c5cfc)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start gap-3">
                          <span className="text-2xl leading-none shrink-0" aria-hidden="true">{item.icon}</span>
                          <div>
                            <h4 className="font-sans font-semibold text-[15px] leading-snug text-[var(--text-primary)]">{item.title}</h4>
                            <p className="font-sans text-[12px] font-medium text-[var(--accent-blue)] mt-0.5">{item.org}</p>
                          </div>
                        </div>
                        {item.highlight && (
                          <p className="font-sans text-[13px] font-semibold leading-snug px-3 py-2 rounded-lg bg-[rgba(0,201,167,0.08)] text-[var(--accent-teal)] border border-[rgba(0,201,167,0.2)]">
                            🏆 {item.highlight}
                          </p>
                        )}
                        <p className="font-sans text-[13px] md:text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                          {item.description}
                        </p>
                        {item.link && (
                          <a href={item.link.href} target="_blank" rel="noreferrer" className="font-sans text-[13px] font-semibold text-[var(--accent-blue)] hover:underline w-fit">
                            {item.link.label} ↗
                          </a>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                          {item.tags.map((t) => (
                            <span key={t} className="font-sans text-[11px] font-medium px-2 py-0.5 rounded-md text-[var(--text-dim)] bg-[var(--bg-raised)] border border-[var(--border)]">{t}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: CERTIFICATIONS */}
          <section 
            id="certifications" 
            className="py-24 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-raised)' }}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-16">
                <p className="text-label color-accent-blue mb-2.5">ACCREDITATIONS</p>
                <h2 className="text-h2 color-text-primary mb-3">Certifications</h2>
                <p className="font-sans text-body-lg" style={{ color: 'var(--text-secondary)' }}>
                  Credentials from Google, Bloomberg, JPMorgan, BCG, Deloitte, McKinsey, and SAP.
                </p>
              </div>

              {/* 4 Column Grid */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {certificationsData.map((cert, idx) => {
                  const isCompleted = cert.status === 'Completed';
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10px" }}
                      transition={{ delay: (idx % 4) * 0.05 }}
                      className="custom-card p-6 flex flex-col justify-between hover:translate-y-[-4px] relative bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl group transition-all"
                    >
                      {/* Top accent glow line */}
                      <div className="absolute top-0 inset-x-0 h-[2px] rounded-full bg-[linear-gradient(90deg,#4f7eff,#7c5cfc)] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Company Logo and Issuer block */}
                        <div className="flex items-center gap-3 mb-4">
                          {getCompanyLogo(cert.org)}
                          <div className="text-label text-[10px] text-[var(--text-dim)] tracking-wider uppercase font-extrabold">
                            {cert.org}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-sans font-semibold text-[13.5px] leading-snug text-[var(--text-primary)] mb-6">
                          {cert.name}
                        </h4>
                      </div>

                      {/* Status indicator badge */}
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-[var(--accent-teal)]' : 'bg-[var(--accent-gold)] animate-pulse'}`} />
                        <span className="font-sans text-[11px] font-bold tracking-wide uppercase" style={{ color: isCompleted ? 'var(--accent-teal)' : 'var(--accent-gold)' }}>
                          {cert.status}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* SECTION 9: CONTACT */}
          <section id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
              
              <div className="text-center mb-10">
                <p className="text-label color-accent-blue mb-2.5">GET IN TOUCH</p>
                <h2 className="text-h2 color-text-primary mb-3">Let's Connect</h2>
                <p className="font-sans text-body-lg max-w-[500px] mx-auto text-[var(--text-secondary)]">
                  Interact with the Decision Intelligence Terminal, type commands, or trigger fast shortcut presets to print credentials.
                </p>
              </div>

              {/* Terminal Window simulator */}
              <div className="w-full rounded-2xl border border-[var(--border)] bg-[#0c101a] shadow-2xl overflow-hidden text-left font-mono text-[13px] leading-relaxed relative">
                
                {/* Terminal Header Bar */}
                <div className="bg-[#161b26] px-5 py-3.5 flex items-center justify-between border-b border-[var(--border)] select-none">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[11px] text-[var(--text-dim)] font-bold font-sans tracking-wide">
                    guest@sudarshan: ~ (terminal)
                  </div>
                  <div className="w-12 h-1" /> {/* Spacer spacer */}
                </div>

                {/* Terminal Logs container */}
                <div className="p-6 md:p-8 h-[360px] overflow-y-auto flex flex-col gap-3 scrollbar-thin text-stone-200">
                  {terminalHistory.map((log, lIdx) => (
                    <div key={lIdx} className="w-full">
                      {log.type === 'input' && (
                        <div className="text-[#4f7eff] font-bold">
                          {log.text}
                        </div>
                      )}

                      {log.type === 'system' && (
                        <div className="text-neutral-400 italic">
                          {log.text}
                        </div>
                      )}

                      {log.type === 'error' && (
                        <div className="text-[#ff5f56] font-bold">
                          {log.text}
                        </div>
                      )}

                      {log.type === 'output' && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-0.5 border-b border-indigo-950/20 hover:bg-neutral-900/40 px-2 rounded transition-colors">
                          <span className="text-white font-medium select-all">
                            {log.text}
                          </span>
                          
                          {/* Rich inline interactive triggers */}
                          <div className="flex gap-2.5 items-center select-none text-[11px]">
                            {log.link && (
                              <a 
                                href={log.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#00c9a7] font-semibold hover:underline bg-[#00c9a7]/10 px-2 py-0.5 rounded border border-[#00c9a7]/20"
                              >
                                {log.actionText || 'Open Link'} ↗
                              </a>
                            )}
                            {log.copyValue && (
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(log.copyValue);
                                  showToast("Copied phone number to clipboard!");
                                }}
                                className="text-[#4f7eff] font-semibold hover:underline bg-[#4f7eff]/10 px-2 py-0.5 rounded border border-[#4f7eff]/20 cursor-pointer focus:outline-none"
                              >
                                {log.actionText || 'Copy'}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Terminal Live Command Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTerminalCommand(terminalInput);
                  }}
                  className="bg-[#080b12] border-t border-[var(--border)] px-6 py-4 flex items-center gap-2"
                >
                  <label htmlFor="terminal-input" className="text-[#4f7eff] font-bold select-none whitespace-nowrap">
                    guest@sudarshan:~$
                  </label>
                  <input 
                    id="terminal-input"
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder='Type "help" or click presets...'
                    className="flex-1 bg-transparent border-none text-white outline-none focus:outline-none focus:ring-x-0 font-mono text-[13px] p-0 caret-transparent"
                    autoComplete="off"
                  />
                  {/* Retro-modern flashing cursor */}
                  <span className="w-2 h-4 bg-[#00c9a7] animate-blink shrink-0 -ml-1 inline-block" />
                </form>

              </div>

              {/* Clickable Quick-Commands preset lists */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 w-full max-w-xl">
                {[
                  { cmd: 'help', label: 'ℹ️ help' },
                  { cmd: 'contact', label: '📱 contact' },
                  { cmd: 'about', label: '💼 about' },
                  { cmd: 'linkedin', label: '🔗 linkedin' },
                  { cmd: 'github', label: '💻 github' },
                  { cmd: 'projects', label: '📂 projects' },
                  { cmd: 'clear', label: '🧹 clear' }
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      setTerminalInput(preset.cmd);
                      handleTerminalCommand(preset.cmd);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] hover:bg-[var(--border-hover)] text-xs text-[var(--text-primary)] font-semibold tracking-wider font-sans cursor-pointer focus:outline-none hover:translate-y-[-1px] transition-all"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Closing statement paragraph verbatim */}
              <p className="font-sans text-sm md:text-base leading-relaxed text-[var(--text-secondary)] max-w-[600px] mt-16 pt-6 border-t border-[var(--border)]/60 text-center">
                I'm always happy to discuss Business Analytics, AI, Decision Intelligence, consulting opportunities, graduate roles, research collaborations, or innovative projects.
              </p>

            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-10 border-t border-[var(--border)] relative bg-[var(--bg-raised)]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-[var(--text-secondary)]">
              
              <div className="font-sans text-[13px] flex items-center gap-2">
                <span>© 2026 Sudarshan Ellora</span>
                <span className="opacity-40">|</span>
                <span>Version 3</span>
              </div>

              {/* Links and anchor buttons */}
              <div className="flex items-center gap-6">
                <a 
                  href="https://linkedin.com/in/sudarshane" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-sans text-[13px] hover:text-[var(--accent-blue)] transition-colors"
                >
                  LinkedIn
                </a>
                
                <a 
                  href="mailto:sudarshan.ellora@ucdconnect.ie" 
                  className="font-sans text-[13px] hover:text-[var(--accent-blue)] transition-colors"
                >
                  Email
                </a>

                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-sans text-[13px] uppercase tracking-wider font-semibold hover:text-[var(--accent-blue)] focus:outline-none transition-colors cursor-pointer"
                >
                  ↑ Back to Top
                </button>
              </div>

            </div>
          </footer>
        </>
      )}
    </div>
  );
}
