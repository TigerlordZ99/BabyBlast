class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create(){
        let width = this.scale.width  
        let height = this.scale.height  

        let sky = this.add.rectangle(0, 0, width, height, 0x37D6FE)  
        sky.setOrigin(0, 0)  

        this.add.image(0, height, "park").setOrigin(0, 1)


        this.add.text(20, 20, "Play Scene")
        this.add.text(20, 50, "Press G for Game Over")
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        this.score = 0

        
        this.lasers = this.add.group()
        this.babies = this.add.group()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: this.spawnBaby,
            callbackScope: this,
            loop: true
        })

        this.scoreText = this.add.text(this.scale.width - 200, 20, 'Score: ' + this.score, {
        fontSize: '20px',
        fill: 'black '
        })

        this.anims.create({
            key: 'babyDeath',
            frames: this.anims.generateFrameNumbers('deathAnim', { start: 0, end: 5 }),
            frameRate: 10,
            hideOnComplete: false
        })

        this.p1Cannon = new Cannon(this, width / 2, height+20, "cannon", 0).setOrigin(0.5, 1)

        this.physics.add.overlap(this.lasers, this.babies, this.laserBabyCollision, null, this)
    }   

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyG)){
            this.scene.start("gameOverScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.createLaser()
        }
        this.p1Cannon.update()
        this.lasers.children.each(laser => {
            if (laser.active) laser.update();
        })
    }

    spawnBaby() {
        let width = this.scale.width
        let height = this.scale.height
        let x = Phaser.Math.Between(0, width)
        let y = Phaser.Math.Between(0, height)

        let newBaby = new Baby(this, "baby")
        this.babies.add(newBaby)
        console.log("new baby spawned")
    }

    createLaser() {
        let angle = Phaser.Math.DegToRad(this.p1Cannon.angle - 90)
        let offset = 170
        let laserX = this.p1Cannon.x + Math.cos(angle) * offset
        let laserY = this.p1Cannon.y + Math.sin(angle) * offset
        let laser = new Laser(this, laserX, laserY, "laser")
        laser.angle = this.p1Cannon.angle
        this.lasers.add(laser)
        let speed = 400
        let horizontalSpeed = Math.cos(angle) * speed
        let verticalSpeed = Math.sin(angle) * speed
        laser.body.setVelocity(horizontalSpeed, verticalSpeed)
    }
    
    laserBabyCollision(laser, baby) {
        laser.destroy()
        baby.playDeathAnimation()
        this.score += 100
        this.scoreText.setText('Score: ' + this.score)
    }
}