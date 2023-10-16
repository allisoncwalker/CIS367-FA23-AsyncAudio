const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const artistlabel = document.getElementById('artist');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


//Song Titles
const songs= [ 
'aidan',
'april_kisses',
'autumn_sun',
'bestPart',
'better_days',
'colorful_world',
'disco_ultralounge',
'fly_or_die',
'fraggle',
"i_cant_make_you_love_me",
'just_relax',
'MEET_ME_AT_THE_TOP',
'paranormal',
'perfect',
'polarity',
'salsa',
'upbeat_funk',
'voicesofspring',
'Your_Shoulder']

//artists 
const artists = [
    'Jonathan Ceaser',
    'Eddie Lang',
    'Bryce Greene',
    'The Dunwells',
    'LAKEY INSPIRED',
    'JUQBOXMUSIC',
    'Kevin MacLeod',
    'Levi Holland',
    'Levi Holland',
    'Bryce Greene',
    'Purrple Cat',
    'GMoneyOnTheBeat',
    'Leonell Cassio',
    'Ed Sheeran',
    'Ethos',
    'Dee Yan-Key',
    'Scott Holmes Music',
    'Johann Strauss',
    'Kaitlyn Thompson']

    // colors = [
    //     'linear-gradient(to bottom, #b45309, #111827)',
    //     'linear-gradient(to bottom, #3d5375, #111827)',
    //     'linear-gradient(to bottom, #ffffff, #000000)',
    //     'linear-gradient(to bottom, #BA5333, #000000)',
    //     'linear-gradient(to bottom, #5178B4, #111827)',
    //     'linear-gradient(to bottom, #a2b698, #111827)',
    //     'linear-gradient(to bottom, #feeb7b, #bf321b)',
    //     'linear-gradient(to bottom, #44949c, #a2b698)',
    //     'linear-gradient(to bottom, #C9BEC8, #111827)',
    //     'linear-gradient(to bottom, #D85B7B, #814C9C)',
    //     'linear-gradient(to bottom, #D77DB6, #111827)',
    //     'linear-gradient(to bottom, #DDB496, #6C4E37)',
    //     'linear-gradient(to bottom, #DEE4EC, #277EB5)',
    //     'linear-gradient(to bottom, #1115ff, #111827)',
    //     'linear-gradient(to bottom, #B03A2E, #5B2C6F)',
    //     'linear-gradient(to bottom, #75663e, #111827)',
    //     'linear-gradient(to bottom, #f2c446, #8c4322)',
    //     'linear-gradient(to bottom, #4a4831, #4e5425)',
    //     'linear-gradient(to bottom, #A463FF, #E591FF)',
    // ]

//Keep track of songs
let songIndex = 0

//Keep track of artists

//Initially load songinfo DOM
loadSong(songs[songIndex], artists[songIndex])

//Updatesong Details
function loadSong(song, artist){
    title.innerText = song
    artistlabel.innerText = artist
    audio.src =`songs/${song}.mp3`
    cover.src =`albumart/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-circle-play')
    playBtn.querySelector('i.fas').classList.add('fa-circle-pause')

    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-circle-play')
    playBtn.querySelector('i.fas').classList.remove('fa-circle-pause')

    audio.pause()
}

function prevSong(){
    songIndex--;
    // songIndex = songIndex%songs.length

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex],artists[songIndex])
  playSong()

}
    // songIndex = songIndex%songs.length

function nextSong(){
    songIndex++;
    // songIndex = songIndex%songs.length
    if (songIndex > 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex],artists[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime}= e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) *duration
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 
	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  
  // Change song
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  // Time/song update
  audio.addEventListener('timeupdate', updateProgress);
  
  // Click on progress bar
  progressContainer.addEventListener('click', setProgress);
  
  // Song ends
  audio.addEventListener('ended', nextSong);
  
  // Time of song
  audio.addEventListener('timeupdate',DurTime);