import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "@/components/ThemeProvider";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Add subtle particle animation effect
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const element = particle as HTMLElement;
      element.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const handleSignUp = () => {
    setLocation('/home');
  };

  const handleLogIn = () => {
    setLocation('/home');
  };

  const handleDemo = () => {
    setLocation('/demo');
  };

  const handleFeatureClick = () => {
    // Scroll to top to encourage sign up
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-3 rounded-full glass-card hover:bg-muted/20"
          data-testid="theme-toggle"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-float"></div>
        <div className="particle absolute top-1/3 right-1/3 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="particle absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="particle absolute top-1/2 right-1/4 w-2 h-2 bg-accent/25 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="particle absolute bottom-1/3 right-1/2 w-3 h-3 bg-accent/15 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-muted/20 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            {/* Main Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight" data-testid="landing-title">
              Physics
              <span className="text-accent block"> A-Level</span>
              <span className="block">Revision</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl sm:text-3xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed" data-testid="landing-subtitle">
              Learn smarter, faster, and more interactively than ever before.
            </p>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed" data-testid="landing-description">
              Adaptive MCQs, video tutorials, and immersive 3D demos to master every A-Level Physics topic.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-6 justify-center items-center pt-8">
              {/* Sign Up and Log In Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={handleSignUp}
                  className="px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 text-[#2563eb] bg-[#ffffff]"
                  data-testid="button-signup"
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.textShadow = '0 0 8px rgba(37, 99, 235, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.textShadow = 'none';
                  }}
                >
                  Sign Up
                </Button>
                <Button 
                  onClick={handleLogIn}
                  className="px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 text-[#2563eb] bg-[#ffffff]"
                  data-testid="button-login"
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.textShadow = '0 0 8px rgba(37, 99, 235, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.textShadow = 'none';
                  }}
                >
                  Log In
                </Button>
              </div>
              
              {/* Demo Button */}
              <Button 
                onClick={handleDemo}
                className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 animate-glow border-2 border-blue-400"
                data-testid="button-demo"
              >
                Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-slide-up">
            {/* Multi Learn Card */}
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" data-testid="feature-multilearn" onClick={handleFeatureClick}>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto flex items-center justify-center">
                <div className="w-7 h-7 bg-white rounded-lg animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold" data-testid="feature-multilearn-title">
                Multi Learn
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="feature-multilearn-description">
                Adaptive learning system that adjusts to your pace and identifies knowledge gaps instantly.
              </p>
            </div>

            {/* Past Papers Card */}
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" data-testid="feature-pastpapers" onClick={handleFeatureClick}>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mx-auto flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-white rounded opacity-80"></div>
              </div>
              <h3 className="text-xl font-bold" data-testid="feature-pastpapers-title">
                Past Papers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="feature-pastpapers-description">
                Complete collection of exam papers with detailed mark schemes and examiner insights.
              </p>
            </div>

            {/* Video Tutorials Card */}
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" data-testid="feature-videos" onClick={handleFeatureClick}>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto flex items-center justify-center">
                <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              </div>
              <h3 className="text-xl font-bold" data-testid="feature-videos-title">
                Video Tutorials
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="feature-videos-description">
                Expert-led explanations with 3D visualizations making complex concepts crystal clear.
              </p>
            </div>

            {/* Exam Questions Card */}
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" data-testid="feature-examquestions" onClick={handleFeatureClick}>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-white rounded-full opacity-80 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold" data-testid="feature-examquestions-title">
                Exam Questions
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="feature-examquestions-description">
                Practice with targeted question sets organized by topic and difficulty level.
              </p>
            </div>

            {/* Quick Learn Card */}
            <div className="glass-card p-6 rounded-2xl text-center space-y-4 hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" data-testid="feature-quicklearn" onClick={handleFeatureClick}>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-2xl mx-auto flex items-center justify-center">
                <div className="flex flex-col space-y-1">
                  <div className="w-6 h-1 bg-white rounded-full opacity-90"></div>
                  <div className="w-4 h-1 bg-white rounded-full opacity-70"></div>
                  <div className="w-5 h-1 bg-white rounded-full opacity-80"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold" data-testid="feature-quicklearn-title">
                Quick Learn
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" data-testid="feature-quicklearn-description">
                Scroll through rapid-fire multiple choice questions for quick revision sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-border/20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-accent transition-colors duration-200" data-testid="footer-link-about">
                About
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" data-testid="footer-link-contact">
                Contact
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" data-testid="footer-link-terms">
                Terms
              </a>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="footer-copyright">
              © 2024 PhysicsPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}