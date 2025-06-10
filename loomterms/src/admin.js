document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startRecording');
    const stopBtn = document.getElementById('stopRecording');
    const videoContainer = document.getElementById('videoContainer');

    let loomEmbed;
    let recordingId;

    startBtn.addEventListener('click', async () => {
        try {
            loomEmbed = await window.LoomSDK.embed({
                appId: 'YOUR_LOOM_APP_ID', // Replace with your Loom appId
                onRecordingComplete: (recording) => {
                    recordingId = recording.id;
                    videoContainer.innerHTML = `<p>Recording saved! ID: ${recordingId}</p>`;
                }
            });
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } catch (error) {
            console.error('Loom error:', error);
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