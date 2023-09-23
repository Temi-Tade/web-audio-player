const FILE_INPUT = document.querySelector("#file")
const AUDIO = document.querySelector("audio")
const PLAY_BUTTON = document.querySelector("#audiobtn")
const AUDIO_LIST = []
const SEEK = document.querySelector('#seek')
const CURRENT_TIME = document.querySelector("#current")
const TOTAL_TIME = document.querySelector("#duration")

const UPDATE_TIME = (src, el) => {
	let hrs = Math.floor(src % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
	let mins = Math.floor(src % (1000 * 60 * 60) / (1000 * 60))
	let secs = Math.floor(src % (1000 * 60) / 1000)
	if (secs < 10) {
		el.innerHTML = `${hrs}:${mins}:0${secs}`
	} else {
		el.innerHTML = `${hrs}:${mins}:${secs}`
	}
}

FILE_INPUT.onchange = () => {
	if (FILE_INPUT.files.length === 0) {
		return
	} else {
		PLAY_BUTTON.setAttribute('class', 'fa-solid fa-play')
		let fileReader = new FileReader()
		let file_loaded = FILE_INPUT.files[0]
		fileReader.onload = (e) => {
			AUDIO.src = e.target.result;
		}
		fileReader.readAsDataURL(file_loaded);
		setTimeout(() => {
			PLAY_BUTTON.disabled = false;
			SEEK.disabled = false;
			CURRENT_TIME.innerHTML = '0:00'
			SEEK.max = AUDIO.duration
			UPDATE_TIME(AUDIO.duration*1000, TOTAL_TIME)
		}, 1000)
	}
}

PLAY_BUTTON.onclick = () => {
	switch (PLAY_BUTTON.getAttribute('class')) {
		case 'fa-solid fa-play':
			PLAY_BUTTON.setAttribute('class', 'fa-solid fa-pause')
			AUDIO.play()
			break;
		case 'fa-solid fa-pause':
			PLAY_BUTTON.setAttribute('class', 'fa-solid fa-play')
			AUDIO.pause()
	}
}

AUDIO.onended = () => {
	PLAY_BUTTON.setAttribute('class', 'fa-solid fa-play')
}

AUDIO.ontimeupdate = () => {
	SEEK.value = AUDIO.currentTime
	UPDATE_TIME(AUDIO.currentTime*1000, CURRENT_TIME)
}

SEEK.oninput = () => {
	AUDIO.currentTime = SEEK.value
}