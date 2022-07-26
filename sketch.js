const canvasSize = config.canvasSize
const nbOfCellPerLine = config.nbOfCellPerLine
const colorAlive = config.colorAlive
const colorDead = config.colorDead

const cellSize = canvasSize/nbOfCellPerLine
let state = 0
let justDragged = false

class Cell {
  constructor(offsetX, offsetY) {
    this.offsetX = offsetX
    this.offsetY = offsetY

    this.x = offsetX/cellSize
    this.y = offsetY/cellSize

    this.color = colorDead

    this.index = this.y * nbOfCellPerLine + this.x +1
  
    this.nextGenState = "unknown"

  }

  show () {
    fill(this.color)
    stroke(150)
    rect(this.offsetX, this.offsetY, cellSize, cellSize)
    fill(0, 102, 153)
    textSize(10);

    // DEBUG
    // text(`${this.index}`, this.offsetX+15, this.offsetY+30);
    // text(`${this.coo} ${grid[this.x][this.y].coo} ${[this.x, this.y]}`, this.offsetX+5, this.offsetY+30);
    // text(`${this.index} ${this.nextGenState}`, this.offsetX+5, this.offsetY+30);
  
  }

  colorSwitch () {
    if (this.color != colorAlive) {
      this.color = colorAlive
      this.nextGenState = colorAlive
    } else {
      this.color = colorDead
      this.nextGenState = colorDead
    }
  }

  evaluate () {

    if (this.x>0 && this.x<nbOfCellPerLine-1 && this.y>0 && this.y<nbOfCellPerLine-1) {
      let aliveList = [
        grid[this.y-1][this.x-1].isAlive,
        grid[this.y-1][this.x].isAlive,
        grid[this.y-1][this.x+1].isAlive,
        
        grid[this.y][this.x-1].isAlive,
        grid[this.y][this.x+1].isAlive,
        
        grid[this.y+1][this.x-1].isAlive,
        grid[this.y+1][this.x].isAlive,
        grid[this.y+1][this.x+1].isAlive,
      ]

      let aliveNeighbours = aliveList.filter((x) => x === true).length

      if (this.isAlive && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        this.nextGenState = colorDead
        
      } else if (this.isAlive) {
        this.nextGenState = colorAlive
      
      } else if (!this.isAlive && aliveNeighbours === 3) {
        this.nextGenState = colorAlive
      }
    }

  }

  apply () {
    this.color = this.nextGenState
  }

  get coo () { 
    return [this.x, this.y]
  }

  get isAlive () {
    return this.color === colorAlive ? true : false
  }
}

let grid = []
for (let ar = 0; ar <nbOfCellPerLine; ar++) {
  grid.push([])
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  for (let x = 0; x<nbOfCellPerLine; x++) {
    for (let y = 0; y<nbOfCellPerLine; y++) {
      grid[y].push(new Cell(x*cellSize, y*cellSize))
    }
  }  
}

function draw() {
  background(200);
  for (const line of grid) {
    for (const cell of line) {
      cell.show()
    }
  }
  
  if (state != 0) {
    fill(color(100, 0, 0))
  } else if (state === 0) {
    fill(color(0, 100, 0))
  }
  rect(0, 0, 60, 60)
}


function mouseClicked() {
  if (mouseX < 60 && mouseY < 60) {
    if (state === 0) {
      state = setInterval(() => {
      for (const line of grid) {
        for (const cell of line) {
          cell.evaluate()
        }
      }
      for (const line of grid) {
        for (const cell of line) {
          cell.apply()
        }
      }
    }, 200)
  } else if (state != 0) {
    clearInterval(state)
    state = 0
  }
    return
  }

  let x = Math.floor(mouseX/cellSize)
  let y = Math.floor(mouseY/cellSize)

  if (!justDragged && x>=0 && x<nbOfCellPerLine && y>=0 && y<nbOfCellPerLine) {
    console.log(`Clicked: ${x},${y}`)
    grid[y][x].colorSwitch()
  }
}

function mouseDragged() {
  let x = Math.floor(mouseX/cellSize)
  let y = Math.floor(mouseY/cellSize)

  if (x>=0 && x<nbOfCellPerLine && y>=0 && y<nbOfCellPerLine) {
    console.log([x, y, nbOfCellPerLine]);
    grid[y][x].color = colorAlive
    grid[y][x].nextGenState = colorAlive
  }


  justDragged = true
  
}

function mouseReleased() {
  setTimeout(() => {
    justDragged = false
  }, 500);
}