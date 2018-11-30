import React, { Component } from 'react';
import './App.css';

import Board from './Board';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: 'asc',
      history: [{
        squares: Array(9).fill(null),
        nextPlayer: 'X',
        description: ''
      }],
      stepNumber: 0
    }
  }

  calculateWinner(squares) {
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
        return {
          player: squares[a],
          squares: lines[i]
        }
      }
    }
    return null;
  }


  handleClick(i) {
    const {stepNumber, history, sort} = this.state;
    let squares = history[stepNumber].squares.slice();
    const winner = this.calculateWinner(squares);

    if (squares[i] !== null || winner) {
      return;
    }

    squares[i] = history[stepNumber].nextPlayer;
    const description = squares[i] + this.getSquarePosition(i);
    const nextPlayer = history[stepNumber].nextPlayer === 'X' ? 'O' : 'X';

    this.setState({
        history: history.slice(0, stepNumber+1).concat([
          {
            squares: squares,
            nextPlayer: nextPlayer,
            description: description
          }
        ]),
        stepNumber: stepNumber + 1,
        sort: sort
    });
  }


  moveTo(idx) {
    this.setState({
      ...this.state,
      stepNumber: idx
    });
  }

  toggleHistorySort() {
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    this.setState({
      ...this.state,
      sort: sort
    });
  }

  // get (col, row) position string from square index
  getSquarePosition(squareIdx) {
    let col = (squareIdx % 3) + 1;
    let row = Math.floor(squareIdx/3) + 1;
    return '(' + col + ',' + row + ')';
  }

  render() {
    const {stepNumber, history, sort} = this.state;
    const squares = history[stepNumber].squares;
    const winner = this.calculateWinner(squares);
    const highLightSquares = winner ? winner.squares : [];

    let status = '';
    if (winner) {
        status = 'Winner: ' + winner.player;
    } else if (stepNumber < 9){
        status = 'Next player: ' + history[stepNumber].nextPlayer;
    } else {
        status = 'Result being a draw';
    }

    return (
      <div className="game">
          <Board
            className="board"
            squares={squares}
            onClick={this.handleClick.bind(this)}
            highLight={highLightSquares}
          />
          <div className="history">
            <div>{status}</div>
            <button onClick={this.toggleHistorySort.bind(this)}>
              Change to {sort === 'asc' ? 'descending' : 'ascending'} order
            </button>
            <ol>
              {

                history.map((value, index) => {
                  const idx = sort === 'asc' ? index : history.length - index - 1;
                  const classes = idx === stepNumber ? 'bold' : '';
                  return <li key={idx} className={classes}>
                        <button onClick={() => this.moveTo(idx)}>
                            {(idx === 0) ? 'Game start' : 'move #' + idx + ' - ' + history[idx].description}
                        </button>
                    </li>
                })
              }
            </ol>
          </div>
      </div>
    );
  }
}

export default App;
