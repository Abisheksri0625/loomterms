document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startRecording');
    const stopBtn = document.getElementById('stopRecording');
    const videoContainer = document.getElementById('videoContainer');

    let loomEmbed;
    let recordingId;

    startBtn.addEventListener('click', async () => {
        try {
            loomEmbed = await window.LoomSDK.embed({
                appId: 'a2c84f39-1adb-45a3-9a0f-48bf414c0b41', // Replace with your actual ID
                onRecordingComplete: (recording) => {
                    recordingId = recording.id;
                    
                    // Save to localStorage
                    localStorage.setItem('latestLoomVideo', recordingId);
                    
                    videoContainer.innerHTML = `
                        <p>✅ Recording saved! ID: ${recordingId}</p>
                        <iframe 
                            src="https://www.loom.com/embed/${recordingId}" 
                            frameborder="0" 
                            allowfullscreen
                            style="width: 100%; height: 400px; margin-top: 15px;"
                        ></iframe>
                    `;
                },
                onError: (error) => {
                    console.error('Loom error:', error);
                    videoContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                }
            });
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } catch (error) {
            console.error('Failed to load Loom:', error);
            videoContainer.innerHTML = `
                <p style="color: red;">⚠️ Loom failed to initialize</p>
                <p>${error.message}</p>
            `;
        }
    });

    stopBtn.addEventListener('click', () => {
        if (loomEmbed) {
            loomEmbed.close();
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });
});