class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Add "PAUSED" text
        this.add.text(width * 0.5, height * 0.5, "PAUSED", { 
            fontSize: '32px', 
            color: '#ffffff' 
        }).setOrigin(0.5);

        // Add "Resume" button
        const resumeButton = this.add.text(width * 0.5, height * 0.6, "Resume", { 
            fontSize: '24px', 
            color: '#ffffff' 
        }).setOrigin(0.5);
        
        // Make the "Resume" button interactive
        resumeButton.setInteractive();

        // Resume the game when the "Resume" button is clicked
        resumeButton.on('pointerup', () => {
            this.scene.stop('PauseScene');
            this.scene.resume('MainScene');
        });

        // Add "Quit" button
        const quitButton = this.add.text(width * 0.5, height * 0.7, "Quit", { 
            fontSize: '24px', 
            color: '#ffffff' 
        }).setOrigin(0.5);
        
        // Make the "Quit" button interactive
        quitButton.setInteractive();

        // Switch back to menu scene when the "Quit" button is clicked
        quitButton.on('pointerup', () => {
            this.scene.stop('PauseScene');
            this.scene.stop('MainScene');
            this.scene.start('MenuScene');
        });
    }
}

export default PauseScene;
