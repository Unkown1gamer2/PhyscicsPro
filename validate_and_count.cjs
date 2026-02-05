const fs = require('fs');

try {
    const rawData = fs.readFileSync('Allvideoquestions', 'utf8');
    const data = JSON.parse(rawData);

    console.log(`Successfully parsed JSON.`);
    console.log(`Total Videos: ${data.length}`);

    let totalQuestions = 0;
    data.forEach(video => {
        if (video.questions && Array.isArray(video.questions)) {
            totalQuestions += video.questions.length;
        }
    });

    console.log(`Total Questions: ${totalQuestions}`);

    // Check for potential issues
    const ids = new Set();
    const duplicates = [];
    data.forEach(video => {
        if (ids.has(video.id)) {
            duplicates.push(video.id);
        }
        ids.add(video.id);
    });

    if (duplicates.length > 0) {
        console.warn(`Warning: Found duplicate Video IDs: ${duplicates.join(', ')}`);
    } else {
        console.log(`No duplicate Video IDs found.`);
    }

    // Write to production file
    fs.writeFileSync('assets/multi-learn-questions.json', JSON.stringify(data, null, 2));
    console.log(`Written to assets/multi-learn-questions.json`);

} catch (error) {
    console.error(`Error processing file: ${error.message}`);
}
