import { dom } from "../config/Constants.js";

export class Score {

    constructor() {

        this.score = null;
        this.highscore = null;
    }

    getScore(name) {

        this.score = 0;
        this.highscore = JSON.parse(localStorage.getItem(`${name}-score`)) || 0;
        dom.highscore.textContent = this.highscore;
        dom.score.textContent = this.score;
    }

    // INCREASE SCORE
    add(name) {

        this.score++;

        if ( this.score > this.highscore ) {

            this.highscore = this.score;

            // SAVE HIGHSCORE TO LOCALSTORAGE
            localStorage.setItem(`${name}-score`, JSON.stringify(this.score));
            dom.highscore.textContent = this.highscore;
        }

        dom.score.textContent = this.score;
    }
}