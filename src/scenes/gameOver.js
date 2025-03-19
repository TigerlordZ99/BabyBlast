class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    init(data) {
        this.score = data.score || 0
    }

    create(){
        let width = this.scale.width  
        let height = this.scale.height
       
        let background = this.add.rectangle(0, 0, width, height, 0x000000)
        background.setOrigin(0, 0)
        
        this.add.text(width/2, height/3, "GAME OVER", {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#FFFF00',
            align: 'center'
        }).setOrigin(0.5)

        this.add.text(width/2, height/2, "Your Score: " + this.score, {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#FFFF00',
            align: 'center'
        }).setOrigin(0.5)
        
        this.add.text(width/2, height/2 + 70, "Press M to return to Menu", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)
        
        this.add.text(width/2, height/2 + 110, "Press C for Credits", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)
        
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