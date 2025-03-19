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

        let purpleBar = this.add.rectangle(0, 0, width, 60, 0x36118a)
        purpleBar.setOrigin(0, 0)

        let gameTitle = this.add.text(width / 2, 30, 'Baby Blast', {
            fontSize: '28px',
            fontStyle: 'bold',
            fill: 'white'
        }).setOrigin(0.5)

        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        this.score = 0
        this.lives = 3
        this.babyCry = this.sound.add("sfx_cry")
        this.laserShoot = this.sound.add("sfx_laser")
        this.lasers = this.add.group()
        this.babies = this.add.group()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.spawnDelay = Phaser.Math.Between(1000, 3000)
        this.babySpawner = this.time.addEvent({
            delay: this.spawnDelay,
            callback: this.spawnBaby,
            callbackScope: this,
            loop: true
        })

        //after 30 seconds spawn babies faster
        this.time.delayedCall(30000, this.increaseSpawnRate, [], this)

        this.scoreText = this.add.text(width - 40, 30, this.score, {
            fontSize: '20px',
            fontStyle: 'bold',
            fill: 'white'
        }).setOrigin(1, 0.5)

        this.anims.create({
            key: 'babyDeath',
            frames: this.anims.generateFrameNumbers('deathAnim', { start: 0, end: 5 }),
            frameRate: 10,
            hideOnComplete: false
        })

        this.livesText = this.add.text(20, 30, 'Lives: ' + this.lives, {
            fontSize: '20px',
            fontStyle: 'bold',
            fill: 'white'
        }).setOrigin(0, 0.5)

        this.p1Cannon = new Cannon(this, width / 2, height+20, "cannon", 0).setOrigin(0.5, 1)

        this.physics.add.overlap(this.lasers, this.babies, this.laserBabyCollision, null, this)
    }   

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyG)){
            this.scene.start("gameOverScene", {score: this.score})
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.createLaser()
        }
        this.p1Cannon.update()
        this.lasers.children.each(laser => {
            if (laser.active) laser.update()
        })
        
        this.babies.children.each(baby => {
            if (baby.active) {
                if (baby.update()) {
                    const babyLifespan = this.time.now - baby.spawnTime
                    if (babyLifespan > 750) {
                        this.decreaseLives()
                    }
        
                    baby.destroy()
                }
            }
        })
        if (this.lives <= 0) {
            this.scene.start("gameOverScene", {score: this.score})
        }
    }

    increaseSpawnRate() {
        this.babySpawner.remove()
        //spawn babies faster
        this.babySpawnTimer = this.time.addEvent({
            delay: this.spawnDelay / 2,
            callback: this.spawnBaby,
            callbackScope: this,
            loop: true
        })
    }

    decreaseLives() {
        this.lives--
        this.livesText.setText('Lives: ' + this.lives)
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
        this.laserShoot.play()
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
        this.babyCry.play()
        this.score += 100
        this.scoreText.setText(this.score)
    }
}