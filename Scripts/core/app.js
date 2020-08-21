/*

Name: app.js
Author: Thiago Luiz Batista
Student Number: 301110966
Description: Assignment 4
Program: COMP125 M2020
Date: 21 / 08 / 2020
Website: Thiago "Avengers" Slot machine
File Description: Scripts to make the Slot Machine to work properly.

*/

(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let agamoto = 0;
    let america = 0;
    let hawk = 0;
    let iron = 0;
    let thor = 0;
    let star = 0;
    let shield = 0;
    let blanks = 0;
    let manifest = [{
            id: "background",
            src: "./Assets/images/background.png"
        },
        {
            id: "america",
            src: "./Assets/images/america.png"
        },
        {
            id: "thor",
            src: "./Assets/images/thor.png"
        },
        {
            id: "star",
            src: "./Assets/images/star.png"
        },
        {
            id: "bet_line",
            src: "./Assets/images/bet_line.gif"
        },
        {
            id: "bet1Button",
            src: "./Assets/images/bet1Button.png"
        },
        {
            id: "bet10Button",
            src: "./Assets/images/bet10Button.png"
        },
        {
            id: "bet100Button",
            src: "./Assets/images/bet100Button.png"
        },
        {
            id: "betMaxButton",
            src: "./Assets/images/betMaxButton.png"
        },
        {
            id: "blank",
            src: "./Assets/images/blank.gif"
        },
        {
            id: "iron",
            src: "./Assets/images/iron.png"
        },
        {
            id: "agamoto",
            src: "./Assets/images/agamoto.png"
        },
        {
            id: "hawk",
            src: "./Assets/images/hawk.png"
        },
        {
            id: "shield",
            src: "./Assets/images/shield.png"
        },
        {
            id: "spinButton",
            src: "./Assets/images/spinButton.png"
        },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        } else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
      e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor(Math.random() * 65 + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "agamoto";
                    agamoto++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "america";
                    america++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "hawk";
                    hawk++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "iron";
                    iron++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "thor";
                    thor++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "star";
                    star++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "shield";
                    shield++;
                    break;
            }
        }
        return betLine;
    }

    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        // Labels
        jackPotLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("9999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("star", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("america", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("thor", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }

    function interfaceLogic() {
        spinButton.on("click", () => {
            // reel test
            let reels = Reels();
            // example of how to replace the images in the reels
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);
        });
        bet1Button.on("click", () => {
            console.log("bet1Button Button Clicked");
        });
        bet10Button.on("click", () => {
            console.log("bet10Button Button Clicked");
        });
        bet100Button.on("click", () => {
            console.log("bet100Button Button Clicked");
        });
        betMaxButton.on("click", () => {
            console.log("betMaxButton Button Clicked");
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map