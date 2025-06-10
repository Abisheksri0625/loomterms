document.addEventListener('DOMContentLoaded', () => {
    const completeBtn = document.getElementById('completeBtn');
    const videoContainer = document.getElementById('termsVideo');

    // Simulate loading a Loom video (replace with actual video ID later)
    videoContainer.innerHTML = `
        <iframe 
            src="https://www.loom.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" 
            allowfullscreen
        ></iframe>
    `;

    completeBtn.addEventListener('click', () => {
        alert('Terms & Conditions completed!');
        completeBtn.disabled = true;
    });
});