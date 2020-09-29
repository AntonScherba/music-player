const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Desine',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    }
]

// Check if Playing
let isPlaying = false;

// Play
playSong = () => {
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaying = true;
    music.play();
}

// Pause
pauseSong = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    isPlaying = false;
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Update DOM
loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();   
}

// Next Song
nextSong = () => {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();   
}

// On Load - select First Song
loadSong(songs[songIndex]);

// Calculate display for duration/currentTime
calculateTime = (time, element) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    // Delay switching Element to avoid Nan
    if (seconds) {
        element.textContent = `${minutes}:${seconds}`;
    }
}

// Update Progress Bar and Time
updateProgressBar = (e) => {
    if (isPlaying) {
        const {currentTime, duration} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        calculateTime(duration, durationEl);        

        // Calculate display for current
        calculateTime(currentTime, currentTimeEl);
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event - Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);