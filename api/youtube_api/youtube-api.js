

fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=relaxation_music&regionCode=AT&type=video&videoEmbeddable=true&key=AIzaSyC07Y-J5kpjl3RlLt9vzOfGJ4SdGAixiyQ')
    .then((data)=>{
        return data.json();
    }).then((result)=>{
        console.log(result.items);
    let videos = result.items;
    let videoContainer = document.querySelector(".youtube-container"); //video container erstellt
    for(let video of videos){ // for each
        videoContainer.innerHTML += `
        <iframe width="560" height="400" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p></p>`
    }
})