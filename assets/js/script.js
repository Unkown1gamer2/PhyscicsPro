// Main JavaScript file for Physics Pro
import { IosSelector } from './ios-selector.js';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load header and footer components if elements exist
        await loadComponents();
        
        // Initialize theme after components are loaded
        initializeTheme();
        
        // Initialize scroll functionality
        initializeScrollToTop();
        initializeScrollToBottom();
        
        // Initialize navigation scroll effects
        initializeNavigation();
        
        // Initialize external link security
        initializeExternalLinks();
        
        // Initialize timer functionality after a short delay to ensure components are rendered
        setTimeout(() => {
            if (typeof initializeTimer === 'function') {
                initializeTimer();
            }
        }, 100);

    } catch (error) {
        console.error('Error during DOMContentLoaded initialization:', error);
    }
});

// Component Loading
async function loadComponents() {
    const navigationDiv = document.getElementById('navigation');
    const footerDiv = document.getElementById('footer');

    const headerPromise = navigationDiv ? fetch('components/header.html').then(response => response.ok ? response.text() : Promise.reject('Failed to fetch header')) : Promise.resolve(null);
    const footerPromise = footerDiv ? fetch('components/footer.html').then(response => response.ok ? response.text() : Promise.reject('Failed to fetch footer')) : Promise.resolve(null);

    try {
        const [headerHtml, footerHtml] = await Promise.all([headerPromise, footerPromise]);
        
        if (navigationDiv && headerHtml) {
            navigationDiv.innerHTML = headerHtml;
        } else if (navigationDiv) {
            console.warn('Navigation div found but header HTML not loaded or empty.');
        }
        if (footerDiv && footerHtml) {
            footerDiv.innerHTML = footerHtml;
        } else if (footerDiv) {
            console.warn('Footer div found but footer HTML not loaded or empty.');
        }
    } catch (error) {
        console.warn('Could not load components:', error);
    }
}

// Theme Management
function initializeTheme() {
    const themeToggles = document.querySelectorAll('#theme-toggle');
    if (themeToggles.length === 0) {
        console.warn('Theme toggle button not found during initializeTheme.');
        return; // Exit if elements aren't there
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    themeToggles.forEach(themeToggle => {
        updateThemeToggleIcon(savedTheme);
        // Remove existing listeners to avoid duplicates
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
    const themeToggles = document.querySelectorAll('#theme-toggle');
    themeToggles.forEach(themeToggle => {
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('svg');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        } else {
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';
        }
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generic scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Dynamic scroll functionality
function initializeScrollToBottom() {
    const scrollBtn = document.getElementById('scroll-bottom');
    if (!scrollBtn) {
        console.warn('Scroll to bottom button not found during initializeScrollToBottom.');
        return; // Exit if element isn't there
    }
    
    let isAtBottom = false;
    
    function updateScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're near the bottom (within 100px)
        isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
        
        const svg = scrollBtn.querySelector('svg');
        if (svg) {
            if (isAtBottom) {
                // Point up when at bottom
                svg.style.transform = 'rotate(180deg)';
            } else {
                // Point down when not at bottom
                svg.style.transform = 'rotate(0deg)';
            }
        }
    }
    
    // Set up click handler
    scrollBtn.addEventListener('click', handleScrollClick);
    
    // Set up scroll listener
    window.addEventListener('scroll', updateScrollButton);
    
    // Initial check
    updateScrollButton();

    function handleScrollClick() {
        if (isAtBottom) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to bottom
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
}

// iOS Timer functionality
let timerInterval;
let remainingTime = 0;
let timerPaused = false;
let timerRunning = false;
let hourSelector, minuteSelector, secondSelector;

function initializeTimer() {
    const timerIcon = document.getElementById('timer-icon');
    if (!timerIcon) {
        console.warn('Timer icon not found during initializeTimer.');
        return; // Exit if element isn't there
    }
    setupTimerControls();
    restoreTimerFromStorage();
}

function initializeIosSelectors() {
    // Build sources
    let hoursSource = [];
    for (let i = 0; i <= 5; i++) hoursSource.push(i);
    let minutesSecondsSource = [];
    for (let i = 0; i <= 59; i++) minutesSecondsSource.push(i);

    // Initialize selectors
    if (document.getElementById('hour-selector')) {
        hourSelector = new IosSelector({el:'#hour-selector', source: hoursSource, count: 24});
        minuteSelector = new IosSelector({el:'#minute-selector', source: minutesSecondsSource, count: 60});
        secondSelector = new IosSelector({el:'#second-selector', source: minutesSecondsSource, count: 60});
    }
}

function positionDropdownBelowClock(dropdown) {
    const timerIcon = document.getElementById('timer-icon');
    if (!timerIcon || !dropdown) return;
    
    const iconRect = timerIcon.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.top = `${iconRect.bottom + 10}px`;
    dropdown.style.right = `${window.innerWidth - iconRect.right}px`;
    dropdown.style.left = 'auto';
}

function setupTimerControls() {
    const timerIcon = document.getElementById('timer-icon');
    const timerSetDropdown = document.getElementById('timer-set-dropdown');
    const timerControlDropdown = document.getElementById('timer-control-dropdown');
    const doneBtn = document.getElementById('done-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const stopBtn = document.getElementById('stop-timer');
    const cancelBtn = document.getElementById('cancel-timer');
    
    if (!timerIcon) return;
    
    // Toggle dropdown based on timer state
    timerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (timerRunning) {
            // Show control dropdown
            timerSetDropdown.classList.add('hidden');
            const isVisible = !timerControlDropdown.classList.contains('hidden');
            if (!isVisible) {
                timerControlDropdown.classList.remove('hidden');
                positionDropdownBelowClock(timerControlDropdown);
            } else {
                timerControlDropdown.classList.add('hidden');
            }
        } else {
            // Show set dropdown
            timerControlDropdown.classList.add('hidden');
            const isVisible = !timerSetDropdown.classList.contains('hidden');
            if (!isVisible) {
                timerSetDropdown.classList.remove('hidden');
                positionDropdownBelowClock(timerSetDropdown);
                // Initialize selectors if not already done
                if (!hourSelector) {
                    setTimeout(() => initializeIosSelectors(), 50);
                }
            } else {
                timerSetDropdown.classList.add('hidden');
            }
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        // Type guard to ensure e.target is a Node
        if (e.target instanceof Node) {
            if (!timerSetDropdown.contains(e.target) && !timerControlDropdown.contains(e.target) && !timerIcon.contains(e.target)) {
                timerSetDropdown.classList.add('hidden');
                timerControlDropdown.classList.add('hidden');
            }
        }
    });
    
    // Timer controls
    if (doneBtn) {
        doneBtn.addEventListener('click', startTimer);
    }
    if (pauseBtn) {
        pauseBtn.addEventListener('click', pauseTimer);
    }
    if (stopBtn) {
        stopBtn.addEventListener('click', stopTimer);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelTimer);
    }
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateTimerDisplay(isRunning, timeText = '') {
    const timerIcon = document.getElementById('timer-icon');
    
    if (!timerIcon) return;
    
    if (isRunning) {
        timerIcon.innerHTML = `<span class="font-mono text-sm text-blue-500">${timeText}</span>`;
        timerIcon.classList.add('text-blue-500');
        timerRunning = true;
    } else {
        timerIcon.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`;
        timerIcon.classList.remove('text-blue-500');
        timerRunning = false;
    }
}

function startTimer() {
    if (!hourSelector || !minuteSelector || !secondSelector) return;
    
    const hours = hourSelector.getValue();
    const minutes = minuteSelector.getValue();
    const seconds = secondSelector.getValue();
    
    remainingTime = hours * 3600 + minutes * 60 + seconds;
    
    if (remainingTime <= 0) return;
    
    const timerSetDropdown = document.getElementById('timer-set-dropdown');
    timerSetDropdown.classList.add('hidden');
    
    updateTimerDisplay(true, formatTime(remainingTime));
    timerPaused = false;
    
    // Save initial timer state
    saveTimerToStorage();
    
    timerInterval = setInterval(() => {
        if (!timerPaused) {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                clearTimerFromStorage();
                updateTimerDisplay(false);
                alert('⏱️ Time\'s up!');
            } else {
                updateTimerDisplay(true, formatTime(remainingTime));
                saveTimerToStorage();
            }
        }
    }, 1000);
}

function pauseTimer() {
    const pauseBtn = document.getElementById('pause-timer');
    if (!pauseBtn) return;
    
    timerPaused = !timerPaused;
    pauseBtn.textContent = timerPaused ? 'Resume' : 'Pause';
    
    // Save state when pausing/resuming
    saveTimerToStorage();
}

function stopTimer() {
    const pauseBtn = document.getElementById('pause-timer');
    const timerControlDropdown = document.getElementById('timer-control-dropdown');
    
    clearInterval(timerInterval);
    clearTimerFromStorage();
    updateTimerDisplay(false);
    timerControlDropdown.classList.add('hidden');
    timerPaused = false;
    
    if (pauseBtn) {
        pauseBtn.textContent = 'Pause';
    }
}

function cancelTimer() {
    const timerSetDropdown = document.getElementById('timer-set-dropdown');
    timerSetDropdown.classList.add('hidden');
}

// Timer persistence functions
function saveTimerToStorage() {
    const timerData = {
        remainingTime: remainingTime,
        timerRunning: timerRunning,
        timerPaused: timerPaused,
        startTime: Date.now()
    };
    localStorage.setItem('physicsProTimer', JSON.stringify(timerData));
}

function restoreTimerFromStorage() {
    const savedTimer = localStorage.getItem('physicsProTimer');
    if (!savedTimer) return;
    
    try {
        const timerData = JSON.parse(savedTimer);
        const now = Date.now();
        const elapsed = Math.floor((now - timerData.startTime) / 1000);
        
        if (timerData.timerRunning && !timerData.timerPaused) {
            remainingTime = Math.max(0, timerData.remainingTime - elapsed);
            
            if (remainingTime > 0) {
                timerRunning = true;
                timerPaused = false;
                updateTimerDisplay(true, formatTime(remainingTime));
                
                // Start the interval
                timerInterval = setInterval(() => {
                    if (!timerPaused) {
                        remainingTime--;
                        if (remainingTime <= 0) {
                            clearInterval(timerInterval);
                            clearTimerFromStorage();
                            updateTimerDisplay(false);
                            alert('⏱️ Time\'s up!');
                        } else {
                            updateTimerDisplay(true, formatTime(remainingTime));
                            saveTimerToStorage();
                        }
                    }
                }, 1000);
            } else {
                // Timer has finished
                clearTimerFromStorage();
                updateTimerDisplay(false);
            }
        } else if (timerData.timerRunning && timerData.timerPaused) {
            // Timer is paused, restore exact remaining time
            remainingTime = timerData.remainingTime;
            timerRunning = true;
            timerPaused = true;
            updateTimerDisplay(true, formatTime(remainingTime));
            
            // Update pause button text
            const pauseBtn = document.getElementById('pause-timer');
            if (pauseBtn) {
                pauseBtn.textContent = 'Resume';
            }
        }
    } catch (error) {
        console.warn('Failed to restore timer from storage:', error);
        clearTimerFromStorage();
    }
}

function clearTimerFromStorage() {
    localStorage.removeItem('physicsProTimer');
}

// Navigation scroll effects
function initializeNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let isScrolled = false;
    
    function handleScroll() {
        const scrolled = window.scrollY > 100;
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            // Navigation already has glass-card class, just maintain it
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// External links security
function initializeExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

// Navigation functions
function navigateToHome() {
    const currentPath = window.location.pathname;
    if (currentPath === '/index.html' || currentPath === '/') {
        window.location.reload();
    } else {
        window.location.href = 'index.html';
    }
}

function navigateToLogin() {
    window.location.href = 'login.html';
}

function navigateToPastPapers() {
    window.location.href = 'past-papers.html';
}

function navigateToDemo() {
    window.location.href = 'demo.html';
}

function navigateToMultiLearn() {
    window.location.href = 'multi-learn-hub.html';
}

function navigateToVideos() {
    window.location.href = 'videos.html';
}

function navigateToExamQuestions() {
    window.location.href = 'exam-questions.html';
}

function navigateToQuickLearn() {
    window.location.href = 'quick-learn.html';
}

function navigateToNotes() {
    window.location.href = 'notes.html';
}

function navigateToProgress() {
    window.location.href = 'progress.html';
}

// External resource links
function openSpecificationGuide() {
    window.open("https://cdn.sanity.io/files/p28bar15/green/c84fb691cf808ff97ba17ffce6f458f837016dc9.pdf", "_blank");
}

function openDataSheet() {
    window.open("https://filestore.aqa.org.uk/resources/physics/AQA-7408-SDB.PDF", "_blank");
}

function openFormulaSheet() {
    // AQA Data and Formulae Booklet covers both
    window.open("https://filestore.aqa.org.uk/resources/physics/AQA-7408-SDB.PDF", "_blank");
}

function scrollSection(elementId, direction) {
    const container = document.getElementById(elementId);
    if (container) {
        const scrollAmount = 320; // Width of a card + gap
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Feature strip handlers
function handleFeatureClick(featureId) {
    switch(featureId) {
        case 'specification':
            openSpecificationGuide();
            break;
        case 'datasheet':
            openDataSheet();
            break;
        case 'papers':
            navigateToPastPapers();
            break;
        case 'multilearn':
            navigateToMultiLearn();
            break;
        case 'tutorials':
            navigateToVideos();
            break;
        case 'questions':
            navigateToExamQuestions();
            break;
        case 'quicklearn':
            navigateToQuickLearn();
            break;
        case 'notes':
            navigateToNotes();
            break;
        default:
            // For features without implementation, encourage sign up
            window.scrollTo({ top: 0, behavior: "smooth" });
            break;
    }
}

// Homepage specific functions
// Start Now button functionality
function handleStartNow() {
    const specElement = document.querySelector('[data-testid="feature-specification"]');
    if (specElement && specElement.parentElement && specElement.parentElement.parentElement) {
        const featureSection = specElement.parentElement.parentElement;
        const rect = featureSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top - 80;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
}

// Sample MCQ functionality
function handleSampleAnswer(selectedIndex) {
    const feedback = document.getElementById('feedback');
    const options = document.querySelectorAll('.sample-option');
    const correctAnswer = 1; // "It decreases"
    
    // Reset all options
    options.forEach((opt, idx) => {
        opt.classList.remove('bg-green-50', 'bg-red-50', 'border-green-500', 'border-red-500', 'dark:bg-green-900/20', 'dark:bg-red-900/20');
        opt.classList.add('border-border');
        // Reset radio circle
        const circle = opt.querySelector('div > div'); // The inner dot
        if(circle) circle.classList.add('opacity-0');
    });

    // Highlight selected
    const selectedOpt = options[selectedIndex];
    if (selectedOpt) {
        const circle = selectedOpt.querySelector('div > div');
        if(circle) circle.classList.remove('opacity-0');
    }

    feedback.classList.remove('hidden');
    
    if (selectedIndex === correctAnswer) {
        // Correct style
        if (selectedOpt) {
            selectedOpt.classList.remove('border-border');
            selectedOpt.classList.add('bg-green-50', 'border-green-500', 'dark:bg-green-900/20');
        }
        
        feedback.className = 'mt-6 p-4 rounded-xl bg-green-100 border border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200';
        feedback.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="bg-green-500 text-white rounded-full p-1 mt-0.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                    <strong class="block mb-1">Correct!</strong>
                    <p>When light enters a denser medium (higher refractive index), its speed decreases. Since v = fλ and frequency (f) remains constant, the wavelength (λ) must decrease.</p>
                </div>
            </div>
        `;
    } else {
        // Incorrect style
        if (selectedOpt) {
            selectedOpt.classList.remove('border-border');
            selectedOpt.classList.add('bg-red-50', 'border-red-500', 'dark:bg-red-900/20');
        }
        
        feedback.className = 'mt-6 p-4 rounded-xl bg-red-100 border border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200';
        feedback.innerHTML = `
             <div class="flex items-start gap-3">
                <div class="bg-red-500 text-white rounded-full p-1 mt-0.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div>
                    <strong class="block mb-1">Incorrect</strong>
                    <p>When light enters a denser medium, it slows down. Think about the wave equation v = fλ. Frequency stays the same, so wavelength must decrease.</p>
                </div>
            </div>
        `;
    }
}

Object.assign(window, {
    handleFeatureClick,
    navigateToHome,
    navigateToLogin,
    navigateToPastPapers,
    navigateToDemo,
    navigateToMultiLearn,
    navigateToVideos,
    navigateToExamQuestions,
    navigateToQuickLearn,
    navigateToNotes,
    navigateToProgress,
    openSpecificationGuide,
    openDataSheet,
    openFormulaSheet,
    scrollSection,
    handleStartNow,
    handleSampleAnswer,
    scrollToTop,
    toggleTheme,
    updateThemeToggleIcon,
    initializeIosSelectors,
    startTimer,
    pauseTimer,
    stopTimer,
    cancelTimer,
});
