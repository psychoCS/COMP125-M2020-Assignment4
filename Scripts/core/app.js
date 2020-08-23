/*

Name: app.ts
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
    let ResetButton;
    let ExitButton;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let totalCreditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // Game variables
    let jackpot = 100000;
    let totalCredit = 1000;
    let credit = totalCredit;
    let bet = 0;
    let winnings = 0;
    // symbol tallies
    let agamoto = 0;
    let america = 0;
    let hawk = 0;
    let iron = 0;
    let thor = 0;
    let star = 0;
    let shield = 0;
    let blanks = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "america", src: "./Assets/images/america.png" },
        { id: "thor", src: "./Assets/images/thor.png" },
        { id: "star", src: "./Assets/images/star.png" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "ResetButton", src: "./Assets/images/ResetButton.png" },
        { id: "ExitButton", src: "./Assets/images/ExitButton.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "iron", src: "./Assets/images/iron.png" },
        { id: "agamoto", src: "./Assets/images/agamoto.png" },
        { id: "hawk", src: "./Assets/images/hawk.png" },
        { id: "shield", src: "./Assets/images/shield.png" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
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
        }
        else {
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
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (blanks == 0) {
            winnings = bet * 0;
        }
        if (agamoto == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 10;
            stage.addChild(winningsLabel);
        }
        else if (america == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 20;
            stage.addChild(winningsLabel);
        }
        else if (hawk == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 30;
            stage.addChild(winningsLabel);
        }
        else if (iron == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 40;
            stage.addChild(winningsLabel);
        }
        else if (thor == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 50;
            stage.addChild(winningsLabel);
        }
        else if (star == 3) {
            stage.removeChild(winningsLabel);
            winnings = bet * 75;
            stage.addChild(winningsLabel);
        }
        else if (shield == 3) {
            stage.removeChild(winningsLabel);
            alert("You Won the S.H.I.E.L.D $" + jackpot + " Jackpot!!");
            winnings = bet + jackpot;
            stage.addChild(winningsLabel);
        }
        else if (agamoto == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 2;
            stage.addChild(winningsLabel);
        }
        else if (america == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 2;
            stage.addChild(winningsLabel);
        }
        else if (hawk == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 3;
            stage.addChild(winningsLabel);
        }
        else if (iron == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 4;
            stage.addChild(winningsLabel);
        }
        else if (thor == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 10;
            stage.addChild(winningsLabel);
        }
        else if (star == 2) {
            winnings = bet * 5;
        }
        else if (shield == 2) {
            stage.removeChild(winningsLabel);
            winnings = bet * 20;
            stage.addChild(winningsLabel);
        }
        else if (shield == 1) {
            stage.removeChild(winningsLabel);
            winnings = bet * 5;
            stage.addChild(winningsLabel);
        }
        else {
            stage.removeChild(jackPotLabel);
            jackpot = jackpot + bet;
            jackPotLabel = new UIObjects.Label(jackpot.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
            stage.addChild(jackPotLabel);
        }
    }
    function GlobalReset() {
        stage.removeAllChildren();
        jackpot = 100000;
        let totalCredit = 1000;
        credit = totalCredit;
        bet = 0;
        winnings = 0;
        Main();
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
        ResetButton = new UIObjects.Button("ResetButton", Config.Screen.CENTER_X - 126, Config.Screen.CENTER_Y - 185, true);
        stage.addChild(ResetButton);
        ExitButton = new UIObjects.Button("ExitButton", Config.Screen.CENTER_X + 126, Config.Screen.CENTER_Y - 185, true);
        stage.addChild(ExitButton);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        // Labels
        jackPotLabel = new UIObjects.Label(jackpot.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        totalCreditLabel = new UIObjects.Label(totalCredit.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(totalCreditLabel);
        creditLabel = new UIObjects.Label(credit.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
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
        //Calling the reset method when the button is clicked
        ResetButton.on("click", () => {
            GlobalReset();
            console.log("ResetButton Button Clicked");
        });
        // Fake open a window, so we can close the page.
        ExitButton.on("click", () => {
            window.open("your current page URL", "_self", "");
            window.close();
            console.log("ExitButton Button Clicked");
        });
        function creditReset() {
            credit = credit;
            stage.removeChild(totalCreditLabel);
            stage.removeChild(creditLabel);
            stage.removeChild(betLabel);
        }
        function CreditLabel() {
            creditLabel = new UIObjects.Label(credit.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(creditLabel);
        }
        function BetLabel() {
            betLabel = new UIObjects.Label(bet.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        }
        function labelReset() {
            CreditLabel();
            BetLabel();
        }
        function gameOver() {
            stage.removeChild(totalCreditLabel);
            stage.removeChild(creditLabel);
            stage.removeChild(betLabel);
            // As well it will update the gui labels
            creditLabel = new UIObjects.Label("GAME", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(creditLabel);
            betLabel = new UIObjects.Label("OVER", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        }
        // Game Over Option
        if (credit == 0) {
            stage.removeChild(totalCreditLabel);
            stage.removeChild(creditLabel);
            stage.removeChild(betLabel);
            // As well it will update the gui labels
            creditLabel = new UIObjects.Label("GAME", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(creditLabel);
            betLabel = new UIObjects.Label("OVER", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
            stage.addChild(betLabel);
        }
        // While the user has credit this will happen
        if (credit != 0) {
            //When the user press 'bet 1', it will refresh the value of the variables +-1
            bet1Button.on("click", () => {
                if (credit > 0) {
                    creditReset();
                    credit = credit - 1;
                    bet = bet + 1;
                    labelReset();
                    // As well it will update the gui labels
                }
                else {
                    gameOver();
                }
                console.log("bet1Button Button Clicked");
            });
            //When the user press 'bet 10', it will refresh the value of the variables +-10
            bet10Button.on("click", () => {
                if (credit > 0) {
                    creditReset();
                    credit = credit - 10;
                    bet = bet + 10;
                    labelReset();
                    // As well it will update the gui labels
                }
                else {
                    gameOver();
                }
                console.log("bet10Button Button Clicked");
            });
            //When the user press 'bet 100', it will refresh the value of the variables +-100
            bet100Button.on("click", () => {
                if (credit > 0) {
                    creditReset();
                    credit = credit - 100;
                    bet = bet + 100;
                    labelReset();
                    // As well it will update the gui labels
                }
                else {
                    gameOver();
                }
                console.log("bet100Button Button Clicked");
            });
            //When the user press 'bet max', it will refresh the value of the variables by the total value that the user has
            betMaxButton.on("click", () => {
                if (credit > 0) {
                    creditReset();
                    bet = bet + credit;
                    credit = credit - credit;
                    credit = credit + winnings;
                    labelReset();
                    // As well it will update the gui labels
                }
                else {
                    gameOver();
                }
                console.log("betMaxButton Button Clicked");
            });
            function CleanWinnings() {
                stage.removeChild(winningsLabel);
                winnings = 0;
                winningsLabel = new UIObjects.Label(winnings.toString(), "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
                stage.addChild(winningsLabel);
            }
            spinButton.on("click", () => {
                CleanWinnings();
                // Reels calls the function to show the images.
                let reels = Reels();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                determineWinnings();
                //clear the bet to start over
                stage.removeChild(betLabel);
                bet = 0;
                BetLabel();
                // Calculations
                credit = credit - bet + winnings;
                // Update gui
                stage.removeChild(creditLabel);
                CreditLabel();
                stage.addChild(winningsLabel);
            });
        }
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map