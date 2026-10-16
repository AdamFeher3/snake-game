import { size } from "../config/Constants.js";

export class Apple {

    constructor() {
        this.position = {
            x: 0, y: 0
        };
    }

    spawn(grid, snake) {

        // GET NEW POSITION
        do {
            this.position.x = Math.floor(Math.random() * grid);
            this.position.y = Math.floor(Math.random() * grid);
        }
        while ( this.canSpawn(snake) );
    }

    canSpawn(snake) {

        // CHECK IF APPLE HAS PLACE TO SPAWN
        return snake.body.some(b =>
            b.x === this.position.x &&
            b.y === this.position.y
        );
    }

    // CHECK IF SNAKE EAT APPLE
    eatApple(snake) {

        const head = snake.body[0];

        if (
            this.position.x === head.x &&
            this.position.y === head.y
        )
        return true;

        return false;
    }

    /**
     * @param {CanvasRenderingContext2D} g
     */
    draw(g) {

        g.fillStyle = "rgb(220,40,20)";
        g.beginPath();
        g.arc(
            this.position.x * size + size/2,
            this.position.y * size + size/2,
            size/2 - 4,
            0, Math.PI * 2
        );
        g.fill();
    }
}