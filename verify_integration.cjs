const fs = require('fs');
const path = require('path');

// Paths
const videosDataPath = path.join(__dirname, 'assets', 'videos-data.json');
const questionsDataPath = path.join(__dirname, 'assets', 'multi-learn-questions.json');

try {
    // Load data
    console.log('Loading data...');
    const videosData = JSON.parse(fs.readFileSync(videosDataPath, 'utf8'));
    const questionsData = JSON.parse(fs.readFileSync(questionsDataPath, 'utf8'));

    console.log(`Loaded ${videosData.length} videos from videos-data.json`);
    console.log(`Loaded ${questionsData.length} question sets from multi-learn-questions.json`);

    // Map video IDs from videos-data
    const videoMap = new Map();
    videosData.forEach(v => {
        const parts = v.page_url.split('/');
        const id = parts[parts.length - 1];
        videoMap.set(id, v.video_title);
    });

    // Check coverage
    let matchedCount = 0;
    let unmatchedCount = 0;
    let totalQuestions = 0;

    questionsData.forEach(qSet => {
        if (videoMap.has(qSet.id)) {
            matchedCount++;
        } else {
            unmatchedCount++;
            console.warn(`Warning: Question set ID "${qSet.id}" (${qSet.title}) not found in videos-data.json`);
        }
        totalQuestions += qSet.questions.length;
    });

    console.log('\n--- Verification Results ---');
    console.log(`Videos with questions: ${matchedCount} / ${videosData.length}`);
    console.log(`Question sets without matching video: ${unmatchedCount}`);
    console.log(`Total questions: ${totalQuestions}`);
    
    // Check for duplicate IDs in questions file
    const questionIds = questionsData.map(q => q.id);
    const uniqueQuestionIds = new Set(questionIds);
    if (questionIds.length !== uniqueQuestionIds.size) {
        console.error('ERROR: Duplicate IDs found in multi-learn-questions.json');
    } else {
        console.log('No duplicate IDs found in questions file.');
    }

    // List some missing videos if any (just first 5)
    if (matchedCount < videosData.length) {
        console.log('\nSample videos without questions:');
        let missing = 0;
        const qIds = new Set(questionsData.map(q => q.id));
        for (const [id, title] of videoMap) {
            if (!qIds.has(id)) {
                console.log(`- ${id}: ${title}`);
                missing++;
                if (missing >= 5) break;
            }
        }
    }

} catch (err) {
    console.error('Verification failed:', err.message);
}
