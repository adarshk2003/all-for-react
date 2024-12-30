
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const videofile = document.getElementById('videofile');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('videofile', videofile);
    
    if (!title || !videofile) {
        alert('Both title and video file are required!');
        return;
    }

    try {
        const response = await fetch('/upload', {  // Update with your actual upload endpoint
            method: 'POST',
            body: formData
        });

        const result = await response.text();
        alert("uploaded successfully");
    } catch (error) {
        console.error('Error uploading video:', error);
        alert('Failed to upload video');
    }
});

document.getElementById('fetchVideos').addEventListener('click', async () => {
    try {
        const response = await fetch('/getvideos');  // Update with your actual get videos endpoint
        const videos = await response.json();

        const videoList = document.getElementById('videoList');
        videoList.innerHTML = '';

        videos.forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.innerHTML = `
                <h3>${video.title}</h3>
                <video width="320" height="240" controls>
                    <source src="${video.videofile}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            videoList.appendChild(videoItem);
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        alert('Failed to fetch videos');
    }
});
