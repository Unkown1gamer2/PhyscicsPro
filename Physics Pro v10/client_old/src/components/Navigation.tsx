import { useState, useEffect } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "./ThemeProvider";
import { useLocation } from "wouter";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    // Navigate back to landing page
    setLocation('/');
  };

  const handleLogoClick = () => {
    // Navigate to home page or reload if already on home
    const currentPath = window.location.pathname;
    if (currentPath === '/home') {
      window.location.reload();
    } else {
      setLocation('/home');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card" : "glass-card"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick}
              className="text-xl font-bold text-accent hover:text-accent/80 transition-colors duration-200 cursor-pointer" 
              data-testid="logo"
            >
              Physics<span className="text-foreground/60">Pro</span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="hover:text-accent transition-colors duration-200" data-testid="nav-progress">
                Progress
              </a>
              <a href="#" className="hover:text-accent transition-colors duration-200" data-testid="nav-findcourse">
                Find My Course
              </a>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted"
              data-testid="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            
            {/* Sign Out Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-accent transition-colors duration-200"
              data-testid="button-signout"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
