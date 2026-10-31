// All site copy lives here. Edit this file to make the portfolio yours.

export const site = {
  name: "Maria Helga Grizelda",
  tagline: "Computer Science Graduate",
  description:
    "Computer Science double-degree graduate of the University of Queensland and Universitas Indonesia, interested in data, product management, finance and supply chain management.",
  email: "mariahelga423@gmail.com",
};

export const nav = [
  { href: "/", label: "Column" },
  { href: "/work", label: "Case files" },
  { href: "/closet", label: "The skill set" },
];

export type Project = {
  slot: string;
  image?: string | string[];
  kicker: string;
  year: string;
  title: string;
  blurb: string;
  details?: string[];
  sections?: Section[];
  // Buttons under the tags: external links (e.g. a live demo) or files in
  // /public. Set download: true for files so they save instead of opening.
  links?: { href: string; label: string; download?: boolean }[];
  result: string;
  tags: string[];
};

// Building blocks for a long-form case file. Each section is a titled chunk
// of the write-up; its blocks render top to bottom in the order you list them.
export type Block =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; columns: string[]; rows: string[][]; caption?: string };

export type Section = {
  title: string;
  blocks: Block[];
};

export const projects: Project[] = [
  {
    slot: "Dashboard shot",
    image: ["/nut.jpg"],
    kicker: "Machine Learning",
    year: "2026",
    title: "Predicting Food Properties from Nutrient Profiles",
    blurb:
      "A comparison of supervised ML models on the Australian Food Composition Database.",
    sections: [
      {
        title: "Aims and Objectives",
        blocks: [
          { type: "paragraph", text: "My goal for this project is to use machine learning to build models that predict properties of foods from their nutrient data, and to compare how well different supervised models do this on unseen data. The dataset I used is the Australian Food Composition Database (AFCD), which lists the nutrient content per 100 g of common foods." },
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
    tags: ["Python", "scikit-learn", "pandas", "Random Forest", "MLP", "PCA", "Logistic Regression" ],
  },
  {
    slot: "Chart shot",
    image: ["/shark.png", "/starfish.png", "/nemo.png", "/squid.png"],
    kicker: "Machine Learning",
    year: "2025",
    title: "OMarine : AI Rapid Sorting of Underwater Imagery",
    blurb:
      "A purpose-built platform for automated marine species detection and annotation, designed to support researchers in capturing and interpreting underwater biodiversity with precision.",
    links: [
      { href: "https://omarine.vercel.app/", label: "View live site" },
    ],
    sections: [
      {
        title: "Introduction",
        blocks: [
          { type: "subheading", text: "Overview" },
          { type: "paragraph", text: "OMarine is a web based application designed to identify and annotate sea objects in underwater images, videos and rosbag files. Underwater researchers capture vast amounts of video data regularly, but it is impractical to watch every frame. To overcome this, OMarine automatically detects sea objects in each frame, and displays the detections in a structured review interface that allows the researcher to validate, edit and augment detections." },
          { type: "paragraph", text: "Work is organised into projects, with two detection model options available. The Pretrained Model automatically detects objects from the start using an existing marine-trained checkpoint, and continues retraining every 10 newly approved frames to improve its accuracy over time. The Custom Model starts from scratch with no prior knowledge, relying entirely on manual annotation until the model has gathered enough data to begin generating its own detections." },
          { type: "subheading", text: "The Problem" },
          { type: "paragraph", text: "Marine ecological research has a growing data problem. Towed imaging systems can capture up to 50 kilometres of transect footage per day, yet globally less than 15% of the estimated 300,000 hours of collected underwater footage has been properly annotated by domain experts (Ma et al., 2024). For organisations like FFT, this backlog delays biodiversity assessments and forces conservation decisions to be made with incomplete information." },
          { type: "paragraph", text: "Underwater imagery also presents unique challenges for computer vision, including colour distortion, backscatter, motion blur, and natural camouflage, all of which degrade the performance of general-purpose models (Raine et al., 2024). Marine datasets are also class-imbalanced, with rare species underrepresented in training data, meaning models perform worst on the species researchers care most about detecting (PMC, 2022). These factors make full automation insufficient and human oversight essential." },
          { type: "subheading", text: "Innovation and Importance" },
          { type: "paragraph", text: "OMarine does not replace the researcher but significantly increases what they can accomplish. By automating the initial detection pass through the Pretrained Model, the platform removes the most time-consuming part of annotation and lets researchers focus on reviewing and refining results rather than starting from scratch on every frame. For projects requiring a more tailored approach, the Custom Model allows researchers to build detection capability from the ground up using their own data. Both models continuously retrain as more approved frames are added, meaning the platform becomes more accurate the more it is used." },
          { type: "paragraph", text: "Beyond detection, the platform includes semantic search to locate similar frames within the same project, and track detection for video and rosbag files, where researchers can view, reassign, delete, or manually create tracks across frames. Together these features support the full annotation workflow, not just the initial detection step, making large-scale marine data processing genuinely feasible." },
        ],
      },
      {
        title: "Project Goals and Design Process",
        blocks: [
          { type: "subheading", text: "Meeting the Project Goals" },
          { type: "paragraph", text: "The project goal is for the development of a web-based annotation assistance platform that would focus on four key aspects: object detection and grouping; semantic search and filtering; interactive researcher review interface; and context of use." },
          { type: "paragraph", text: "OMarine's detection pipeline processes uploaded documentation, and creates a structured review queue with bounding boxes around detected objects, for object detection and grouping. The Custom Model is manually annotated to create detection capability, and the Pretrained Model uses a marine-trained checkpoint to automatically detect objects from the beginning. Both are continually retraining as additional approved frames are added." },
          { type: "paragraph", text: "Researchers can retrieve similar frames within the same project by semantic similarity, which is much faster than browsing manually through large collections, in order to use semantic search and filtering." },
          { type: "paragraph", text: "Using the frame review interface, the researchers can approve, edit, delete and add detections for the interactive review interface. This is further extended by track detection for video and rosbag files, which allow researchers to view, re-assign, delete or create tracks across frames." },
          { type: "paragraph", text: "Last, OMarine is a browser-based application, without requiring installation, as required in the brief. Different surveys and deployments are managed independently in the project-based structure." },
          { type: "subheading", text: "Design Process" },
          { type: "paragraph", text: "The design process was iterative, with decisions made by structured user testing with six participants who performed the following tasks: project creation, file upload, and detection review." },
          { type: "paragraph", text: "The overall results were favorable, with an average rating of approximately 8.5 (on a scale of 10 points) for usability. Testing found that the add bounding box button was small and hard to find, and that editing a detection by double-clicking was not intuitive without an edit button. Another participant also had some confusion about the upload to review phase. The results were used to make changes to the annotation toolbar and post upload instructions." },
          { type: "subheading", text: "Technical Implementation" },
          {
            type: "table",
            caption: "Frontend",
            columns: ["Technology", "Version", "Purpose"],
            rows: [
              ["Next.js", "16.2.2", "React framework with App Router"],
              ["TypeScript", "5.x", "Static typing across all components"],
              ["Tailwind CSS", "3.4.1", "Utility-first styling"],
            ],
          },
          {
            type: "table",
            caption: "Backend",
            columns: ["Technology", "Version", "Purpose"],
            rows: [
              ["FastAPI", "0.136.0", "Python REST API framework"],
            ],
          },
          {
            type: "table",
            caption: "Database and Storage",
            columns: ["Technology", "Purpose"],
            rows: [
              ["Supabase", "PostgreSQL database and user authentication"],
              ["Google Cloud Storage", "Media file storage"],
            ],
          },
          {
            type: "table",
            caption: "ML / Inference",
            columns: ["Technology", "Version", "Purpose"],
            rows: [
              ["DEIM", "Version 2", "Object detection and classification"],
              ["CLIP", "", "Text embedding generation"],
              ["Dino", "Version 3", "Image embedding generation"],
            ],
          },
        ],
      },
      {
        title: "Feature Implementations",
        blocks: [
          { type: "subheading", text: "Landing Page" },
          { type: "paragraph", text: "The landing page's headline “Less time reviewing. More time deciding.” clearly conveys the platform's value to the audience. Below are 3 key statistics that refer to the global annotation backlog, the percentage of footage annotated by domain experts and the amount of transect data collected per day. These numbers help situate the site in the context of the real-life issue it tackles and provide an immediate sense of context for first-time users. The user is invited to sign up or log in with a single Get Started button." },
          { type: "subheading", text: "Log In and Create Account" },
          { type: "paragraph", text: "The authentication screens are split, with a branded left side and a form on the right. Sign In will need email and password and Create Account will also ask for first name, last name and organisation. The organisation field was added intentionally, as OMarine is designed for use in research institutions, and the context is important to distinguish who is using the platform. Users can switch between both forms, without leaving the page, by using the tabs at the top of the page." },
          { type: "subheading", text: "Projects Page" },
          { type: "paragraph", text: "Once users log in they are taken to the Projects page, where they can see all projects in a card-based grid. The cards include the project title, description, type, detection model, review status, and frame count. Filter by All, Active or Test and sort by newest. All actions are available directly on each card making it easy for researchers to get a clear overview of all their work without having to open each project individually for editing, deleting, and opening." },
          { type: "subheading", text: "Create and Edit Project" },
          { type: "paragraph", text: "New projects are created by using a modal form to enter a project name, description (optional), project type, and detection model. The two types of projects are Test (experimental) and Active (production) annotation; a warning appears if Test is selected, alerting the user to the fact that the data will be deleted after 90 days. The user can select between the Pretrained Model, which is based on a marine-trained check-point and re-trains at every 10 approved frames, and the Custom Model, which begins from a blank slate and is manually annotated. Older projects can be edited in a similar pre-filled modal, but cannot be changed after creation to avoid accidental data loss, as the project type cannot be changed." },
          { type: "subheading", text: "Detections View" },
          { type: "paragraph", text: "Inside a project, the main workspace is called the Detections view. The frames are shown in a grid with bounding boxes and confidence score labels on top of each frame. At the top there are Review progress, Frame filters and sorting by confidence. Clicking on a frame displays a Frame Detail panel with a larger preview, detection label and confidence score, review status, filename, a list of all detections, a Find Similar button for semantic search, and an Open in Annotator button." },
          { type: "subheading", text: "Media Upload" },
          { type: "paragraph", text: "Media is uploaded via a three-step modal to select the media type, choose the name of the dataset, and upload files. The media types include images (JPEG, PNG, TIFF, RAW), videos (MP4, MOV, AVI, MKV), and rosbag files. Files may be dragged and dropped or browsed; a maximum of 500MB can be dropped at a time. The step-by-step structure was selected to ensure that the upload process would be clear and minimize confusion on what is expected at each step." },
          { type: "subheading", text: "Semantic Search" },
          { type: "paragraph", text: "The AI Search feature enables researchers to discover similar frames in the same project. Once a frame is selected, clicking Find Similar returns similar frames with a percentage of similarity. This is enabled by CLIP embeddings, which are built on visual content instead of keywords. It's especially helpful if you want to find all the frames that contain a specific species or environment without having to scroll through all the frames." },
          { type: "subheading", text: "Annotator View and Track Detection" },
          { type: "paragraph", text: "Detailed frame-level review and annotation occurs in the Annotator view. The complete image with all bounding boxes is displayed, and the right panel contains a list of all the detections with labels and confidence scores for each one to review and approve. A toolbar at the bottom offers annotation tools such as drawing new bounding boxes around objects that the model failed to detect. These annotations are added manually and stored and added to the retraining cycle, so they directly help to make the model better over time. The toolbar also features zoom controls and the SAM3 prompt tool for creating more detections on more difficult to annotate objects." },
          { type: "paragraph", text: "The annotator also provides keyboard shortcuts to enhance the efficiency of the annotation. The arrow keys are used to move between frames, A to mark a frame as Approved, Delete to delete a selected detection and the +, -, and 0 keys zoom in, zoom out, and reset the view, respectively. These shortcuts have been introduced to decrease dependence on mouse interaction and speed up the review process, especially when dealing with the large number of frames." },
          { type: "paragraph", text: "In the case of video files and rosbag files, the Track panel enables researchers to control the linking of detections across frames. A selected detection can be moved to a new track, to another track, or even deleted from a track, allowing the researcher to have complete control over tracking data instead of being restricted to the automatic tracking assignments made by the model." },
          { type: "subheading", text: "Model Performance" },
          { type: "paragraph", text: "The Model Performance page displays the performance of the detection model in the project. The top metrics are MAP@0.5, Precision, Recall, and the number of uncertain detections queued for active learning. The table below shows metrics for each class (species) detected, with Precision, Recall, F1 score and number of samples in each class, so that researchers can identify where the model is performing well and where it may be lacking in the data they have annotated." },
          { type: "subheading", text: "Datasets" },
          { type: "paragraph", text: "The Datasets page is a summary page of all datasets uploaded to a project. Summary cards display the number of total, reviewed, and active datasets being processed. A table below provides researchers with visibility into the pipeline without having to refresh and wait manually – each dataset is listed with its frame counts, media type, upload date, and processing status." },
        ],
      },
      {
        title: "Competitor Analysis",
        blocks: [
          {
            type: "table",
            columns: ["Dimension", "ReefCloud", "Roboflow", "OMarine"],
            rows: [
              ["What it is for", "Coral cover measurement and policy dashboards", "End-to-end computer vision platform for video, images, and real-time streams", "End-to-end marine CV platform for detection, tracking, segmentation, retraining, and semantic search."],
              ["Models used", "ML-based classifier; current production architecture not publicly disclosed", "Model-agnostic: RF-DETR, SAM 3, YOLO11, CLIP, Florence-2, and 50+ others", "DEIM v2 (primary detector with track ID assignment) + DINOv3 (image embeddings) + CLIP (text embeddings) + SAM 3 (text-prompted detection for objects missed by DEIM v2)"],
              ["Annotation flow", "50 random dots per image", "Click-driven SAM 3 (Smart Select) or batch auto-label — user clicks an object, SAM generates the mask", "Detector-first: DEIM v2 auto-detects and assigns track IDs across video frames → user reviews and corrects. Text-prompted SAM 3 (“fish”, “shark”, etc.) finds objects DEIM v2 missed"],
              ["Object tracking algorithm", "None", "hSORT, ByteTrack, OC-SORT (via trackers library)", "Algorithmic tracking layered on DEIM v2 detections"],
              ["Track review UX", "None", "None. Trackers is a CLI/Python library; output is a read-only video file", "Interactive track-correction UI: fix wrong IDs via dropdown and reassign frames."],
              ["In-UI model retraining", "Yes. Annotation-driven training (annotate human points → model retrains automatically)", "Yes. Explicit Custom Training jobs, multiple architectures and sizes", "Yes. Explicit retrain on pretrained or custom DEIM v2 model"],
              ["Model evaluation", "In-UI “Model Report” page, where users view model performance; specific metrics shown, not publicly documented", "mAP, precision, recall, confusion matrix, vector analysis, version comparison", "Dedicated eval page with standard metrics"],
              ["Intelligent Grouping", "No AI-powered grouping, manual tag-based grouping only", "Not a named feature", "Auto-clusters related detections across the dataset"],
              ["Marine-aware UX", "Very. Coral-specific Global Benthic Label Set, with the Public Dashboard reporting on thermal stress and cyclone impact across regions", "None. The same UI is used for fish as for car parts", "Yes. Built around sightings, tracks, and marine species workflow"],
            ],
          },
        ],
      },
      {
        title: "Security and Privacy",
        blocks: [
          { type: "subheading", text: "Overview and Privacy Consent" },
          { type: "paragraph", text: "Since OMarine handles underwater imagery, annotation data, and personal user information, data privacy and security were considered throughout the development of the platform. Before creating an account, users are shown a Data and Privacy Consent modal that explains how their data will be used. It covers three things: uploaded imagery and annotation data is stored securely with encryption, only minimal personal information is collected and not shared with third parties, and approved annotations are only used to retrain models within the user's own project and not shared across other projects or organisations. Users must actively agree to these terms before their account is created. This aligns with the Australian Privacy Act 1988, specifically APP 5, which requires organisations to inform individuals about what personal information is being collected and how it will be used (Office of the Australian Information Commissioner, 2019)." },
          { type: "subheading", text: "Data Minimisation and Security" },
          { type: "paragraph", text: "Only the personal information required for the platform to operate is collected by OMarine: email, display name and organisation. This aligns with APP 3 of the Australian Privacy Act and the data minimisation principle of the ISO/IEC 27001 information security standard (International Organization for Standardization, 2022). Media and annotation data are uploaded to Google Cloud Storage, which encrypts data at rest and in transit. Supabase handles user authentication and the database, with row-level security to ensure that users can only access their own data and projects. The measures are consistent with APP 11, which mandates organisations to take reasonable steps to protect personal information from unauthorised access or misuse (Office of the Australian Information Commissioner, 2019)." },
          { type: "subheading", text: "Data Retention" },
          { type: "paragraph", text: "The data from the test project is automatically removed after 90 days, as stated clearly when creating the project. The data in the annotations is also limited to the project to which it belongs and is not shared between other projects or organisations. These policies minimise the unnecessary storage of personal information and align with APP 11.2, which states that organisations must destroy or de-identify personal information that is no longer required (Office of the Australian Information Commissioner, 2019)." },
        ],
      },
      {
        title: "Ethical Considerations",
        blocks: [
          { type: "subheading", text: "Human in the Loop" },
          { type: "paragraph", text: "A core ethical principle guiding the platform's design was that the AI should assist rather than replace the researcher. Automated detection models still make errors. The platform was deliberately designed to require human review and approval of all detections before they are used for model retraining." },
          { type: "subheading", text: "Transparency of AI Outputs" },
          { type: "paragraph", text: "The platform shows colour-coded confidence scores for all detections. This was a deliberate design decision to help researchers strengthen their trust in the model rather than treating AI outputs as ground truth. The platform also includes a model performance page that compiles metrics including mAP@0.5 (Mean Average Precision at 0.5 IoU), precision, recall, and per-class breakdowns of F1 score and sample count. These metrics are derived from reviewed annotations and are updated as more frames are approved, giving researchers ongoing visibility into how well the model is performing on their specific dataset." },
          { type: "subheading", text: "Data Ownership and Intellectual Property" },
          { type: "paragraph", text: "To address consent at the point of account creation, the platform presents a consent modal to all new users before their account is created. Users are informed that uploaded imagery is stored with encryption, and that only their email, display name, and organisation are retained as personal information. Users must actively tick a checkbox confirming they agree before the account creation proceeds, ensuring data collection is informed." },
          { type: "subheading", text: "Model Bias and Class Imbalance" },
          { type: "paragraph", text: "I acknowledged this limitation in the platform's design by providing tools for researchers to manually add bounding boxes for missed detections and by implementing a continuous retraining loop that improves coverage of underrepresented classes as more validated data is added. However, it is recognises that this does not fully resolve the class imbalance problem, and researchers using the platform should be aware that model confidence scores may systematically underperform for rare species." },
        ],
      },
      {
        title: "Evaluation Approach",
        blocks: [
          { type: "paragraph", text: "The goal was not just to confirm each feature existed, but to check whether it actually addressed the post-processing bottleneck described in the Problem Space." },
          { type: "subheading", text: "Success criteria from the brief" },
          { type: "paragraph", text: "The first requirement was advanced vision models for detection, segmentation, and semantic search. DEIM v2 was used as the primary detector, SAM 3 as a text-promptable model to find objects DEIM v2 missed, and DINOv3 plus CLIP for image and text embeddings that power semantic search." },
          { type: "paragraph", text: "The second requirement was intelligent grouping or tracking across adjacent frames. OMarine assigns a track ID to each detected object across video frames, so the same fish appearing in multiple frames is recognised as one object. Intelligent grouping is implemented that clusters related detections across the dataset." },
          { type: "paragraph", text: "The third requirement was semantic search based on object characteristics, which is covered by the DINOv3 and CLIP setup above, letting users retrieve images by typing natural-language queries." },
          { type: "paragraph", text: "The fourth requirement was an intuitive UI for reviewing, validating, and refining model outputs. OMarine includes a dataset grid browser, a single-image annotation interface, an interactive track-correction UI (fix incorrect IDs via dropdown and reassign frames), a model evaluation page, and an in-UI retraining flow for pretrained and custom models." },
          { type: "paragraph", text: "Beyond the four requirements, the brief emphasises workflow optimisation and human-in-the-loop design, which is used as additional evaluation criteria." },
          { type: "subheading", text: "Evaluation method" },
          { type: "paragraph", text: "Evaluation of each criterion through three steps. First, confirmed each requirement was implemented as a working feature, not just planned. Second, I tested the workflow end-to-end by uploading media, running detection and tracking, reviewing and correcting outputs, retraining the model, and checking it on the evaluation page, to confirm that the stages connect without manual intervention between them. Third, I evaluated against the Problem Space framing: since the brief identifies post-processing as the bottleneck, I asked whether the tool actually reduces labelling time." },
          { type: "subheading", text: "Reflection on what've been learned" },
          { type: "paragraph", text: "I initially focused on model accuracy and experimented with several models and configurations. As the project progressed, it became clear that accuracy alone is not enough since the model will still make mistakes on underwater footage. Equally important is how quickly the user can correct those mistakes. So I invested in both: improving the model through retraining and building correction tools (track fixing, SAM 3 gap filling) that reduce user workload when the model is wrong." },
          { type: "paragraph", text: "The human-in-the-loop framing turned out to be a real design constraint. The model, the review interface, and the retraining feature form a single cycle: the model produces a first pass, the human corrects it, and the corrections feed back into retraining. This is why the track-correction UI, SAM 3 recovery, and in-UI retraining exist together. They ensure the user's correction time is converted into model improvement rather than wasted." },
          { type: "paragraph", text: "I also learned what to leave out. Optional extensions like conversational querying and active learning would have resulted in an incomplete prototype, so scoping discipline was as much a part of the evaluation as the features themselves." },
          { type: "subheading", text: "Model evaluation" },
          { type: "paragraph", text: "For OMarine's pre-annotation step, I compared YOLO and DEIM v2 on validation set mAP@50:95 (a standard accuracy metric averaged across detection strictness levels) and inference speed." },
          {
            type: "table",
            columns: ["Class", "YOLO", "DEIM v2"],
            rows: [
              ["Fish", "0.587", "0.690"],
              ["Rayfish", "0.756", "0.878"],
              ["Sea anemone", "0.823", "0.877"],
              ["Starfish", "0.615", "0.695"],
              ["Turtle", "0.776", "0.939"],
              ["Jellyfish", "0.540", "0.791"],
              ["Hard coral", "0.101", "0.285"],
              ["Soft coral", "0.025", "0.198"],
              ["Overall", "0.528", "0.669"],
            ],
          },
          { type: "paragraph", text: "DEIM v2 wins on every class, with the biggest gaps on the harder classes (corals and jellyfish)." },
          { type: "paragraph", text: "Speed: YOLO runs at 126.9 FPS and DEIM v2 at 15.1 FPS. I also tested SAM 3, but it runs at around 0.2 FPS, too slow to be the primary detector, so it became the text-prompted gap-filler instead." },
          { type: "paragraph", text: "Why I picked DEIM v2: Pre-annotation is offline work, so accuracy matters more than speed. Since the brief says the bottleneck is user time, every missed detection becomes a manual correction. DEIM v2's 14-point accuracy lead (0.669 vs 0.528) directly reduces that workload, so it became the primary detector." },
        ],
      },
      {
        title: "References",
        blocks: [
          { type: "paragraph", text: "Villon, S., Iovan, C., Mangeas, M., & Vigliola, L. (2022). Confronting Deep-Learning and Biodiversity Challenges for Automatic Video-Monitoring of Marine Ecosystems. Sensors, 22(2), 497. https://doi.org/10.3390/s22020497" },
          { type: "paragraph", text: "Ma, D., Wei, J., Zhu, L., Zhao, F., Wu, H., Chen, X., Li, Y., & Liu, M. (2024). Semi-supervised learning advances species recognition for aquatic biodiversity monitoring. Frontiers in Marine Science, 11. https://doi.org/10.3389/fmars.2024.1373755" },
          { type: "paragraph", text: "Raine, S., & Fischer, T. (2025, September 2). AI-Driven Marine Robotics: Emerging Trends in Underwater Perception and Ecosystem Monitoring. ResearchGate. https://doi.org/10.48550/arXiv.2509.01878" },
          { type: "paragraph", text: "ReefCloud. (2024, February 3). AIMS. https://www.aims.gov.au/research/technology/reefcloud" },
          { type: "paragraph", text: "Democratising reef monitoring data in the cloud. (2022). AIMS. https://www.aims.gov.au/about/aims-impact/democratising-reef-monitoring-data-cloud" },
          { type: "paragraph", text: "Welcome to ReefCloud | ReefCloud Manual: Part 2 Analyse Data. (2024, April 6). Reefcloud.ai. https://docs.reefcloud.ai/" },
          { type: "paragraph", text: "ReefCloud - Features Overview | ReefCloud Help Documentation. (2026, February 26). Reefcloud.ai. https://docs.reefcloud.ai/untitled" },
          { type: "paragraph", text: "AIMS AI technology helps coral reef monitoring across the Pacific. (2025). AIMS. https://www.aims.gov.au/information-centre/news-and-stories/aims-ai-technology-helps-coral-reef-monitoring-across-pacific" },
          { type: "paragraph", text: "ReefCloud Case Study | Marine Monitoring Tool | Accenture. (n.d.). Www.accenture.com. https://www.accenture.com/us-en/case-studies/song/reefcloud-marine-monitoring" },
          { type: "paragraph", text: "Glossary | ReefCloud Help Documentation. (2026, January 12). Reefcloud.ai. https://docs.reefcloud.ai/appendix/glossary" },
          { type: "paragraph", text: "View your project summary | ReefCloud Help Documentation. (2025, August 4). Reefcloud.ai. https://docs.reefcloud.ai/get-results" },
          { type: "paragraph", text: "Consultancy.com.au. (2022, April 28). New cloud platform enhances coral reef monitoring in the Pacific. Consultancy.com.au. https://www.consultancy.com.au/news/5363/new-cloud-platform-enhances-coral-reef-monitoring-in-the-pacific" },
          { type: "paragraph", text: "Staff, A. (2022, August 29). Here's how AIMS is using AWS snowball to save coral reefs in Australia. AU about Amazon; About Amazon Australia. https://www.aboutamazon.com.au/news/aws/using-data-to-save-the-worlds-coral-reefs" },
          { type: "paragraph", text: "Pavoni, G., Pierce, J., Edwards, C. B., Corsini, M., Petrovic, V., & Cignoni, P. (2024). Integrating Widespread Coral Reef Monitoring Tools for Managing both Area and Point Annotations. The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences, XLVIII-2-2024, 327–333. https://doi.org/10.5194/isprs-archives-xlviii-2-2024-327-2024" },
          { type: "paragraph", text: "Roboflow: Give your software the power to see objects in images and video. (n.d.). Roboflow.com. https://roboflow.com" },
          { type: "paragraph", text: "Train Computer Vision Models with Roboflow. (n.d.). Roboflow.com. https://roboflow.com/train" },
          { type: "paragraph", text: "Explore Top Computer Vision Models. (n.d.). Roboflow.com. https://roboflow.com/models" },
          { type: "paragraph", text: "roboflow. (2026, May 7). GitHub - roboflow/trackers: Trackers gives you clean, modular re-implementations of leading multi-object tracking algorithms released under the permissive Apache 2.0 license. You combine them with any detection model you already use. GitHub. https://github.com/roboflow/trackers" },
          { type: "paragraph", text: "Use SAM 3 in Smart Select | Changelog | Roboflow Docs. (2025, November 19). Roboflow.com. https://docs.roboflow.com/changelog/explore-by-month/november-2025/use-sam-3-in-smart-select" },
          { type: "paragraph", text: "Search a Dataset | Roboflow Docs. (2024, July 11). Roboflow.com. https://blog.roboflow.com/dataset-search/" },
          { type: "paragraph", text: "Gallagher, J. (2025, January 27). Build a multimodal image retrieval system using KNN search and CLIP embeddings. Elasticsearch Labs. https://www.elastic.co/search-labs/blog/multimodal-image-retrieval-with-roboflow" },
          { type: "paragraph", text: "Gallagher, J. (2023, March 30). How to Build a Semantic Image Search Engine with Roboflow and CLIP. Roboflow Blog. https://blog.roboflow.com/clip-semantic-search/" },
          { type: "paragraph", text: "Roboflow. (2026). Grid Visualization - Roboflow Inference. Roboflow.com. https://inference.roboflow.com/workflows/blocks/grid_visualization/" },
          { type: "paragraph", text: "Full Stack Engineer at Roboflow | Y Combinator's Work at a Startup. (2023). Y Combinator's Work at a Startup. https://www.workatastartup.com/jobs/45038" },
          { type: "paragraph", text: "International Organization for Standardization. (2022). ISO/IEC 27001:2022 Information security, cybersecurity and privacy protection. https://www.iso.org/standard/27001" },
          { type: "paragraph", text: "Office of the Australian Information Commissioner. (2019). Australian Privacy Principles. https://www.oaic.gov.au/privacy/australian-privacy-principles" },
        ],
      },
    ],
    result: "From raw footage to a trained model, All in one place",
    tags: ["Next.js", "Fast API", "SQL", "Python", "PyTorch", "Computer Vision", "Semantic Search", "Vector Database"],
  },
  {
    slot: "Notebook shot",
    image: ["/dataset-cover.jpg"],
    kicker: "Predictive Analytics",
    year: "2026",
    title: "A regression analysis in R on the Million Song Dataset",
    blurb:
      "Testing whether basic audio features can predict how much buzz a song had in 2010–2011.",
    sections: [
      {
        title: "Introduction",
        blocks: [
          { type: "paragraph", text: "The Million Song Dataset (MSD) is a collection of metadata for one million songs, put together by the Columbia University Laboratory for the Recognition and Organisation of Music and Audio. Each song comes with a set of audio features like tempo, loudness, key and mode, along with popularity scores for both the track and the artist. The main of this report is song hotness, a number between 0 and 1 that captures how much buzz a track had when the data was collected, around the year of 2010 to 2011. This is a detail worth keeping in mind throughout: hotness is not about how well-known a song is over its lifetime. It only measures how much attention the song was getting in that specific window. A track that was everywhere in the charts in the 1990s but forgotten from public by 2011 would score low. A new released viral hit would score high, even if nobody remembers it a year later. With that in mind, the question this report tries to answer is: can basic audio features tell us anything about how hot a song is? And if so, can a regression model use those features to predict hotness for songs that are not in the dataset?" },
          { type: "paragraph", text: "The expectation going in is that the models will not perform very well. What makes a song popular has more to do with marketing, social media, who the artist is, and timing than with how loud or long the track is. But the goal here is not to build a perfect model. It is to work through a proper analytical pipeline, make reasonable decisions at each step, and be honest about what the results do and do not tell us." },
          { type: "subheading", text: "Data Processing" },
          { type: "code", text: "load('MSD.RData')" },
          { type: "paragraph", text: "The dataset loads with 1,000,000 rows and 18 columns. The variables break down into a few groups: continuous audio features (duration, tempo, loudness, end_of_fade_in, start_of_fade_out), categorical variables (key, mode, time_signature), identifiers (artist_name, title, release, and a few 7digitalid columns), and popularity scores (song_hotttnesss, artist_hotttnesss, artist_familiarity). There is also a year column for the release year." },
          { type: "paragraph", text: "Before doing anything analytical, three things need to happen: the categorical variables need proper labels, the dataset needs to be cut down to a workable size, and that subset needs to be split into training and test sets." },
          { type: "subheading", text: "Labelling" },
          { type: "paragraph", text: "The factor variables in the MSD are stored as plain numbers. If I tried to plot key against hotness right now, we would just see 0 through 11 on the x-axis, which tells the means nothing, so therefore we use labelling to turn those codes into names that actually mean something." },
          { type: "paragraph", text: "Firstly I start with key, the MSD uses integers 0 through 11 to represent the 12 pitches in the Western chromatic scale. This follows the pitch class notation from the Echo Nest audio engine that produced the dataset: 0 is C, 1 is C sharp or D flat, 2 is D, and so on up to 11 which is B." },
          { type: "paragraph", text: "Next is mode, coded as 0 and 1. One of these means major (brighter sounding) and the other means minor (darker sounding), but the dataset does not say which is which, but the counts on table(MSD$mode) shows that level 1 has roughly twice as many songs as level 0. Popular music are mostly major keys, so the more common value must be major. That makes 1 = “major” and 0 = “minor”." },
          { type: "paragraph", text: "Lastly, time_signature records beats per bar. The values in the data are 1, 3, 4, 5, and 7. Most of these map neatly onto real musical concepts: 4 is 4/4 time (the standard beat in pop, rock, and electronic music), 3 is 3/4 (waltz), 5 and 7 are unusual meters you hear in jazz or prog rock. The odd one is 1. There is no such thing as a genuine 1-beat-per-bar time signature. It almost certainly means the beat detection algorithm could not figure out the rhythm, so I labelled it “Unknown” rather than giving it a misleading musical name." },
          { type: "code", text: `MSD$key <- factor(MSD$key,
                  levels = 0:11,
                  labels = c("C", "C#/Db", "D", "D#/Eb", "E", "F",
                             "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"))
MSD$mode <- factor(MSD$mode,
                   levels = c(0, 1),
                   labels = c("minor", "major"))
MSD$time_signature <- factor(MSD$time_signature,
                             levels = c(1, 3, 4, 5, 7),
                             labels = c("Unknown",
                                        "3/4 (Triple)",
                                        "4/4 (Common)",
                                        "5/4 (Quintuple)",
                                        "7/4 (Septuple)"))` },
          { type: "subheading", text: "Subsetting" },
          { type: "paragraph", text: "One million rows is way more than what I needed and would make the imputation step later on extremely slow. So I will use A random sample of 12,500 songs drawn using set.seed() so the results are reproducible. Random sampling keeps the distributional properties of the full MSD intact, which would not be the case if I filtered by decade or genre instead. The sample is then split 80/20 into training and test sets. The training set is where all the exploration and model building happens." },
          { type: "code", text: `set.seed(49057861)
MSD_subset <- MSD[sample(1:nrow(MSD), size = 12500), ]
training_index <- sample(1:nrow(MSD_subset), size = 0.80 * nrow(MSD_subset))
training_data <- MSD_subset[training_index, ]
test_data <- MSD_subset[-training_index, ]
attach(training_data)` },
          { type: "paragraph", text: "This gives a training set of 10,000 songs and a test set of 2,500 songs. The seed is my student ID (49057861)." },
        ],
      },
      {
        title: "Exploratory Analysis",
        blocks: [
          { type: "paragraph", text: "Before building any models, I will get through the training set using summary statistics and plots to understand what the variables look like and whether any patterns jump out." },
          { type: "subheading", text: "Descriptive Statistics: Continuous Variables" },
          {
            type: "table",
            caption: "Descriptive Statistics for Continuous Variables in the Training Data",
            columns: ["", "n", "mean", "sd", "skew", "kurtosis"],
            rows: [
              ["song_hotttnesss", "4595", "0.455", "0.161", "0.394", "-0.498"],
              ["artist_familiarity", "9965", "0.560", "0.135", "-0.289", "1.063"],
              ["artist_hotttnesss", "9512", "0.401", "0.093", "0.658", "2.755"],
              ["duration", "10000", "251.230", "134.517", "5.878", "88.239"],
              ["end_of_fade_in", "6868", "1.193", "2.590", "11.788", "308.208"],
              ["loudness", "10000", "-10.108", "5.205", "-1.441", "3.481"],
              ["start_of_fade_out", "10000", "242.314", "132.490", "6.019", "91.934"],
              ["tempo", "9954", "123.888", "34.617", "0.555", "0.437"],
            ],
          },
          { type: "paragraph", text: "The n column shows that song_hotttnesss has fewer valid observations than variables like duration or tempo. That means a fair amount of data is missing from the outcome variable itself, which is going to be a problem for regression since lm() will silently drop any row with a missing value, therefore I are going to deal with this using imputation. Moreover, the mean song hotness sits around 0.46, so most songs land in the middle of the 0 to 1 range rather than at the extremes. Loudness is negatively skewed, which makes sense since modern songs are usually loud. The variable end_of_fade_in is likely very right-skewed because most songs get into the main vocals or beat within the first couple of seconds." },
          { type: "subheading", text: "Categorical Variables" },
          {
            type: "table",
            caption: "Count of Time Signature in the Training Data",
            columns: ["time_signature", "Freq"],
            rows: [
              ["Unknown", "1346"],
              ["3/4 (Triple)", "1269"],
              ["4/4 (Common)", "6501"],
              ["5/4 (Quintuple)", "604"],
              ["7/4 (Septuple)", "266"],
            ],
          },
          {
            type: "table",
            caption: "Count of Key in the Training Data",
            columns: ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"],
            rows: [
              ["1201", "831", "1090", "309", "790", "758", "581", "1285", "505", "1136", "674", "840"],
            ],
          },
          { type: "paragraph", text: "Of the 10000 songs, 3224 are in minor and 6776 are in major. The 4/4 time signature makes up the vast majority and the “Unknown” category has a decent count, which backs up the decision to label time_signature = 1 as a detection failure. Musical keys are spread fairly evenly across all 12 pitches, since key choice depends on things like the singer's range and the instruments being used." },
          { type: "subheading", text: "Bivariate Statistics" },
          { type: "paragraph", text: "The p-value of the t-test comparing mean song hotness between minor and major mode is 0.002, so I will know whether mode has any detectable link to hotness." },
          { type: "paragraph", text: "The p-value of the chi-squared test between key and mode is 0.000. There might be a collinearity if the key and mode are related, they will overlap and make it harder to read." },
          { type: "subheading", text: "Visualisations" },
          { type: "image", src: "/msd-hotness-distribution.png", alt: "Histogram of song hotness in the training data", caption: "Distribution of Song Hotness in the Training Data" },
          { type: "paragraph", text: "Most of the values are in the 0.3 to 0.6 range, so the dataset is dominated by songs of average popularity. Song hotness is a bell-shaped with a slight lean to the right. Gladly this is a good sign for linear regression because the residuals are normally distributed. There are not many extremely hot or extremely cold songs." },
          { type: "image", src: "/msd-hotness-year.png", alt: "Scatter plot of song hotness against release year", caption: "Song Hotness vs Release Year" },
          { type: "paragraph", text: "This plot is probably the most important one in the whole report. The relationship between year and hotness is clearly not a straight line. The cloud of points bends: songs from very old decades and from very recent years tend to score higher, while songs in the middle (roughly the 1960s through 1980s) cluster lower. This is the reason a quadratic term I(year^2) is added in the regression models later. A simple linear term for year would completely miss this curve." },
          { type: "paragraph", text: "The shape also makes sense if I think about what hotness actually measures. At the time the data was collected (around 2010-2011), two kinds of songs would naturally have buzz. First, genuine classics that never really go away, songs by The Beatles, old jazz standards, that sort of thing. Second, recently released tracks that are naturally trending because they are new. Songs from around the 1970s get stuck in the middle: not old enough to be considered timeless, not new enough to be current. They sit at the lowest point of the curve." },
          { type: "image", src: "/msd-hotness-time-signature.png", alt: "Boxplot of song hotness by time signature", caption: "Song Hotness by Time Signature" },
          { type: "paragraph", text: "This boxplot checks whether a song's rhythmic structure has anything to do with its hotness. Unfortunately, time signature does not show a strong enough pattern to be considered in the regression models. This is because songs in 4/4 time have a slightly higher median than the others, which fits with 4/4 being the default for successful pop and rock. The “Unknown” category has the widest spread, likely because it is a mix of genuinely odd songs and ones where the algorithm just could not figure out the beat. The rarer time signatures (5/4, 7/4) have lower medians, but their sample sizes are small, so those differences could easily be noise." },
          { type: "image", src: "/msd-hotness-loudness.png", alt: "Scatter plot of song hotness against loudness", caption: "Song Hotness vs Loudness" },
          { type: "paragraph", text: "I noticed that louder songs tend to be slightly hotter which mean is it a weak positive trend. But the scatter is wide enough that loudness alone does not explain much but most songs sit between -10 and -5 dB, which reflects the general trend toward maximising volume in songs." },
        ],
      },
      {
        title: "Predictive Analytics",
        blocks: [
          { type: "subheading", text: "Initial Models" },
          { type: "paragraph", text: "Before picking variables for the model, there is a practical question to think about: if this model is going to be used for predicting hotness of new songs, can I actually take the input values? Things like duration, end_of_fade_in and year can be measured directly from the audio or looked up in metadata. But artist_hotttnesss and artist_familiarity are calculated by the MSD's own algorithms and do not exist outside the dataset. Putting them in the model would make it perform better on the training data but completely useless for new predictions. That defeats the whole purpose." },
          { type: "paragraph", text: "mode was also left out. The boxplot in Section 2 showed almost no difference in hotness between major and minor songs, and the t-test backed that up. Including a variable that does not help is just adding noise." },
          {
            type: "list",
            items: [
              "Model 1 is a baseline with end_of_fade_in, duration, and year as simple linear terms.",
              "Model 2 adds I(duration^2) to test whether the relationship with duration is curved. Maybe very short and very long songs are both less popular.",
              "Model 3 swaps that out for I(year^2), based on the curved pattern in the year vs hotness scatter plot from Section 2.",
              "Model 4 keeps Model 3's terms and adds duration:year, an interaction to test whether the effect of song length on hotness changes across different decades.",
            ],
          },
          { type: "code", text: `m1 <- lm(song_hotttnesss ~ end_of_fade_in + duration + year)
m2 <- lm(song_hotttnesss ~ end_of_fade_in + duration + I(duration^2) + year)
m3 <- lm(song_hotttnesss ~ end_of_fade_in + duration + year + I(year^2))
m4 <- lm(song_hotttnesss ~ end_of_fade_in + duration + year + I(year^2) + duration:year)` },
          {
            type: "table",
            caption: "Coefficients with standard errors in brackets. + p < 0.1, * p < 0.05, ** p < 0.01, *** p < 0.001",
            columns: ["", "(1)", "(2)", "(3)", "(4)"],
            rows: [
              ["(Intercept)", "-2.16730** (0.67007)", "-2.16220** (0.67038)", "351.45077*** (102.33325)", "367.53504*** (103.00921)"],
              ["end_of_fade_in", "0.00320** (0.00112)", "0.00324** (0.00113)", "0.00317** (0.00112)", "0.00332** (0.00112)"],
              ["duration", "-0.00006+ (0.00003)", "-0.00004 (0.00007)", "-0.00005 (0.00003)", "0.00865 (0.00646)"],
              ["year", "0.00133*** (0.00034)", "0.00133*** (0.00034)", "-0.35379*** (0.10277)", "-0.37095*** (0.10354)"],
              ["I(duration^2)", "", "-0.00000 (0.00000)", "", ""],
              ["I(year^2)", "", "", "0.00009*** (0.00003)", "0.00009*** (0.00003)"],
              ["duration × year", "", "", "", "-0.00000 (0.00000)"],
              ["Num.Obs.", "2156", "2156", "2156", "2156"],
              ["R2 Adj.", "0.010", "0.010", "0.015", "0.015"],
            ],
          },
          { type: "paragraph", text: "All four models pass the F-test (p < 0.05), but with this many observations even tiny effects can be statistically significant, so the adjusted R-squared is a better way to compare them." },
          { type: "paragraph", text: "Model 2 barely improves on Model 1. The I(duration^2) term adds almost nothing, so there is no real evidence that the duration-hotness relationship is curved. Model 3, on the other hand, does noticeably better. The I(year^2) term picks up the U-shaped pattern from the scatter plot, and its coefficient is significant. The turning point of the curve sits at around 1984. Songs released near that year are at the bottom of the U: too recent to be classics, too old to be trending during data collection." },
          { type: "paragraph", text: "Model 4 adds an interaction between duration and year, but the term is not significant. Song length does not seem to affect hotness differently across decades, so the extra complexity adds nothing." },
          { type: "paragraph", text: "Model 3 comes out as the best option. It has the highest adjusted R-squared, all its terms are significant, and every input can be measured for a new song. The overall R-squared is still low, but that is expected when the only inputs are basic audio features." },
          { type: "subheading", text: "Dealing with Missing Data" },
          { type: "paragraph", text: "The training data has 13957 missing values in total. Only 2123 rows (21.2%) are complete across every variable. The variable year alone is missing for 48% of songs. This is a problem because lm() quietly drops every row that has any missing value, which means the regression results in Section 3.1 were actually trained on a smaller sample than the full training set. If the dropped songs are systematically different from the retained ones, the estimates could be biased." },
          { type: "image", src: "/msd-missing-data.png", alt: "Proportion of missing values per variable and missingness pattern combinations", caption: "Proportion of missing values (left) and missingness patterns (right)" },
          { type: "paragraph", text: "The aggregate plot confirms that song_hotttnesss, year, and end_of_fade_in have the most missing data. The pattern plot on the right shows overlap: songs missing year often tend to be missing song_hotttnesss as well. That is a hint that the missingness is not random." },
          { type: "code", text: `library(naniar)
library(dplyr)
continuous_variables <- c("artist_familiarity", "artist_hotttnesss",
                          "duration", "end_of_fade_in", "loudness",
                          "song_hotttnesss", "start_of_fade_out",
                          "tempo", "year")
mcar_result <- mcar_test(training_data[, continuous_variables])` },
          {
            type: "table",
            columns: ["statistic", "df", "p.value", "missing.patterns"],
            rows: [
              ["4200.650", "237", "< 0.05", "38"],
            ],
          },
          { type: "paragraph", text: "Little's MCAR test checks whether the missing data occurs completely at random. A significant result (p < 0.05) says it does not: the songs with missing values are systematically different from the complete ones. Think about it this way, older tracks or less well-documented songs are more likely to be missing metadata, and those same songs may have different hotness levels. Dropping them would not just shrink the sample, it would skew the results. Multiple imputation addresses this by filling in values that are consistent with the patterns in the observed data, keeping the full sample intact." },
          { type: "code", text: `library(mice)
mice_variables <- c("artist_familiarity", "artist_hotttnesss",
                     "duration", "end_of_fade_in", "key",
                     "loudness", "mode", "song_hotttnesss",
                     "start_of_fade_out", "tempo",
                     "time_signature", "year")
set.seed(49057861)
imputed_data <- mice(training_data[, mice_variables])
fitted_models <- with(imputed_data,
                      lm(song_hotttnesss ~ end_of_fade_in + duration +
                           year + I(year^2)))
pooled_models <- pool(fitted_models)` },
          { type: "paragraph", text: "What mice() does is create 5 copies of the dataset, each with slightly different plausible values in place of the missing entries. Model 3 is fitted to each copy separately, and then pool() merges the five sets of estimates using Rubin's rules. This accounts for both the usual estimation uncertainty and the extra uncertainty that comes from not knowing the true missing values." },
          {
            type: "table",
            caption: "Pooled Regression Results (Model 3 with Multiple Imputation)",
            columns: ["term", "estimate", "p.value"],
            rows: [
              ["(Intercept)", "73.6019", "0.1382"],
              ["end_of_fade_in", "0.0024", "0.0321"],
              ["duration", "0.0000", "0.0233"],
              ["year", "-0.0749", "0.1357"],
              ["I(year^2)", "0.0000", "0.1313"],
            ],
          },
          { type: "paragraph", text: "The average adjusted R-squared across the five imputed datasets is 1.04%. If the coefficients shifted compared to the earlier Model 3 (which used listwise deletion), that is a sign the missing data was in fact introducing bias. The standard errors from the pooled model are expected to be a bit wider than before, which is honest: they reflect the reality that some of the data had to be estimated." },
          { type: "subheading", text: "Model Validation" },
          { type: "paragraph", text: "A model that looks good on training data might just be memorising noise. Validation tests whether it actually works on data it has never seen. If the performance drops a lot on the test set, the model is overfitting. For this step, Model 3 is fitted on singly imputed training data and used to predict hotness on singly imputed test data. The important detail is that training and test data are imputed separately. If they were imputed together, the imputation algorithm would use test-set information to fill in training-set gaps, which leaks future data into the model and makes the validation results untrustworthy." },
          { type: "code", text: `set.seed(49057861)
imputed_training_data <- mice(training_data[mice_variables], m = 1) |>
  complete() |>
  cbind(training_data[, c("artist_name", "title")])
imputed_test_data <- mice(test_data[mice_variables], m = 1) |>
  complete() |>
  cbind(test_data[, c("artist_name", "title")])
trained_model <- lm(song_hotttnesss ~ end_of_fade_in + duration +
                      year + I(year^2),
                    data = imputed_training_data)
imputed_test_data$predicted_song_hotttnesss <- predict(trained_model,
                                                       newdata = imputed_test_data)` },
          {
            type: "table",
            caption: "Comparison of Actual and Predicted Song Hotness (First 10 Rows)",
            columns: ["", "title", "artist_name", "song_hotttnesss", "predicted_song_hotttnesss"],
            rows: [
              ["187062", "Gettin' Down With Hardcore", "Penumbra", "0.5024", "0.4216"],
              ["633915", "My Funny Valentine", "State Of The Heart", "0.4079", "0.4109"],
              ["163278", "Without You", "Stanley Huang", "0.5795", "0.4483"],
              ["657303", "No Hay Jabalix En Urbasa", "La Polla Records", "0.4136", "0.4144"],
              ["879027", "Deep Sea Diver", "Bim Skala Bim", "0.3553", "0.4285"],
              ["396505", "Kismit", "Flowing Tears", "0.2033", "0.3817"],
              ["447192", "Parade (Live)", "Magazine", "0.6045", "0.4475"],
              ["965193", "Pastora_ Pastora Mía", "Pepe Pinto", "0.2120", "0.4078"],
              ["212783", "Ein Gläschen Wein Und Du", "Götz Alsmann", "0.4136", "0.4432"],
              ["241324", "The Switcheroo", "Hank Ballard", "0.4348", "0.4638"],
            ],
          },
          { type: "code", text: `library(caret)
mae  <- MAE(imputed_test_data$predicted_song_hotttnesss,
            imputed_test_data$song_hotttnesss)
rmse <- RMSE(imputed_test_data$predicted_song_hotttnesss,
             imputed_test_data$song_hotttnesss)
validated_r2 <- R2(imputed_test_data$predicted_song_hotttnesss,
                   imputed_test_data$song_hotttnesss)` },
          { type: "paragraph", text: "The training R-squared is 1.7% and the validated R-squared is 1.47%. The gap is small, which is good. A big gap would mean the model was overfitting, but that is not happening here." },
          { type: "paragraph", text: "The MAE is 0.1332 and the RMSE is 0.1606. To put the MAE in context: on a scale from 0 to 1, being off by about 0.13 on average means the model cannot really tell apart a song with 0.4 hotness from one with 0.6. It picks up a real pattern, but the pattern is not strong enough for precise predictions. That is an honest reflection of how little information basic audio features carry about popularity." },
          { type: "subheading", text: "Predictions" },
          { type: "paragraph", text: "10 songs that are not in the MSD are used, spanning from 1969 to 2023. The playlist is deliberately spread across decades so the predictions cover both interpolation (years within the training data range) and extrapolation (years beyond it). Duration comes from Spotify metadata. For end_of_fade_in, I listened to each track and estimated when the main element (vocals, beat, or melody) kicks in." },
          { type: "code", text: `playlist <- data.frame(
  artist_name = c("The Beatles", "Green Day", "Britney Spears",
                  "Avril Lavigne", "Taylor Swift", "Justin Bieber",
                  "Taylor Swift", "Olivia Rodrigo",
                  "PinkPantheress", "Olivia Rodrigo"),
  title = c("Here Comes the Sun", "Basket Case",
            "...Baby One More Time", "Complicated",
            "Love Story", "Baby",
            "Shake It Off", "good 4 u",
            "Boy's a liar", "vampire"),
  end_of_fade_in = c(6, 1, 1, 0.5, 2, 5, 3, 1, 1, 3),
  duration = c(185, 194, 211, 244, 235, 214, 219, 178, 134, 219),
  year = c(1969, 1994, 1998, 2002, 2008, 2010, 2014, 2021, 2022, 2023)
)
playlist$predicted_song_hotttnesss <- predict(trained_model, newdata = playlist)
playlist_pi <- predict(trained_model, newdata = playlist,
                       interval = "prediction", level = 0.95)` },
          {
            type: "table",
            caption: "Predicted Song Hotness with 95% Prediction Intervals",
            columns: ["Artist", "Song", "Year", "Predicted", "Lower 95%", "Upper 95%"],
            rows: [
              ["The Beatles", "Here Comes the Sun", "1969", "0.404", "0.099", "0.708"],
              ["Green Day", "Basket Case", "1994", "0.416", "0.111", "0.720"],
              ["Britney Spears", "…Baby One More Time", "1998", "0.423", "0.119", "0.728"],
              ["Avril Lavigne", "Complicated", "2002", "0.430", "0.125", "0.734"],
              ["Taylor Swift", "Love Story", "2008", "0.450", "0.145", "0.754"],
              ["Justin Bieber", "Baby", "2010", "0.465", "0.161", "0.770"],
              ["Taylor Swift", "Shake It Off", "2014", "0.470", "0.166", "0.775"],
              ["Olivia Rodrigo", "good 4 u", "2021", "0.488", "0.183", "0.792"],
              ["PinkPantheress", "Boy's a liar", "2022", "0.492", "0.187", "0.797"],
              ["Olivia Rodrigo", "vampire", "2023", "0.500", "0.195", "0.804"],
            ],
          },
          { type: "paragraph", text: "The prediction intervals are wide across the board. That is expected given the low R-squared, and it is an honest reflection of how uncertain these forecasts are." },
          { type: "paragraph", text: "“Here Comes the Sun” (1969) is the oldest track in the list. Where it lands on the prediction depends entirely on how 1969 relates to the turning point of the U-shaped year curve. The Beatles are one of those artists whose songs never really stop being talked about, but the model has no way of knowing that. It just sees a number for year, duration, and fade-in time." },
          { type: "paragraph", text: "The songs from the late 1990s and 2000s (“…Baby One More Time”, “Complicated”, “Love Story”) fall within the training data range, so the model is interpolating rather than extrapolating. These should be the most trustworthy predictions. They were massive hits in their day, but by 2010-2011 their buzz would have faded compared to whatever was newly released." },
          { type: "paragraph", text: "“Baby” by Justin Bieber (2010) is right at the edge of the training data. It was genuinely one of the most talked-about songs that year, so its prediction should be reasonably close to its actual hotness score, assuming the MSD captured it." },
          { type: "paragraph", text: "Once we get past 2011, the model starts extrapolating, and polynomial terms are not reliable outside the range they were fitted on. “Shake It Off” (2014) is only a few years past the cutoff, so mild extrapolation. But “good 4 u” (2021), “Boy's a liar” (2022) and “vampire” (2023) push it further. “Boy's a liar” is also only 134 seconds long, which is unusually short compared to most songs in the MSD. That combination of extreme year extrapolation and unusual duration makes it the least reliable prediction in the table." },
          { type: "paragraph", text: "The big picture takeaway is that the model assigns similar predicted values to songs that are wildly different in real life. “Here Comes the Sun” and “Boy's a liar” could not be more different in era, genre, and cultural weight, but the model treats them both as just a combination of three numbers." },
        ],
      },
      {
        title: "Recommendations",
        blocks: [
          { type: "paragraph", text: "The main finding is showing that basic audio features explain very little of what makes a song hot. The models are statistically significant but have low R-squared values. But it make sense Whether a song trends depends on things like marketing budgets or social media activity show up in the MSD." },
          {
            type: "list",
            items: [
              "The most interesting result from the modelling was the U-shaped relationship between release year and hotness, captured by the quadratic I(year^2) term. Because hotness measures short-term buzz at 2010-2011, the curve makes sense: very old songs that have become timeless classics still generate conversation, and recently released songs are naturally trending. Songs from the middle decades sit at the bottom because they are neither classic enough nor fresh enough. This is not a universal rule about music popularity. It is specific to what the hotness metric measures and when it was measured.",
              "The validation step showed that the model is not overfitting: the gap between training and test R-squared is small. But the MAE of about 0.13 on a 0 to 1 scale means the model is too imprecise to rank songs individually. It could work as a rough filter, flagging tracks whose audio features are associated with higher or lower hotness, but it should not be treated as a reliable forecasting tool.",
              "There are a few limitations such as: The MSD does not have streaming counts, social media data, or playlist inclusion, which are the real drivers of modern popularity, like artist_familiarity were excluded because they cannot be obtained for new songs. Including them would improve the training performance but make the model useless in practice, which is the opposite of what a prediction model is supposed to do. And the predictions for post-2011 songs depend on extrapolating a polynomial, which gets less reliable the further out you go.",
            ],
          },
          { type: "paragraph", text: "In the future, better data would help more than a fancier model. I think it would be helpful to have data like Streaming numbers, social media metrics, and playlist data. This can be taken from outsource API like Spotify or Apple Music. On the modelling side, methods like random forests or gradient boosting could pick up non-linear patterns that linear regression cannot. And a training set that includes recent songs would eliminate the extrapolation problem entirely." },
        ],
      },
      {
        title: "AI Usage Acknowledgement",
        blocks: [
          { type: "paragraph", text: "Claude (by Anthropic) was used as a support tool during this analysis. It assisted with structuring the report, interpreting outputs, and refining the narrative. All analytical decisions, code execution, and final interpretations are my own." },
        ],
      },
    ],
    result: "Validated R² of 1.47% with no overfitting, an honest ceiling on what audio features can predict.",
    tags: ["R", "Linear Regression", "Multiple Imputation", "mice", "naniar", "caret", "EDA"],
  },
  {
    slot: "Model shot",
    image: ["/shopee.jpg"],
    kicker: "Data Analysis",
    year: "2024",
    title: "Shopee Sales Performance Analytics Dashboard",
    blurb:
      "Power BI dashboard on sales, cancellations, shipping, and order timing",
    sections: [
      {
        title: "Introduction",
        blocks: [
          { type: "paragraph", text: "I analyzed 20,848 orders from a household goods store on Shopee to understand its sales performance: how sales are trending, why orders get cancelled, how much shipping costs, and when and where demand comes from. The data covers 20,848 Shopee orders from December 2023 to November 2025, including each order's status, cancellation reason, payment method, shipping option, province, product categories, and total payment. Of these, 17,768 were completed and 2,830 were cancelled." },
          
          { type: "subheading", text: "Metrics defined :" },
          { type: "paragraph", text: "Gross order value (GOV) is the sum of buyer payments on completed orders with a payment above zero, and average order value is GOV divided by the number of those orders. Cancel rate is cancelled orders divided by all orders. GOV is not company revenue, because it can include shipping paid by the buyer and has no marketplace fees taken out." },
        ],
      },
      {
        title: "Findings",
        blocks: [
          { type: "paragraph", text: "Gross order value reached about Rp 1.05 billion over the two years, but orders grew much faster than sales. Comparing December to November periods, orders rose 20% while gross order value rose only 3.7%, and the average order fell from Rp 54k to Rp 47k. The overall cancel rate is 13.6%, peaking at 20.8% in May 2025 and falling to 8.9% by November 2025." },
          { type: "paragraph", text: "About one in three cancellations is automatic, caused by unpaid orders, failed deliveries, and late shipping by the seller, so it is fixable. Rak / Rak Serbaguna (30.3%) and Online Payment (18.5%) cancel far more than average, while COD is close to it. Estimated shipping is about 29% of GOV and buyers pay only 28% of it, and Sumatera Utara costs about three times more per order than Jawa Barat. Orders come in mostly between 9:00 and 21:00, and Monday is the busiest day." },
        ],
      },
      {
        title: "What I would do about it",
        blocks: [
          { type: "paragraph", text: "The first actions target the cancellations the store can control: remind Online Payment buyers to pay before the auto-cancel window, confirm delivery addresses on larger orders, and review the Rak / Rak Serbaguna listings. For shipping, test a minimum order value for far regions and track failed and late deliveries every month. Each is a test to run, not a proven fix." },
        ],
      },
    ],
    links: [
      { href: "/shopee-sales-analysis.pbix", label: "Download Power BI file (.pbix)", download: true },
    ],
    result: "More orders, little sales growth. Fixable cancellations and heavy shipping costs are the reason",
    tags: ["Python", "Pandas", "PowerBI"],
  },
];

// Interest pills in the hero on the Column page.
export const interests = ["Data", "Product management", "Finance", "Supply chain"];

// Words that scroll across the ribbon on the Column page.
export const ribbon = ["Data", "Product Management", "Finance", "Supply Chain Management", "Machine learning", "Problem solving", "Building things"];

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

// Skill set page: each group is a tab; pct sets how full each bar is (0–100).
export const stackGroups = [
  {
    name: "Data Analyst / Science",
    description:
      "Cleaning, exploring and modelling data, then turning it into dashboards and reports that someone can act on. I use these for statistical analysis in R, machine learning in Python, and business dashboards in Power BI and Tableau.",
    items: [
      { name: "Python", note: "Advanced", pct: 90 },
      { name: "SQL", note: "Advanced", pct: 85 },
      { name: "R", note: "Proficient", pct: 75 },
      { name: "Scikit-Learn", note: "Proficient", pct: 80 },
      { name: "PyTorch", note: "Proficient", pct: 70 },
      { name: "Tableau", note: "Intermediate", pct: 65 },
      { name: "Power BI", note: "Proficient", pct: 80 },
    ],
  },
  {
    name: "Full Stack",
    description:
      "Building web applications end to end, from the API and database to the interface people use. I've used these to put models behind a working product, like OMarine's Next.js front end and FastAPI back end.",
    items: [
      { name: "JavaScript", note: "Proficient", pct: 80 },
      { name: "Java", note: "Proficient", pct: 75 },
      { name: "Next.js", note: "Proficient", pct: 80 },
      { name: "FastAPI", note: "Proficient", pct: 80 },
      { name: "Django", note: "Intermediate", pct: 65 },
      { name: "Spring Boot", note: "Intermediate", pct: 60 },
    ],
  },
  {
    name: "Systems",
    description:
      "Packaging, deploying and running applications reliably. I use these to containerise services, manage releases with version control, and run workloads and storage in the cloud.",
    items: [
      { name: "Docker", note: "Proficient", pct: 70 },
      { name: "Kubernetes", note: "Intermediate", pct: 55 },
      { name: "Git", note: "Advanced", pct: 85 },
      { name: "GCP", note: "Intermediate", pct: 65 },
    ],
  },
  {
    name: "Languages",
    description: "The languages I speak.",
    items: [
      { name: "English", note: "Fluent", pct: 90 },
      { name: "Indonesian", note: "Native", pct: 100 },
      { name: "Japanese", note: "Beginner", pct: 25 },
    ],
  },
];

// Shown in the about-the-author section on the Column page.
export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Queensland",
    location: "Brisbane, Australia",
    years: "Aug 2025 — Aug 2026",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Universitas Indonesia",
    location: "Depok, Indonesia",
    years: "Aug 2022 — Aug 2026",
  },
];

// Your CV, served from public/.
export const cv = "/MariaHelgaGrizelda_Internship_CV.pdf";

// "How I work" on the Column page.
export const principles = [
  {
    title: "Understand before I build",
    text: "I start by asking who it's for and what decision it should support, so the work solves the right problem.",
  },
  {
    title: "Keep it clear",
    text: "I explain results in plain language and say what they can't tell us, so anyone in the room can act on them.",
  },
  {
    title: "Learn fast, ask early",
    text: "New tools and unfamiliar domains don't scare me. I ask questions early, take feedback well, and improve quickly.",
  },
  {
    title: "See it through",
    text: "I own my tasks from the messy first draft to the finished result, and keep people updated along the way.",
  },
];
export const links = [
  { k: "Email", v: "mariahelga423@gmail.com", href: "mailto:mariahelga423@gmail.com" },
  { k: "GitHub", v: "/mariagrizelda", href: "https://github.com/mariagrizelda" },
  { k: "Résumé", v: "download PDF", href: cv },
];
