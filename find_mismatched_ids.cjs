const fs = require('fs');
const path = require('path');

const videosPath = path.join(__dirname, 'assets', 'videos-data.json');
const questionsPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');

const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// create map of questions by title (normalized)
const questionsByTitle = new Map();
questionsData.forEach(q => {
    if (q.title) {
        questionsByTitle.set(q.title.trim().toLowerCase(), q.id);
    }
});

// List of videos that were reported as missing questions
const missingVideos = [];
const videoMap = new Map(); // ID -> Video

videosData.forEach(v => {
    const parts = v.page_url.split('/');
    let id = parts[parts.length - 1];
    if (!id) id = parts[parts.length - 2];
    
    videoMap.set(id, v);

    // Check if this video has questions with the SAME id
    const hasQuestions = questionsData.some(q => q.id === id);
    if (!hasQuestions) {
        missingVideos.push({
            id: id,
            title: v.video_title.trim()
        });
    }
});

console.log(`Found ${missingVideos.length} videos without questions matching their ID.`);

// Try to find them by title
console.log('\n--- Potential Matches by Title ---');
const updates = [];

missingVideos.forEach(v => {
    const normTitle = v.title.toLowerCase();
    // Try exact match first
    let matchId = questionsByTitle.get(normTitle);
    
    // Try loose match if exact fails (e.g. ignoring case or slight punctuation)
    if (!matchId) {
        // scan all
        for (const [t, qId] of questionsByTitle.entries()) {
            if (t === normTitle || t.includes(normTitle) || normTitle.includes(t)) {
                // heuristic: high similarity
                if (Math.abs(t.length - normTitle.length) < 5) {
                   matchId = qId;
                   break;
                }
            }
        }
    }

    if (matchId) {
        console.log(`Video [${v.id}] "${v.title}" matches Question Set [${matchId}]`);
        updates.push({ videoId: v.id, questionId: matchId, title: v.title });
    } else {
        console.log(`Video [${v.id}] "${v.title}" - NO MATCH FOUND`);
    }
});

// Explicit check for PAt and ckt
console.log('\n--- Checking Orphaned Question Sets ---');
const orphans = ['PAt', 'ckt'];
orphans.forEach(id => {
    const q = questionsData.find(x => x.id === id);
    if (q) {
        console.log(`Orphan [${id}] Title: "${q.title}"`);
        // Find if this title exists in videos with a different ID
        const vMatch = videosData.find(v => v.video_title.trim().toLowerCase() === q.title.trim().toLowerCase());
        if (vMatch) {
             const parts = vMatch.page_url.split('/');
             let vId = parts[parts.length - 1];
             if (!vId) vId = parts[parts.length - 2];
             console.log(`   -> Matches Video [${vId}]`);
        } else {
            console.log(`   -> No video title match found`);
        }
    } else {
        console.log(`Orphan [${id}] not found in questions data?`);
    }
});
