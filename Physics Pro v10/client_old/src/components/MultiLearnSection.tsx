import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MultiLearnSection() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = {
    text: "What happens to the wavelength of light when it enters a denser medium?",
    options: [
      "It increases",
      "It decreases",
      "It remains the same"
    ],
    correctAnswer: 1,
    explanation: "When light enters a denser medium, its speed decreases, causing the wavelength to decrease while frequency remains constant."
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual Demo */}
          <div className="relative">
            <div className="aspect-video glass-card rounded-2xl p-8 flex items-center justify-center" data-testid="multilearn-demo">
              {/* video/demo here */}
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450" 
                alt="Teacher explaining physics concepts on digital whiteboard" 
                className="rounded-xl w-full h-full object-cover opacity-80"
                data-testid="demo-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white text-sm font-medium">Interactive Physics Demo</div>
                  <div className="text-white/80 text-xs">Wave motion and interference patterns</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - MCQ Panel */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold" data-testid="multilearn-title">Multi Learn</h2>
              <p className="text-xl text-muted-foreground" data-testid="multilearn-description">
                Learn smarter with interactive lessons that adapt to your progress
              </p>
            </div>
            
            {/* Sample MCQ */}
            <div className="glass-card rounded-2xl p-6 space-y-4 sticky top-24" data-testid="sample-mcq">
              <div className="text-lg font-semibold mb-4" data-testid="question-text">
                {question.text}
              </div>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label 
                    key={index}
                    className="flex items-center p-3 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors duration-200"
                    data-testid={`option-${index}`}
                  >
                    <input 
                      type="radio" 
                      name="sample-q" 
                      className="mr-3 text-accent"
                      onChange={() => handleAnswerSelect(index)}
                      checked={selectedAnswer === index}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              
              {/* Feedback Area */}
              {showFeedback && (
                <div className={`mt-4 p-4 border rounded-lg ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`} data-testid="feedback">
                  <div className={`font-medium ${
                    isCorrect 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Try again!'}
                  </div>
                  {isCorrect && (
                    <div className="text-green-700 dark:text-green-300 text-sm mt-1" data-testid="explanation">
                      {question.explanation}
                    </div>
                  )}
                </div>
              )}
              
              <Button 
                onClick={() => window.location.href = '/demo'}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-lg font-medium transition-all duration-200 mt-4"
                data-testid="button-demo"
              >
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
