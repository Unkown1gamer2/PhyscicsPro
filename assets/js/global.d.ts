export {};

declare global {
  interface Window {
    handleFeatureClick: () => void;
    navigateToHome: () => void;
    navigateToLogin: () => void;
    navigateToPastPapers: () => void;
    navigateToDemo: () => void;
    navigateToMultiLearn: () => void;
    navigateToVideos: () => void;
    navigateToExamQuestions: () => void;
    navigateToQuickLearn: () => void;
    navigateToNotes: () => void;
    navigateToProgress: () => void;
    openSpecificationGuide: () => void;
    openDataSheet: () => void;
    handleStartNow: () => void;
    handleSampleAnswer: () => void;
    scrollToTop: () => void;
    toggleTheme: () => void;
    updateThemeToggleIcon: () => void;
    initializeIosSelectors: () => void;
    startTimer: () => void;
    pauseTimer: () => void;
    stopTimer: () => void;
    cancelTimer: () => void;
  }
}
