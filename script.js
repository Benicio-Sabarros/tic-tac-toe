window.onload = function(){
    function Gameboard(){
        const board = ["", "", "",
                       "", "", "",
                       "", "", ""];

        const printBoard = () => {
            console.log(board);
        }

        return {
            board,
            printBoard
        }
    }

    function GameController(playerOneName = "Player 1", playerTwoName = "Player 2"){
        const board = Gameboard(); // create a new gameboard object

        const players = [ 
            {
                name: playerOneName,
                symbol: "X",
                wins: 0
            },
            {
                name: playerTwoName,
                symbol: "O",
                wins: 0
            }];

        // logic for turn switching
        let activePlayer = players[0];

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        };

        const winningCombos = [[0, 1, 2], // rows
                               [3, 4, 5], 
                               [6, 7, 8],
                               [0, 3, 6], // columns
                               [1, 4, 7],
                               [2, 5, 8], 
                               [0, 4, 8], // diagonals
                               [2, 4, 6]];
        
        let roundCounter = 0;

        const checkForWins = () => {
            for(const [a, b, c] of winningCombos){
                if(!board[a] && board[a] === board[b] && board[b] === board[c]){
                    for(player of players){
                        if(player.symbol === board[a]){
                            console.log(`${player.name} wins!`);
                            console.log("Starting new Round");
                            // GameController(players[0].name, players[1].name) ?
                            return;
                        }
                    }
                }
            }
        }

        const printNewRound = () => {
            board.printBoard();
            console.log(`${activePlayer.name}'s turn`)
        }

        // change value of selected cell with current player's token if at least 5 rounds have passed check for win condition, start new round
        const playRound = (value) => {
            board.board[value] = activePlayer.symbol;
            roundCounter++;
            if(roundCounter > 4) checkForWins();
            switchPlayerTurn();
            printNewRound();
        }
        return {
            playRound
        }
    }
    const game = GameController();
}