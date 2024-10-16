// script.js

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

themeToggle.addEventListener('click', () => {
  if (rootElement.getAttribute('data-theme') === 'light') {
    rootElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    rootElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  updateChartColors();
});

// Skills Radar Chart
const radarChartData = {
  labels: ['Machine Learning', 'Data Processing', 'NLP & Computer Vision', 'Visualization'],
  datasets: [{
    label: 'Skill Proficiency',
    data: [9, 8, 9, 8], // Adjusted proficiency levels (1-10)
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
  }]
};

// Initialize Radar Chart
const radarCtx = document.getElementById('skillsRadarChart').getContext('2d');
const skillsRadarChart = new Chart(radarCtx, {
  type: 'radar',
  data: radarChartData,
  options: {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim()
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim()
        },
        pointLabels: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
          font: {
            size: 14
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});

// Update Chart Colors on Theme Change
function updateChartColors() {
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
  skillsRadarChart.options.scales.r.ticks.color = textColor;
  skillsRadarChart.options.scales.r.grid.color = textColor;
  skillsRadarChart.options.scales.r.pointLabels.color = textColor;
  skillsRadarChart.update();
}

// Handle Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.reset();
      alert('Thank you for your message! I will get back to you soon.');
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data['errors'].map(error => error['message']).join(', '));
        } else {
          alert('Oops! There was a problem submitting your form');
        }
      })
    }
  }).catch(error => {
    alert('Oops! There was a problem submitting your form');
  });
});

// Toggle Project Details
function toggleProjectDetails(detailsId) {
  const details = document.getElementById(detailsId);
  const button = event.currentTarget;
  if (details.style.display === 'block') {
    details.style.display = 'none';
    button.setAttribute('aria-expanded', 'false');
  } else {
    details.style.display = 'block';
    button.setAttribute('aria-expanded', 'true');
    // Load the detailed content if not already loaded
    if (!details.innerHTML) {
      insertProjectDetails(detailsId);
    }
  }
}

// Insert Project Details
function insertProjectDetails(detailsId) {
  if (detailsId === 'project1-details') {
    document.getElementById(detailsId).innerHTML = `
      <!-- Project 1 Expanded Content -->
      <ul>
        <li><strong>Objective:</strong> Develop a CNN-based traffic sign recognition system using the German Traffic Sign Recognition Benchmark (GTSRB) dataset.</li>
        <li><strong>Key Achievements:</strong>
          <ul>
            <li>Achieved <strong>98.7%</strong> accuracy on the GTSRB test dataset.</li>
            <li>Implemented a modified LeNet architecture with enhancements such as dropout and batch normalization.</li>
            <li>Developed a Streamlit web application for user interaction.</li>
            <li>Integrated real-time webcam recognition using OpenCV.</li>
          </ul>
        </li>
        <li><strong>Methodology:</strong>
          <ul>
            <li><strong>Data Preprocessing:</strong> Resized images, normalized pixel values, and applied data augmentation techniques.</li>
            <li><strong>Model Development:</strong> Built a CNN model with multiple convolutional and pooling layers.</li>
            <li><strong>Model Training:</strong> Used cross-entropy loss and Adam optimizer for training.</li>
            <li><strong>Evaluation:</strong> Assessed model performance using accuracy and confusion matrix.</li>
          </ul>
        </li>
        <li><strong>Technologies Used:</strong> Python, TensorFlow, Keras, OpenCV, Streamlit.</li>
        <li><strong>Learnings:</strong> Gained hands-on experience in computer vision, deep learning, and deploying AI models as web applications.</li>
      </ul>
      <p>
        You can find the source code and additional details on the
        <a href="https://github.com/mridulbsharma/traffic-sign-recognition" target="_blank">GitHub repository</a>.
      </p>
      <!-- End of Project 1 Expanded Content -->
    `;
  } else if (detailsId === 'project2-details') {
    document.getElementById(detailsId).innerHTML = `
      <!-- Project 2 Expanded Content -->
      <ul>
        <li><strong>Objective:</strong> Create a deep learning model to classify images as hot dog or not hot dog.</li>
        <li><strong>Key Achievements:</strong>
          <ul>
            <li>Achieved <strong>95.25%</strong> accuracy using a fine-tuned InceptionV3 model.</li>
            <li>Collected and curated a dataset of hot dog and non-hot dog images.</li>
            <li>Implemented data augmentation to enhance model generalization.</li>
          </ul>
        </li>
        <li><strong>Methodology:</strong>
          <ul>
            <li><strong>Data Collection:</strong> Scraped images from various sources and manually labeled them.</li>
            <li><strong>Model Development:</strong> Fine-tuned a pre-trained InceptionV3 model on the custom dataset.</li>
            <li><strong>Evaluation:</strong> Used precision, recall, and F1-score to assess model performance.</li>
          </ul>
        </li>
        <li><strong>Technologies Used:</strong> Python, TensorFlow, Keras, NumPy, Matplotlib.</li>
        <li><strong>Learnings:</strong> Gained experience in transfer learning and the importance of data quality in image classification tasks.</li>
      </ul>
      <p>
        You can find the source code and additional details on the
        <a href="https://github.com/mridulbsharma/hot-dog-hackathon" target="_blank">GitHub repository</a>.
      </p>
      <!-- End of Project 2 Expanded Content -->
    `;
  } else if (detailsId === 'project3-details') {
    document.getElementById(detailsId).innerHTML = `
      <!-- Project 3 Expanded Content -->
      <ul>
        <li><strong>Objective:</strong> Develop a binary classification model to distinguish between cryptocurrency and stock-related Reddit posts.</li>
        <li><strong>Key Achievements:</strong>
          <ul>
            <li>Achieved nearly <strong>93%</strong> accuracy using NLP techniques.</li>
            <li>Scraped data from Reddit using PRAW API.</li>
            <li>Performed text preprocessing including tokenization, lemmatization, and stop-word removal.</li>
            <li>Compared multiple models including Logistic Regression, Naive Bayes, and SVM.</li>
          </ul>
        </li>
        <li><strong>Methodology:</strong>
          <ul>
            <li><strong>Data Collection:</strong> Gathered posts from r/CryptoMoonShots and r/wallstreetbets.</li>
            <li><strong>Feature Extraction:</strong> Used TF-IDF vectorization to convert text data into numerical format.</li>
            <li><strong>Model Training:</strong> Trained classifiers and performed hyperparameter tuning using GridSearchCV.</li>
            <li><strong>Evaluation:</strong> Assessed models using accuracy, precision, recall, and ROC-AUC curves.</li>
          </ul>
        </li>
        <li><strong>Technologies Used:</strong> Python, scikit-learn, NLTK, PRAW, Matplotlib.</li>
        <li><strong>Learnings:</strong> Enhanced understanding of NLP preprocessing techniques and model evaluation metrics in text classification.</li>
      </ul>
      <p>
        You can find the source code and additional details on the
        <a href="https://github.com/mridulbsharma/crypto-stocks-nlp" target="_blank">GitHub repository</a>.
      </p>
      <!-- End of Project 3 Expanded Content -->
    `;
  } else if (detailsId === 'project4-details') {
    document.getElementById(detailsId).innerHTML = `
      <!-- Project 4 Expanded Content -->
      <ul>
        <li><strong>Objective:</strong> Analyze U.S. gun violence data to identify patterns and develop predictive models for casualties.</li>
        <li><strong>Key Achievements:</strong>
          <ul>
            <li>Conducted exploratory data analysis on approximately 240,000 incidents.</li>
            <li>Identified key factors contributing to gun violence and casualties.</li>
            <li>Developed predictive models with <strong>77%</strong> accuracy using Linear Regression and an R² score of <strong>0.896</strong> using Logistic Regression.</li>
          </ul>
        </li>
        <li><strong>Insights:</strong>
          <ul>
            <li><strong>Strong Indicators for Having Casualties:</strong>
              <ul>
                <li>Terrorism involvement.</li>
                <li>Incidents at parties, bars, or clubs.</li>
                <li>Locations in Alaska or Arizona.</li>
                <li>Gang involvement.</li>
              </ul>
            </li>
            <li><strong>Strong Indicators for Not Having Casualties:</strong>
              <ul>
                <li>Incidents involving robbery.</li>
                <li>Locations in Wyoming, Massachusetts, New Hampshire, or Maine.</li>
                <li>Perpetrators under the influence of drugs or alcohol.</li>
              </ul>
            </li>
          </ul>
        </li>
        <li><strong>Methodology:</strong>
          <ul>
            <li><strong>Data Preprocessing:</strong> Handled missing data, performed feature engineering, vectorized text data.</li>
            <li><strong>Model Training:</strong> Used Linear and Logistic Regression with hyperparameter tuning.</li>
            <li><strong>Evaluation:</strong> Used metrics appropriate for regression and classification tasks.</li>
          </ul>
        </li>
        <li><strong>Technologies Used:</strong> Python, pandas, scikit-learn, Matplotlib, Seaborn.</li>
        <li><strong>Learnings:</strong> Gained experience in handling large datasets and interpreting model coefficients to derive meaningful insights.</li>
      </ul>
      <p>
        You can find the source code and additional details on the
        <a href="https://github.com/mridulbsharma/gun-violence-trends" target="_blank">GitHub repository</a>.
      </p>
      <!-- End of Project 4 Expanded Content -->
    `;
  } else if (detailsId === 'project5-details') {
    document.getElementById(detailsId).innerHTML = `
      <!-- Project 5 Expanded Content -->
      <ul>
        <li><strong>Objective:</strong> Develop a predictive model for house prices in Ames, Iowa.</li>
        <li><strong>Key Achievements:</strong>
          <ul>
            <li>Achieved an RMSE of <strong>27,391.35</strong> in the Kaggle competition.</li>
            <li>Conducted extensive data preprocessing and feature engineering on 82 variables.</li>
            <li>Implemented Linear Regression, Ridge Regression, Lasso Regression, and Elastic Net Regression.</li>
            <li>Lasso Regression performed best, capturing complex relationships between features and sale prices.</li>
          </ul>
        </li>
        <li><strong>Key Insights:</strong>
          <ul>
            <li>Overall Quality: Each one-point increase leads to an approximate $19,590 increase in sale price.</li>
            <li>Year Built: Each additional year increases the sale price by about $3,680.</li>
            <li>Garage Capacity: An extra car capacity adds approximately $3,740 to the sale price.</li>
          </ul>
        </li>
        <li><strong>Methodology:</strong>
          <ul>
            <li><strong>Feature Selection:</strong> Based on EDA insights and domain knowledge.</li>
            <li><strong>Model Evaluation:</strong> Used RMSE on training and test datasets.</li>
            <li><strong>Hyperparameter Tuning:</strong> Employed cross-validation techniques for optimization.</li>
          </ul>
        </li>
        <li><strong>Technologies Used:</strong> Python, pandas, scikit-learn, Matplotlib, Seaborn.</li>
        <li><strong>Learnings:</strong> Improved understanding of regression techniques and the impact of feature selection on model performance.</li>
      </ul>
      <p>
        You can find the source code and additional details on the
        <a href="https://github.com/mridulbsharma/kaggle-ames-challenge" target="_blank">GitHub repository</a>.
      </p>
      <!-- End of Project 5 Expanded Content -->
    `;
  }
  /* 
  To add a new project in the future:

  1. Copy the 'else if' block above and paste it below.
  2. Update 'projectX-details' to your new project's details ID.
  3. Insert your new project's expanded content within the template.
  */
}
