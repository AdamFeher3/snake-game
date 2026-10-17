export class Sound {

    constructor() {
        this.sounds = new Map();
    }

    // PLAY SOUND EFFECTS
    playSound(url, time = 0) {

        let audio = this.sounds.get(url);

        if ( !audio ) {
            audio = new Audio();
            audio.src = `./src/res/audio/${url}.mp3`;
            this.sounds.set(url, audio);
        }

        audio.pause();
        audio.currentTime = time;
        audio.play();
    }
}
