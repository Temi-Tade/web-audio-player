const FILE_INPUT = document.querySelector("#file")
const AUDIO = document.querySelector("audio")
const PLAY_BUTTON = document.querySelector("#audiobtn")
const AUDIO_LIST = []
const SEEK = document.querySelector('#seek')

FILE_INPUT.onchange = () => {
	if (FILE_INPUT.files.length === 0) {
		return
	} else {
		let fileReader = new FileReader()
		let file_loaded = FILE_INPUT.files[0]
		fileReader.onload = (e) => {
			AUDIO.src = e.target.result;
			//document.body.innerHTML = e.target.result
			PLAY_BUTTON.disabled = false;
			SEEK.disabled = false;
		}
		fileReader.readAsDataURL(file_loaded);
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

let createSeek = () => {
	alert(AUDIO.duration)
}