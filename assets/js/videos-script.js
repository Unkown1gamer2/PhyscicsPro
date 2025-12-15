// assets/js/videos-script.js

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
    container.innerHTML = '';
    
    Object.keys(structuredData).forEach((mainTopic, mainIndex) => {
        const mainTopicDiv = document.createElement('div');
        mainTopicDiv.className = 'glass-card rounded-xl overflow-hidden';
        
        const mainHeader = document.createElement('button');
        mainHeader.className = 'w-full px-6 py-4 flex items-center justify-between hover:bg-muted/10 transition-colors duration-200';
        mainHeader.onclick = () => toggleMainTopic(mainIndex);
        
        mainHeader.innerHTML = `
            <h2 class="text-xl font-bold text-left">${mainTopic}</h2>
            <svg id="main-arrow-${mainIndex}" class="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;
        
        const mainContent = document.createElement('div');
        mainContent.id = `main-${mainIndex}`;
        mainContent.className = 'hidden';
        
        const subTopics = structuredData[mainTopic];
        Object.keys(subTopics).forEach((subTopic, subIndex) => {
            const subTopicDiv = document.createElement('div');
            subTopicDiv.className = 'border-t border-border';
            
            const subHeader = document.createElement('button');
            subHeader.className = 'w-full px-8 py-3 flex items-center justify-between hover:bg-muted/10 transition-colors duration-200';
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
            subContent.className = 'hidden px-8 pb-3';
            
            const videosList = document.createElement('div');
            videosList.className = 'space-y-2';
            
            subTopics[subTopic].forEach((video, videoIndex) => {
                const videoButton = document.createElement('button');
                videoButton.className = 'w-full text-left px-4 py-2 rounded-lg hover:bg-muted/20 transition-colors duration-200 flex items-center gap-2';
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
    
    titleEl.textContent = title;
    pathEl.textContent = `${mainTopic} → ${subTopic}`;
    iframe.src = url;
    
    player.classList.remove('hidden');
    player.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeVideo() {
    const player = document.getElementById('video-player');
    const iframe = document.getElementById('video-iframe');
    
    iframe.src = '';
    player.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    loadVideosData();
});

// Make functions available globally for HTML onclick handlers
window.toggleMainTopic = toggleMainTopic;
window.toggleSubTopic = toggleSubTopic;
window.playVideo = playVideo;
window.closeVideo = closeVideo;