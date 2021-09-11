import logo from './logo.svg';
import './App.css';
import {useReducer} from 'react';
import {Row} from './Row';


function App() {
  let initialGameState = {
    player1: 1,
    player2: 2,
    playerTurn: 1,
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    gameOver: false,
    message: '',
  }

  const gameReducer = (state,action) => { 
    switch(action.type)
    {
    case 'togglePlayer':
        return {
          ...state,
          playerTurn: action.nextPlayer,
        }
        case 'newGame':
        return {
          ...initialGameState
        }
        case 'gameEnd':
          {
            return{
              ...state,
              message: action.message,
          gameOver:true
            }
          }
          case 'draw':
            {
              return{
              ...state,
              message: action.message,
          gameOver:true
            }
          }
      }
  }
  
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )
  const play = (c) => { 
    if (!gameState.gameOver) {
    for (let r = 5; r >= 0; r--) {
      if (!gameState.board[r][c]) {
        gameState.board[r][c] = gameState.playerTurn
        break
       }
    }
    dispatchGameState({ type: 'togglePlayer', nextPlayer, board:gameState.board })

    function checkHorizontal(board) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r][c + 1] && 
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    }

    function checkVertical(board) {
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c] &&
                board[r][c] === board[r - 2][c] &&
                board[r][c] === board[r - 3][c]) {
              return board[r][c];    
            }
          }
        }
      }
    }
    
    function checkDiagonalLeft(board) {
      for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c - 1] &&
                board[r][c] === board[r - 2][c - 2] &&
                board[r][c] === board[r - 3][c - 3]) {
              return board[r][c];
            }
          }
        }
      }
    }

    function checkDiagonalRight(board) {
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r][c] === board[r - 2][c + 2] &&
                board[r][c] === board[r - 3][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    }

    function checkDraw(board) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c] === null) {
            return null;
          }
        }
      }
      return 'draw';    
    }
    
    function checkAll(board)
    {
return checkHorizontal(board)||checkVertical(board)||checkDiagonalLeft(board)||checkDiagonalRight(board)||checkDraw(board);
    }
    
    let result = checkAll(gameState.board);
      if (result === gameState.player1) {
        dispatchGameState({ type: 'gameEnd', message:"Player 1 wins"})
      } else if (result === gameState.player2) {
        dispatchGameState({ type: 'gameEnd', message:"Player 2 wins"})
      }  
      else if (result==='draw')
      {
        dispatchGameState({type:'draw',message:"Match Draw"})
      }
  }
}

  const nextPlayer =
  gameState.playerTurn === gameState.player1
    ? gameState.player2
    : gameState.player1

  return (
    <div className="App">
      <header className="App-header">
        Welcome to Connect4
      </header>
      <div style={{backgroundColor:"lightslategrey",color:"white"}}>
        Player {gameState.playerTurn} turn
        </div>
        <div><button className="btn" onClick={()=>dispatchGameState({ type: 'newGame'})}>New Game</button></div>
        <table>
          <thead>
          </thead>
          <tbody>
          {gameState.board.map((boardArray,rows)=>
          (
           <Row key={rows} boardArray={boardArray} play={play}/>
          ))}
          </tbody>
        </table>
        <div className="msg">{gameState.message}</div>
    </div>
  );
}

export default App;
