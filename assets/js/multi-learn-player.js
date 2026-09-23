
// assets/js/multi-learn-player.js

/* global MathJax */

(function() {
    let currentVideoId = null;
    let questionsData = [];
    let tipsData = [];
    let questionStates = [];
    let visibleQuestions = 1;
    let isCompleted = false;

    // Initialize
    document.addEventListener('DOMContentLoaded', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        currentVideoId = urlParams.get('videoId');

        if (!currentVideoId) {
            const container = document.getElementById('questions-container');
            if (container) container.innerHTML = '<p class="text-center text-red-500">No video ID specified.</p>';
            return;
        }

        await loadContent();
    });

    async function loadContent() {
        try {
            // 1. Load Video Data (YouTube Link)
            const videosResponse = await fetch('assets/videos-data.json');
            const videosJson = await videosResponse.json();
            
            // Find video by matching page_url ending
            const videoEntry = videosJson.find(v => v.page_url.endsWith('/' + currentVideoId));
            
            if (videoEntry) {
                const titleEl = document.getElementById('video-title');
                if (titleEl) titleEl.textContent = videoEntry.video_title;
                const iframe = document.getElementById('video-iframe');
                if (iframe && videoEntry.youtube_links && videoEntry.youtube_links.length > 0) {
                    const url = videoEntry.youtube_links[0];
                    const disablePrivacy = localStorage.getItem('youtubeDisablePrivacy') === 'true';
                    let finalUrl = url;

                    if (!disablePrivacy) {
                        if (url.includes('youtube.com/embed/')) {
                            finalUrl = url.replace('youtube.com/embed/', 'youtube-nocookie.com/embed/');
                        } else if (url.includes('youtube.com/watch?v=')) {
                            const videoId = url.split('v=')[1]?.split('&')[0];
                            if (videoId) finalUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
                        } else if (url.includes('youtu.be/')) {
                            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                            if (videoId) finalUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
                        }
                    }

                    /** @type {HTMLIFrameElement} */ (iframe).src = finalUrl;
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                }
            } else {
                console.error('Video not found in videos-data.json');
            }

            // 2. Load Questions and Tips
            const questionsResponse = await fetch('assets/multi-learn-questions.json');
            const questionsJson = await questionsResponse.json();
            
            const contentEntry = questionsJson.find(item => item.id === currentVideoId);
            
            if (contentEntry) {
                questionsData = contentEntry.questions || [];
                tipsData = contentEntry.tips || [];
                
                // Initialize states
                questionStates = questionsData.map(() => ({
                    selectedAnswer: null, // For MCQ (string "A") or Multi (array ["A", "C"])
                    writingAnswer: "",
                    isAnswered: false,
                    isCorrect: false,
                    showFeedback: false
                }));
                
                renderQuestions();
            } else {
                const container = document.getElementById('questions-container');
                if (container) container.innerHTML = '<p class="text-center text-red-500">No questions found for this video.</p>';
            }

        } catch (error) {
            console.error('Error loading content:', error);
            const container = document.getElementById('questions-container');
            if (container) container.innerHTML = '<p class="text-center text-red-500">Error loading content.</p>';
        }
    }

    function renderQuestions() {
        const container = document.getElementById('questions-container');
        if (!container) return;
        container.innerHTML = '';

        // Render questions up to visibleQuestions
        for (let i = 0; i < visibleQuestions && i < questionsData.length; i++) {
            const question = questionsData[i];
            const state = questionStates[i];
            
            const questionDiv = document.createElement('div');
            questionDiv.className = "glass-card rounded-2xl p-6 space-y-4 fade-in";
            questionDiv.id = `question-${i}`;

            let html = `
                <div class="mb-4">
                    <h3 class="text-lg font-semibold mb-4">Question ${question.qn} of ${questionsData.length}</h3>
                    <div class="text-lg font-medium" data-testid="question-text-${i}">${formatText(question.q)}</div>
                </div>
            `;

            // Render Options based on type
            if (question.type === 'mcq') {
                html += renderMCQ(i, question, state);
            } else if (question.type === 'multi') {
                html += renderMulti(i, question, state);
            } else if (question.type === 'write') {
                html += renderWrite(i, question, state);
            }

            // Feedback
            if (state.showFeedback) {
                const feedbackClass = state.isCorrect 
                    ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100"
                    : "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-100";
                
                html += `
                    <div class="mt-4 p-4 rounded-lg border ${feedbackClass} fade-in">
                        <strong>${state.isCorrect ? "Correct!" : "Incorrect."}</strong>
                        <p class="mt-2">${formatText(question.exp)}</p>
                        ${!state.isCorrect && question.type !== 'write' ? `<p class="mt-1 font-semibold">Correct Answer: ${question.ans}</p>` : ''}
                    </div>
                `;
            }

            questionDiv.innerHTML = html;
            container.appendChild(questionDiv);

            // Check for Tips AFTER this question
            const tip = tipsData.find(t => t.placement === `after:${question.qn}`);
            if (tip && state.isAnswered) { // Show tip only after answering
                renderTip(container, tip);
            }

            // Render Next/Finish Button AFTER tip (if any)
            if (state.showFeedback) {
                 const buttonDiv = document.createElement('div');
                 buttonDiv.className = "flex justify-start mt-4 mb-8"; // Container for button
                 
                 let btnHtml = '';
                 if (i === visibleQuestions - 1 && i < questionsData.length - 1) {
                    btnHtml = `
                        <button onclick="showNextQuestion(${i})" class="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                            Next Question
                        </button>
                    `;
                } else if (i === questionsData.length - 1) {
                    btnHtml = `
                         <button onclick="finishLesson()" class="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                            Finish Lesson
                        </button>
                    `;
                }
                
                if (btnHtml) {
                    buttonDiv.innerHTML = btnHtml;
                    container.appendChild(buttonDiv);
                }
            }
        }

        // Trigger MathJax typesetting
        if (window.MathJax) {
            /** @type {any} */ (window.MathJax).typesetPromise();
        }
    }

    function renderMCQ(index, question, state) {
        const opts = question.opts; // Object {A: "...", B: "..."}
        let html = '<div class="space-y-3">';
        
        Object.keys(opts).forEach(key => {
            const isSelected = state.selectedAnswer === key;
            const isCorrect = key === question.ans;
            let optionClass = "border-border hover:bg-gray-50 dark:hover:bg-white/5";
            let indicatorClass = "border-gray-300";
            let dotClass = "opacity-0";
            
            if (state.isAnswered) {
                if (isSelected) {
                    if (state.isCorrect) {
                        optionClass = "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500/50";
                        indicatorClass = "border-green-500 bg-green-500";
                        dotClass = "opacity-100 bg-white";
                    } else {
                        optionClass = "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500/50";
                        indicatorClass = "border-red-500 bg-red-500";
                        dotClass = "opacity-100 bg-white";
                    }
                } else if (key === question.ans && state.showFeedback) {
                     optionClass = "bg-green-50 border-green-500/30 dark:bg-green-900/10 dark:border-green-500/30";
                     indicatorClass = "border-green-500/50";
                }
            } else if (isSelected) {
                optionClass = "bg-blue-50 border-accent dark:bg-blue-900/20";
                indicatorClass = "border-accent";
                dotClass = "opacity-100";
            }

            html += `
                <div 
                    onclick="handleMCQSelect(${index}, '${key}')"
                    class="group p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center ${optionClass} ${state.isAnswered ? 'pointer-events-none' : ''}"
                >
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${indicatorClass} group-hover:border-accent">
                        <div class="w-2.5 h-2.5 rounded-full bg-accent transition-opacity duration-200 ${dotClass}"></div>
                    </div>
                    <div class="flex items-baseline">
                        <span class="font-bold mr-2">${key}.</span>
                        <span class="font-medium">${formatText(opts[key])}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }

    function renderMulti(index, question, state) {
        const opts = question.opts;
        let html = '<div class="space-y-3">';
        const selected = state.selectedAnswer || []; // Array of keys
        
        Object.keys(opts).forEach(key => {
            const isSelected = selected.includes(key);
            let optionClass = "border-border hover:bg-gray-50 dark:hover:bg-white/5";
            let indicatorClass = "border-gray-300";
            let dotClass = "opacity-0";

            if (state.isAnswered) {
                const correctKeys = question.ans.split(',').map(s => s.trim());
                const isActuallyCorrect = correctKeys.includes(key);
                
                if (isSelected) {
                    if (isActuallyCorrect) {
                        optionClass = "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500/50";
                        indicatorClass = "border-green-500 bg-green-500";
                        dotClass = "opacity-100 bg-white";
                    } else {
                        optionClass = "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500/50";
                        indicatorClass = "border-red-500 bg-red-500";
                        dotClass = "opacity-100 bg-white";
                    }
                } else if (isActuallyCorrect && state.showFeedback) {
                    optionClass = "bg-green-50 border-green-500/30 dark:bg-green-900/10 dark:border-green-500/30";
                    indicatorClass = "border-green-500/50";
                }
            } else if (isSelected) {
                optionClass = "bg-blue-50 border-accent dark:bg-blue-900/20";
                indicatorClass = "border-accent";
                dotClass = "opacity-100";
            }
            
            html += `
                <div 
                    onclick="handleMultiSelect(${index}, '${key}')"
                    class="group p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center ${optionClass} ${state.isAnswered ? 'pointer-events-none' : ''}"
                >
                    <div class="w-5 h-5 rounded-lg border-2 mr-3 flex items-center justify-center transition-all duration-200 ${indicatorClass} group-hover:border-accent">
                        <div class="w-2.5 h-2.5 rounded-sm bg-accent transition-opacity duration-200 ${dotClass}"></div>
                    </div>
                    <div class="flex items-baseline">
                        <span class="font-bold mr-2">${key}.</span>
                        <span class="font-medium">${formatText(opts[key])}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        if (!state.isAnswered) {
            html += `
                <button onclick="submitMultiAnswer(${index})" class="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                    Submit Answer
                </button>
            `;
        }
        
        return html;
    }

    function renderWrite(index, question, state) {
        let html = `
            <div class="space-y-3">
                <textarea 
                    class="w-full p-3 rounded-lg border border-border bg-background resize-none h-32"
                    placeholder="Type your answer here..."
                    ${state.isAnswered ? "disabled" : ""}
                    onchange="handleWriteInput(${index}, this.value)"
                >${state.writingAnswer || ""}</textarea>
            </div>
        `;
        
        if (!state.isAnswered) {
            html += `
                <button onclick="submitWriteAnswer(${index})" class="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-300">
                    Submit Answer
                </button>
            `;
        }
        
        return html;
    }

    function renderTip(container, tip) {
        const tipDiv = document.createElement('div');
        tipDiv.className = "glass-card rounded-2xl p-6 space-y-4 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 fade-in";
        tipDiv.innerHTML = `
            <div class="mb-2">
                <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400">💡 Physics Tip</h3>
            </div>
            <div class="text-muted-foreground">
                ${formatText(tip.content)}
            </div>
        `;
        container.appendChild(tipDiv);
    }

    // Handlers

    function handleMCQSelect(index, key) {
        if (questionStates[index].isAnswered) return;
        
        const question = questionsData[index];
        const isCorrect = key === question.ans;
        
        questionStates[index].selectedAnswer = key;
        questionStates[index].isAnswered = true;
        questionStates[index].isCorrect = isCorrect;
        questionStates[index].showFeedback = true;
        
        renderQuestions();
        scrollToFeedback(index);

        if (isCorrect) {
            handleAutoAdvance(index);
        }
    }

    function handleMultiSelect(index, key) {
        if (questionStates[index].isAnswered) return;
        
        let selected = questionStates[index].selectedAnswer || [];
        if (selected.includes(key)) {
            selected = selected.filter(k => k !== key);
        } else {
            selected.push(key);
        }
        questionStates[index].selectedAnswer = selected;
        renderQuestions(); // Re-render to update styles
    }

    function submitMultiAnswer(index) {
        const question = questionsData[index];
        const selected = questionStates[index].selectedAnswer || [];
        // question.ans is string "A, C"
        const correctKeys = question.ans.split(',').map(s => s.trim());
        
        // Check if selected matches correctKeys exactly (order independent)
        const isCorrect = selected.length === correctKeys.length && 
                          selected.every(k => correctKeys.includes(k));
        
        questionStates[index].isAnswered = true;
        questionStates[index].isCorrect = isCorrect;
        questionStates[index].showFeedback = true;
        
        renderQuestions();
        scrollToFeedback(index);

        if (isCorrect) {
            handleAutoAdvance(index);
        }
    }

    function handleWriteInput(index, value) {
        questionStates[index].writingAnswer = value;
    }

    function submitWriteAnswer(index) {
        const val = questionStates[index].writingAnswer;
        // Removed empty check to allow submitting empty answers (which will be wrong)

        const question = questionsData[index];
        // Check similarity between user answer and correct answer(s)
        let isCorrect = false;
        
        if (question.accepted_answers && Array.isArray(question.accepted_answers) && question.accepted_answers.length > 0) {
            // Check against any of the accepted answers
            isCorrect = question.accepted_answers.some(ans => checkSimilarity(val, ans));
        } else {
            // Fallback to single ans field
            isCorrect = checkSimilarity(val, question.ans);
        }

        questionStates[index].isAnswered = true;
        questionStates[index].isCorrect = isCorrect;
        questionStates[index].showFeedback = true;
        
        renderQuestions();
        scrollToFeedback(index);

        if (isCorrect) {
            handleAutoAdvance(index);
        }
    }

    function handleAutoAdvance(index) {
        if (index === visibleQuestions - 1) {
            setTimeout(() => {
                if (index < questionsData.length - 1) {
                    showNextQuestion(index);
                } else {
                    finishLesson();
                }
            }, 1500); // 1.5s delay
        }
    }

    function checkSimilarity(userAns, correctAns) {
        if (!userAns || !correctAns) return false;
        
        // Normalize: lowercase, separate numbers/letters, remove special chars except spaces/dots
        const normalize = (str) => {
            let s = str.toLowerCase();
            s = s.replace(/([0-9]+)([a-z]+)/g, '$1 $2'); // "25mv" -> "25 mv"
            s = s.replace(/([a-z]+)([0-9]+)/g, '$1 $2'); // "v2" -> "v 2"
            s = s.replace(/[^a-z0-9\s.]/g, ''); // Remove punctuation
            return s.trim();
        };
        
        const u = normalize(userAns);
        const c = normalize(correctAns);
        
        // 1. Exact match or inclusion
        if (u === c) return true;
        if (u.includes(c)) return true; // User's answer contains the correct answer text
        
        // 2. Token overlap for longer answers
        const cTokens = c.split(/\s+/).filter(t => t.length > 0); 
        if (cTokens.length === 0) return false;
        
        const uTokens = u.split(/\s+/);
        
        let matches = 0;
        cTokens.forEach(token => {
            if (uTokens.includes(token)) matches++;
        });
        
        // If more than 60% of significant words from correct answer are present
        return (matches / cTokens.length) >= 0.6;
    }

    function showNextQuestion(currentIndex) {
        if (visibleQuestions <= currentIndex + 1) {
            visibleQuestions = currentIndex + 2;
            renderQuestions();
            
            setTimeout(() => {
                const nextQ = document.getElementById(`question-${currentIndex + 1}`);
                if (nextQ) {
                    nextQ.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    function finishLesson() {
        isCompleted = true;
        saveProgress();
        
        // Calculate final score
        const score = questionStates.filter(s => s.isCorrect).length;
        const total = questionsData.length;
        const percentage = (score / total) * 100;

        // Show footer
        const footer = document.getElementById('footer');
        if (footer) {
            footer.classList.remove('hidden');
        }

        // Show completion message and update score UI
        const completionMsg = document.getElementById('completion-message');
        if (completionMsg) {
            completionMsg.classList.remove('hidden');
            
            // Update score elements
            const scoreContainer = document.getElementById('final-score-container');
            const scoreBar = document.getElementById('final-score-bar');
            const scoreLabel = document.getElementById('final-score-label');
            const feedbackText = document.getElementById('score-feedback-text');

            if (scoreContainer) {
                scoreContainer.classList.remove('opacity-0');
            }

            if (scoreBar) {
                // Animate width from 0 to percentage over 600ms
                setTimeout(() => {
                    scoreBar.style.width = `${percentage}%`;
                    if (scoreLabel) {
                        scoreLabel.textContent = `${Math.round(percentage)}% Correct`;
                    }
                }, 100);
            }

            // Feedback text removal handled in HTML, just updating logic here to avoid errors
            if (feedbackText) {
                feedbackText.style.display = 'none';
            }
            
            // Add Return to Hub button if not present
            if (!completionMsg.querySelector('button')) {
                 const returnBtn = document.createElement('button');
                 returnBtn.className = "mt-4 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto";
                 returnBtn.textContent = "Return to Hub";
                 returnBtn.onclick = () => window.location.href = 'multi-learn-hub.html';
                 completionMsg.appendChild(returnBtn);
            }
            
            // Scroll to completion message
            setTimeout(() => {
                completionMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
        
        // Hide the "Finish Lesson" button to avoid confusion
        const allButtons = document.querySelectorAll('button');
        for (const btn of allButtons) {
            if (btn.textContent.trim() === 'Finish Lesson') {
                btn.style.display = 'none';
                break;
            }
        }
    }

    // Progress & Navigation Handling
    let pendingNavigationTarget = null;

    function handleBackToHub() {
        // Check if user has started but not finished
        const hasStarted = questionStates.some(state => state.isAnswered);
        
        if (hasStarted && !isCompleted) {
            pendingNavigationTarget = () => { window.location.href = 'multi-learn-hub.html'; };
            const exitModal = document.getElementById('exit-modal');
            if (exitModal) exitModal.classList.remove('hidden');
        } else {
            window.location.href = 'multi-learn-hub.html';
        }
    }

    function closeExitModal() {
        const exitModal = document.getElementById('exit-modal');
        if (exitModal) exitModal.classList.add('hidden');
        pendingNavigationTarget = null;
    }

    function confirmExit() {
        if (pendingNavigationTarget) {
            pendingNavigationTarget();
        } else {
            window.location.href = 'multi-learn-hub.html';
        }
    }

    // Intercept global navigation functions from script.js
    const navigationFunctions = [
        'navigateToHome',
        'navigateToLogin',
        'navigateToPastPapers',
        'navigateToDemo',
        'navigateToMultiLearn',
        'navigateToVideos',
        'navigateToExamQuestions',
        'navigateToQuickLearn',
        'navigateToNotes',
        'navigateToProgress'
    ];

    // Apply interception after a short delay to ensure script.js has loaded (though module order should handle it)
    setTimeout(() => {
        navigationFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                const original = window[funcName];
                window[funcName] = function(...args) {
                    // Check for unsaved progress
                    const hasStarted = questionStates.some(state => state.isAnswered);
                    if (hasStarted && !isCompleted) {
                        pendingNavigationTarget = () => original.apply(window, args);
                        const exitModal = document.getElementById('exit-modal');
                        if (exitModal) exitModal.classList.remove('hidden');
                    } else {
                        original.apply(window, args);
                    }
                };
            }
        });
    }, 100);

    function saveProgress() {
        try {
            if (!currentVideoId) return;

            const score = questionStates.filter(s => s.isCorrect).length;
            const total = questionsData.length;
            
            // Validation
            if (total === 0) return;

            const progressData = {
                completed: true,
                score: score,
                total: total,
                timestamp: Date.now()
            };

            // Get existing data
            let storageData = {};
            try {
                const existing = localStorage.getItem('multiLearnProgress');
                if (existing) {
                    storageData = JSON.parse(existing);
                }
            } catch (e) {
                console.error('Error parsing localStorage:', e);
                // Reset if corrupted
                storageData = {};
            }

            // Update current video progress
            storageData[currentVideoId] = progressData;

            // Save back
            localStorage.setItem('multiLearnProgress', JSON.stringify(storageData));
            console.log('Progress saved:', progressData);

        } catch (error) {
            console.error('Failed to save progress:', error);
            alert('Warning: Failed to save progress locally. Please check your browser settings.');
        }
    }

    // Utilities

    function formatText(text) {
        return text;
    }

    function scrollToFeedback(index) {
        setTimeout(() => {
            const qDiv = document.getElementById(`question-${index}`);
            if (!qDiv) return;
            const feedback = qDiv.querySelector('.bg-green-100, .bg-red-100'); // Feedback div
            if (feedback) {
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    // Styling helpers
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Make functions available globally
    Object.assign(window, {
        handleMCQSelect,
        handleMultiSelect,
        submitMultiAnswer,
        handleWriteInput,
        submitWriteAnswer,
        showNextQuestion,
        finishLesson,
        handleBackToHub,
        closeExitModal,
        confirmExit
    });
})();