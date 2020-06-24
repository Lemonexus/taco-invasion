//Create a ship of kind player
let ship = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . 2 2 . . . . . . . . . . . .
    . . 2 2 2 2 . . . . . . . . . .
    . . 2 2 2 2 2 2 2 2 2 . . . . .
    . . 2 2 2 2 1 1 1 1 2 2 . . . .
    . . 2 2 2 2 1 1 1 1 1 2 2 2 2 .
    . . 2 2 2 2 1 1 1 1 1 1 1 1 2 .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
    . . f f f f f f f f f f f f f .
    . . 2 2 2 2 2 2 2 2 2 2 2 . . .
    . . . 2 2 2 2 2 2 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

//Set the ship to stay on the screen
ship.setFlag(SpriteFlag.StayInScreen, true)

//Give the ship 3 lives
info.setLife(3)
//Move the ship with the controller (set speed to 200)
controller.moveSprite(ship, 200, 200)

//When we press button "A" we want lasers

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, ship, 200, 0)
})

//Generate enemy every 0.5 second
game.onUpdateInterval(500, function () {
    let enemy = sprites.create(img`
        . . . . . . . e e e e . . . . .
        . . . . . e e 4 5 5 5 e e . . .
        . . . . e 4 5 6 2 2 7 6 6 e . .
        . . . e 5 6 6 7 2 2 6 4 4 4 e .
        . . e 5 2 2 7 6 6 4 5 5 5 5 4 .
        . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4
        . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4
        e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4
        e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4
        e 5 c c e 5 4 5 5 5 4 5 5 5 e .
        e 5 c c 5 5 5 5 5 5 5 5 4 e . .
        e 5 e c 5 4 5 4 5 5 5 e e . . .
        e 5 e e 5 5 5 5 5 4 e . . . . .
        4 5 4 e 5 5 5 5 e e . . . . . .
        . 4 5 4 5 5 4 e . . . . . . . .
        . . 4 4 e e e . . . . . . . . .
    `, SpriteKind.Enemy)

    //Randomly show up on the right side, and moving it to the left
    enemy.setPosition(160, Math.randomRange(0,120))
    enemy.setVelocity(-20, 0)
})

//Projectile touches enemy
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile: Sprite, enemy: Sprite) {
    //Destroy the enemy and set it on fire
    enemy.destroy(effects.fire, 200)
    //increase the score by 1
    info.changeScoreBy(1)
    //Projectile gets destroy
    if (projectile.image != wallImg) {
        projectile.destroy()
    }
})


//Enemy touches player
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemy: Sprite, player: Sprite) {
   enemy.destroy(effects.fire, 200)
   player.startEffect(effects.bubbles, 200)
    info.changeLifeBy(-1)
})

//WHen we press button "B" we want a wall of fire
let wallImg = img`
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
    . . . . . 4 2 2 4 . . . . . . .
`
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.createProjectileFromSprite(wallImg, ship, 200, 0)

})