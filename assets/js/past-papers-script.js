// assets/js/past-papers-script.js

// Past Papers Data
const yearsData = [
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

let expandedYears = [];
let completedPapers = JSON.parse(localStorage.getItem('completedPapers') || '[]');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderYears();
});

function renderYears() {
    const container = document.querySelector('[data-testid="years-container"]');
    container.innerHTML = '';

    yearsData.forEach(yearData => {
        const isExpanded = expandedYears.includes(yearData.year);
        
        const yearDiv = document.createElement('div');
        yearDiv.className = 'accordion-card rounded-2xl overflow-hidden';
        yearDiv.innerHTML = `
            <button 
                onclick="toggleYear('${yearData.year}')"
                class="accordion-header w-full px-6 py-4 flex items-center justify-between transition-all duration-200"
                data-testid="year-toggle-${yearData.year}"
            >
                <span class="text-xl font-semibold">${yearData.year}</span>
                <svg class="w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            
            <div class="accordion-content px-6 pb-6 space-y-4 ${isExpanded ? '' : 'hidden'}" data-testid="year-content-${yearData.year}">
                ${yearData.papers.map(paper => {
                    const paperId = `${yearData.year}-${paper.paperNumber.replace(' ', '-')}`;
                    const isCompleted = completedPapers.includes(paperId);
                    
                    return `
                        <div class="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors duration-200" data-testid="paper-${paperId}">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <h4 class="font-medium mb-2">${paper.paperNumber}</h4>
                                    <div class="flex flex-wrap gap-2">
                                        <a 
                                            href="${paper.qpUrl}" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200"
                                            data-testid="qp-link-${paperId}"
                                        >
                                            QP: Open PDF
                                        </a>
                                        <a 
                                            href="${paper.msUrl}" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            class="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition-colors duration-200"
                                            data-testid="ms-link-${paperId}"
                                        >
                                            MS: Open PDF
                                        </a>
                                    </div>
                                </div>
                                <button 
                                    onclick="toggleCompletion('${paperId}')"
                                    class="ml-4 p-2 rounded-full transition-all duration-200 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}"
                                    data-testid="completion-toggle-${paperId}"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        container.appendChild(yearDiv);
    });
}

function toggleYear(year) {
    const index = expandedYears.indexOf(year);
    if (index > -1) {
        expandedYears.splice(index, 1);
    } else {
        expandedYears.push(year);
    }
    renderYears();
}

function toggleCompletion(paperId) {
    const index = completedPapers.indexOf(paperId);
    if (index > -1) {
        completedPapers.splice(index, 1);
    } else {
        completedPapers.push(paperId);
    }
    
    // Save to localStorage
    localStorage.setItem('completedPapers', JSON.stringify(completedPapers));
    renderYears();
}

// Make functions available globally for HTML onclick handlers
window.toggleYear = toggleYear;
window.toggleCompletion = toggleCompletion;