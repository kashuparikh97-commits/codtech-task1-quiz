const questions = [
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.addEventListener("click", () => selectAnswer(answer.correct, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.disabled = true;
    resultElement.innerText = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(correct, button) {
    if (correct) {
        score++;
        button.classList.add("correct");
        resultElement.innerText = "Correct! 🎉";
    } else {
        button.classList.add("wrong");
        resultElement.innerText = "Wrong Answer ❌";
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished!`;
    resultElement.innerText = `Your Score: ${score} / ${questions.length}`;
    nextButton.innerText = "Restart";
    nextButton.disabled = false;
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();