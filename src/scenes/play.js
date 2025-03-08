class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create(){
        let width = this.scale.width  
        let height = this.scale.height  

        let topHalf = this.add.rectangle(0, 0, width, height / 2, 0x37D6FE)  
        topHalf.setOrigin(0, 0)  

        let bottomHalf = this.add.rectangle(0, height / 2, width, height / 2, 0x00ff00)  
        bottomHalf.setOrigin(0, 0)

        this.add.text(20, 20, "Play Scene")
        this.add.text(20, 50, "Press G for Game Over")
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

        this.p1Cannon = new Cannon(this, width / 2, height+20, "cannon", 0).setOrigin(0.5, 1)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }   

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyG)){
            this.scene.start("gameOverScene")
        }
        this.p1Cannon.update()
    }
}