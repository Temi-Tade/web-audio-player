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
const AUDIO_EL = document.querySelector("#audio_element")
const VIDEO_EL = document.querySelector("#video_element")

AUDIO_EL.style.display = 'block'
VIDEO_EL.style.display = 'none'

const setAudioMode = (a, v, ab, vb) => {
	if (a.style.display === 'none' && v.style.display === 'block') {
		ab.style = 'background: #EEE; color: #4091FF; border: 1px dashed #4091FF;'
		vb.style = 'background: #4091FF; color: #EEE; border: 0'
		AUDIO_EL.style.display = 'block'
		VIDEO_EL.style.display = 'none'
	}
	else{
		return
	}
}

const setVideoMode = (v, a, vb, ab) => {
	if (v.style.display == 'none' && a.style.display == 'block') {
		vb.style = 'background: #EEE; color: #4091FF; border: 1px dashed #4091FF;'
		ab.style = 'background: #4091FF; color: #EEE; border: 0;'
		AUDIO_EL.style.display = 'none'
		VIDEO_EL.style.display = 'block'
	}
	else {
		return
	}
}