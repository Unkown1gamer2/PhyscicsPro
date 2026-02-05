const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'readytodeleteinfo');
const currentPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');

const rawSource = fs.readFileSync(sourcePath, 'utf8');
const currentQuestions = JSON.parse(fs.readFileSync(currentPath, 'utf8'));

const usedTitles = new Set(currentQuestions.map(q => q.title.trim()));

// Extract titles from source using regex
const titleRegex = /"title":\s*"(.*?)"/g;
let match;
const sourceTitles = new Set();

while ((match = titleRegex.exec(rawSource)) !== null) {
    sourceTitles.add(match[1].trim());
}

console.log(`Total Source Titles: ${sourceTitles.size}`);
console.log(`Total Used Titles: ${usedTitles.size}`);

const unusedTitles = [];
sourceTitles.forEach(t => {
    if (!usedTitles.has(t)) {
        unusedTitles.push(t);
    }
});

console.log('\n--- Unused Titles in Source ---');
unusedTitles.forEach(t => console.log(t));
