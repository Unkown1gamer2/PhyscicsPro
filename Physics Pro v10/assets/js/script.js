// Main JavaScript file for Physics Pro
import { IosSelector } from './ios-selector.js';

document.addEventListener('DOMContentLoaded', async function() {
    // Load header and footer components if elements exist
    await loadComponents();
    
    // Initialize theme after components are loaded
    initializeTheme();
    
    // Initialize timer functionality after a short delay to ensure components are loaded
    setTimeout(() => {
        if (typeof initializeTimer === 'function') {
            initializeTimer();
        }
    }, 100);
    
    // Initialize scroll functionality
    initializeScrollToTop();
    initializeScrollToBottom();
    
    // Initialize navigation scroll effects
    initializeNavigation();
    
    // Initialize external link security
    initializeExternalLinks();
});

// Component Loading
async function loadComponents() {
    // Load header component
    const navigationDiv = document.getElementById('navigation');
    if (navigationDiv) {
        try {
            const response = await fetch('components/header.html');
            if (response.ok) {
                navigationDiv.innerHTML = await response.text();
            }
        } catch (error) {
            console.warn('Could not load header component:', error);
        }
    }
    
    // Load footer component
    const footerDiv = document.getElementById('footer');
    if (footerDiv) {
        try {
            const response = await fetch('components/footer.html');
            if (response.ok) {
                footerDiv.innerHTML = await response.text();
            }
        } catch (error) {
            console.warn('Could not load footer component:', error);
        }
    }
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    // Update all theme toggle buttons if they exist (some pages may have multiple)
    const themeToggles = document.querySelectorAll('#theme-toggle');
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

// Dynamic scroll functionality
function initializeScrollToBottom() {
    const scrollBtn = document.getElementById('scroll-bottom');
    if (!scrollBtn) return;
    
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
    
    function handleScrollClick() {
        if (isAtBottom) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to bottom
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
    
    // Set up click handler
    scrollBtn.addEventListener('click', handleScrollClick);
    
    // Set up scroll listener
    window.addEventListener('scroll', updateScrollButton);
    
    // Initial check
    updateScrollButton();
}

// iOS Timer functionality
let timerInterval;
let remainingTime = 0;
let timerPaused = false;
let timerRunning = false;
let hourSelector, minuteSelector, secondSelector;

function initializeTimer() {
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
        hourSelector = new IosSelector({el:'#hour-selector', source: hoursSource});
        minuteSelector = new IosSelector({el:'#minute-selector', source: minutesSecondsSource});
        secondSelector = new IosSelector({el:'#second-selector', source: minutesSecondsSource});
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
        if (!timerSetDropdown.contains(e.target) && !timerControlDropdown.contains(e.target) && !timerIcon.contains(e.target)) {
            timerSetDropdown.classList.add('hidden');
            timerControlDropdown.classList.add('hidden');
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
    window.location.href = 'multi-learn.html';
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

// Make functions available globally for HTML onclick handlers
window.handleFeatureClick = handleFeatureClick;
window.navigateToHome = navigateToHome;
window.navigateToLogin = navigateToLogin;
window.navigateToPastPapers = navigateToPastPapers;
window.navigateToDemo = navigateToDemo;
window.navigateToMultiLearn = navigateToMultiLearn;
window.navigateToVideos = navigateToVideos;
window.navigateToExamQuestions = navigateToExamQuestions;
window.navigateToQuickLearn = navigateToQuickLearn;
window.navigateToNotes = navigateToNotes;
window.navigateToProgress = navigateToProgress;
window.openSpecificationGuide = openSpecificationGuide;
window.openDataSheet = openDataSheet;