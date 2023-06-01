import { useState } from 'react'; /**This line imports the useState hook from the 'react' package, which allows functional 
components in React to manage state.*/

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
} /**This is a functional component called Square that represents a square on the game board. It receives two props, 
value and onSquareClick, and returns a button element with the value as its content. The onSquareClick function is 
triggered when the button is clicked.*/

function Board({ xIsNext, squares, onPlay }) { /**This is another functional component called Board that represents 
the game board. It receives three props, xIsNext, squares, and onPlay.*/
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); //The slice() method extracts a portion of an array or string.
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  } /**This is a function called handleClick that is responsible for handling the click event on a square. It checks if there 
  is already a winner or if the square is already filled. If not, it creates a copy of the squares array, updates the clicked 
  square with 'X' or 'O' based on xIsNext, and calls the onPlay function with the updated nextSquares.*/

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  } /**This code determines the current status of the game by calling the calculateWinner function with the squares array.
   If there is a winner, it sets the status variable to indicate the winner. Otherwise, it sets the status variable to 
   indicate the next player's turn.*/

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
} /**This code renders the game board JSX. It displays the status of the game, and then renders 9 squares using the Square component.
 Each square is given a value from the squares array and an onSquareClick function that triggers handleClick with the appropriate index.*/

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; /**This is the Game component, which represents the overall game. It uses the useState hook 
  to define and initialize state variables. history is an array that holds the history of the game moves, starting with an initial array of 
  9 null values. currentMove represents the index of the current move, and xIsNext is a boolean that determines if 'X' is the next player. 
  currentSquares retrieves the current state of the game board from the history array based on currentMove. */

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  } /**This function handlePlay is called when a move is made. It receives the updated nextSquares and creates a new 
  nextHistory array by copying the previous history up to the current move index and appending the nextSquares. It then 
  updates the state variables history and currentMove with the new values.*/

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  } /**This function jumpTo is called when a move in the history is clicked. It sets the currentMove state variable to 
  the selected move index, effectively changing the current state of the game.*/

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }); /**This code generates a list of moves in the game history. It maps over the history array and creates an <li> element for
   each move. If the move index is greater than 0, it sets the description to 'Go to move #X', where X is the move index. Otherwise,
    it sets the description to 'Go to game start'. Each move is rendered as a button that triggers the jumpTo function with the 
    corresponding move index when clicked.*/

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
} /**Finally, the Game component returns the JSX that represents the game. It renders the game board by passing the relevant props
 to the Board component. It also renders the list of moves generated earlier within an <ol> element.*/

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
} /**This is a helper function called calculateWinner that determines the winner of the game. 
It checks all possible winning combinations defined in the lines array against the squares array.
 If there is a winner, it returns the winning symbol ('X' or 'O'). If there is no winner, it returns null.*/
