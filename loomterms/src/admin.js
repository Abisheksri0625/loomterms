document.addEventListener('DOMContentLoaded', async () => {
    const startBtn = document.getElementById('startRecording');
    const stopBtn = document.getElementById('stopRecording');
    const videoContainer = document.getElementById('videoContainer');
    
    let loomEmbed;

    // Verify SDK load
    try {
        await window.LoomSDKLoaded;
        console.log("Loom SDK ready");
    } catch (error) {
        videoContainer.innerHTML = `
            <div class="error-box">
                <h3>Loom Failed to Load</h3>
                <p>${error.message}</p>
                <p>Ensure:</p>
                <ul>
                    <li>You're on HTTPS (not HTTP)</li>
                    <li>Ad-blockers are disabled</li>
                    <li>Domain is whitelisted in Loom Developer Portal</li>
                </ul>
            </div>
        `;
        startBtn.disabled = true;
        return;
    }

    // Start Recording
    startBtn.addEventListener('click', async () => {
        try {
            loomEmbed = await window.LoomSDK.embed({
                appId: 'a2c84f39-1adb-45a3-9a0f-48bf414c0b41', // REPLACE THIS
                onRecordingComplete: (recording) => {
                    localStorage.setItem('latestLoomVideo', recording.id);
                    videoContainer.innerHTML = `
                        <div class="success-message">
                            <p>✅ Recording saved!</p>
                            <iframe 
                                src="https://www.loom.com/embed/${recording.id}" 
                                frameborder="0" 
                                allowfullscreen
                                class="loom-iframe"
                            ></iframe>
                            <p>Video ID: ${recording.id}</p>
                        </div>
                    `;
                },
                onError: (error) => {
                    videoContainer.innerHTML = `
                        <div class="error-box">
                            <p>Recording error: ${error.message}</p>
                        </div>
                    `;
                }
            });
            
            startBtn.disabled = true;
            stopBtn.disabled = false;
            videoContainer.innerHTML = '<p class="loading-message">🎥 Preparing recording...</p>';

        } catch (error) {
            videoContainer.innerHTML = `
                <div class="error-box">
                    <p>Failed to start: ${error.message}</p>
                </div>
            `;
        }
    });

    // Stop Recording
    stopBtn.addEventListener('click', () => {
        if (loomEmbed) {
            loomEmbed.close();
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });
});