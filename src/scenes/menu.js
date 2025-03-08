class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        this.load.image("cannon", "./assets/sprites/cannon.png")
        this.load.audio("sfx_turret", "./assets/audio/sfx_turret.mp3")
    }
    create(){
        this.add.text(20, 20, "Menu Scene")
        this.add.text(20, 50, "Press Space to Play")
        this.add.text(20, 80, "Press C for Credits")
        this.add.text(20, 110, "Use Arrow Keys to Aim Cannon")
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