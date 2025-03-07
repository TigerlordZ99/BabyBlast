class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        this.load.image("cannon", "./assets/sprites/cannon.png")
    }
    create(){
        this.add.text(20, 20, "Menu Scene")
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("playScene")
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("creditsScene")
        }
    }

}

let keyC, keySPACE, keyG, keyM, keyLEFT, keyRIGHT