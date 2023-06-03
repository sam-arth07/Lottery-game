//1.deposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. Spin the slot machine
//5. Check if the user won
//6. give the user their winnings
//7. play again

const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
};

const SYMBOL_VALUES = {
    A : 7,
    B : 4,
    C : 3,
    D : 2
};

const deposit = () => {
    while(true){
        const depositAmt = prompt("Enter a deposit amount: ");
        const numberDepositAmt = parseFloat(depositAmt)
        if (numberDepositAmt<=0 || isNaN(numberDepositAmt)){
            console.log("Enter a valid amount,Try Again.");
        }else{
            return numberDepositAmt;
        }
    }
};
const getnumOfLines = () => {
    while(true){
        const numberOfLines = prompt("Enter the number of line to bet on (1-3): ");
        const numOfLines = parseInt(numberOfLines)
        if (numOfLines<1 || isNaN(numOfLines) || numOfLines>3){
            console.log("Only 3 lines to bet on!Either 1 line, 2 lines or all 3 of them.");
        }else{
            return numOfLines;
        }
    }
};

const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet amount for selected line: ");
        const numBet = parseFloat(bet)
        if (numBet<=0 || isNaN(numBet) || numBet>balance/lines){
            console.log("Invalid Bet ,Try again.");
        }else{
            return numBet;
        }
    }
};

const spin = () =>{
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i =0;i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); 
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose = (reels) =>{
    const rows = [];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (reels) => {
    for(const row of reels){
        let rowsStr = row[0] + " | " + row[1] + " | "+ row[2];
        console.log(rowsStr);
    }
};
const getWinnings = (rows,bet,lines) => {
    let winnings = 0;
    for (let row = 0;row<lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for(symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = ()=>{
    let balance = deposit();
    while(true){
        console.log("Current Balance = Rs "+ balance);
        
        const numberOfLines = getnumOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet*numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance+=winnings;
        console.log("You won, Rs "+ winnings.toString());
        if (balance<=0){
            console.log("You went Bankrupt!");
            break;
        }
        const playAgain = prompt("Do you wish to play again (y/n) ? : ");
        if (playAgain!="y") break;
    }
    
};

game();