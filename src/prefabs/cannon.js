class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.setOrigin(0.5, 0.5)
        this.rotationSpeed = 3
        this.minRotation = -60
        this.maxRotation = 60
        
        this.sfxTurret = scene.sound.add("sfx_turret")
        this.soundPlaying = false
        this.scene = scene
        this.scene.events.on('shutdown', this.stopSound, this)
        this.scene.events.on('sleep', this.stopSound, this)
    }

    update() {
        //tilt cannon left
        if (keyLEFT.isDown) {
            this.angle -= this.rotationSpeed
            if (this.angle < this.minRotation) {
                this.angle = this.minRotation
            }
            this.playSound()
        }

        //tilt cannon right
        if (keyRIGHT.isDown) {
            this.angle += this.rotationSpeed
            if (this.angle > this.maxRotation) {
                this.angle = this.maxRotation
            }
            this.playSound()
        }
        
        //play sound on button press
        if (!keyLEFT.isDown && !keyRIGHT.isDown) {
            this.soundPlaying = false
            this.sfxTurret.stop()
        }
    }

    playSound(){
        if (!this.soundPlaying) {
            this.sfxTurret.play({loop: true })
            this.soundPlaying = true
        }
    }
    stopSound() {
        if (this.sfxTurret) {
            this.sfxTurret.stop()
            this.soundPlaying = false
        }
    }
}
