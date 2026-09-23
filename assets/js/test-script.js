// assets/js/test-script.js
// This is a copy of videos-script.js for testing purposes.

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
        const videoUrl = item.youtube_links[0];
        
        if (!structuredData[mainTopic]) {
            structuredData[mainTopic] = {};
        }
        
        if (!structuredData[mainTopic][subTopic]) {
            structuredData[mainTopic][subTopic] = [];
        }
        
        structuredData[mainTopic][subTopic].push({
            title: videoTitle,
            url: videoUrl
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
            subContent.className = 'hidden accordion-subcontent px-6 pb-3';
            
            const videosList = document.createElement('div');
            videosList.className = 'space-y-2';
            
            subTopics[subTopic].forEach((video, videoIndex) => {
                const videoButton = document.createElement('button');
                videoButton.className = 'video-item w-full text-left px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-3';
                videoButton.onclick = (e) => {
                    e.stopPropagation();
                    playVideo(video.url, video.title, mainTopic, subTopic);
                };
                
                videoButton.innerHTML = `
                    <svg class="w-4 h-4 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <span class="text-sm">${video.title}</span>
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

    // Add "Missing" Section
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
    missingContent.className = 'accordion-content hidden px-6 py-6 space-y-6 bg-orange-500/5';
    
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
    
    document.querySelectorAll('[id^="main-"]').forEach(el => {
        if (el.id !== `main-${index}` && el.id.startsWith('main-')) {
            el.classList.add('hidden');
        }
    });
    
    document.querySelectorAll('[id^="main-arrow-"]').forEach(el => {
        if (el.id !== `main-arrow-${index}`) {
            el.classList.remove('rotate-180');
        }
    });
    
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

function playVideo(url, title, mainTopic, subTopic) {
    const player = document.getElementById('video-player');
    const iframe = document.getElementById('video-iframe');
    const titleEl = document.getElementById('current-video-title');
    const pathEl = document.getElementById('current-video-path');
    
    if (!iframe || !titleEl || !pathEl) return;

    titleEl.textContent = title;
    pathEl.textContent = `${mainTopic} → ${subTopic}`;

    // Convert standard YouTube embed to privacy-enhanced nocookie embed
    let nocookieUrl = url;
    if (url.includes('youtube.com/embed/')) {
        nocookieUrl = url.replace('youtube.com/embed/', 'youtube-nocookie.com/embed/');
    } else if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
            nocookieUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        }
    } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
            nocookieUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        }
    }

    /** @type {HTMLIFrameElement} */ (iframe).src = nocookieUrl;
    
    // Ensure the iframe has the necessary permissions including web-share
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    
    player.classList.remove('hidden');
    player.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeVideo() {
    const player = document.getElementById('video-player');
    const iframe = document.getElementById('video-iframe');
    
    if (!iframe) return;

    /** @type {HTMLIFrameElement} */ (iframe).src = '';
    player.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    loadVideosData();
});

// Make functions available globally for HTML onclick handlers
Object.assign(window, {
    toggleMainTopic,
    toggleSubTopic,
    playVideo,
    closeVideo,
    toggleMissingSection
});