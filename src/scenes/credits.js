class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create(){
        this.add.text(20, 20, "Credits Scene")
        this.add.text(20, 50, "Press M for Menu")
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene")
        }
    }
}