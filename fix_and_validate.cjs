const fs = require('fs');

function fixInvalidEscapes(jsonString) {
    let fixed = '';
    for (let i = 0; i < jsonString.length; i++) {
        const char = jsonString[i];
        if (char === '\\') {
            const next = jsonString[i + 1];
            if (next === '\\') {
                fixed += '\\\\';
                i++; 
            } else if (next === '"') {
                fixed += '\\"';
                i++;
            } else if (next === '/') {
                fixed += '\\/';
                i++;
            } else if (next === 'b') {
                fixed += '\\b';
                i++;
            } else if (next === 'f') {
                fixed += '\\f';
                i++;
            } else if (next === 'n') {
                fixed += '\\n';
                i++;
            } else if (next === 'r') {
                fixed += '\\r';
                i++;
            } else if (next === 't') {
                fixed += '\\t';
                i++;
            } else if (next === 'u') {
                fixed += '\\u';
                i++; 
            } else {
                fixed += '\\\\';
            }
        } else {
            fixed += char;
        }
    }
    return fixed;
}

function mergeMultilineStrings(lines) {
    let mergedLines = [];
    let currentLine = null;
    let inString = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check for unescaped quotes to determine if we end up inside a string
        let tempInString = inString;
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '"') {
                // Check if escaped
                let backslashCount = 0;
                let k = j - 1;
                while (k >= 0 && line[k] === '\\') {
                    backslashCount++;
                    k--;
                }
                // If even number of backslashes, it's an unescaped quote
                if (backslashCount % 2 === 0) {
                    tempInString = !tempInString;
                }
            }
        }

        if (inString) {
            // Continuation of a string
            if (currentLine !== null) {
                currentLine += "\\n" + line;
            } else {
                // Should not happen if logic is correct, but fallback
                currentLine = line;
            }
        } else {
            // New line or start of a string
            if (currentLine !== null) {
                mergedLines.push(currentLine);
            }
            currentLine = line;
        }
        
        inString = tempInString;
    }
    
    if (currentLine !== null) {
        mergedLines.push(currentLine);
    }
    
    return mergedLines;
}

try {
    let rawData = fs.readFileSync('Allvideoquestions', 'utf8').replace(/\r/g, '');
    
    console.log("Fixing escapes...");
    let fixedData = fixInvalidEscapes(rawData);
    
    console.log("Fixing concatenated arrays...");
    fixedData = fixedData.replace(/\]\s*\[/g, ',');
    
    console.log("Splitting lines...");
    let lines = fixedData.split('\n');
    
    console.log("Pre-processing lines (Removing garbage & fixing closing braces)...");
    let cleanLines = [];
    let garbageCount = 0;
    let closingBraceFixCount = 0;
    
    for (const line of lines) {
        // Fix 1: Remove garbage lines containing only a stray quote
        if (line.trim() === '"') {
            garbageCount++;
            continue; 
        }

        // Fix 3: Remove leading quote from lines that are just closing braces/brackets
        if (/^"\s*[}\]]/.test(line)) {
            cleanLines.push(line.substring(1));
            closingBraceFixCount++;
            continue;
        }
        
        cleanLines.push(line);
    }
    console.log(`Removed ${garbageCount} garbage lines.`);
    console.log(`Fixed ${closingBraceFixCount} closing braces.`);

    console.log("Pre-processing lines (Fixing missing closing quotes)...");
    let lines2 = [];
    let missingQuoteFixCount = 0;
    
    for (let i = 0; i < cleanLines.length; i++) {
        let line = cleanLines[i];
        
        // Fix 4: Missing closing quote
        // Heuristic: Starts with "key": "value... (and not closing properly)
        // And next line suggests end of value (starts with } or ] or "key")
        if (/^\s*"[^"]+"\s*:\s*"/.test(line) && !line.trim().endsWith('"') && !line.trim().endsWith(',')) {
             if (i + 1 < cleanLines.length) {
                 const nextLine = cleanLines[i+1].trim();
                 // If next line closes the object/array, we just need a closing quote
                 if (nextLine.startsWith('}') || nextLine.startsWith(']')) {
                     line += '"';
                     missingQuoteFixCount++;
                 } 
                 // If next line starts a new property, we need closing quote AND comma
                 else if (nextLine.startsWith('"')) {
                     line += '",';
                     missingQuoteFixCount++;
                 }
             }
        }
        lines2.push(line);
    }
    console.log(`Fixed ${missingQuoteFixCount} missing closing quotes.`);

    console.log("Merging multiline strings...");
    lines = mergeMultilineStrings(lines2);
    
    console.log("Processing lines (Fixing unquoted values)...");
    
    let fixedLines = [];
    let fixCount = 0;
    
    for (const line of lines) {
        // Fix 2: Unquoted values starting with $
        const match = line.match(/^(\s*"[^"]+"\s*:\s*)(\$[^"].*?)(,?)\s*$/);
        
        if (match) {
            const prefix = match[1];
            const value = match[2]; 
            const suffix = match[3]; 
            
            fixedLines.push(`${prefix}"${value}"${suffix}`);
            fixCount++;
        } else {
            fixedLines.push(line);
        }
    }
    
    console.log(`Fixed ${fixCount} unquoted values.`);
    fixedData = fixedLines.join('\n');
    
    let data;
    try {
        data = JSON.parse(fixedData);
        console.log("Fixed JSON parsed successfully.");
        
        // Count stats
        const videoCount = data.length;
        let questionCount = 0;
        data.forEach(video => {
            if (video.questions) {
                questionCount += video.questions.length;
            }
        });
        
        console.log(`Total Videos: ${videoCount}`);
        console.log(`Total Questions: ${questionCount}`);
        
        const outputPath = 'assets/multi-learn-questions.json';
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Saved valid JSON to ${outputPath}`);
        
    } catch (e2) {
        console.error("Fixed JSON still failed to parse.");
        const match = e2.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            const start = Math.max(0, pos - 50);
            const end = Math.min(fixedData.length, pos + 50);
            console.log("Error context:");
            console.log(fixedData.substring(start, end));
            console.log(" ".repeat(pos - start) + "^");
        }
        throw e2;
    }

    console.log(`Total Videos: ${data.length}`);

    let totalQuestions = 0;
    data.forEach(video => {
        if (video.questions && Array.isArray(video.questions)) {
            totalQuestions += video.questions.length;
        }
    });

    console.log(`Total Questions: ${totalQuestions}`);

    fs.writeFileSync('assets/multi-learn-questions.json', JSON.stringify(data, null, 2));
    console.log(`Written to assets/multi-learn-questions.json`);

} catch (error) {
    console.error(`Error processing file: ${error.message}`);
}
