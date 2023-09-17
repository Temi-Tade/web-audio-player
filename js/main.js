const FILE_INPUT = document.querySelector("#file")
const AUDIO = document.querySelector("audio")
const PLAY_BUTTON = document.querySelector("#audiobtn")

FILE_INPUT.onchange = () => {
	if (FILE_INPUT.files.length === 0) {
		return
	} else {
		let fileReader = new FileReader()
		let file_loaded = FILE_INPUT.files[0]
		fileReader.onload = (e) => {
			AUDIO.src = e.target.result;
			PLAY_BUTTON.disabled = false;
		}
		fileReader.readAsDataURL(file_loaded);
	}
}

PLAY_BUTTON.onclick = () => {
	switch (PLAY_BUTTON.getAttribute('class')) {
		case 'fa-solid fa-play':
			PLAY_BUTTON.setAttribute('class', 'fa-solid fa-pause')
			break;
		case 'fa-solid fa-pause':
			PLAY_BUTTON.setAttribute('class', 'fa-solid fa-play')
	}
}