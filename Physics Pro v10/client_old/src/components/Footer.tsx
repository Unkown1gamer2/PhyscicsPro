import { useLocation } from "wouter";

export function Footer() {
  const [, setLocation] = useLocation();

  const handleSignOut = () => {
    // Navigate back to landing page
    setLocation('/');
  };

  const handleSpecificationClick = () => {
    window.open("https://cdn.sanity.io/files/p28bar15/green/c84fb691cf808ff97ba17ffce6f458f837016dc9.pdf", "_blank");
  };

  const handleDataSheetClick = () => {
    window.open("https://filestore.aqa.org.uk/resources/physics/AQA-7408-SDB.PDF", "_blank");
  };

  const handlePastPapersClick = () => {
    setLocation('/past-papers');
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" data-testid="footer-quicklinks-title">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-topics">
                Topics Overview
              </a>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-videos">
                Video Tutorials
              </a>
              <button onClick={handlePastPapersClick} className="block text-background/70 hover:text-background transition-colors duration-200 text-left" data-testid="footer-link-papers">
                Past Papers
              </button>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-multilearn">
                Multi Learn
              </a>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-questions">
                Exam Questions
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" data-testid="footer-resources-title">Resources</h3>
            <div className="space-y-2">
              <button onClick={handleSpecificationClick} className="block text-background/70 hover:text-background transition-colors duration-200 text-left" data-testid="footer-link-specification">
                Specification Guide
              </button>
              <button onClick={handleDataSheetClick} className="block text-background/70 hover:text-background transition-colors duration-200 text-left" data-testid="footer-link-data">
                Data Booklet
              </button>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-formula">
                Formula Sheet
              </a>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-planner">
                Study Planner
              </a>
              <a href="#" className="block text-background/70 hover:text-background transition-colors duration-200" data-testid="footer-link-tracker">
                Progress Tracker
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" data-testid="footer-contact-title">Contact</h3>
            <div className="space-y-2">
              <div className="text-background/70" data-testid="footer-email">Give Us Feedback</div>
              <div className="text-background/70" data-testid="footer-help">Help Center</div>
              <div className="text-background/70" data-testid="footer-forum">Email:</div>
              <div className="text-background/70" data-testid="footer-hours">Scottlucey@outlook.com</div>
            </div>
          </div>
          
          {/* User Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" data-testid="footer-user-resources-title">Your Account</h3>
            <div className="space-y-2">
              <div className="text-background/70" data-testid="footer-profile">My Profile</div>
              <div className="text-background/70" data-testid="footer-progress">Study Progress</div>
              <div className="text-background/70" data-testid="footer-settings">Settings</div>
              <button onClick={handleSignOut} className="text-background/70 hover:text-background transition-colors duration-200 text-left" data-testid="footer-logout">Log Out</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/70">
          <p data-testid="footer-copyright">© 2025 PhysicsPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
