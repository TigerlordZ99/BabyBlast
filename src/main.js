//Madhav Ramakrishnan
//Components used: Text Objects, Animations, Timers, Physic Systems, Sound Effects

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,    
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [ Menu, Play, GameOver, Credits ]
}
let game = new Phaser.Game(config)
