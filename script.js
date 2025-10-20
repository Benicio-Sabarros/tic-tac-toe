window.onload = function(){
    function Gameboard(){
        const board = ["", "", "",
                       "", "", "",
                       "", "", ""];

        const changeValue = (row, column, player) => {
            board[row][column] = player.symbol;
        }
    }

    function GameController(playerOneName = "Player 1", playerTwoName = "Player 2"){
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
            }
        ]
        const winningCombos = [[0, 1, 2], // rows
                               [3, 4, 5], 
                               [6, 7, 8],
                               [0, 3, 6], // columns
                               [1, 4, 7],
                               [2, 5, 8], 
                               [0, 4, 8], // diagonals
                               [2, 4, 6]];
        
        let roundCounter = 0;

        const checkForWins = function(){
            for(const [a, b, c] of winningCombos){
                if(!board[a] && board[a] === board[b] && board[b] === board[c]){
                    for(player of players){
                        if(player.symbol === board[a]){
                            player.wins++;
                            break;
                        }
                    }
                }
            }
        }

        
    }
    
}