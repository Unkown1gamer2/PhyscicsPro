const fs = require('fs');
const path = require('path');

const videosPath = path.join(__dirname, 'assets', 'videos-data.json');
const questionsPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');

const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

const questionsMap = new Map();
questionsData.forEach(q => {
    questionsMap.set(q.id, q);
});

console.log(`\n--- Verification Report ---`);
console.log(`Total Videos in videos-data.json: ${videosData.length}`);
console.log(`Total Entries in multi-learn-questions.json: ${questionsData.length}`);

let missingCount = 0;
let invalidCount = 0;
let totalQuestions = 0;
const orphanedQuestions = [];

videosData.forEach(v => {
    const parts = v.page_url.split('/');
    let id = parts[parts.length - 1];
    if (!id) id = parts[parts.length - 2];
    
    if (!questionsMap.has(id)) {
        console.log(`MISSING: Video "${v.video_title}" (ID: ${id}) has no question set.`);
        missingCount++;
    } else {
        const qSet = questionsMap.get(id);
        if (!qSet.questions || qSet.questions.length === 0) {
            console.log(`EMPTY: Video "${v.video_title}" (ID: ${id}) has an empty question set.`);
            invalidCount++;
        } else if (qSet.questions.length !== 10) {
            console.log(`WARNING: Video "${v.video_title}" (ID: ${id}) has ${qSet.questions.length} questions (expected 10).`);
        }
    }
});

questionsData.forEach(q => {
    totalQuestions += q.questions ? q.questions.length : 0;
    
    // Check if this ID belongs to any video
    const linkedVideo = videosData.find(v => v.page_url.includes(q.id));
    if (!linkedVideo) {
        // console.log(`ORPHAN: Question set "${q.title}" (ID: ${q.id}) is not linked to any video in videos-data.json.`);
        orphanedQuestions.push(q.id);
    }
});

console.log(`\nTotal Missing Videos: ${missingCount}`);
console.log(`Total Invalid Question Sets: ${invalidCount}`);
console.log(`Total Questions in Multi Learn: ${totalQuestions}`);
console.log(`Orphaned Question Sets (not in video list): ${orphanedQuestions.length}`);

if (missingCount === 0) {
    console.log(`\nSUCCESS: All ${videosData.length} videos have corresponding question sets.`);
}
