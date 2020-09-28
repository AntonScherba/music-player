const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Check if Playing
let isPlaing = false;

// Play
playSong = () => {
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaing = true;
    music.play();
}

// Pause
pauseSong = () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    isPlaing = false;
    music.pause();
}


// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaing ? pauseSong() : playSong());