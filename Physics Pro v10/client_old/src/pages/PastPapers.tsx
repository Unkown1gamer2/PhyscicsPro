import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronDown, Check } from "lucide-react";

interface PaperPair {
  paperNumber: string;
  qpUrl: string;
  msUrl: string;
}

interface YearData {
  year: string;
  papers: PaperPair[];
}

export default function PastPapers() {
  const [expandedYears, setExpandedYears] = useState<string[]>([]);
  const [completedPapers, setCompletedPapers] = useState<string[]>([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const yearsData: YearData[] = [
    {
      year: "2024",
      papers: [
        { 
          paperNumber: "Paper 1", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-1/QP/June%202024%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-1/June%202024%20MS.pdf"
        },
        { 
          paperNumber: "Paper 2", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-2/QP/June%202024%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-2/June%202024%20MS.pdf"
        },
        { 
          paperNumber: "Paper 3", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-3/QP/June%202024%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-3/June%202024%20MS.pdf"
        }
      ]
    },
    {
      year: "2023",
      papers: [
        { 
          paperNumber: "Paper 1", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-1/QP/June%202023%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-1/June%202023%20MS.pdf"
        },
        { 
          paperNumber: "Paper 2", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-2/QP/June%202023%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-2/June%202023%20MS.pdf"
        },
        { 
          paperNumber: "Paper 3", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-3/QP/June%202023%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-3/June%202023%20MS.pdf"
        }
      ]
    },
    {
      year: "2022",
      papers: [
        { 
          paperNumber: "Paper 1", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-1/QP/June%202022%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-1/June%202022%20MS.pdf"
        },
        { 
          paperNumber: "Paper 2", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-2/QP/June%202022%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-2/June%202022%20MS.pdf"
        },
        { 
          paperNumber: "Paper 3", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-3/QP/June%202022%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-3/June%202022%20MS.pdf"
        }
      ]
    },
    {
      year: "2021",
      papers: [
        { 
          paperNumber: "Paper 1", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-1/QP/June%202021%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-1/June%202021%20MS.pdf"
        },
        { 
          paperNumber: "Paper 2", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-2/QP/June%202021%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-2/June%202021%20MS.pdf"
        },
        { 
          paperNumber: "Paper 3", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-3/QP/June%202021%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-3/June%202021%20MS.pdf"
        }
      ]
    },
    {
      year: "2020",
      papers: [
        { 
          paperNumber: "Paper 1", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-1/QP/June%202020%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-1/June%202020%20MS.pdf"
        },
        { 
          paperNumber: "Paper 2", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-2/QP/June%202020%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-2/June%202020%20MS.pdf"
        },
        { 
          paperNumber: "Paper 3", 
          qpUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/AQA/Paper-3/QP/June%202020%20QP.pdf",
          msUrl: "https://pmt.physicsandmathstutor.com/download/Physics/A-level/Mark-Schemes/AQA/Paper-3/June%202020%20MS.pdf"
        }
      ]
    }
  ];

  const toggleYear = (year: string) => {
    setExpandedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const toggleComplete = (paperId: string) => {
    setCompletedPapers(prev => 
      prev.includes(paperId)
        ? prev.filter(id => id !== paperId)
        : [...prev, paperId]
    );
  };

  const getPaperId = (year: string, paperNumber: string) => `${year}-${paperNumber}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AQA A-Level Physics Past Papers</h1>
            <p className="text-lg text-muted-foreground">
              Complete collection of past papers from 2020-2024 with mark schemes
            </p>
          </div>

          {/* Years Section */}
          <div className="space-y-4">
            {yearsData.map((yearData) => {
              const isExpanded = expandedYears.includes(yearData.year);
              
              return (
                <div key={yearData.year} className="glass-card rounded-2xl overflow-hidden border border-muted">
                  {/* Year Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-muted/50 transition-colors duration-200 flex justify-between items-center bg-gradient-to-r from-accent/10 to-accent/5"
                    onClick={() => toggleYear(yearData.year)}
                  >
                    <span className="text-xl font-bold">{yearData.year}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Papers List */}
                  {isExpanded && (
                    <div className="px-6 pb-6 space-y-3">
                      {yearData.papers.map((paper) => {
                        const paperId = getPaperId(yearData.year, paper.paperNumber);
                        const isCompleted = completedPapers.includes(paperId);
                        
                        return (
                          <div key={`${yearData.year}-${paper.paperNumber}`} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-muted">
                            <div className="flex items-center space-x-4 flex-wrap">
                              <span className="font-medium">{paper.paperNumber} -</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">QP:</span>
                                <a
                                  href={paper.qpUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-200 underline"
                                >
                                  Open PDF
                                </a>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">MS:</span>
                                <a
                                  href={paper.msUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-200 underline"
                                >
                                  Open PDF
                                </a>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => toggleComplete(paperId)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors duration-200 ${
                                isCompleted 
                                  ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                                  : 'bg-background border-muted hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {isCompleted ? 'Complete' : 'Mark Complete'}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Study Tips */}
          <div className="mt-12 glass-card p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-accent">
              Study Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Using Past Papers</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Start with recent papers (2023-2024)</li>
                  <li>• Practice under timed conditions</li>
                  <li>• Review mark schemes thoroughly</li>
                  <li>• Track completion progress</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Mark Scheme Analysis</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Compare your answers to marking points</li>
                  <li>• Note command word requirements</li>
                  <li>• Practice scientific notation and units</li>
                  <li>• Focus on areas needing improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}