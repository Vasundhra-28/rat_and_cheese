class Example extends Phaser.Scene
{
    cursors;
    text;
    cheeseGroup;
    sprite;
    cheeseCount = 0;

    preload ()
    {
        this.load.image('rat', 'assets/sprites/rat.png');         // Make sure rat.png is in your assets folder
        this.load.image('cheese', 'assets/sprites/cheese.png');   // Same for cheese.png
    }

    create ()
    {
        // Create the rat player
        this.sprite = this.physics.add.image(400, 300, 'rat');
        this.sprite.setCollideWorldBounds(true);

        // Generate 10 cheese items randomly
        this.cheeseGroup = this.physics.add.staticGroup({
            key: 'cheese',
            frameQuantity: 10,
            immovable: true
        });

        const cheeseItems = this.cheeseGroup.getChildren();

        for (let i = 0; i < cheeseItems.length; i++)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            cheeseItems[i].setPosition(x, y);
        }

        this.cheeseGroup.refresh();

        // Display cheese count on the screen
        this.text = this.add.text(10, 10, 'Cheese Collected: 0', { font: '28px Courier', fill: '#ffffff' });

        // Display your name on screen
        this.add.text(10, 570, 'Created by Vasundhara', { font: '20px Courier', fill: '#ffffff' });

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Setup overlap event when rat collects cheese
        this.physics.add.overlap(this.sprite, this.cheeseGroup, this.collectCheese, null, this);
    }

    update ()
    {
        // Movement logic
        this.sprite.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.sprite.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.setVelocityX(200);
        }

        if (this.cursors.up.isDown)
        {
            this.sprite.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.sprite.setVelocityY(200);
        }
    }

    collectCheese (sprite, cheese)
    {
        // Hide and disable collected cheese
        this.cheeseGroup.killAndHide(cheese);
        cheese.body.enable = false;

        // Increase cheese count
        this.cheeseCount++;
        this.text.setText(`Cheese Collected: ${this.cheeseCount}`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d6b2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
