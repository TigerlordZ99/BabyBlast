class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload(){
        this.load.image("cannon", "./assets/sprites/cannon.png")
        this.load.image("laser", "./assets/sprites/laser.png")
        this.load.image("baby", "./assets/sprites/baby1.png")
        this.load.image("park", "./assets/sprites/park.png")
        this.load.audio("sfx_turret", "./assets/audio/sfx_turret.mp3")
        this.load.audio("sfx_laser", "./assets/audio/laser.mp3")
        this.load.audio("sfx_cry", "./assets/audio/cry.mp3")
        this.load.spritesheet("deathAnim", "./assets/sprites/deathAnim.png", {
            frameWidth: 56,
            frameHeight: 116
        })
        this.load.audio("bgm", "./assets/audio/background.mp3")
    }
    create(){
        let width = this.scale.width  
        let height = this.scale.height
        //set background music
        let bgm = this.game.registry.get('backgroundMusic')
        if (!bgm) {
            bgm = this.sound.add('bgm', {
                volume: 0.5,
                loop: true
            })
            
            bgm.play()
            this.game.registry.set('backgroundMusic', bgm);
        }
        let sky = this.add.rectangle(0, 0, width, height, 0x37D6FE)  
        sky.setOrigin(0, 0)
        
        this.add.image(0, height, "park").setOrigin(0, 1)
        
        this.add.text(width/2, height/3, "Baby Blast", {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#FFFF00',
            align: 'center'
        }).setOrigin(0.5)
        
        this.add.text(width/2, height/2 + 50, "Press SPACE to Start", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)
        
        this.add.text(width/2, height/2 + 90, "Press C for Credits", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)

        this.add.text(width/2, height/2 + 130, "Use Arrow Keys to Aim Cannon and Space to Shoot", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)
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