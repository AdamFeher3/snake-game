import { size } from "../config/Constants.js";

export class Snake {

    constructor() {

        this.body = [];
        this.dir = null;
        this.nextDir = null;
    }

    init(grid) {

        this.body = [
            { x: grid/2 - 1, y: grid/2 + 1 },
            { x: grid/2 - 1, y: grid/2 + 2 },
            { x: grid/2 - 1, y: grid/2 + 3 },
            { x: grid/2 - 1, y: grid/2 + 4 }
        ];

        this.dir = "U";
        this.nextDir = "U";
    }

    update() {

        // UPDATE SNAKE MOVEMENT DIRECTION
        this.dir = this.nextDir;

        // FOLLOW THE SNAKE'S HEAD
        for ( let i = this.body.length - 1; i > 0; i-- ) {

            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        // MOVE SNAKE IN THE CORRECT DIRECTION
        if ( this.dir === "U" ) this.body[0].y--;
        else if ( this.dir === "D" ) this.body[0].y++;
        else if ( this.dir === "L" ) this.body[0].x--;
        else if ( this.dir === "R" ) this.body[0].x++;
    }

    grow() {

        // ADD BODY PART TO THE END OF THE SNAKE'S BODY
        this.body.push({
            x: this.body[this.body.length-1].x,
            y: this.body[this.body.length-1].y
        });
    }

    collision(grid) {

        const head = this.body[0];

        // CHECK SNAKE COLLISION WITH WALLS
        if (
            head.x < 0 || head.x >= grid ||
            head.y < 0 || head.y >= grid
        )
        return true;

        // CHECK IF SNAKE COLLIDED WITH ITS OWN BODY
        for ( let i = 1; i < this.body.length; i++ ) {

            const b = this.body[i];

            if (
                b.x === head.x &&
                b.y === head.y
            )
            return true;
        }

        return false;
    }

    /**
     * @param {CanvasRenderingContext2D} g
     */
    draw(g) {

        const maxColor = 255;
        const minColor = 120;

        const maxSize = size;
        const minSize = size * 0.7;

        const length = this.body.length-1;

        // DRAW BODY
        for ( let i = length; i >= 0; i-- ) {

            const x1 = this.body[i].x * size + size/2;
            const y1 = this.body[i].y * size + size/2;
            const x2 = this.body[i-1]?.x * size + size/2;
            const y2 = this.body[i-1]?.y * size + size/2;

            const color = maxColor - (i / Math.max(length, 1)) * (maxColor - minColor);

            const bodySize = maxSize - (i / Math.max(length, 1)) * (maxSize - minSize);

            g.beginPath();
            g.strokeStyle = `rgb(0,${color},0)`;
            g.lineWidth = bodySize;
            g.lineCap = "round";
            g.moveTo(x1, y1);
            g.lineTo(x2, y2);
            g.stroke();
        }

        // DRAW HEAD
        g.fillStyle = `rgb(0,${maxColor},0)`;
        g.beginPath();
        g.arc(
            this.body[0].x * size + size/2,
            this.body[0].y * size + size/2,
            size/2,
            0, Math.PI * 2
        );
        g.fill();
    }
}