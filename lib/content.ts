// All site copy lives here. Edit this file to make the portfolio yours.

export const site = {
  name: "Maria Helga Grizelda",
  tagline: "Computer Science Graduate · Manhattan",
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
  image?: string | string[];
  kicker: string;
  year: string;
  title: string;
  teaser: string;
  blurb: string;
  details?: string[];
  result: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slot: "Dashboard shot",
    image: ["/confusion.png", "/importance.png", "/pca.png", "/eda.png", "/rege.png", "/regha.png"],
    kicker: "Machine Learning",
    year: "2026",
    title: "Predicting Food Properties from Nutrient Profiles",
    teaser: "A cohort model that found the real cancellation trigger three steps before checkout.",
    blurb:
      "A comparison of supervised ML models on the Australian Food Composition Database.",
    details: [
      "The Australian Food Composition Database holds nutrient profiles for thousands of foods — energy, macronutrients, vitamins, and minerals — but no single label that tells you what kind of food something is just from its numbers. The question: can a model predict a food's category (and properties like whether it's processed) from its nutrient profile alone?",
      "Data prep came first: cleaning inconsistent units, imputing missing micronutrient values, and standardising features so no single nutrient (looking at you, sodium) dominated distance-based models. PCA was used both to explore separability between food groups and to cut dimensionality before feeding the data into models sensitive to correlated features.",
      "Four model families were trained and compared on the same folds: Logistic Regression as a linear baseline, a Multi-Layer Perceptron for non-linear interactions, and Random Forest for a tree-based ensemble. Feature importance from the Random Forest run doubled as a sanity check — the nutrients it leaned on hardest were the ones a nutritionist would also point to first.",
      "Random Forest came out on top at 92.3% accuracy, beating the MLP and Logistic Regression baselines, with the confusion matrix showing most of the remaining errors clustered between food groups that are nutritionally similar (e.g. different processed grain products) rather than random noise.",
    ],
    result: "Random Forest outperformed other models with 92.3% accuracy",
    tags: ["Python", "scikit-learn", "pandas", "Random Foresrt", "MLP", "PCA", "Logistic Regression" ],
  },
  {
    slot: "Chart shot",
    kicker: "Revenue",
    year: "2025",
    title: "Four signatures, one broken join",
    teaser: "Rebuilt the revenue pipeline and reconciled it to the cent against finance.",
    blurb:
      "Monthly revenue reporting had been overstating enterprise renewals for two quarters. Rebuilt the pipeline with tests and a reconciliation view finance could audit.",
    details: [
      "Finance flagged a discrepancy between the revenue dashboard and the general ledger that had persisted for two closes without anyone tracing the root cause. The dashboard's enterprise renewal figures were consistently higher than what finance could tie back to signed contracts.",
      "Tracing the join chain back through the warehouse surfaced the issue: a fan-out join between the subscriptions and billing-events tables was duplicating renewal events whenever a contract had more than one amendment in a period, silently inflating revenue for any account with mid-cycle changes.",
      "Rebuilt the pipeline around a deduplicated events model with dbt tests asserting one row per contract per period, plus a reconciliation view that lines up warehouse totals against the ledger line by line so finance can audit it without asking an analyst to pull the number manually.",
      "Numbers now tie out to the cent on first pass, and the reconciliation view turned a five-day back-and-forth between finance and data into a same-day sign-off.",
    ],
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
    details: [
      "A homepage redesign test was reporting a 9% lift in conversion — strong enough that the team was ready to ship it to 100% of traffic. Before sign-off, a routine check of the assignment counts showed the split wasn't close to 50/50; it was closer to 54/46.",
      "That sample-ratio mismatch (SRM) meant the randomisation itself was broken, most likely because a client-side redirect in the treatment arm was dropping a slice of users before they got logged as assigned — exactly the users most likely to bounce. The 'lift' was actually a filtering artifact, not a treatment effect.",
      "Built a pre-launch diagnostics notebook that checks assignment ratios, novelty effects, and pre-period balance on covariates before any result gets read, so an SRM like this gets caught in minutes instead of surfacing after the team has already mentally committed to a number.",
      "The notebook is now a required step before any experiment readout, and it has since caught two more SRMs before they reached a rollout decision.",
    ],
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
    details: [
      "Demand planning ran on a spreadsheet forecast that applied a flat month-over-month growth rate, with no way to represent seasonality or the uncertainty baked into that assumption. Planners treated the single number as gospel, which meant every miss looked like a planning failure rather than an expected range.",
      "Replaced it with a seasonal time-series model fit on multiple years of order history, decomposing trend, yearly seasonality, and event-driven spikes (promotions, holidays) separately so each component could be validated against what ops already knew about the business.",
      "Rather than hand planners one number, the model shipped with its prediction interval alongside the point forecast, so a planner could see — and plan inventory buffers around — how wide the uncertainty actually was for a given week, instead of discovering it after the fact.",
      "Forecast error (MAPE) dropped from 22% to 9% against actuals, and the uncertainty band gave ops a defensible reason to hold or release safety stock instead of guessing.",
    ],
    result: "Forecast error down from 22% to 9%.",
    tags: ["Python", "Time series", "Tableau"],
  },
];

export const featured = projects.slice(0, 3);

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => slugify(p.title) === slug);
}

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
