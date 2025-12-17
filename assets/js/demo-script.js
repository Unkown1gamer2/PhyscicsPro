// assets/js/demo-script.js

// Demo Questions Data
const questions = [
    {
        id: 1,
        question: "What is the SI unit of time?",
        options: ["Meter", "Second", "Kilogram", "Ampere"],
        correctAnswer: 1,
        explanation: "The second (s) is the SI unit of time, one of the seven base SI units.",
    },
    {
        id: 2,
        question: "Which unit measures electric current?",
        options: ["Kelvin", "Ampere", "Mole", "Candela"],
        correctAnswer: 1,
        explanation: "The ampere (A) is the SI unit of electric current, measuring the flow of electrical charge.",
    },
    {
        id: 3,
        question: "What is the SI unit of luminous intensity?",
        options: ["Candela", "Ampere", "Kelvin", "Meter"],
        correctAnswer: 0,
        explanation: "The candela (cd) is the SI unit of luminous intensity, measuring the brightness of light in a specific direction."
    },
    {
        id: 4,
        question: "What is the SI unit of temperature?",
        options: ["Kelvin", "Celsius", "Joule", "Mole"],
        correctAnswer: 0,
        explanation: "The kelvin (K) is the SI unit of thermodynamic temperature, with 0 K representing absolute zero.",
    },
    {
        id: 5,
        question: "Define what an SI unit is.",
        type: "writing",
        correctKeywords: ["SI unit", "standard unit", "measurement", "International System", "consistency", "globally", "meter", "kilogram", "second", "ampere", "kelvin", "mole", "candela", "derived units"],
        explanation: "An SI unit is a standard unit of measurement defined by the International System of Units. It is used to ensure consistency in measurements globally. Examples include meter (length), kilogram (mass), second (time), ampere (current), kelvin (temperature), mole (amount of substance), candela (luminous intensity). Answers may include definitions, examples, or notes on derived units.",
    },
    {
        id: 6,
        question: "What is SI unit of Pascals?",
        options: ["Pa", "Nm", "N", "N/m²"],
        correctAnswer: 3,
        explanation: "Pascal (Pa) is defined as N/m² (Newton per square meter). This requires using the formula P = F/A (Pressure = Force/Area).",
    },
    {
        id: 7,
        question: "Which SI unit is used to measure the amount of substance?",
        options: ["Candela", "Ampere", "Mole", "Kelvin"],
        correctAnswer: 2,
        explanation: "The mole (mol) is the SI unit for amount of substance, measuring the quantity of elementary entities.",
    },
    {
        id: 8,
        question: "What is the SI unit of length?",
        options: ["Kilogram", "Meter", "Second", "Ampere"],
        correctAnswer: 1,
        explanation: "The meter (m) is the SI unit of length, one of the seven base SI units.",
    },
];

let questionStates = questions.map(() => ({
    selectedAnswer: null,
    showFeedback: false,
    isAnswered: false,
    writingAnswer: "",
    isCorrect: false,
}));
let visibleQuestions = 1;
let isCompleted = false;
let showTip = false;

// Initialize demo
document.addEventListener("DOMContentLoaded", function () {
    renderQuestions();
});

function renderQuestions() {
    const container = document.getElementById(
        "questions-container",
    );
    container.innerHTML = "";

    for (let i = 0; i < visibleQuestions; i++) {
        const question = questions[i];
        const state = questionStates[i];

        const questionDiv = document.createElement("div");
        questionDiv.className =
            "glass-card rounded-2xl p-6 space-y-4";
        
        let questionContent = `
        <div class="mb-4">
            <h3 class="text-lg font-semibold mb-4">Question ${i + 1} of ${questions.length}</h3>
        </div>
        
        <div class="flex items-center gap-2 mb-4" data-testid="question-text-${i}">
            <span class="text-lg font-medium">${question.question}</span>
            <button onclick="toggleDrawing(${i})" class="p-1 rounded-lg hover:bg-muted/20 transition-colors duration-200" title="Toggle drawing area">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
            </button>
        </div>
        
        <!-- Drawing Area -->
        <div id="drawing-area-${i}" class="hidden mb-4">
            <div class="border border-border rounded-lg p-4 bg-muted/10">
                <canvas id="canvas-${i}" width="600" height="200" class="border border-border rounded bg-white dark:bg-gray-800 cursor-crosshair w-full"></canvas>
                <div class="flex gap-2 mt-2">
                    <button onclick="clearCanvas(${i})" class="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded">Clear</button>
                    <button onclick="toggleDrawing(${i})" class="text-xs bg-accent hover:bg-accent/90 text-accent-foreground px-2 py-1 rounded">Hide Drawing</button>
                </div>
            </div>
        </div>
        `;

        // Handle different question types
        if (question.type === "writing") {
            questionContent += `
            <div class="space-y-3">
                <textarea 
                    id="writing-answer-${i}"
                    placeholder="Type your answer here..."
                    class="w-full p-3 rounded-lg border border-border bg-background resize-none h-32"
                    ${state.isAnswered ? "disabled" : ""}
                    onchange="handleWritingAnswer(${i}, this.value)"
                >${state.writingAnswer || ""}</textarea>
                ${!state.isAnswered ? `
                <button 
                    onclick="submitWritingAnswer(${i})" 
                    class="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                    Submit Answer
                </button>
                ` : ""}
            </div>
            `;
        } else {
            questionContent += `
            <div class="space-y-3">
                ${question.options
                    .map(
                        (option, optionIndex) => `
                    <label class="flex items-center p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors duration-200 ${state.selectedAnswer === optionIndex ? "bg-muted border-accent" : ""}" data-testid="option-${i}-${optionIndex}">
                        <input 
                            type="radio" 
                            name="question-${i}" 
                            value="${optionIndex}"
                            class="mr-3 text-accent" 
                            ${state.selectedAnswer === optionIndex ? "checked" : ""}
                            onchange="handleAnswer(${i}, ${optionIndex})"
                            ${state.isAnswered ? "disabled" : ""}
                        >
                        <span>${option}</span>
                        ${
                            state.showFeedback &&
                            state.selectedAnswer === optionIndex
                                ? optionIndex === question.correctAnswer
                                    ? '<svg class="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
                                    : '<svg class="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                                : ""
                        }
                    </label>
                `,
                    )
                    .join("")}
            </div>
            `;
        }

        // Add feedback section
        if (state.showFeedback) {
            const isCorrect = question.type === "writing" ? state.isCorrect : state.selectedAnswer === question.correctAnswer;
            questionContent += `
            <div class="mt-4 p-4 rounded-lg ${isCorrect ? "bg-green-100 border border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100" : "bg-red-100 border border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-100"}">
                <strong>${isCorrect ? "Correct!" : "Incorrect."}</strong>
                <p class="mt-2">${question.explanation}</p>
            </div>
            `;
        }


        // Add next question button for incorrect answers (after tip section if it exists)
        if (state.showFeedback) {
            const isCorrect = question.type === "writing" ? state.isCorrect : state.selectedAnswer === question.correctAnswer;
            if (!isCorrect && i + 1 < questions.length) {
                questionContent += `
                <button 
                    onclick="showNextQuestionManual(${i})" 
                    class="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                    Next Question
                </button>
                `;
            } else if (!isCorrect && i + 1 === questions.length) {
                questionContent += `
                <button 
                    onclick="completeDemo()" 
                    class="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                    Complete Demo
                </button>
                `;
            }
        }

        questionDiv.innerHTML = questionContent;
        container.appendChild(questionDiv);

        // Initialize canvas if drawing area exists
        setTimeout(() => initializeCanvas(i), 10);

        // Add tip section right after question 3 (index 2) if it should be shown
        if (i === 2 && showTip) {
            const tipDiv = document.createElement("div");
            tipDiv.className = "glass-card rounded-2xl p-6 space-y-4";
            tipDiv.id = "tip-section";
            tipDiv.setAttribute("data-testid", "card-tip-q3");
            tipDiv.innerHTML = `
            <div class="mb-4">
                <h3 class="text-lg font-semibold">💡 Physics Tip</h3>
            </div>
            
            <div class="mt-4 p-4 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-100">
                <strong>💡 Tip:</strong>
                <p class="mt-2">With SI units, you can use formulas to derive other units. For example, gravitational acceleration uses mass and force to work out acceleration (m/s²). Use SI units consistently when calculating physics quantities.</p>
            </div>
            
            <button 
                onclick="proceedFromTip()" 
                class="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300"
                data-testid="button-next-tip"
            >
                Next Question
            </button>
            `;
            container.appendChild(tipDiv);
        }
    }
}

function handleAnswer(questionIndex, selectedAnswer) {
    const question = questions[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    questionStates[questionIndex] = {
        selectedAnswer: selectedAnswer,
        showFeedback: true,
        isAnswered: true,
        isCorrect: isCorrect,
        writingAnswer: questionStates[questionIndex].writingAnswer || ""
    };

    renderQuestions();

    // Auto-scroll to feedback
    setTimeout(() => {
        const questionElement = document
            .querySelector(
                `[data-testid="question-text-${questionIndex}"]`,
            )
            .closest(".glass-card");
        const feedbackElement =
            questionElement.querySelector(".mt-4.p-4");
        if (feedbackElement) {
            feedbackElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, 100);

    // Special handling for question 3 (index 2) - show tip after correct answer
    if (isCorrect && questionIndex === 2) {
        setTimeout(() => {
            showTip = true;
            renderQuestions();
            
            // Scroll to tip
            setTimeout(() => {
                const tipElement = document.querySelector('[data-testid="card-tip-q3"]');
                if (tipElement) {
                    tipElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);
        }, 500);
    }
    // Auto-scroll to next question if correct answer and not question 3 and not last question
    else if (isCorrect && questionIndex + 1 < questions.length) {
        setTimeout(() => {
            if (visibleQuestions <= questionIndex + 1) {
                visibleQuestions = questionIndex + 2;
                renderQuestions();
                
                // Scroll to next question
                setTimeout(() => {
                    const nextQuestion = document.querySelector(
                        `[data-testid="question-text-${questionIndex + 1}"]`,
                    );
                    if (nextQuestion) {
                        nextQuestion
                            .closest(".glass-card")
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                    }
                }, 100);
            }
        }, 500);
    } else if (isCorrect && questionIndex + 1 === questions.length) {
        // All questions completed
        setTimeout(() => {
            isCompleted = true;
            document
                .getElementById("completion-message")
                .classList.remove("hidden");
            document
                .getElementById("completion-message")
                .scrollIntoView({ behavior: "smooth" });
        }, 500);
    }
}

// Writing question functions
function handleWritingAnswer(questionIndex, answer) {
    questionStates[questionIndex].writingAnswer = answer;
}

function submitWritingAnswer(questionIndex) {
    const question = questions[questionIndex];
    const answer = questionStates[questionIndex].writingAnswer.toLowerCase();
    
    // Check if answer contains any of the correct keywords
    const isCorrect = question.correctKeywords.some(keyword => 
        answer.includes(keyword.toLowerCase())
    );
    
    questionStates[questionIndex] = {
        ...questionStates[questionIndex],
        showFeedback: true,
        isAnswered: true,
        isCorrect: isCorrect
    };

    renderQuestions();

    // Auto-scroll to feedback
    setTimeout(() => {
        const questionElement = document
            .querySelector(`[data-testid="question-text-${questionIndex}"]`)
            .closest(".glass-card");
        const feedbackElement = questionElement.querySelector(".mt-4.p-4");
        if (feedbackElement) {
            feedbackElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, 100);

    // Auto-scroll to next question if correct answer (reduced delay)
    if (isCorrect && questionIndex + 1 < questions.length) {
        setTimeout(() => {
            if (visibleQuestions <= questionIndex + 1) {
                visibleQuestions = questionIndex + 2;
                renderQuestions();
                
                setTimeout(() => {
                    const nextQuestion = document.querySelector(
                        `[data-testid="question-text-${questionIndex + 1}"]`,
                    );
                    if (nextQuestion) {
                        nextQuestion
                            .closest(".glass-card")
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                    }
                }, 100);
            }
        }, 500); // Reduced delay to 500ms
    } else if (isCorrect && questionIndex + 1 === questions.length) {
        setTimeout(() => {
            isCompleted = true;
            document.getElementById("completion-message").classList.remove("hidden");
            document.getElementById("completion-message").scrollIntoView({ behavior: "smooth" });
        }, 500); // Reduced delay to 500ms
    }
}

// Drawing functions
function toggleDrawing(questionIndex) {
    const drawingArea = document.getElementById(`drawing-area-${questionIndex}`);
    if (drawingArea) {
        drawingArea.classList.toggle("hidden");
        if (!drawingArea.classList.contains("hidden")) {
            // Initialize canvas when opened
            setTimeout(() => initializeCanvas(questionIndex), 10);
        }
    }
}

function initializeCanvas(questionIndex) {
    const canvas = document.getElementById(`canvas-${questionIndex}`);
    if (!canvas) return;

    // Type assertion for canvas
    const canvasElement = /** @type {HTMLCanvasElement} */ (canvas);
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return; // Ensure context is available

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set canvas size
    const rect = canvasElement.getBoundingClientRect();
    canvasElement.width = rect.width;
    canvasElement.height = 200;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvasElement.getBoundingClientRect();
        lastX = (e.clientX || e.touches[0].clientX) - rect.left;
        lastY = (e.clientY || e.touches[0].clientY) - rect.top;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const rect = canvasElement.getBoundingClientRect();
        const currentX = (e.clientX || e.touches[0].clientX) - rect.left;
        const currentY = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvasElement.addEventListener('mousedown', startDrawing);
    canvasElement.addEventListener('mousemove', draw);
    canvasElement.addEventListener('mouseup', stopDrawing);
    canvasElement.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvasElement.addEventListener('touchstart', startDrawing);
    canvasElement.addEventListener('touchmove', draw);
    canvasElement.addEventListener('touchend', stopDrawing);
}

function clearCanvas(questionIndex) {
    const canvas = document.getElementById(`canvas-${questionIndex}`);
    if (canvas) {
        // Type assertion for canvas
        const canvasElement = /** @type {HTMLCanvasElement} */ (canvas);
        const ctx = canvasElement.getContext('2d');
        if (ctx) { // Ensure context is available
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
    }
}

// Manual navigation functions
function showNextQuestionManual(questionIndex) {
    // Special handling for question 3 (index 2) - show tip first
    if (questionIndex === 2) {
        showTip = true;
        renderQuestions();
        
        // Scroll to tip
        setTimeout(() => {
            const tipElement = document.querySelector('[data-testid="card-tip-q3"]');
            if (tipElement) {
                tipElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 100);
    } else if (questionIndex + 1 < questions.length) {
        if (visibleQuestions <= questionIndex + 1) {
            visibleQuestions = questionIndex + 2;
            renderQuestions();
            
            // Scroll to next question
            setTimeout(() => {
                const nextQuestion = document.querySelector(
                    `[data-testid="question-text-${questionIndex + 1}"]`,
                );
                if (nextQuestion) {
                    nextQuestion
                        .closest(".glass-card")
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                }
            }, 100);
        }
    }
}

function proceedFromTip() {
    if (visibleQuestions <= 3) {
        visibleQuestions = 4;
        renderQuestions();
        
        // Scroll to next question
        setTimeout(() => {
            const nextQuestion = document.querySelector(
                `[data-testid="question-text-3"]`,
            );
            if (nextQuestion) {
                nextQuestion
                    .closest(".glass-card")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }
        }, 100);
    }
}

function completeDemo() {
    isCompleted = true;
    document.getElementById("completion-message").classList.remove("hidden");
    document.getElementById("completion-message").scrollIntoView({ behavior: "smooth" });
}

function toggleHelpInfo() {
    const helpInfo = document.getElementById("help-info");
    helpInfo.classList.toggle("hidden");

    if (!helpInfo.classList.contains("hidden")) {
        helpInfo.scrollIntoView({ behavior: "smooth" });
    }
}

// Make functions available globally for HTML onclick handlers
window.handleAnswer = handleAnswer;
window.handleWritingAnswer = handleWritingAnswer;
window.submitWritingAnswer = submitWritingAnswer;
window.toggleDrawing = toggleDrawing;
window.clearCanvas = clearCanvas;
window.showNextQuestionManual = showNextQuestionManual;
window.proceedFromTip = proceedFromTip;
window.completeDemo = completeDemo;
window.toggleHelpInfo = toggleHelpInfo;