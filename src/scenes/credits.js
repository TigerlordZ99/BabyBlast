class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create(){
        let width = this.scale.width  
        let height = this.scale.height
        
        let background = this.add.rectangle(0, 0, width, height, "black")
        background.setOrigin(0, 0)
        
        this.add.text(width/2, 80, "CREDITS", {
            fontFamily: 'Arial',
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#FFFF00',
            align: 'center'
        }).setOrigin(0.5)
        
        const credits = [
            "Game Design: Madhav Ramakrishnan",
            "Art: Madhav Ramakrishnan",
            "Programming: Madhav Ramakrishnan",
            "Sound Effects: Pixabay"
        ]
        
        let yPosition = 180
        
        for (const line of credits) {
            this.add.text(width/2, yPosition, line, {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#FFFFFF',
                align: 'center'
            }).setOrigin(0.5)
            
            yPosition += 40
        }
        
        this.add.text(width/2, height - 80, "Press M to return to Menu", {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5)
        
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene")
        }
    }
}