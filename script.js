class Game {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.context = this.canvas.getContext("2d")
        document.addEventListener("keydown", this.OnKeyPress.bind(this))
    }

    init() {
        this.total = 0

        this.playerX = 20
        this.playerY = 20
        this.playerW = 20
        this.playerH = 20

        this.enemyX = 460
        this.enemyY = 460
        this.enemyW = 20
        this.enemyH = 20

        this.coinX = 240
        this.coinY = 240
        this.coinW = 20
        this.coinH = 20

        self.timer = setInterval(this.loop.bind(this), 1000 / 30)
        self.enemyTimer = setInterval(this.enemyAI.bind(this), 1000 / 6)
    }

    reset() {
        clearInterval(self.timer)
        clearInterval(self.enemyTimer)
        this.init()
    }

    enemyAI() {
        let gapY = this.playerY - this.enemyY
        let gapX = this.playerX - this.enemyX

        if (Math.abs(gapX) > Math.abs(gapY)) {
            if (gapX < 0)
                this.enemyX -= this.enemyW
            else
                this.enemyX += this.enemyW
        } else {
            if (gapY < 0)
                this.enemyY -= this.enemyH
            else
                this.enemyY += this.enemyH
        }
    }

    update() {
        if (this.playerX >= this.canvas.width) {
            this.playerX = 0
        } else if (this.playerX <= -this.playerW) {
            this.playerX = this.canvas.width - this.playerW
        } else if (this.playerY >= this.canvas.height) {
            this.playerY = 0
        } else if (this.playerY <= -this.playerH) {
            this.playerY = this.canvas.height - this.playerH
        }

        if (this.playerY == this.coinY && this.playerX == this.coinX) {
            this.coinX = Math.floor(Math.random() * this.canvas.width / this.coinW) * this.coinW
            this.coinY = Math.floor(Math.random() * this.canvas.height / this.coinH) * this.coinH
            this.total += 1
        }

        if (this.enemyX == this.playerX && this.enemyY == this.playerY) {
            alert("Lose!")
            this.reset()
        } else if (this.total == 5) {
            alert("Win!")
            this.reset()
        }
    }

    draw() {
        this.context.beginPath()

        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.context.fillStyle = "green"
        this.context.fillRect(this.playerX, this.playerY, this.playerW, this.playerH)

        this.context.fillStyle = "red"
        this.context.fillRect(this.enemyX, this.enemyY, this.enemyW, this.enemyH)

        this.context.fillStyle = "yellow"
        this.context.fillRect(this.coinX, this.coinY, this.coinW, this.coinH)

        this.context.font = "30px Arial"
        this.context.fillStyle = "white"
        this.context.fillText(this.total, 240, 40)
    }

    loop() {
        this.draw()
        this.update()
    }

    OnKeyPress(e) {
        if (e.keyCode == 37) { // left
            this.playerX -= this.playerW
        } else if (e.keyCode == 38) { // top
            this.playerY -= this.playerH
        } else if (e.keyCode == 39) { // right
            this.playerX += this.playerW
        } else if (e.keyCode == 40) { // bottom
            this.playerY += this.playerH
        }
    }
}

const game = new Game()
game.init()