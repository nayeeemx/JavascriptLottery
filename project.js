// 1. Get deposit input from user 
// 2. Choose number of lines we can bet
// 3. Choose the bet amount
// 4. Spin the slot 
// 5. Check is user won
// 6. Give user the winning amount
// 7. Play again

const prompt = require("prompt-sync")();//importing prompt-sync so that we can get input something from user from command prompt

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
//OBJECTS in js , the keys with corresponding values
const SYMBOLS_VALUE = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}


const deposit = () =>{   //ES6 syle of writing a funtion same as writing function deposit(){}
    while(true){
        const depositamount = prompt("Enter the deposit amount : ");
        const numberDepositAmount = parseFloat(depositamount);//Converting string to float 
        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid Deposit,Try Again");
        }
        else{
            return numberDepositAmount;
        }
    }
};


const getNumberOfLines = () =>{   //ES6 syle of writing a funtion same as writing function deposit(){}
    while(true){
        const lines = prompt("Enter the number of lines to bet on : ");
        const numberOfLines = parseFloat(lines);//Converting string to float 
        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines>3 ) {
            console.log("Invalid number of lines ,Try Again");
        }
        else{
            return numberOfLines;
        }
    }
};


const getbet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the amount to bet on : ");
        const betAmount = parseFloat(bet);//Converting string to float 
        if(isNaN(betAmount) || betAmount <=0 || betAmount>balance/lines ) {
            console.log("Invalid bet ,Try Again");
        }
        else{
            return betAmount;
        }
    }
}


const spin = () => {
    const symbols = []; //Even though we may add values to array we made it constant , because we wont be assigning new value but just add new values
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i=0;i<count;i++){
            symbols.push(symbol);  //in js we can use arr.push() to insert into array
        }  
    }

    //console.log(symbols);


    const reels = [[],[],[]];
    for(let i=0;i<COLS;i++){
        const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex]; 
            reels[i].push(selectedSymbol); 
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}


const transpose = (reels) =>{
    const rows = [];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}


const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol]  of row.entries()){
            rowString+=symbol
            if(i!=rows.length-1){
                rowString +=" | ";
            }
        }
        console.log(rowString);
    }
}



const getWinnings = (rows,bet,lines) =>{
    let winnings=0;

    for(let row=0;row<lines;row++){
        let symbols = rows[row];
        let allSame = true;
        console.log(symbols);
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
         
            winnings+=bet * SYMBOLS_VALUE[symbols[0]]; 
        }
    }
    return winnings;
}


const game = () =>{

    let balance=deposit();  // can change it later , maybe add to balance , sub , as it is *let*
    while(true){
        console.log("YOU have a BALANCE of $"+balance);  //cant change value of const
        const numberOfLines=getNumberOfLines();
        const bet = getbet(balance,numberOfLines);
        balance-=bet*numberOfLines;
        const reels = spin(); 
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows,bet,numberOfLines)
        balance+=winnings;
        console.log("You WON ! $"+winnings.toString());

        if(balance<=0){
            console.log("YOU ran out of money, oops !!!!")
            break;
        }
        const playAgain = prompt("Do you wanna play again (y/n) :")
        if(playAgain!="y")break;

    }

}

game();