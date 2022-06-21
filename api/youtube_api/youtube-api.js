

fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=relaxation_music&regionCode=AT&type=video&videoEmbeddable=true&key=AIzaSyC07Y-J5kpjl3RlLt9vzOfGJ4SdGAixiyQ')
    .then((data)=>{
        return data.json();
    }).then((result)=>{
        console.log(result.items);
    let videos = result.items;
    let videoContainer = document.querySelector(".youtube-container"); //video container created
    for(let video of videos){ // for each
        videoContainer.innerHTML += `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.id.videoId}" title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p></p>`
    }
})