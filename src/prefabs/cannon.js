class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.setOrigin(0.5, 0.5)
        this.rotationSpeed = 1
        this.minRotation = -45
        this.maxRotation = 45
    }

    fire() {
    }

    update() {
        if (keyLEFT.isDown) {
            this.angle -= this.rotationSpeed
            if (this.angle < this.minRotation) {
                this.angle = this.minRotation
            }
        }
        if (keyRIGHT.isDown) {
            this.angle += this.rotationSpeed
            if (this.angle > this.maxRotation) {
                this.angle = this.maxRotation
            }
        }
    }
}
