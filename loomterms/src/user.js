document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('termsVideo');
    const completeBtn = document.getElementById('completeBtn');
    
    // Get latest video or show default
    const loomVideoId = localStorage.getItem('latestLoomVideo');
    
    if (loomVideoId) {
        videoContainer.innerHTML = `
            <iframe 
                src="https://www.loom.com/embed/${loomVideoId}" 
                frameborder="0" 
                allowfullscreen
                class="loom-iframe"
            ></iframe>
            <p class="video-id">Video ID: ${loomVideoId}</p>
        `;
    } else {
        videoContainer.innerHTML = `
            <div class="no-video">
                <p>No terms video available yet.</p>
                <p>Please ask your admin to record one.</p>
            </div>
        `;
    }

    completeBtn.addEventListener('click', () => {
        completeBtn.disabled = true;
        completeBtn.textContent = '✓ Completed';
        localStorage.setItem('termsAccepted', 'true');
    });
});