
// assets/js/multi-learn-hub.js

(function() {
    let videosData = [];
    let structuredData = {};

    async function loadVideosData() {
        try {
            const response = await fetch('assets/videos-data.json');
            videosData = await response.json();
            
            processVideosData();
            renderVideos();
        } catch (error) {
            console.error('Error loading videos:', error);
        }
    }

    function processVideosData() {
        structuredData = {};
        
        videosData.forEach(item => {
            const mainTopic = item.main_topic;
            const subTopic = item.sub_topic;
            const videoTitle = item.video_title;
            const urlParts = item.page_url.split('/');
            const videoId = urlParts[urlParts.length - 1];
            
            if (!structuredData[mainTopic]) {
                structuredData[mainTopic] = {};
            }
            
            if (!structuredData[mainTopic][subTopic]) {
                structuredData[mainTopic][subTopic] = [];
            }
            
            structuredData[mainTopic][subTopic].push({
                title: videoTitle,
                id: videoId
            });
        });
    }

    function renderVideos() {
        const container = document.getElementById('videos-container');
        if (!container) return;
        container.innerHTML = '';
        
        Object.keys(structuredData).forEach((mainTopic, mainIndex) => {
            const mainTopicDiv = document.createElement('div');
            mainTopicDiv.className = 'accordion-card rounded-2xl overflow-hidden';
            
            const mainHeader = document.createElement('button');
            mainHeader.className = 'accordion-header w-full px-6 py-4 flex items-center justify-between transition-all duration-200';
            // Auto-expand since we only have one topic usually
            mainHeader.onclick = () => toggleMainTopic(mainIndex);
            
            mainHeader.innerHTML = `
                <h2 class="text-xl font-bold text-left">${mainTopic}</h2>
                <svg id="main-arrow-${mainIndex}" class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            `;
            
            const mainContent = document.createElement('div');
            mainContent.id = `main-${mainIndex}`;
            mainContent.className = 'accordion-content hidden';
            
            const subTopics = structuredData[mainTopic];
            Object.keys(subTopics).forEach((subTopic, subIndex) => {
                const subTopicDiv = document.createElement('div');
                subTopicDiv.className = 'accordion-subsection';
                
                const subHeader = document.createElement('button');
                subHeader.className = 'accordion-subheader w-full px-6 py-3 flex items-center justify-between transition-all duration-200';
                subHeader.onclick = (e) => {
                    e.stopPropagation();
                    toggleSubTopic(mainIndex, subIndex);
                };
                
                subHeader.innerHTML = `
                    <h3 class="text-base font-semibold text-left">${subTopic}</h3>
                    <svg id="sub-arrow-${mainIndex}-${subIndex}" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                `;
                
                const subContent = document.createElement('div');
                subContent.id = `sub-${mainIndex}-${subIndex}`;
                subContent.className = 'accordion-subcontent px-6 pb-3 hidden';
                
                const videosList = document.createElement('div');
                videosList.className = 'space-y-2';
                
                subTopics[subTopic].forEach((video, videoIndex) => {
                    const videoButton = document.createElement('button');
                    videoButton.className = 'video-item w-full text-left px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-3 hover:bg-muted';
                    videoButton.onclick = (e) => {
                        e.stopPropagation();
                        window.location.href = `multi-learn-player.html?videoId=${video.id}`;
                    };
                    
                    videoButton.innerHTML = `
                        <svg class="w-4 h-4 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                        <span class="text-sm flex-grow">${video.title}</span>
                        ${renderProgressPill(video.id)}
                    `;
                    
                    videosList.appendChild(videoButton);
                });
                
                subContent.appendChild(videosList);
                subTopicDiv.appendChild(subHeader);
                subTopicDiv.appendChild(subContent);
                mainContent.appendChild(subTopicDiv);
            });
            
            mainTopicDiv.appendChild(mainHeader);
            mainTopicDiv.appendChild(mainContent);
            container.appendChild(mainTopicDiv);
        });

        // Add "Missing Topics" Section
        const missingDiv = document.createElement('div');
        missingDiv.className = 'accordion-card rounded-2xl overflow-hidden mt-6';
        
        const missingHeader = document.createElement('button');
        missingHeader.className = 'accordion-header w-full px-6 py-4 flex items-center justify-between transition-all duration-200';
        missingHeader.onclick = () => toggleMissingSection();
        
        missingHeader.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-xl">⚠️</span>
                <h2 class="text-xl font-bold text-left">Missing Topics</h2>
            </div>
            <svg id="missing-arrow" class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;
        
        const missingContent = document.createElement('div');
        missingContent.id = 'missing-content';
        missingContent.className = 'accordion-content hidden px-6 py-6 space-y-6';
        
        missingContent.innerHTML = `
            <div class="prose prose-sm dark:prose-invert max-w-none">
                <p class="text-orange-700 dark:text-orange-300 font-medium mb-4">Sorry! Some topics are still being added to the platform. Here are the current critical gaps we are working on:</p>
                
                <div class="grid gap-6 md:grid-cols-2">
                    <div class="space-y-3">
                        <h3 class="text-lg font-bold flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                            Section 3.7: Capacitors
                        </h3>
                        <p class="text-sm text-muted-foreground">Total absence from "Fields and Their Consequences." This is a major part of Paper 2.</p>
                        <ul class="list-disc list-inside text-xs space-y-1 text-muted-foreground ml-2">
                            <li>Capacitance ($C = Q/V$) & Energy stored</li>
                            <li>Dielectrics & RC time constants</li>
                            <li>Charging/Discharging exponential equations</li>
                        </ul>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-bold flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                            Section 3.4.2: Bulk Properties
                        </h3>
                        <p class="text-sm text-muted-foreground">Missing key mechanics and materials components:</p>
                        <ul class="list-disc list-inside text-xs space-y-1 text-muted-foreground ml-2">
                            <li>Hysteresis (loading/unloading graphs)</li>
                            <li>Searle’s apparatus (Young's Modulus Practical)</li>
                        </ul>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-bold flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                            Section 3.8.1.1: Nuclear Physics
                        </h3>
                        <p class="text-sm text-muted-foreground">Needs more detail on scattering and radius:</p>
                        <ul class="list-disc list-inside text-xs space-y-1 text-muted-foreground ml-2">
                            <li>Closest approach calculations ($E_k = E_p$)</li>
                            <li>Electron diffraction formula ($R = R_0 A^{1/3}$)</li>
                        </ul>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-lg font-bold flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                            Required Practicals (Coming Soon)
                        </h3>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                            <span>RP1: Standing waves</span>
                            <span>RP7: SHM</span>
                            <span>RP2: Interference</span>
                            <span>RP8: Boyle’s Law</span>
                            <span>RP3: Determination of g</span>
                            <span>RP9: Capacitance</span>
                            <span>RP4: Young's Modulus</span>
                            <span>RP10: Magnetic Flux</span>
                            <span>RP5: Resistivity</span>
                            <span>RP11: Inverse Square Law</span>
                            <span>RP6: Internal Resistance</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        missingDiv.appendChild(missingHeader);
        missingDiv.appendChild(missingContent);
        container.appendChild(missingDiv);
    }

    function toggleMissingSection() {
        const content = document.getElementById('missing-content');
        const arrow = document.getElementById('missing-arrow');
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }

    function toggleMainTopic(index) {
        const content = document.getElementById(`main-${index}`);
        const arrow = document.getElementById(`main-arrow-${index}`);
        
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }

    function toggleSubTopic(mainIndex, subIndex) {
        const content = document.getElementById(`sub-${mainIndex}-${subIndex}`);
        const arrow = document.getElementById(`sub-arrow-${mainIndex}-${subIndex}`);
        
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }

    function renderProgressPill(videoId) {
        let progress = null;
        try {
            const stored = localStorage.getItem('multiLearnProgress');
            if (stored) {
                const data = JSON.parse(stored);
                progress = data[videoId];
            }
        } catch (e) {
            console.error('Error reading progress:', e);
        }

        // Default grey pill for incomplete
        if (!progress || !progress.completed) {
            return `<div class="w-16 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 transition-colors" title="Not completed"></div>`;
        }

        const score = progress.score || 0;
        const total = progress.total || 10;
        const greenPercent = Math.round((score / total) * 100);
        
        // Split pill: Green for correct, Red for incorrect
        return `
            <div class="w-16 h-2.5 rounded-full bg-red-500 overflow-hidden flex flex-shrink-0 shadow-sm" title="Score: ${score}/${total}">
                <div class="h-full bg-green-500 transition-all duration-500" style="width: ${greenPercent}%"></div>
            </div>
        `;
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadVideosData();
    });

    // Make functions available globally
    Object.assign(window, {
        toggleMainTopic,
        toggleSubTopic,
        toggleMissingSection
    });
})();