export default class SoundManager {

	static setAudioTrack(src) {
		const audObj = new Audio();
		audObj.src = src;
		return audObj;
	}

	static playTrack(audioObj, src, pause = false) {
		audioObj.addEventListener('loadeddata', function () {
			audioObj.play();
			if (pause) {
				audioObj.pause();
			}
		}, false);
		audioObj.src = src;
		return audioObj;
	}

	static pausePlay(audioObj) {
		audioObj.pause();
	}

	//TODO why he try play the same src ? but if i play without delay he try but play next track
	static playBackGroundPlaylist(playlist, paused = false) {
		const audObj = new Audio();
		let i = 0;

		audObj.addEventListener('ended', function () {
			if (i == playlist.length - 1) {
				i = 0;
				Sound_Module.playTrack(audObj, playlist[i]);
			}
			else {
				i++;
				audObj.src = null;
				Sound_Module.playTrack(audObj, playlist[i]);
			}
		}, false);

		this.playTrack(audObj, playlist[0], paused);
		return audObj;
	}

	static decreaseMusicVol(audioObj, step) {
		if (audioObj.volume >= step) {
			audioObj.volume = audioObj.volume - step;
		}
		else {
			if (audioObj.volume > 0) {
				audioObj.volume = 0;
			}
		}
	}

	static increaseMusicVol(audioObj, step) {
		if (audioObj.volume <= 1 - step) {
			audioObj.volume = audioObj.volume + step;
		}
		else {
			if (audioObj.volume < 1) {
				audioObj.volume = 1;
			}
		}
	}

	static musicPause_Unpause(audioObj) {
		if (audioObj.paused) {
			audioObj.play();
		}
		else {
			audioObj.pause();
		}
	}

	static playSoundRepeatly(audObj, src) {
		this.playTrack(audObj, src);
		audObj.loop = true;
	}

}
