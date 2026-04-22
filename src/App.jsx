import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function isValidIndex({ index, i })
{
  if (index === i)
    {return false;}
  if (index === 0 && (i === 1 || i === 3 || i === 4))
    {return true;}
  if (index === 1 && (i === 0 || i === 2 || i === 3 || i === 4 || i === 5))
    {return true;}
  if (index === 2 && (i === 1 || i === 4 || i ===5))
    {return true;}
  if (index === 3 && !(i === 2 || i === 5 || i === 8))
    {return true;}
  if (index === 4)
    {return true;}
  if (index === 5 && !(i === 0 || i === 3 || i === 6))
    {return true;}
  if (index === 6 && (i === 3 || i === 4 || i === 7))
    {return true;}
  if (index === 7 && !(i === 0 || i === 1 || i === 2))
    {return true;}
  if (index === 8 && (i === 4 || i === 5 || i === 7))
    {return true;}
  {return false;}
}

function Iterate(arr, squares)
{
  for (i in arr)
  {
    if (squares[i] === null)
      {return true;}
  }
}

function isNotSurrounded({i, squares})
{
  if (i === 0 && (squares[1] === null || squares[3] === null || squares[4] === null))
    {return true;}
  if (i === 1 && (squares[0] === null || squares[2] === null || squares[3] === null || squares[4] === null || squares[5] === null))
    {return true;}
  if (i === 2 && (squares[1] === null || squares[4] === null || squares[5] === null))
    {return true;}
  if (i === 3 && (squares[0] === null || squares[1] === null || squares[4] === null || squares[6] === null || squares[7] === null))
    {return true;}
  if (i === 4 && (squares[0] === null || squares[1] === null || squares[2] === null || squares[3] === null || squares[5] === null || squares[6] === null || squares[7] === null || squares[8] === null))
    {return true;}
  if (i === 5 && (squares[1] === null || squares[2] === null || squares[4] === null || squares[7] === null || squares[8] === null))
    {return true;}
  if (i === 6 && (squares[3] === null || squares[4] === null || squares[7] === null))
    {return true;}
  if (i === 7 && (squares[3] === null || squares[4] === null || squares[5] === null || squares[6] === null || squares[8] === null))
    {return true;}
  if (i === 8 && (squares[4] === null || squares[5] === null || squares[7] === null))
    {return true;}
  {return false;}
}

function Board({ squares, onPlay }) {
  const [turnCount, setTurnCount] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0)
  const [index, setIndex] = useState(-1);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] && turnCount < 3) {
      return;
    }
    const nextSquares = squares.slice();
    if (turnCount < 3)
    {
        if (xIsNext) {
        nextSquares[i] = 'X';
        setXIsNext(!xIsNext);
      } else {
        nextSquares[i] = 'O';
        setTurnCount(prev => prev + 1);
        setXIsNext(!xIsNext);
      }
    }
    else
    {
      if (xIsNext)
      {
        if (squares[i] === 'X' && moveCount === 0 && isNotSurrounded({i, squares}))
        {
          nextSquares[i] = null;
          setIndex(i);
          setMoveCount(prev => prev + 1);
        }
        else if (moveCount === 1 && !(squares[i]))
        {
          if (isValidIndex({index, i}))
          {
            nextSquares[i] = 'X';
            setMoveCount(0);
            setXIsNext(!xIsNext);
          }
        }
      }
      if (!xIsNext)
      {
        if (squares[i] === 'O' && moveCount === 0 && isNotSurrounded({i, squares}))
        {
          nextSquares[i] = null;
          setIndex(i);
          setMoveCount(prev => prev + 1);
        }
        else if (moveCount === 1 && !(squares[i]))
        {
          if (isValidIndex({index, i}))
          {
            nextSquares[i] = 'O';
            setMoveCount(0);
            setXIsNext(!xIsNext);
          }
        }
      }
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

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
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // function jumpTo(nextMove) {
  //   setCurrentMove(nextMove);
  // }

  // const moves = history.map((squares, move) => {
  //   let description;
  //   if (move > 0) {
  //     description = 'Go to move #' + move;
  //   } else {
  //     description = 'Go to game start';
  //   }
  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* <div className="game-info">
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
}

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
}

