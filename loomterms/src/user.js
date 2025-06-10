document.addEventListener('DOMContentLoaded', () => {
    const completeBtn = document.getElementById('completeBtn');
    const videoContainer = document.getElementById('termsVideo');
    
    // Get video ID from localStorage or use a default
    const LOOM_VIDEO_ID = localStorage.getItem('latestLoomVideo') || 'DEFAULT_VIDEO_ID';

    videoContainer.innerHTML = LOOM_VIDEO_ID === 'DEFAULT_VIDEO_ID' 
        ? `<p>No terms video available yet. Please check back later.</p>`
        : `
            <iframe 
                src="https://www.loom.com/embed/${LOOM_VIDEO_ID}" 
                frameborder="0" 
                allowfullscreen
                style="width: 100%; height: 500px;"
            ></iframe>
        `;

    completeBtn.addEventListener('click', () => {
        alert('Terms & Conditions completed!');
        completeBtn.disabled = true;
        completeBtn.textContent = '✓ Completed';
    });
});