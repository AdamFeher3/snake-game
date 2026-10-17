import { state } from "../game/GameState.js";

export class Keyboard {

    static init(snake, audio, game) {
        
        const leftKey = /(KeyA|ArrowLeft)/i;
        const rightKey = /(KeyD|ArrowRight)/i;
        const upKey = /(KeyW|ArrowUp)/i;
        const downKey = /(KeyS|ArrowDown)/i;
        const pauseKey = /(KeyP|Escape)/i;

        // KEYBOARD CONTROLS
        document.addEventListener("keydown", (e) => {

            const key = e.code;

            if (
                game.state !== state.PLAY &&
                game.state !== state.PAUSE
            )
            return;

            if ( [leftKey, rightKey, upKey, downKey, pauseKey].some(k => k.test(key)) )
                e.preventDefault();

            // PAUSE / RESUME GAME
            if ( pauseKey.test(key) ) {

                if ( e.repeat ) return;

                if ( game.state === state.PLAY ) game.pause();
                else if ( game.state === state.PAUSE ) game.resume();

                return;
            }

            if ( game.state !== state.PLAY ) return;

            // SNAKE MOVEMENT CONTROLS
            if ( leftKey.test(key) ) {
                if ( snake.dir !== "R" && snake.nextDir !== "R" ) {
                    snake.nextDir = "L";
                    audio.playSound("snake1");
                }
            }
            if ( rightKey.test(key) ) {
                if ( snake.dir !== "L" && snake.nextDir !== "L" ) {
                    snake.nextDir = "R";
                    audio.playSound("snake1");
                }
            }
            if ( upKey.test(key) ) {
                if ( snake.dir !== "D" && snake.nextDir !== "D" ) {
                    snake.nextDir = "U";
                    audio.playSound("snake2");
                }
            }
            if ( downKey.test(key) ) {
                if ( snake.dir !== "U" && snake.nextDir !== "U" ) {
                    snake.nextDir = "D";
                    audio.playSound("snake2");
                }
            }
        });
    }
}