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
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyG)){
            this.scene.start("gameOverScene")
        }
    }
}