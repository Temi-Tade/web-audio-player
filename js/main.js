const FILE_INPUT = document.querySelector("#file")
const AUDIO = document.querySelector("audio")
const PLAY_BUTTON = document.querySelector("#audiobtn")
const LOOP_BUTTON = document.querySelector("#loopbtn")
const OPT_BUTTON = document.querySelector("#optbtn")
const AUDIO_LIST = []
const SEEK = document.querySelector('#seek')
const CURRENT_TIME = document.querySelector("#current")
const TOTAL_TIME = document.querySelector("#duration")
const FILE_NAME = document.querySelector("#file_name")
const TOAST= document.querySelector("#toast-wrap")

//set default playback speed
document.querySelector("#value").innerHTML = `${document.querySelector("#playbackspeed").value}×`

const GET_FILE_NAME = (file) => {
	let x = file
	let y = x.split('')
	let z = y.slice(0, y.lastIndexOf('.'))
	return z.join('')
}

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

const SHOW_TOAST = (text) => {
	TOAST.querySelector("#toast-text").innerHTML = text;
	TOAST.style.right = '1rem'
	setTimeout(() => {
		TOAST.style.right = '-20rem'
	}, 2000)
}

FILE_INPUT.onchange = () => {
	FILE_NAME.innerHTML = `
		<marquee>${GET_FILE_NAME(FILE_INPUT.files[0].name)}</marquee>
	`
	if (FILE_INPUT.length === 0) {
		return
	} else {
		PLAY_BUTTON.setAttribute('class', 'fa-solid fa-play')
		let fileReader = new FileReader()
		let file_loaded = FILE_INPUT.files[0]
		fileReader.onload = (e) => {
			AUDIO.src = e.target.result;
		}
		fileReader.readAsDataURL(file_loaded);
		AUDIO.onloadedmetadata = () => {
			PLAY_BUTTON.disabled = false;
			LOOP_BUTTON.disabled = false;
			OPT_BUTTON.disabled = false;
			SEEK.disabled = false;
			CURRENT_TIME.innerHTML = '0:00'
			SEEK.max = AUDIO.duration
			UPDATE_TIME(AUDIO.duration*1000, TOTAL_TIME)
		}
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

const setPlayBackValue = (x, y) => {
	AUDIO.playbackRate = x.value
	y.innerHTML = `${x.value}×`
}

LOOP_BUTTON.onclick = () => {
	switch (AUDIO.loop) {
		case true:
			LOOP_BUTTON.style.color = '#333'
			AUDIO.loop = false
			SHOW_TOAST('Repeat: Off')
			break;
		case false:
			LOOP_BUTTON.style.color = '#4091FF'
			AUDIO.loop = true
			SHOW_TOAST('Repeat: On')
	}
}

OPT_BUTTON.onclick = () => {
	document.querySelector("#bottom-panel-bg").style.display = 'block'
	window.onclick = (e) => {
		if (e.target === document.querySelector("#bottom-panel-bg")) {
			document.querySelector("#bottom-panel-bg").style.display = 'none'
		}
	}
}