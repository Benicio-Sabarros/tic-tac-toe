
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

        const getActivePlayer = () => activePlayer;

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
                if(board.board[a] && board.board[a] === board.board[b] && board.board[b] === board.board[c]){
                    for(const player of players){
                        if(player.symbol === board.board[a]){
                            console.log(`${player.name} wins!`);
                            player.wins++;
                            console.log(`Current score --> ${playerOneName}: ${players[0].wins}, ${playerTwoName}: ${players[1].wins}`);
                            console.log("Starting new match");
                            resetMatch();
                            return;
                        }
                    }
                }
            }
            if (roundCounter === 9){
                    console.log("It's a tie!");
                    console.log(`Current score --> ${playerOneName}: ${players[0].wins}, ${playerTwoName}: ${players[1].wins}`);
                    console.log("Starting new match");
                    switchPlayerTurn();
                    resetMatch();
                    return;
                }
        }

        const printNewRound = () => {
            board.printBoard();
            console.log(`${activePlayer.name}'s turn`)
        }

        // change value of selected cell with current player's token if at least 5 rounds have passed check for win condition, start new round
        const playRound = (value) => {
            if(!board.board[value]) {
                board.board[value] = activePlayer.symbol;
                roundCounter++;
                if(roundCounter > 4) checkForWins();
                switchPlayerTurn();
                printNewRound();
            } else {
                console.log("Cell already taken");
            }
        }

        const resetMatch = () => {
            for(let i = 0; i < board.board.length; i++){
                board.board[i] = "";
            }
            roundCounter = 0;
            printNewRound();
        }

        return {
            playRound,
            board,
            getActivePlayer
        }
    }
    var game = GameController();
    console.log(window.game);
