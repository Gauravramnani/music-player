let music = document.getElementById('audio');
let prevbtn = document.getElementById('prev');
let playbtn = document.getElementById('play');
let nextbtn = document.getElementById('next');


let title = document.getElementById('title');
let image = document.getElementById('img');
let artist = document.getElementById('artist');

let progresscontainer = document.getElementById('progress-container');
let progress = document.getElementById('progress');

let currentTimeel = document.querySelector('.current-time');
let durationel = document.querySelector('.duration');

let isplaying = false;

let songs = [
    {
        name : 'jacinto-1',
        displayname : 'Electric Chill Machine',
        artist : 'Jacinto Design',
    },
    {
        name : 'jacinto-2',
        displayname : 'Seven Nation Army',
        artist : 'Jacinto Design',
    },
    {
        name : 'jacinto-3',
        displayname : 'Goodnight, Disco Queen',
        artist : 'Jacinto Design',
    },
    {
        name : 'metric-1',
        displayname : 'Front Row',
        artist : 'Jacinto Design',
    },

]

//play
function play(){
    isplaying = true;
    playbtn.classList.replace('fa-play','fa-pause');
    playbtn.setAttribute('title','pause');
    music.play();
}

//pause
function pause(){
    isplaying = false;  
    playbtn.classList.replace('fa-pause','fa-play')
    playbtn.setAttribute('title','play');
    music.pause();
}

playbtn.addEventListener("click",()=>(isplaying ? pause() : play()));


//Update DOM

function Loadsong(song){
    title.textContent = song.displayname;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


//load the song
Loadsong(songs[3]);


//current song
let songIndex =0;


//prevoius song
function prevsong(){
    songIndex --;

    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    Loadsong(songs[songIndex]);
    play();
}

//next song
function nextsong(){
    songIndex ++;

    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    Loadsong(songs[songIndex]);
    play();
}


//update progress bar
function updateprogressbar(e){
    if(isplaying){
        let {duration, currentTime} = e.srcElement;
        // console.log(duration,currentTime)

    //update progress bar width
    let progresspercent = (currentTime / duration) * 100;
    progress.style.width =`${progresspercent}%`

    //caculate display for duration 
    let durationminut = Math.floor( duration / 60 );
    // console.log(durationminut)
    
    let durationsecond = Math.floor(duration % 60);
    
    if(durationsecond < 10){
        durationsecond = `0${durationsecond}`
    }
    // console.log(durationsecond)

    if(durationsecond){

        durationel.textContent = `${durationminut}:${durationsecond}`
    
    }

    //caculate display for duration 
    let currentminut = Math.floor( currentTime / 60 );
    // console.log(currentminut)
    
    let currentsecond = Math.floor(currentTime % 60);
    
    if(currentsecond < 10){
        currentsecond = `0${currentsecond}`
    }
    // console.log(currentsecond)
    currentTimeel.textContent = `${currentminut}:${currentsecond}`;
    }
}


//on Load - select firsr song
Loadsong(songs[songIndex]);

//set progress bar
function setprogressbar(e){

    let width = this.clientWidth;
    console.log(width)

    let clickx = e.offsetX;
    console.log(clickx);

    let {duration} = music;
    console.log((clickx/width) * duration);
    music.currentTime = (clickx / width) * duration ;
}

//Evetn Listener
prevbtn.addEventListener('click',prevsong);
nextbtn.addEventListener('click',nextsong);
music.addEventListener('ended',nextsong);
music.addEventListener('timeupdate',updateprogressbar);
progresscontainer.addEventListener("click",setprogressbar);