class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create(){
        this.add.text(20, 20, "Game Over Scene")
        this.add.text(20, 50, "Press M for Menu")
        this.add.text(20, 80, "Press C for Credits")
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene")
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("creditsScene")
        }
    }
}