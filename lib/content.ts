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
  sections?: Section[];
  result: string;
  tags: string[];
};

// Building blocks for a long-form case file. Each section is a titled chunk
// of the write-up; its blocks render top to bottom in the order you list them.
export type Block =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; columns: string[]; rows: string[][]; caption?: string };

export type Section = {
  title: string;
  blocks: Block[];
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
    sections: [
      {
        title: "Aims and Objectives",
        blocks: [
          { type: "paragraph", text: "My goal for this assignment is to use machine learning to build models that predict properties of foods from their nutrient data, and to compare how well different supervised models do this on unseen data. The dataset I used is the Australian Food Composition Database (AFCD), which lists the nutrient content per 100 g of common foods." },
          { type: "paragraph", text: "I looked at two prediction tasks. First, classification: predict a food's group (e.g. dairy, cereal, fruit) from its nutrients, comparing a Random Forest against Logistic Regression. Second, regression: predict a continuous nutrient value, comparing Linear Regression, a Random Forest regressor and an MLP neural network on an easy target (energy) and a hard target (calcium). On top of that, I tested whether PCA (dimensionality reduction) helps as a preprocessing step for the classifiers." },
          { type: "paragraph", text: "I wanted to do classification with random forest and logistic regression because random forest is non-linear and captures feature interactions, whereas logistic regression draws mostly linear boundaries, and also because the food group target was already available in the data (classification code). I chose three models (Linear, RF and MLP) because they form a nice complexity ladder, from simple linear to non-linear to a flexible neural net. It is a nice experiment to try, and it lets you show a strong, significant conclusion." },
        ],
      },
      {
        title: "Data Understanding and Preprocessing",
        blocks: [
          { type: "paragraph", text: "The raw dataset contains 1,588 foods with up to 268 nutrient columns. Before modelling, the data was examined and prepared. Several decisions follow directly from its characteristics." },
          { type: "paragraph", text: "The missing values are bimodal: 60 columns are completely full and 65 have under 20% missing, while 116 are over 80% empty. So I dropped any column with 20% or more missing, since a near-empty column can't really be imputed in a meaningful way, and filled the small remainder with the column median, which holds up well against the big outliers you get in nutrient data. The food groups are also really imbalanced, the biggest has 355 foods and the smallest just one, so I removed groups with fewer than 20 foods so the stratified split would actually work, and I report macro-averaged F1 alongside accuracy. This left me with 1,551 foods, 65 nutrient features and 17 groups." },
          { type: "image", src: "/eda.png", alt: "Bar chart of food group sizes with a drop threshold at 20 foods", caption: "Figure 1. Food group sizes. Groups in red (<20 foods) were removed before modelling." },
          { type: "paragraph", text: "Two other things mattered for picking models. The feature values differ by hundreds of thousands of times in scale (grams vs micrograms), so I standardised everything before any scale-sensitive model. And 18 feature pairs are correlated above 0.9 (e.g. Protein and Nitrogen), which means there's redundancy in the data, and that's the reason I wanted to test PCA later." },
        ],
      },
      {
        title: "Task 1: Classification, Predicting Food Group",
        blocks: [
          { type: "paragraph", text: "I compared the two classifiers on a 25% held-out test set, using a stratified split so the class proportions stay the same. I tuned the Random Forest with 4-fold cross-validation (scoring on macro-F1), and trained logistic regression on the standardised features. Both used balanced class weights to deal with the imbalance." },
          {
            type: "table",
            columns: ["Model", "Test accuracy", "Macro-F1"],
            rows: [
              ["Random Forest (tuned)", "92.3%", "0.87"],
              ["Logistic Regression", "88.4%", "0.81"],
            ],
          },
          { type: "paragraph", text: "The Random Forest beat logistic regression. That makes sense to me, because the relationship between nutrients and food group is non-linear and full of interactions, which trees can capture but a linear model can't. The trade-off is interpretability: you can read logistic regression's coefficients directly, whereas with the forest you only get an indirect picture through feature importances." },
          { type: "image", src: "/importance.png", alt: "Top 12 Random Forest feature importances", caption: "Figure 2. Random Forest feature importances. Fat, energy and carbohydrate dominate." },
          { type: "paragraph", text: "The confusion matrix shows the predictions are mostly right (strong diagonal). The errors pile up in the smaller groups, which I'd expect, because there are fewer examples to learn their patterns from, and that's exactly why accuracy on its own would be misleading here." },
          { type: "image", src: "/confusion.png", alt: "Random Forest confusion matrix of true vs predicted food group", caption: "Figure 3. Random Forest confusion matrix. Off-diagonal errors cluster in small groups." },
          { type: "paragraph", text: "Based on the matrix, the off-diagonal smudge that stands out to me is in the true group 24 row, there's a faint cell where some group 24 foods get predicted as group 16. Group 24 (vegetables & legumes) predicted as Group 16 (fruit)." },
          { type: "paragraph", text: "The median nutrient profiles are pretty much the same side by side on every axis. Both are near-zero fat, low protein, modestly fibrous, low energy which is the classic “fresh plant food” signature. A model leaning on the nutrients like moisture, fat, energy sees two things that look almost identical. That's why the one feature that should separate them is sugar." },
          { type: "paragraph", text: "Fruit sits at 10.8 g (apples, the ripe-sweet stuff) while veg/legumes sit at 2.2 g. But here's the catch: group 24 is huge and varied. It contains sweet items like raw carrots, beetroot, and peas alongside starchy beans and potato starch. So the sugar boundary between “sweet fruit” and “kinda-sweet vegetable” is genuinely blurry at the edges. A raw carrot or a sweet pea, nutritionally, really does look a lot like an under-ripe fruit, high water, low fat, a bit of fibre, a little natural sugar. That overlap is exactly where the off-diagonal smudge comes from." },
          { type: "paragraph", text: "So the model is basically running into a real botanical-vs-culinary problem. “Fruit” and “vegetable” are cooking categories, not nutritional ones (a tomato being the famous example), so a classifier that only reads nutrients is always going to mix the sweeter, wetter vegetables in with the fruit." },
          {
            type: "table",
            columns: ["Nutrient", "Group 16 (Fruit)", "Group 24 (Veg/Legumes)"],
            rows: [
              ["Moisture", "84.2 g", "88.2 g"],
              ["Protein", "0.7 g", "2.1 g"],
              ["Fat", "0.1 g", "0.2 g"],
              ["Fibre", "2.2 g", "2.8 g"],
              ["Energy", "226 kJ", "148 kJ"],
            ],
          },
        ],
      },
      {
        title: "Task 1b: Does PCA Help the Classifiers?",
        blocks: [
          { type: "paragraph", text: "Since the features are redundant, I tested PCA as a preprocessing step. I trained each classifier on the full 65 features and then on PCA-reduced features at 80/90/95/99% retained variance, with PCA inside a Pipeline so it only ever gets fit on the training data." },
          { type: "image", src: "/pca.png", alt: "Macro-F1 against number of PCA components for Random Forest and Logistic Regression", caption: "Figure 4. Macro-F1 with vs without PCA. The dashed 'no PCA' baselines sit above the PCA curves." },
          { type: "paragraph", text: "PCA did not improve either model. In fact both did slightly worse with it. This is the expected result, not a failure. PCA shrinks the data by keeping the directions where the numbers vary the most, but “varies a lot” is not the same as “useful for telling food groups apart.” So when PCA throws away 20% of the variation to compress the data, some of what it discards is actually helpful signal." },
          { type: "paragraph", text: "The Random Forest is affected negatively the most. Tree models are already good at ignoring repeated or overlapping features, since at each step they just pick the most useful one. So PCA's main benefit, removing redundancy, fixes a problem the forest never had, while making its job harder by blending all the clean, easy-to-read features (like fat or sugar) into mixed-up combinations that don't line up neatly with any food group." },
          { type: "paragraph", text: "Notice too that the dashed “no PCA” baselines stay above the PCA curves all the way across, even at 39 components, where 99% of the variation is kept. PCA never catches up. That rules out the obvious excuse of “we just didn't keep enough components” and confirms the real cause: the lost information mattered for prediction. For this dataset, PCA simply isn't a helpful preprocessing step, even though the features are correlated." },
        ],
      },
      {
        title: "Task 2: Regression, Predicting a Continuous Nutrient",
        blocks: [
          { type: "paragraph", text: "For the regression task the target is a number, so I compared three regressors: Linear Regression, a Random Forest regressor and an MLP neural network (two hidden layers, 128 and 64 units). I measured performance with R² (1 = perfect, 0 = no better than just predicting the mean, negative = worse than the mean) and mean absolute error (MAE). I picked two targets to show the contrast." },
          { type: "subheading", text: "Easy target: energy from macronutrients" },
          { type: "paragraph", text: "Predicting a food's energy (kJ) from its macronutrients is almost trivial, because energy is by definition a weighted sum of the macros (the Atwater factors). All three models scored near-perfectly:" },
          {
            type: "table",
            columns: ["Model", "R²", "MAE (kJ)"],
            rows: [
              ["Linear Regression", "1.000", "8"],
              ["Random Forest", "0.993", "32"],
              ["MLP", "0.997", "29"],
            ],
          },
          { type: "image", src: "/rege.png", alt: "Predicted vs actual energy, points lying on the diagonal", caption: "Figure 5. Energy prediction (best model). Points lie almost exactly on the diagonal." },
          { type: "paragraph", text: "Linear regression even recovers the known Atwater coefficients (~37 kJ/g fat, ~17 for protein and carbohydrate, ~29 alcohol). So a near-perfect score here isn't actually impressive, because the target is literally built out of the inputs." },
          { type: "subheading", text: "Hard target: calcium from other nutrients" },
          { type: "paragraph", text: "Predicting calcium (mg) from all the other nutrients is genuinely hard, because there's no simple formula linking calcium to the other measurements. Here the models split apart sharply:" },
          {
            type: "table",
            columns: ["Model", "R²", "MAE (mg)"],
            rows: [
              ["Random Forest", "0.67", "35"],
              ["MLP", "0.16", "59"],
              ["Linear Regression", "−0.35", "66"],
            ],
          },
          { type: "image", src: "/regha.png", alt: "Predicted vs actual calcium, points scattered around the diagonal", caption: "Figure 6. Calcium prediction (best model = Random Forest)." },
          { type: "paragraph", text: "Only the Random Forest predicted calcium with any success. Linear Regression scored a negative R², meaning it did worse than simply guessing the average calcium value, because the relationship is non-linear and a single linear equation cannot fit it. The more powerful MLP also performed poorly, likely because the signal is weak and noisy relative to the number of features, so the network could not find it reliably." },
          { type: "paragraph", text: "I think the two targets together tell one story about matching the model to the problem. Energy was easy because it basically is a weighted sum of the macronutrients, so even the simplest model, linear regression, was already perfect, and I don't think a more powerful network could have added anything. Calcium was the opposite, there doesn't seem to be any formula linking it to the other nutrients, and forcing a straight line onto that gave the negative R²." },
          { type: "paragraph", text: "The Random Forest did best because it can pick up non-linear patterns, but my guess is that the bigger lesson is in the MLP also struggling, which points to the signal in the data being weak rather than the models not being powerful enough. So my takeaway is that the best model is the one whose assumptions fit the shape of the problem, a simple model wins when the relationship is simple, a complex one helps when it isn't, but I don't think any model can create predictive signal that the data doesn't actually contain." },
        ],
      },
      {
        title: "Summary of Results",
        blocks: [
          {
            type: "table",
            columns: ["Task", "Model", "Metric", "Result"],
            rows: [
              ["Classification", "Random Forest", "accuracy / F1", "92.3% / 0.87"],
              ["Classification", "Logistic Regression", "accuracy / F1", "88.4% / 0.81"],
              ["PCA test", "RF / LogReg", "best F1", "no-PCA"],
              ["Regression (easy)", "all three", "R²", "≈1.00"],
              ["Regression (hard)", "Random Forest", "R²", "0.67"],
              ["Regression (hard)", "Linear / MLP", "R²", "−0.35 / 0.16"],
            ],
          },
        ],
      },
      {
        title: "Discussion and Conclusion",
        blocks: [
          { type: "paragraph", text: "Across both tasks I kept hitting the same lesson which is, the best model depends on the structure of the problem. The Random Forest was the most reliable performer for me, since it won the classification task, wasn't hurt by skipping PCA, and was the only model that predicted calcium with any success, because it captures non-linear relationships and interactions without needing feature scaling or selection. The linear models only worked where the relationship genuinely was linear (energy from macros) and fell apart otherwise (calcium). And even though the MLP was the most flexible model, it didn't guarantee the best results, which shows me that raw capacity isn't enough when the signal is weak. My evaluation choices mattered too, macro-F1 and the confusion matrix exposed the weak performance on small classes that plain accuracy was hiding, and R² made the linear model's failure on calcium impossible to miss." },
        ],
      },
      {
        title: "Reflection",
        blocks: [
          { type: "paragraph", text: "The main thing I learned is that picking a model is not about going for the most powerful one, it is about matching the model to the shape of the problem. I set this up on purpose with the complexity ladder of linear, random forest and MLP, so I could run a clean experiment and show a strong conclusion either way. By the end I am convinced the data sets a ceiling on how well any model can do, and that a simple model can be unbeatable when the relationship is simple. That is a real shift from how I thought about ML before, where I assumed you just throw the biggest model at it and tune until the number goes up." },
          { type: "paragraph", text: "This links to a lot of the course content. The linear vs non-linear idea runs through the whole report, and the regression task is where I understood it best, because energy was perfect for linear regression while calcium was a disaster for it, so I saw both the win and the failure of a linear model. The PCA and calcium MLP results are really bias and variance stories even though I did not use those words: PCA throwing away useful signal adds bias, and the MLP failing on calcium because the signal is weak relative to the number of features is basically overfitting. I also used 4-fold cross validation to tune the random forest on macro-F1, and I put PCA inside the pipeline so it only ever sees the training data, which matters because otherwise you leak the test set. The negative R² idea finally clicked too, since R² is measured against just guessing the mean, so a negative value means the model did worse than the laziest possible baseline." },
          { type: "paragraph", text: "The hardest part was the calcium result, because the obvious story is that the MLP is the strongest model so it should win, and I had to accept that a low score was the correct answer and not something to fix. The preprocessing was also frustrating, working out what to do with the bimodal missing values, dropping the tiny food groups so the stratified split would work, and choosing macro-F1 over plain accuracy. What I understand now that I did not before is that a failed model can be the most honest result in a report, and that preprocessing is not free, because PCA looked reasonable on paper but testing it showed it actually hurt." },
        ],
      },
      {
        title: "References",
        blocks: [
          { type: "paragraph", text: "Lindholm, A., Wahlström, N., Lindsten, F., & Schön, T. B. (2022). Machine Learning: A First Course for Engineers and Scientists. Cambridge University Press." },
          { type: "paragraph", text: "Food Standards Australia New Zealand. Australian Food Composition Database (AFCD), Release 3." },
          { type: "paragraph", text: "Pedregosa et al. (2011). Scikit-learn: Machine Learning in Python. JMLR 12, 2825–2830." },
        ],
      },
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
