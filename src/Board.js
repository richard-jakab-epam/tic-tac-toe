import React from 'react';
import classnames from 'classnames';
import Square from './Square';
import './Board.css';

export default function Board(props) {
    return (
        <div className="board">
        {
            props.squares.map((value, index) => {
                const classes = classnames({
                    bold: props.highLight.indexOf(index) !== -1
                });
                return <Square
                    key={index}
                    value={value}
                    className={classes}
                    onClick={() => props.onClick(index)}/>
            })
        }
        </div>
    )
}