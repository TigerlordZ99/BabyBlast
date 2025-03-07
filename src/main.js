let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,    
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
        }
    },
    scene: [ Menu, Play, GameOver, Credits ]
}
let game = new Phaser.Game(config)
