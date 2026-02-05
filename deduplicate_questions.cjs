const fs = require('fs');
const path = require('path');

const questionsDataPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsDataPath, 'utf8'));

const idMap = new Map();
const duplicates = [];

questionsData.forEach((qSet, index) => {
    if (idMap.has(qSet.id)) {
        duplicates.push({
            id: qSet.id,
            title: qSet.title,
            originalIndex: idMap.get(qSet.id),
            duplicateIndex: index
        });
    } else {
        idMap.set(qSet.id, index);
    }
});

console.log(`Found ${duplicates.length} duplicates.`);
duplicates.forEach(d => {
    console.log(`- Duplicate ID: ${d.id} ("${d.title}") at index ${d.duplicateIndex} (original at ${d.originalIndex})`);
});

// Remove duplicates
if (duplicates.length > 0) {
    console.log('Removing duplicates...');
    const uniqueQuestions = [];
    const seenIds = new Set();
    
    questionsData.forEach(qSet => {
        if (!seenIds.has(qSet.id)) {
            seenIds.add(qSet.id);
            uniqueQuestions.push(qSet);
        }
    });
    
    console.log(`New count: ${uniqueQuestions.length}`);
    fs.writeFileSync(questionsDataPath, JSON.stringify(uniqueQuestions, null, 2));
    console.log('Saved deduplicated file.');
}
