import { dom, size } from "../config/Constants.js";
import { GameLoop } from "./GameLoop.js";
import { Apple } from "../entity/Apple.js";
import { Snake } from "../entity/Snake.js";
import { Keyboard } from "../input/Keyboard.js";
import { state } from "./GameState.js";
import { Score } from "./Score.js";

export class Game {

    constructor() {

        this.state = state.MENU;

        this.grid = null;
        this.diffName = null;
        this.moveInterval = null;
        this.count = 0;

        this.gameLoop = new GameLoop(this);
        this.snake = new Snake();
        this.apple = new Apple();
        this.score = new Score();

        Keyboard.init(this.snake, this);

        /** @type {CanvasRenderingContext2D} */
        this.ctx = dom.canvas.getContext("2d");
    }

    // START GAME
    start(option) {

        // SET GAME DIFFICULTY OPTIONS
        this.grid = option.gridSize;
        this.diffName = option.name;
        this.moveInterval = option.speed;
        this.count = 0;

        // GET HIGHSCORE
        this.score.getScore(this.diffName);

        // SET CANVAS DIMENSIONS
        dom.canvas.width = this.grid * size;
        dom.canvas.height = this.grid * size;

        this.ctx.imageSmoothingEnabled = false;

        this.snake.init(this.grid);
        this.apple.spawn(this.grid, this.snake);

        // START GAME LOOP
        this.gameLoop.start();
    }

    update(dt) {

        this.count += dt;

        while ( this.count >= this.moveInterval ) {
            this.count -= this.moveInterval;

            this.snake.update();

            // IF SNAKE HIT WALLS OR HIT ITS OWN BODY THEN END GAME
            const collision = this.snake.collision(this.grid);
            if ( collision ) {
                this.gameOver();
                return;
            }

            // CHECK SNAKE COLLISION WITH APPLE
            const eatApple = this.apple.eatApple(this.snake);
            if ( eatApple ) {

                this.score.add(this.diffName);              // INCREASE SCORE
                this.snake.grow();                          // GROW SNAKE

                if ( this.winCheck() ) return;

                this.apple.spawn(this.grid, this.snake);    // SPAWN NEW APPLE
            }
        }
    }

    draw() {

        this.ctx.clearRect(
            0, 0,
            dom.canvas.width, dom.canvas.height
        );

        // DRAW BACKGROUND
        for ( let y = 0; y < this.grid; y++ ) {
            for ( let x = 0; x < this.grid; x++ ) {

                if ( y % 2 === 0 ) {
                    this.ctx.fillStyle =
                    x % 2 === 0 ?
                    "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.07)";
                }
                else {
                    this.ctx.fillStyle =
                    x % 2 !== 0 ?
                    "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.07)";
                }

                this.ctx.fillRect(
                    y * size,
                    x * size,
                    size,
                    size
                );
            }
        }

        this.snake.draw(this.ctx);
        this.apple.draw(this.ctx);
    }

    pause() {

        // PAUSE GAME
        this.state = state.PAUSE;
        dom.pause.screen.style.display = "flex";
    }

    resume() {

        // RESUME GAME
        this.state = state.PLAY;
        dom.pause.screen.style.display = "none";
    }

    gameOver() {

        // GAME OVER
        this.state = state.OVER;
        
        if ( this.gameLoop.loop !== null ) {
            cancelAnimationFrame(this.gameLoop.loop);
            this.gameLoop.loop = null;
        }

        dom.game.screen.style.display = "none";
        dom.over.screen.style.display = "flex";
    }

    restart() {

        // RESTAR GAME
        this.state = state.MENU;
        dom.over.screen.style.display = "none";
        dom.win.screen.style.display = "none";
        dom.menu.screen.style.display = "flex";
    }

    winCheck() {

        if (
            this.snake.body.length < (this.grid * this.grid) - 2
        )
        return false;

        // GAME WIN
        this.state = state.OVER;

        if ( this.gameLoop.loop !== null ) {
            cancelAnimationFrame(this.gameLoop.loop);
            this.gameLoop.loop = null;
        }

        dom.game.screen.style.display = "none";
        dom.win.screen.style.display = "flex";

        return true;
    }
}