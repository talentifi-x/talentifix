import type { PageKind } from "./types";

/**
 * Every planned page in the content set, with its id, path and parent. Pages
 * reference each other by id, so a link can be written before the target page
 * exists; it appears once the target is live. Paths are fixed here so URLs never
 * drift between the copy and the routes.
 */
export interface CatalogEntry {
  id: string;
  kind: PageKind;
  path: string;
  navLabel: string;
  /** Breadcrumb parent: another catalog id, or a static route. */
  parent?: string | { name: string; href: string };
  /** Where links to this page point while it is not live (e.g. a section of /solutions). */
  fallbackHref?: string;
}

const SOLUTIONS = { name: "Solutions", href: "/solutions" };

export const CATALOG: CatalogEntry[] = [
  // Hubs
  { id: "hub-talent", kind: "hub", path: "/talent", navLabel: "Technology talent" },
  { id: "hub-challenges", kind: "hub", path: "/hiring-challenges", navLabel: "Hiring challenges" },
  { id: "hub-intelligence", kind: "hub", path: "/hiring-intelligence", navLabel: "Hiring Intelligence" },
  { id: "hub-compare", kind: "hub", path: "/hiring-intelligence/compare", navLabel: "Hiring model comparisons", parent: "hub-intelligence" },

  // Talent specialisms
  { id: "talent-ai-ml", kind: "talent", path: "/talent/ai-machine-learning-talent", navLabel: "AI & Machine Learning", parent: "hub-talent" },
  { id: "talent-software", kind: "talent", path: "/talent/software-engineering-talent", navLabel: "Software Engineering", parent: "hub-talent" },
  { id: "talent-data", kind: "talent", path: "/talent/data-analytics-talent", navLabel: "Data & Analytics", parent: "hub-talent" },
  { id: "talent-cloud", kind: "talent", path: "/talent/cloud-devops-talent", navLabel: "Cloud & DevOps", parent: "hub-talent" },
  { id: "talent-cyber", kind: "talent", path: "/talent/cybersecurity-talent", navLabel: "Cybersecurity", parent: "hub-talent" },
  { id: "talent-erp", kind: "talent", path: "/talent/erp-sap-talent", navLabel: "ERP & SAP", parent: "hub-talent" },
  { id: "talent-product", kind: "talent", path: "/talent/product-digital-talent", navLabel: "Product & Digital", parent: "hub-talent" },

  // Solutions (hiring models)
  { id: "solution-it-staffing", kind: "solution", path: "/solutions/it-staffing", navLabel: "IT Staffing", parent: SOLUTIONS, fallbackHref: "/solutions" },
  { id: "solution-contract", kind: "solution", path: "/solutions/contract-staffing", navLabel: "Contract Staffing", parent: SOLUTIONS, fallbackHref: "/solutions#temporary-staffing" },
  { id: "solution-direct-hire", kind: "solution", path: "/solutions/direct-hire", navLabel: "Permanent / Direct Hire", parent: SOLUTIONS, fallbackHref: "/solutions#permanent-placement" },
  { id: "solution-contract-to-hire", kind: "solution", path: "/solutions/contract-to-hire", navLabel: "Contract-to-Hire", parent: SOLUTIONS, fallbackHref: "/solutions#contract-to-hire" },
  { id: "solution-executive-search", kind: "solution", path: "/solutions/executive-search", navLabel: "Executive Search", parent: SOLUTIONS, fallbackHref: "/solutions#executive-search" },
  { id: "solution-gcc", kind: "solution", path: "/solutions/gcc-talent-solutions", navLabel: "GCC Talent Solutions", parent: SOLUTIONS },

  // Markets
  { id: "market-usa", kind: "market", path: "/usa", navLabel: "IT Staffing in the USA" },
  { id: "market-usa-contract", kind: "market", path: "/usa/contract-staffing", navLabel: "Contract Staffing in the USA", parent: "market-usa" },
  { id: "market-houston", kind: "market", path: "/usa/houston-technology-staffing", navLabel: "Technology Staffing in Houston", parent: "market-usa" },
  { id: "market-india", kind: "market", path: "/india", navLabel: "IT Staffing in India" },
  { id: "market-india-contract", kind: "market", path: "/india/contract-staffing", navLabel: "Contract Staffing in India", parent: "market-india" },

  // Hiring challenges
  { id: "challenge-urgent", kind: "challenge", path: "/hiring-challenges/urgent-technology-hiring", navLabel: "Urgent Technology Hiring", parent: "hub-challenges" },
  { id: "challenge-quality", kind: "challenge", path: "/hiring-challenges/improve-candidate-quality", navLabel: "Improve Candidate Quality", parent: "hub-challenges" },
  { id: "challenge-hard-to-fill", kind: "challenge", path: "/hiring-challenges/hard-to-fill-technology-roles", navLabel: "Hard-to-Fill Technology Roles", parent: "hub-challenges" },
  { id: "challenge-project", kind: "challenge", path: "/hiring-challenges/project-based-technology-staffing", navLabel: "Project-Based Technology Staffing", parent: "hub-challenges" },
  { id: "challenge-flexible", kind: "challenge", path: "/hiring-challenges/flexible-workforce-solutions", navLabel: "Flexible Workforce Solutions", parent: "hub-challenges" },
  { id: "challenge-gcc-scale", kind: "challenge", path: "/hiring-challenges/build-scale-gcc-teams-india", navLabel: "Build & Scale GCC Teams in India", parent: "hub-challenges" },

  // Comparisons and decisions
  { id: "compare-contract-vs-permanent", kind: "comparison", path: "/hiring-intelligence/compare/contract-staffing-vs-permanent-hiring", navLabel: "Contract Staffing vs Permanent Hiring", parent: "hub-compare" },
  { id: "compare-contract-vs-c2h", kind: "comparison", path: "/hiring-intelligence/compare/contract-staffing-vs-contract-to-hire", navLabel: "Contract Staffing vs Contract-to-Hire", parent: "hub-compare" },
  { id: "compare-agency-vs-inhouse", kind: "comparison", path: "/hiring-intelligence/compare/staffing-agency-vs-in-house-recruitment", navLabel: "Staffing Agency vs In-House Recruitment", parent: "hub-compare" },
  { id: "compare-recruitment-vs-staffing", kind: "comparison", path: "/hiring-intelligence/compare/recruitment-agency-vs-staffing-agency", navLabel: "Recruitment Agency vs Staffing Agency", parent: "hub-compare" },
  { id: "compare-rpo-vs-staffing", kind: "comparison", path: "/hiring-intelligence/compare/rpo-vs-staffing-agency", navLabel: "RPO vs Staffing Agency", parent: "hub-compare" },
  { id: "compare-direct-vs-c2h", kind: "comparison", path: "/hiring-intelligence/compare/direct-hire-vs-contract-to-hire", navLabel: "Direct Hire vs Contract-to-Hire", parent: "hub-compare" },
  { id: "compare-cost", kind: "comparison", path: "/hiring-intelligence/compare/it-staffing-agency-cost", navLabel: "How Much Does an IT Staffing Agency Cost?", parent: "hub-compare" },

  // Buyer guides
  { id: "guide-executive-search", kind: "guide", path: "/hiring-intelligence/guides/how-to-choose-executive-search-firm", navLabel: "How to Choose an Executive Search Firm", parent: "hub-intelligence" },
  { id: "guide-ai-agency", kind: "guide", path: "/hiring-intelligence/guides/how-to-choose-ai-staffing-agency", navLabel: "How to Choose an AI Staffing Agency", parent: "hub-intelligence" },
  { id: "guide-questions", kind: "guide", path: "/hiring-intelligence/guides/questions-to-ask-staffing-agency", navLabel: "Questions to Ask a Staffing Agency", parent: "hub-intelligence" },

  // Definitions
  { id: "define-contract-staffing", kind: "definition", path: "/hiring-intelligence/what-is-contract-staffing", navLabel: "What Is Contract Staffing?", parent: "hub-intelligence" },
  { id: "define-contract-to-hire", kind: "definition", path: "/hiring-intelligence/what-is-contract-to-hire", navLabel: "What Is Contract-to-Hire?", parent: "hub-intelligence" },
  { id: "define-precision-hiring", kind: "definition", path: "/hiring-intelligence/what-is-precision-hiring", navLabel: "What Is Precision Hiring?", parent: "hub-intelligence" },
  { id: "define-talent-density", kind: "definition", path: "/hiring-intelligence/what-is-talent-density", navLabel: "What Is Talent Density?", parent: "hub-intelligence" },
  { id: "define-skills-based-hiring", kind: "definition", path: "/hiring-intelligence/what-is-skills-based-hiring", navLabel: "What Is Skills-Based Hiring?", parent: "hub-intelligence" },
  { id: "define-quality-of-hire", kind: "definition", path: "/hiring-intelligence/what-is-quality-of-hire", navLabel: "What Is Quality of Hire?", parent: "hub-intelligence" },
  { id: "define-ai-staffing-agency", kind: "definition", path: "/hiring-intelligence/what-is-an-ai-staffing-agency", navLabel: "What Is an AI Staffing Agency?", parent: "hub-intelligence" },
  { id: "define-fde", kind: "definition", path: "/hiring-intelligence/what-is-a-forward-deployed-engineer", navLabel: "What Is a Forward Deployed Engineer?", parent: "hub-intelligence" },
];

/** Site routes outside the content set that copy may link to. */
export const STATIC_ROUTES = [
  "/",
  "/about",
  "/solutions",
  "/solutions#temporary-staffing",
  "/solutions#permanent-placement",
  "/solutions#contract-to-hire",
  "/solutions#executive-search",
  "/blog",
  "/jobs",
  "/contact",
  "/media",
  "/start-hiring",
  "/join-our-network",
  "/insights/talentifi-x-gcc-summit-2026",
];
