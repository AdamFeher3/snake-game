import { dom } from "../config/Constants.js";
import { difficulty } from "../config/Difficulty.js";
import { state } from "../game/GameState.js";

export class Menu {

    static init(game) {

        // GO TO DIFFICULTY OPTIONS SCREEN
        dom.menu.startBtn.addEventListener("click", () => {
            dom.menu.screen.style.display = "none";
            dom.difficulty.screen.style.display = "flex";
        });

        // GO TO CONTROLS SCREEN
        dom.menu.controlsBtn.addEventListener("click", () => {
            dom.menu.screen.style.display = "none";
            dom.controls.screen.style.display = "flex";
        });
        
        dom.controls.backBtn.addEventListener("click", () => {
            dom.controls.screen.style.display = "none";
            dom.menu.screen.style.display = "flex";
        });

        // START GAME WITH THE SELECTED DIFFICULTY
        dom.difficulty.options.forEach(btn => {

            btn.addEventListener("click", (e) => {

                if ( e.target.value === "easy" ) game.start(difficulty.easy);
                else if ( e.target.value === "medium" ) game.start(difficulty.medium);
                else if ( e.target.value === "hard" ) game.start(difficulty.hard);

                dom.difficulty.screen.style.display = "none";
                dom.game.screen.style.display = "flex";
            });
        });

        // RESTART GAME
        dom.restartBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                game.restart();
            });
        });

        // PAUSE / RESUME GAME
        dom.pauseResumeBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                if ( game.state === state.PLAY ) game.pause();
                else if ( game.state === state.PAUSE ) game.resume();
            });
        });
    }
}