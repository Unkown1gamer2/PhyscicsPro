import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?",
    options: ["4 m/s²", "2 m/s²", "5 m/s²", "10 m/s²"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which of the following is a renewable energy source?",
    options: ["Coal", "Natural Gas", "Solar Power", "Nuclear Fuel"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "In the electromagnetic spectrum, which wave has the longest wavelength?",
    options: ["Visible Light", "X-Rays", "Radio Waves", "Ultraviolet"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "A 10 Ω resistor and a 20 Ω resistor are connected in series. What is the total resistance?",
    options: ["15 Ω", "5 Ω", "25 Ω", "30 Ω"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "If a series circuit has a total resistance of 30 Ω and a supply voltage of 9 V, what is the current?",
    options: ["0.3 A", "3 A", "0.03 A", "90 A"],
    correctAnswer: 0
  }
];

interface QuestionState {
  selectedAnswer: number | null;
  showFeedback: boolean;
  isAnswered: boolean;
}

export default function Demo() {
  const [, setLocation] = useLocation();
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    questions.map(() => ({ selectedAnswer: null, showFeedback: false, isAnswered: false }))
  );
  const [visibleQuestions, setVisibleQuestions] = useState(1);
  const [showHelpInfo, setShowHelpInfo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleBackToHome = () => {
    setLocation('/home');
  };

  const getCustomFeedback = (questionIndex: number, isCorrect: boolean) => {
    if (isCorrect) return "Correct! Well done.";
    
    switch (questionIndex) {
      case 0: // Question 1 - Calculation
        return "Acceleration = change in velocity ÷ time. (20 − 0) ÷ 5 = 4 m/s².";
      case 1: // Question 2 - General knowledge
        return "Incorrect.";
      case 2: // Question 3 - General knowledge
        return "Incorrect.";
      case 3: // Question 4 - Calculation
        return "In series, total resistance = R₁ + R₂. 10 + 20 = 30 Ω.";
      case 4: // Question 5 - Calculation
        return "Use Ohm's Law: I = V ÷ R. 9 ÷ 30 = 0.3 A.";
      default:
        return "Incorrect.";
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const currentState = questionStates[questionIndex];
    if (currentState.isAnswered) return;

    const newStates = [...questionStates];
    newStates[questionIndex] = {
      selectedAnswer: answerIndex,
      showFeedback: true,
      isAnswered: true
    };
    setQuestionStates(newStates);

    const isCorrect = answerIndex === questions[questionIndex].correctAnswer;

    // Show help info and next questions immediately, then scroll after render
    setTimeout(() => {
      if (questionIndex === 2) {
        // Show help info after question 3 and load question 4 immediately
        setShowHelpInfo(true);
        setVisibleQuestions(prev => Math.max(prev, 5)); // Show question 4 (index 3)
        
        if (isCorrect) {
          // Wait for tip to render, then scroll to it
          setTimeout(() => {
            const tipElement = document.querySelector(`[data-testid="inline-tip-title"]`);
            if (tipElement) {
              tipElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 50);
        }
      } else if (questionIndex < questions.length - 1) {
        // Show next question
        setVisibleQuestions(prev => Math.max(prev, questionIndex + 2));
        
        if (isCorrect) {
          // Wait for next question to render, then scroll
          setTimeout(() => {
            const nextQuestionElement = document.getElementById(`question-${questionIndex + 1}`);
            if (nextQuestionElement) {
              nextQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 50);
        }
      } else {
        // Quiz completed - show completion inline
        setIsCompleted(true);
        setTimeout(() => {
          const completionElement = document.getElementById('completion-section');
          if (completionElement) {
            completionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 50);
      }
    }, 10);
  };

  // handleContinueAfterInfo removed - help info now appears inline without continue button

  // All content now appears inline in the scrolling layout

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-muted/20 pointer-events-none"></div>
      
      {/* Logo */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={handleBackToHome}
          className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors duration-200"
          data-testid="logo-demo"
        >
          Physics<span className="text-foreground/60">Pro</span>
        </button>
      </div>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Video Placeholder */}
          <div className="glass-card rounded-3xl p-2 mb-12 animate-fade-in">
            <div className="bg-muted/20 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-accent border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-muted-foreground text-lg" data-testid="video-placeholder">
                  Demo Video Coming Soon
                </p>
              </div>
            </div>
          </div>

          {/* Progressive Quiz Section */}
          <div className="space-y-12">
            {questions.slice(0, visibleQuestions).map((question, questionIndex) => {
              const questionState = questionStates[questionIndex];
              const isCorrect = questionState.selectedAnswer === question.correctAnswer;
              
              return (
                <div 
                  key={questionIndex} 
                  id={`question-${questionIndex}`}
                  className="glass-card rounded-3xl p-8 animate-slide-up"
                >
                  {/* Progress */}
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-sm text-muted-foreground" data-testid={`question-progress-${questionIndex}`}>
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                    <div className="flex space-x-2">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            questionStates[index]?.isAnswered
                              ? "bg-accent"
                              : index === questionIndex
                              ? "bg-accent/60"
                              : "bg-muted"
                          }`}
                          data-testid={`progress-dot-${questionIndex}-${index}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl font-bold mb-8 leading-relaxed" data-testid={`quiz-question-${questionIndex}`}>
                    {question.question}
                  </h2>

                  {/* Answer Options */}
                  <div className="space-y-4">
                    {question.options.map((option, optionIndex) => {
                      let buttonClass = "glass-card p-4 rounded-xl text-left w-full transition-all duration-300 hover:bg-muted/20 border border-transparent";
                      
                      if (questionState.showFeedback && questionState.selectedAnswer === optionIndex) {
                        if (isCorrect) {
                          buttonClass = "glass-card p-4 rounded-xl text-left w-full transition-all duration-300 border-2 border-green-500 bg-green-500/10";
                        } else {
                          buttonClass = "glass-card p-4 rounded-xl text-left w-full transition-all duration-300 border-2 border-red-500 bg-red-500/10";
                        }
                      } else if (questionState.showFeedback && optionIndex === question.correctAnswer) {
                        buttonClass = "glass-card p-4 rounded-xl text-left w-full transition-all duration-300 border-2 border-green-500 bg-green-500/10";
                      }

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                          className={buttonClass}
                          data-testid={`answer-option-${questionIndex}-${optionIndex}`}
                          disabled={questionState.isAnswered}
                        >
                          <div className="flex items-center space-x-4">
                            <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-semibold">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="text-lg">{option}</span>
                            {questionState.showFeedback && questionState.selectedAnswer === optionIndex && (
                              <div className="ml-auto">
                                {isCorrect ? (
                                  <CheckCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-red-500" />
                                )}
                              </div>
                            )}
                            {questionState.showFeedback && questionState.selectedAnswer !== optionIndex && optionIndex === question.correctAnswer && (
                              <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Message */}
                  {questionState.showFeedback && (
                    <div className={`mt-6 p-4 rounded-xl animate-fade-in ${
                      isCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                    }`}>
                      <p className={`text-center font-semibold ${
                        isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`} data-testid={`feedback-message-${questionIndex}`}>
                        {getCustomFeedback(questionIndex, isCorrect)}
                      </p>
                    </div>
                  )}

                  {/* Quick Tip after Question 3 */}
                  {questionIndex === 2 && questionState.showFeedback && showHelpInfo && (
                    <div className="mt-8 bg-accent/10 border border-accent/20 rounded-2xl p-6 animate-fade-in">
                      <h3 className="text-lg font-bold text-accent mb-3" data-testid="inline-tip-title">
                        Quick Tip!
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid="inline-tip-content">
                        In a series circuit, the current is the same at all points. If you add more resistors, the total resistance increases, and the total current decreases.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Help Info Section removed - now appears inline under Question 3 */}

            {/* Completion Section - shows after all questions */}
            {isCompleted && (
              <div id="completion-section" className="glass-card rounded-3xl p-12 text-center space-y-8 animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-accent" data-testid="completion-title">
                  Demo Complete!
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="completion-message">
                  Great work! You've experienced our interactive learning system. Ready to unlock your full Physics A-Level potential?
                </p>
                
                <Button
                  onClick={handleBackToHome}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 animate-glow"
                  data-testid="button-home-completion"
                >
                  Home
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}