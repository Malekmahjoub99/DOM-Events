// 1. Store questions and answers
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which language is used to make web pages interactive?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: 2,
  },
  {
    question: "Which keyword declares a variable that can be reassigned?",
    answers: ["const", "let", "static", "fixed"],
    correctAnswer: 1,
  },
  {
    question: "Which method selects an element by its ID?",
    answers: [
      "getElementsByClassName()",
      "querySelectorAll()",
      "getElementById()",
      "getElementsByTagName()",
    ],
    correctAnswer: 2,
  },
];

// 2. Select HTML elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next");
const questionNumber = document.querySelector(".question-number");

// 3. Initialize variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// 4. Display questions
function displayQuestion() {
  selectedAnswer = null;

  let question = questions[currentQuestion];

  questionElement.textContent = question.question;

  questionNumber.textContent = `Question ${currentQuestion + 1}`;

  answersElement.innerHTML = "";

  question.answers.forEach(function (answer, index) {
    const button = document.createElement("button");

    button.textContent = answer;
    button.classList.add("answer");

    button.addEventListener("click", function () {
      selectAnswer(button, index);
    });

    answersElement.appendChild(button);
  });
}

// 5. Select and check an answer immediately
function selectAnswer(button, index) {
  // Prevent selecting multiple answers
  if (selectedAnswer !== null) {
    return;
  }

  selectedAnswer = index;

  const allAnswers = document.querySelectorAll(".answer");

  // Check if the answer is correct
  if (selectedAnswer === questions[currentQuestion].correctAnswer) {
    // Correct answer: light green with darker green border
    button.style.backgroundColor = "rgb(209, 250, 229)";
    button.style.borderColor = "#15803d";
    button.style.color = "#166534";
  } else {
    // Wrong answer: light red with darker red border
    button.style.backgroundColor = "#f8d7da";
    button.style.borderColor = "#dc3545";
    button.style.color = "#721c24";

    // Reveal the correct answer in green
    const correctButton = allAnswers[questions[currentQuestion].correctAnswer];

    correctButton.style.backgroundColor = "rgb(209, 250, 229)";
    correctButton.style.borderColor = "#15803d";
    correctButton.style.color = "#166534";
  }
}

// 6. Move to the next question
function nextQuestion() {
  if (selectedAnswer === null) {
    alert("Please select an answer first!");
    return;
  }

  // Update score if the answer is correct
  if (selectedAnswer === questions[currentQuestion].correctAnswer) {
    score++;
  }

  scoreElement.textContent = `Score: ${score}`;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

// 7. Display final results
function showResults() {
  // Calculate percentage
  let percentage = Math.round((score / questions.length) * 100);

  questionElement.textContent = "Quiz Completed!";

  questionNumber.textContent = "Finished";

  // Display final score and encouraging paragraphs
  answersElement.innerHTML = `
    <p>You answered ${score} out of ${questions.length} questions correctly.</p>

    <p>Your final score is ${percentage}%. Keep learning and improving!</p>
  `;

  // Hide Next button
  nextButton.style.display = "none";

  // Create Restart button
  const restartButton = document.createElement("button");

  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("next-button");

  restartButton.addEventListener("click", restartQuiz);

  answersElement.appendChild(restartButton);
}

// 8. Restart the quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;

  // Reset score
  scoreElement.textContent = "Score: 0";

  // Show Next button again
  nextButton.style.display = "block";

  // Display first question
  displayQuestion();
}

// 9. Next button event
nextButton.addEventListener("click", nextQuestion);

// 10. Start the quiz
displayQuestion();
