import { useState, useEffect } from "react";

export function Hero() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartNow = () => {
    const featureSection = document.querySelector('[data-testid="feature-specification"]')?.parentElement?.parentElement;
    if (featureSection) {
      const rect = featureSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top - 80; // Leave 80px gap at top
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight" data-testid="hero-title">
                Physics
                <span className="text-accent"> A-Level</span>
                <br />Revision
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-lg" data-testid="hero-subtitle">
                Master topics with smart videos, adaptive MCQs, and interactive 3D demos
              </p>
            </div>
            
            {/* Welcome message and start button */}
            <div className="space-y-6">
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 max-w-2xl">
                <h3 className="text-lg font-semibold text-accent mb-2" data-testid="welcome-title">
                  Welcome back!
                </h3>
                <p className="text-muted-foreground mb-4" data-testid="welcome-message">
                  Ready to continue your Physics A-Level journey?
                </p>
                
                <button 
                  onClick={handleStartNow}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                  data-testid="button-start-now"
                >
                  Start Now
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground" data-testid="hero-stats">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                500+ practice questions
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                100+ videos
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                Works offline
              </span>
            </div>
            
            {/* Email signup removed for logged-in users */}
          </div>
          
          {/* Right Column - 3D Demo */}
          <div className="relative animate-slide-up">
            <div className="aspect-square max-w-lg mx-auto relative">
              {/* 3D Demo Placeholder */}
              <div className="w-full h-full rounded-3xl hero-3d flex items-center justify-center relative overflow-hidden" data-testid="hero-3d-demo">
                {/* Morphing 3D Elements Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Particle Cloud */}
                  <div className="absolute animate-float">
                    <div className="w-4 h-4 bg-white rounded-full opacity-80 animate-pulse"></div>
                  </div>
                  <div className="absolute top-1/4 left-1/4 animate-float" style={{animationDelay: '0.5s'}}>
                    <div className="w-3 h-3 bg-white rounded-full opacity-60 animate-pulse"></div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/3 animate-float" style={{animationDelay: '1s'}}>
                    <div className="w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"></div>
                  </div>
                  
                  {/* Central Element */}
                  <div className="w-32 h-32 border-4 border-white rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                </div>
                
                {/* Demo Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <button 
                    className="glass-card text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-all duration-200"
                    data-testid="button-demo-explain"
                  >
                    Interactive Physics Demo
                  </button>
                </div>
                
                {/* Keyboard Hint */}
                <div className="absolute top-6 right-6">
                  <div className="glass-card text-white px-3 py-1 rounded text-xs" data-testid="keyboard-hint">
                    Space to pause
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className={`scroll-indicator absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-300 ${!showScrollIndicator ? 'hidden' : ''}`}>
              <div className="text-sm text-muted-foreground mb-2">Scroll to see physics concepts</div>
              <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto relative">
                <div className="w-1 h-3 bg-muted-foreground rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
