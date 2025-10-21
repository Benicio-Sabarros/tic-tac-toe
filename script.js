
    function GameController(playerOneName = "Player 1", playerTwoName = "Player 2"){
        const board = ["", "", "",
                       "", "", "",
                       "", "", ""]; // create a new gameboard object

        const display = document.querySelector("#display");
        const score = document.querySelector("#score");
        const currentPlayerDisplay = document.querySelector("#current-player");
        const wins1 = document.querySelector("#wins-1");
        const wins2= document.querySelector("#wins-2");
        const cells = document.querySelectorAll(".cell");
        for(const cell of cells){
            cell.addEventListener("click", () => {
                const cellIndex = parseInt(cell.id);
                playRound(cellIndex);
            })
        }

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
        let isGameActive = true;

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
                if(board[a] && board[a] === board[b] && board[b] === board[c]){
                    for(const player of players){
                        if(player.symbol === board[a]){
                            display.textContent = `${player.name} wins!`;
                            player.wins++;
                            wins1.textContent = `Wins: ${players[0].wins}`;
                            wins2.textContent = `Wins: ${players[1].wins}`;
                            score.textContent = `Current score --> ${playerOneName}: ${players[0].wins}, ${playerTwoName}: ${players[1].wins}`;
                            cells[a].classList.add("winner");
                            cells[b].classList.add("winner");
                            cells[c].classList.add("winner");
                            isGameActive = false;
                                setTimeout(() => {
                                resetMatch();
                                isGameActive = true;
                                cells[a].classList.remove("winner");
                                cells[b].classList.remove("winner");
                                cells[c].classList.remove("winner");
                                }, 1000);
                            return;
                        }
                    }
                }
            }
            if (roundCounter === 9){
                    display.textContent = "It's a tie!";
                    score.textContent = `Current score --> ${playerOneName}: ${players[0].wins}, ${playerTwoName}: ${players[1].wins}`;
                    setTimeout(resetMatch, 1000);
                    return;
                }
        }

        const printNewRound = () => {
            let i = 0;
            for(const cell of cells){
                cell.textContent = board[i];
                i++;
            }
            currentPlayerDisplay.textContent = `${activePlayer.name}'s turn`;
        }

        // change value of selected cell with current player's token if at least 5 rounds have passed check for win condition, start new round
        const playRound = (value) => {
            if(!isGameActive) return;
            if(!board[value]) {
                board[value] = activePlayer.symbol;
                roundCounter++;
                if(roundCounter > 4){
                    checkForWins();
                    if(roundCounter === 0) return;
                }
                switchPlayerTurn();
                printNewRound();
        }}

        const resetMatch = () => {
            for(let i = 0; i < board.length; i++){
                board[i] = "";
            }
            roundCounter = 0;
            display.textContent = "";
            printNewRound();
        }

        return {
            playRound,
            board,
            getActivePlayer
        }
    }
    var game = GameController();
