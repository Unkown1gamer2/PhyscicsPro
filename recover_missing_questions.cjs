const fs = require('fs');
const path = require('path');

// Files
const videosPath = path.join(__dirname, 'assets', 'videos-data.json');
const currentQuestionsPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');
const sourceQuestionsPath = path.join(__dirname, 'readytodeleteinfo');

// Load Data
const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
const currentQuestions = JSON.parse(fs.readFileSync(currentQuestionsPath, 'utf8'));
const rawSource = fs.readFileSync(sourceQuestionsPath, 'utf8');

// 1. Identify Missing Videos
const currentQuestionIds = new Set(currentQuestions.map(q => q.id));
const missingVideos = [];

videosData.forEach(v => {
    const parts = v.page_url.split('/');
    let id = parts[parts.length - 1];
    if (!id) id = parts[parts.length - 2];
    
    if (!currentQuestionIds.has(id)) {
        missingVideos.push({
            id: id,
            title: v.video_title.trim(),
            normalizedTitle: v.video_title.trim().toLowerCase()
        });
    }
});

console.log(`Missing Videos: ${missingVideos.length}`);

// 2. Recovery Logic
let recoveredCount = 0;
const recoveredQuestions = [];

function sanitizeJsonBlock(text) {
    // 1. Initial pass: Fix common LaTeX patterns that are known to break JSON
    // Replace single backslash not followed by valid escape char with double backslash
    let fixed = text.replace(/\\([^"\\/bfnrtu])/g, '\\\\$1');
    return fixed;
}

function iterativeParse(text) {
    let currentText = text;
    let attempts = 0;
    const maxAttempts = 20; // Prevent infinite loops

    while (attempts < maxAttempts) {
        try {
            return JSON.parse(currentText);
        } catch (e) {
            // Check for specific error types we can fix
            // "Bad escaped character" or similar syntax errors
            const match = e.message.match(/position (\d+)/);
            if (!match) throw e; // Can't fix if we don't know where

            const pos = parseInt(match[1]);
            
            // Analyze the context around the error
            // Usually the error position is at the character AFTER the backslash
            // OR at the backslash itself depending on the parser implementation.
            // Let's look at characters around pos.
            
            // If it's a "Bad escaped character", it means we have a `\` followed by something invalid.
            // We want to escape that `\` to `\\`.
            
            // Caution: We need to find the specific backslash that caused this.
            // It's likely at pos-1 or pos.
            
            let fixPos = -1;
            if (currentText[pos] === '\\') {
                fixPos = pos;
            } else if (currentText[pos-1] === '\\') {
                fixPos = pos-1;
            } else if (currentText[pos-2] === '\\') { // Sometimes position is further ahead
                 fixPos = pos-2;
            }
            
            if (fixPos !== -1) {
                // Insert a backslash at fixPos
                currentText = currentText.slice(0, fixPos) + '\\' + currentText.slice(fixPos);
                attempts++;
                // console.log(`    -> Patching JSON at position ${fixPos} (Attempt ${attempts})`);
            } else {
                // Could not identify the backslash, re-throw
                throw e;
            }
        }
    }
    throw new Error(`Failed to parse after ${maxAttempts} attempts`);
}

missingVideos.forEach(v => {
    console.log(`Searching for: "${v.title}"...`);
    
    let titleIndex = rawSource.indexOf(v.title);
    
    // Fallback: Keyword search
    if (titleIndex === -1) {
        const keywords = {
            "Displacement vs distance": "Displacement",
            "Adding vectors - graphically and mathematically": "Adding vectors",
            "Subtracting vectors": "Subtracting vectors",
            "Mass and weight": "Mass", 
            "Centre of mass and graivty": "Centre of mass",
            "Free body diagrams and objects on an inclined plane": "Free body diagrams",
            "Drag, air resistance and water resistance": "Drag",
            "Springs in parallel and series": "Springs in parallel",
            "Elastic potential energy in springs": "Elastic potential",
            "Simple harmonic motion": "Simple harmonic",
            "Circular motion": "Circular motion"
        };
        
        const keyword = keywords[v.title];
        if (keyword) {
            console.log(`  -> Exact title not found. Trying keyword: "${keyword}"...`);
            titleIndex = rawSource.indexOf(keyword);
        }
    }

    if (titleIndex === -1) {
        console.log(`  -> Title not found in source text.`);
        return;
    }

    // Search backwards for opening {
    let openBrace = -1;
    for (let i = titleIndex; i >= 0; i--) {
        if (rawSource[i] === '{') {
            const chunk = rawSource.substring(i, titleIndex);
            if (chunk.includes('"id":')) {
                openBrace = i;
                break;
            }
        }
    }

    if (openBrace === -1) {
        console.log(`  -> Could not find start of object.`);
        return;
    }

    // Search forwards for closing }
    let closeBrace = -1;
    let depth = 0;
    for (let i = openBrace; i < rawSource.length; i++) {
        if (rawSource[i] === '{') depth++;
        if (rawSource[i] === '}') depth--;
        
        if (depth === 0) {
            closeBrace = i;
            break;
        }
    }

    if (closeBrace === -1) {
        console.log(`  -> Could not find end of object.`);
        return;
    }

    // Extract block
    const block = rawSource.substring(openBrace, closeBrace + 1);
    
    // Parse
    try {
        // First pass sanitization
        const sanitized = sanitizeJsonBlock(block);
        
        // Iterative parsing to fix remaining issues
        const qObj = iterativeParse(sanitized);
        
        console.log(`  -> RECOVERED! (Source ID: ${qObj.id})`);
        
        qObj.id = v.id;
        qObj.title = v.title;
        
        recoveredQuestions.push(qObj);
        recoveredCount++;
        
    } catch (e) {
        console.log(`  -> Extraction failed: ${e.message}`);
        
        // Debug snippet
        const match = e.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            const start = Math.max(0, pos - 50);
            const end = Math.min(block.length, pos + 50);
            console.log(`     Snippet: ...${block.substring(start, end)}...`);
            console.log(`     At pos ${pos}, char is: '${block[pos]}'`);
        }
    }
});

// 3. Add to Current Questions
if (recoveredCount > 0) {
    const finalQuestions = currentQuestions.concat(recoveredQuestions);
    
    // Deduplicate by ID
    const uniqueQuestions = new Map();
    finalQuestions.forEach(q => uniqueQuestions.set(q.id, q));
    
    fs.writeFileSync(currentQuestionsPath, JSON.stringify(Array.from(uniqueQuestions.values()), null, 2));
    console.log(`\nSuccess! Added ${recoveredCount} recovered questions.`);
    console.log(`Total Question Sets: ${uniqueQuestions.size}`);
} else {
    console.log(`\nNo additional questions recovered.`);
}
