const video = document.querySelector('#video');
const playButton = document.querySelector('button');
let progressBarBackground = document.querySelector('.progress-bar');
let progressBar = document.querySelector('.paintProgressBar');
let progressBarTime = document.querySelector('.progress-bar-timer');
const changePlayButtonIcon = document.querySelector('i');
const volumeControlUp = document.querySelector('.fa-volume-up');
const inputProgressBar = document.querySelector('input[class="inputProgressBar"]')
const volumeSlider = document.querySelector('input[type="range"]')
const volumeControlDown = document.querySelector('.fa-volume-down');
const muteVolume = document.querySelector('.fa-volume-mute');
const foward = document.querySelector('.fa-forward');
const backward = document.querySelector('.fa-backward');
const fullscreen = document.querySelector('.fa-compress');

let forwardInt = 5;
let volumeUp = document.querySelector('#increment').value;

let getCurrentTime = video.currentTime;
// inputRange.style.display = 'none';
volumeSlider.value = '0.1';

// start Progress bar 
function setProgressBar(value) {
    let getLength;
    if(value <= video.duration) {
        getLength = Number(value * 100/video.duration);
        //inputProgressBar.value = getLength + '%';
        progressBar.style.width = getLength + '%';
    } 
    else if(value > video.duration) {
        getLength = 0;
        progressBar.style.width = getLength + '%';
        //progressBarBackground.style.background = 'yellow';
    }
}

// load the currentVideo Duration
const convertVideoDuration = ()=> {
    let videoDuration = video.duration;
    let hours = Math.floor(videoDuration / 60);
    let minutes = videoDuration % 60;
    console.log('duration ', typeof hours + ':' + minutes.toFixed(), ' video ', video.error)
    if(typeof hours === 'NaN' || typeof minutes === 'NaN') 
        return hours + ':' + minutes.toFixed();
}
// display current video duration in the textcontent
progressBarTime.textContent = convertVideoDuration();

function start() {
        let videoCurrentTime = video.currentTime;
        let hour = Math.floor(videoCurrentTime / 60);
        let minutes = videoCurrentTime % 60;
        progressBarTime.textContent =  hour + ':' + minutes.toFixed();
        //getCurrentTime = Number.parseInt(video.currentTime);
        getCurrentTime = video.currentTime;
        setProgressBar(getCurrentTime);
        //console.log('Current Time playing', getCurrentTime);
}

let timer = setInterval(start, 1000);
console.log('timer runing ', timer);
window.addEventListener('close', ()=> {
    clearInterval(timer);
});

playButton.addEventListener('click', (e) => {
     
    if(video.paused) { // video is paused
        video.play(); // video to play, not sure if it is playing, retain old state
        video.volume = volumeUp
        changePlayButtonIcon.classList.value = 'fas fa-pause';
        setProgressBar(getCurrentTime);
        timer =  setInterval(start, 1000);
        console.log('timer runing foward ', timer)
        
    }  else {
        video.pause();
        changePlayButtonIcon.classList.value = 'fas fa-play';
        clearInterval(timer);
    }
    
});


volumeControlUp.addEventListener('click', (e) => {

    //video.volume = volumeUp;
    //console.log('current volume ', volumeUp)
    if(video.volume == volumeUp) {
        volumeControlUp.classList.value = 'fas fa-volume-mute';
        video.volume = 0;
        console.log('current volume muted ', volumeUp)
    } 
    else if (video.volume == 0) {
        volumeControlUp.classList.value = 'fas fa-volume-up';
        video.volume = volumeUp;
        console.log('current volume up ', volumeUp)
    }
});

volumeSlider.addEventListener('change', (e) => {
    
    console.log(document.querySelector('#increment').value)

    try {
        
        //volumeUp =  ;
        volumeUp = document.querySelector('#increment').value;
        //let formatVolume = Number(volume.toFixed(2));
        video.volume = volumeUp;
        volumeControlUp.classList.value = 'fas fa-volume-up';
        console.log('volume Up', video.volume )
    } catch (e) {
            console.log('volume Up Completed')

    }

    
})

foward.addEventListener(('click'),(e) => {
    //console.log('forward of getCurrentTime', getCurrentTime);
    clearInterval(timer);
    
    video.pause()
    setProgressBar(getCurrentTime);
    getCurrentTime = getCurrentTime + 1; 
    video.currentTime = getCurrentTime;
    convertVideoDuration();
    timer = setInterval(() => {
        video.play();
        setProgressBar(getCurrentTime);
        //console.log('current time started after paused ', Number.parseInt(getCurrentTime));
     }, 600)

     
});

///stopped here doing the backward functionality
backward.addEventListener(('click'),() => {
    clearInterval(timer)
    video.pause();
    setProgressBar(getCurrentTime);
    getCurrentTime -= 1;
    video.currentTime = getCurrentTime;
    convertVideoDuration();
    timer = setInterval(() => {
        video.play();
        setProgressBar(getCurrentTime);
        //console.log('current time started after paused ', Number.parseInt(getCurrentTime));
     }, 600)
    
})

fullscreen.addEventListener('click', () => {
    //video.requestFullscreen()
});

