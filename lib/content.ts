// All site copy lives here. Edit this file to make the portfolio yours.

export const site = {
  name: "Carrie B. Analytics",
  tagline: "Data analyst · Manhattan",
  description:
    "Analytics portfolio — SQL, Python, and dashboards dressed well enough that executives read them in public.",
  email: "hello@placeholder.com",
};

export const nav = [
  { href: "/", label: "Column" },
  { href: "/work", label: "Case files" },
  { href: "/closet", label: "The closet" },
  { href: "/about", label: "About" },
];

export const stats = [
  { value: "4.2B", label: "rows queried" },
  { value: "23", label: "dashboards live" },
  { value: "180+", label: "dbt models owned" },
  { value: "6 yrs", label: "in analytics" },
];

export type Project = {
  slot: string;
  kicker: string;
  year: string;
  title: string;
  teaser: string;
  blurb: string;
  result: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slot: "Dashboard shot",
    kicker: "Retention",
    year: "2026",
    title: "The churn nobody wanted to name",
    teaser: "A cohort model that found the real cancellation trigger three steps before checkout.",
    blurb:
      "Stakeholders blamed price. A cohort model on 2.4M accounts found the real trigger: a three-step verification flow buried before checkout.",
    result: "Churn down 18% the quarter after the fix.",
    tags: ["SQL", "dbt", "Cohort analysis"],
  },
  {
    slot: "Chart shot",
    kicker: "Revenue",
    year: "2025",
    title: "Four signatures, one broken join",
    teaser: "Rebuilt the revenue pipeline and reconciled it to the cent against finance.",
    blurb:
      "Monthly revenue reporting had been overstating enterprise renewals for two quarters. Rebuilt the pipeline with tests and a reconciliation view finance could audit.",
    result: "Reconciled to the cent; sign-off cut from 5 days to 1.",
    tags: ["Snowflake", "Data quality", "Looker"],
  },
  {
    slot: "Notebook shot",
    kicker: "Experimentation",
    year: "2025",
    title: "When the A/B test was lying",
    teaser: "Sample-ratio mismatch caught before a redesign shipped to everyone.",
    blurb:
      "A sample-ratio mismatch made a redesign look like a 9% lift. Built a pre-launch diagnostics notebook the team now runs on every test.",
    result: "Stopped a full rollout on bad data.",
    tags: ["Python", "Statistics", "Experimentation"],
  },
  {
    slot: "Model shot",
    kicker: "Forecasting",
    year: "2024",
    title: "A demand forecast ops actually trusted",
    teaser: "A seasonal model shipped with its uncertainty band so planners could see the risk.",
    blurb:
      "Replaced a spreadsheet forecast with a seasonal model, then shipped the uncertainty band alongside it so planners could see the risk.",
    result: "Forecast error down from 22% to 9%.",
    tags: ["Python", "Time series", "Tableau"],
  },
];

export const featured = projects.slice(0, 3);

export const skills = [
  { name: "SQL", note: "the little black dress", pct: 95 },
  { name: "Python / pandas", note: "everyday tailoring", pct: 88 },
  { name: "dbt & modelling", note: "structure underneath", pct: 85 },
  { name: "Statistics", note: "never overdressed", pct: 78 },
  { name: "Dashboard design", note: "the accessory that matters", pct: 92 },
];

export const stackGroups = [
  { name: "Warehouses", items: ["Snowflake", "BigQuery", "Postgres", "Redshift"] },
  { name: "Transform", items: ["dbt", "Airflow", "SQLMesh"] },
  { name: "Analysis", items: ["pandas", "scikit-learn", "statsmodels", "Jupyter"] },
  { name: "Visualisation", items: ["Looker", "Tableau", "Power BI", "Plotly"] },
];

export const jobs = [
  { role: "Senior data analyst", years: "2023—", detail: "Growth and retention analytics; owns the subscription data model." },
  { role: "Data analyst", years: "2021—23", detail: "Built the first reporting layer and the experimentation review process." },
  { role: "Analyst, operations", years: "2019—21", detail: "Supply and demand reporting for a logistics team of 60." },
];

export const facts = [
  { k: "Based", v: "New York, remote" },
  { k: "Studied", v: "MSc Statistics" },
  { k: "Domains", v: "Subscription, retail" },
  { k: "Available", v: "From Q1" },
];

export const links = [
  { k: "Email", v: "hello@placeholder.com", href: "mailto:hello@placeholder.com" },
  { k: "LinkedIn", v: "/in/placeholder", href: "https://www.linkedin.com/in/placeholder" },
  { k: "GitHub", v: "/placeholder", href: "https://github.com/placeholder" },
  { k: "Résumé", v: "download PDF", href: "/resume.pdf" },
];
