document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const sampleButtons = document.querySelectorAll('.sample-button');
    
    // Add click event listeners to all sample buttons
    sampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            console.log('Playing audio file:', audioFile); // Debug message
            playAudio(audioFile);
        });
    });
    
    // Play the audio file
    function playAudio(filename) {
        // Stop any currently playing audio
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        
        // Set the new source
        const audioPath = './BONUS5/' + filename;
        console.log('Full audio path:', audioPath); // Debug message
        audioPlayer.src = audioPath;
        
        // Play the audio
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio playback started successfully');
            }).catch(error => {
                console.error('Error playing audio:', error);
                // Try an alternative path if the first one fails
                const altPath = filename;
                console.log('Trying alternative path:', altPath);
                audioPlayer.src = altPath;
                audioPlayer.play().catch(e => {
                    console.error('Alternative path also failed:', e);
                });
            });
        }
    }
});