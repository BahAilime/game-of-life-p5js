# game-of-life-p5js

Made using [p5.js](https://p5js.org/)


* click on a cell to change its state (alive = black and dead = white by default)
* click and drag the mouse to bring to life multiple cells
* play / pause button at the top left corner
* wall cells are not updated to prevent bugs but their state are counted by the other cells anyway
* the config.js can be modified to 
    * change the size of the canvas
    * change the number of cells in width/height (the board is always a square)
    * change the color used by dead and alive cells (either a number between 0 and 255 / black to white or a p5js color `color(r, g, b)`)