const fs = require('fs');
const path = require('path');

// Files
const currentQuestionsPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');
const sourceQuestionsPath = path.join(__dirname, 'readytodeleteinfo');

// Load Data
const currentQuestions = JSON.parse(fs.readFileSync(currentQuestionsPath, 'utf8'));
const rawSource = fs.readFileSync(sourceQuestionsPath, 'utf8');

// Mapping: Video ID -> Source Title in readytodeleteinfo
const manualMapping = {
    "gj5": "Calculating net force and acceleration", // Free body diagrams
    "tLj": "Pendulum and spring SHM" // Simple harmonic motion
};

// Also add titles for the videos for the output
const videoTitles = {
    "gj5": "Free body diagrams and objects on an inclined plane",
    "tLj": "Simple harmonic motion"
};

function sanitizeJsonBlock(text) {
    let fixed = text.replace(/\\([^"\\/bfnrtu])/g, '\\\\$1');
    return fixed;
}

function iterativeParse(text) {
    let currentText = text;
    let attempts = 0;
    const maxAttempts = 200; // Increased attempts
    while (attempts < maxAttempts) {
        try {
            return JSON.parse(currentText);
        } catch (e) {
            const match = e.message.match(/position (\d+)/);
            if (!match) throw e;
            const pos = parseInt(match[1]);
            
            // Debug log every 20 attempts
            if (attempts % 20 === 0) {
                 // console.log(`Attempt ${attempts}: Error at ${pos}. Context: "${currentText.substring(pos-10, pos+10)}"`);
            }

            let fixPos = -1;
            if (currentText[pos] === '\\') fixPos = pos;
            else if (currentText[pos-1] === '\\') fixPos = pos-1;
            else if (currentText[pos-2] === '\\') fixPos = pos-2;
            else if (currentText[pos-3] === '\\') fixPos = pos-3; // Try further back
            
            if (fixPos !== -1) {
                currentText = currentText.slice(0, fixPos) + '\\' + currentText.slice(fixPos);
                attempts++;
            } else {
                 // If we can't find a backslash, maybe it's a bad quote or control char?
                 // Try to escape the character at pos if it looks suspicious?
                 // For now, just throw to avoid infinite loop of non-fixing
                 console.error(`Unfixable error at ${pos}: ${currentText.substring(pos-10, pos+10)}`);
                 throw e;
            }
        }
    }
    throw new Error(`Failed to parse after ${maxAttempts} attempts`);
}

const newEntries = [];

for (const [videoId, sourceTitle] of Object.entries(manualMapping)) {
    console.log(`Processing ${videoId} (${videoTitles[videoId]})...`);
    console.log(`  -> Mapping to source title: "${sourceTitle}"`);

    const titleIndex = rawSource.indexOf(`"title": "${sourceTitle}"`);
    if (titleIndex === -1) {
        console.error(`  ERROR: Source title "${sourceTitle}" not found!`);
        continue;
    }

    // Find the object bounds
    // Search backwards for {
    let startParams = rawSource.lastIndexOf('{', titleIndex);
    
    // Find matching closing brace
    let openBraces = 0;
    let endIndex = -1;
    for (let i = startParams; i < rawSource.length; i++) {
        if (rawSource[i] === '{') openBraces++;
        if (rawSource[i] === '}') openBraces--;
        
        if (openBraces === 0) {
            endIndex = i + 1;
            break;
        }
    }

    if (endIndex === -1) {
        console.error('  ERROR: Could not find closing brace');
        continue;
    }

    const jsonBlock = rawSource.substring(startParams, endIndex);
    
    try {
        const sanitized = sanitizeJsonBlock(jsonBlock);
        const questionData = iterativeParse(sanitized);
        
        // Create new entry
        const newEntry = {
            id: videoId,
            title: videoTitles[videoId], // Use the VIDEO title, not the source title
            questions: questionData.questions,
            // tips: questionData.tips // Optional: include tips if present
        };
        
        newEntries.push(newEntry);
        console.log(`  -> Successfully extracted ${newEntry.questions.length} questions`);
        
    } catch (e) {
        console.error(`  ERROR: Failed to parse JSON: ${e.message}`);
    }
}

if (newEntries.length > 0) {
    // Check if IDs already exist and update or append
    let addedCount = 0;
    let updatedCount = 0;
    
    newEntries.forEach(entry => {
        const existingIndex = currentQuestions.findIndex(q => q.id === entry.id);
        if (existingIndex !== -1) {
            currentQuestions[existingIndex] = entry;
            updatedCount++;
        } else {
            currentQuestions.push(entry);
            addedCount++;
        }
    });

    fs.writeFileSync(currentQuestionsPath, JSON.stringify(currentQuestions, null, 2));
    console.log(`\nSuccess! Added ${addedCount} new entries and updated ${updatedCount} entries.`);
} else {
    console.log('\nNo new entries created.');
}
