console.log("hellloooo")
console.log("hellloooo")
let songIndex = 0;
let audioElement = new Audio(`${songIndex+1}.mp3`);//////
let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('progressbar'); 
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName:'Ram siya ram',filePath:"1.mp3",coverPath:"1.jpg"},/////
    {songName:'highway',filePath:"2.mp3",coverPath:"2.jpg"},//////
    {songName:'kala chashma',filePath:"3.mp3",coverPath:"3.jpg"},/////
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
//handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle'); // Fixed class adding
        gif.style.opacity=1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle'); // Fixed class adding
        gif.style.opacity=0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', () => {
   
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   
    progressbar.value=progress;
})

progressbar.addEventListener('change',()=>{
   audioElement.currentTime=(progressbar.value*audioElement.duration/100);
})

const makeallplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{

    element.addEventListener('click',(e)=>{
        makeallplay();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src= `${songIndex+1}.mp3`;////////
        audioElement.currentTime=0;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
        console.log(audioElement.duration);
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=2){
        songIndex=0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;/////
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=2
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;//////
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

