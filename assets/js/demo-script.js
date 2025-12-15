// assets/js/demo-script.js

const demoQuestions = [
    {
        question: "What is the SI unit for electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        answer: 1, // Ampere
        explanation: "The SI unit for electric current is the Ampere (A). Volt is for potential difference, Ohm for resistance, and Watt for power."
    },
    {
        question: "Which of the following is a scalar quantity?",
        options: ["Velocity", "Force", "Mass", "Acceleration"],
        answer: 2, // Mass
        explanation: "A scalar quantity has only magnitude, while a vector quantity has both magnitude and direction. Mass is a scalar, while velocity, force, and acceleration are vectors."
    },
    {
        question: "According to Hooke's Law, the extension of a spring is directly proportional to the applied force, provided the elastic limit is not exceeded. What is the formula for Hooke's Law?",
        options: ["F = ma", "E = mc²", "F = kx", "P = IV"],
        answer: 2, // F = kx
        explanation: "Hooke's Law states that F = kx, where F is the force, k is the spring constant, and x is the extension. F=ma is Newton's second law, E=mc² is Einstein's mass-energy equivalence, and P=IV is electrical power."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
    const questionsContainer = document.getElementById('questions-container');
    const completionMessage = document.getElementById('completion-message');
    
    if (currentQuestionIndex >= demoQuestions.length) {
        questionsContainer.innerHTML = '';
        completionMessage.classList.remove('hidden');
        return;
    }

    const questionData = demoQuestions[currentQuestionIndex];
    questionsContainer.innerHTML = `
        <div class="glass-card rounded-2xl p-6 space-y-4">
            <div class="text-lg font-semibold mb-4" data-testid="question-text">
                ${currentQuestionIndex + 1}. ${questionData.question}
            </div>
            
            <div class="space-y-3" id="options-container">
                ${questionData.options.map((option, index) => `
                    <label class="flex items-center p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors duration-200" data-testid="option-${index}">
                        <input type="radio" name="demo-q" value="${index}" class="mr-3 text-accent" onclick="checkAnswer(${index})">
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
            
            <div id="question-feedback" class="hidden mt-4 p-4 rounded-lg"></div>
            <button id="next-question-btn" class="hidden bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-300 mt-4">
                Next Question
            </button>
        </div>
    `;

    document.getElementById('next-question-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });
}

function checkAnswer(selectedIndex) {
    const questionData = demoQuestions[currentQuestionIndex];
    const feedbackDiv = document.getElementById('question-feedback');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-question-btn');

    // Disable all options after selection
    Array.from(optionsContainer.querySelectorAll('input[type="radio"]')).forEach(radio => {
        radio.disabled = true;
    });

    feedbackDiv.classList.remove('hidden');
    nextButton.classList.remove('hidden');

    if (selectedIndex === questionData.answer) {
        score++;
        feedbackDiv.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800';
        feedbackDiv.innerHTML = `<strong>Correct!</strong> ${questionData.explanation}`;
    } else {
        feedbackDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800';
        feedbackDiv.innerHTML = `<strong>Incorrect.</strong> The correct answer was "${questionData.options[questionData.answer]}". ${questionData.explanation}`;
    }
}

function toggleHelpInfo() {
    const helpInfo = document.getElementById('help-info');
    helpInfo.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});

// Make functions available globally for HTML onclick handlers
window.checkAnswer = checkAnswer;
window.toggleHelpInfo = toggleHelpInfo;