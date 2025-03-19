class Baby extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, texture) {
        let spawnPoint = Baby.getSpawnPoint(scene)
        super(scene, spawnPoint.x, spawnPoint.y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setOrigin(0.5, 0.5)
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(true)
        this.body.onWorldBounds = true

        this.randomizeMovement(spawnPoint.side)

        scene.physics.world.on("worldbounds", (body) => {
            if (body.gameObject === this) {
                this.destroy()
            }
        })
    }

    static getSpawnPoint(scene) {
        let width = scene.scale.width
        let height = scene.scale.height
        let x = Phaser.Math.Between(0, width)
        let y = height/2
        let offset = 50
        let side = (x < width/2) ? 0:1
        return {x, y, side}
    }

    randomizeMovement(side) {
        let angle

        if (side === 0) {
            angle = Phaser.Math.FloatBetween(0, Math.PI / 2)
        } else {
            angle = Phaser.Math.FloatBetween(Math.PI - Math.PI / 2, Math.PI)
        }

        let speed = Phaser.Math.Between(200, 300)
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)
    }

    playDeathAnimation() {
        this.body.setVelocity(0, 0)
        this.body.enable = false
        this.play("babyDeath")
        this.on('animationcomplete', function() {
            this.destroy()
        }, this)
    }
}
