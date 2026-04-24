import { useState } from 'react';

const validMove = 
{
  0: [1, 3, 4],
  1: [0, 2, 3, 4, 5],
  2: [1, 4, 5],
  3: [0, 1, 4, 6, 7],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [1, 2, 4, 7, 8],
  6: [3, 4, 7],
  7: [3, 4, 5, 6, 8],
  8: [4, 5, 7]
}

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
  const temp = validMove[index].find(elem => elem === i);
  if (temp != undefined)
    {return true};
  return false;
}

function winningMove({i, squares, player})
{
  const temp = validMove[i].map(val => {
    const nextSquares = squares.slice();
    if (!(nextSquares[val]))
      {nextSquares[val] = player;}
    if (calculateWinner(nextSquares) === player)
    {
      return true;
    }
    else
    {
      return false;
    }
  })
  const temp2 = temp.find(elem => elem === true);
  if (temp2 === true)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function isNotSurrounded({i, squares})
{
  const temp = validMove[i].map(val => squares[val])
  const temp2 = temp.find(elem => elem === null);
  if (temp2 === null)
    {return true;}
  else
    {return false;}
}

function Board({ squares, onPlay }) {
  const [turnCount, setTurnCount] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0)
  const [center, setCenter] = useState(0);
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
          const player = 'X';
          if (squares[4] === 'X' && !(i === 4 || winningMove({i, squares, player})))
          {
            return;
          }
          nextSquares[i] = null;
          setIndex(i);
          setMoveCount(prev => prev + 1);
        }
        else if (moveCount === 1 && !(squares[i]))
        {
          if (isValidIndex({index, i}))
          {
            if (squares[4] === 'X')
            {
              nextSquares[i] = 'X';
              if (calculateWinner(nextSquares) != 'X')
              {
                return;
              }
            }
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
          const player = 'O';
          if (squares[4] === 'O' && !(i === 4 || winningMove({i, squares, player})))
          {
            return;
          }
          nextSquares[i] = null;
          setIndex(i);
          setMoveCount(prev => prev + 1);
        }
        else if (moveCount === 1 && !(squares[i]))
        {
          if (isValidIndex({index, i}))
          {
            if (squares[4] === 'O')
            {
              nextSquares[i] = 'O';
              if (calculateWinner(nextSquares) != 'O')
              {
                return;
              }
            }
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
  } 
  else {
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

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </div>
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

