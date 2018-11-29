import React from 'react';
import Square from './Square';
import './Board.css';

export default function Board(props) {
    return (
        <div className="board">
        {
            props.squares.map((value, index) => {
                const className =  props.highLight.indexOf(index) !== -1 ? 'bold' : '';
                return <Square
                    key={index}
                    value={value}
                    className={className}
                    onClick={() => props.onClick(index)}/>
            })
        }
        </div>
    )
}