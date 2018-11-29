import React from 'react';
import './Square.css';

export default function Square(props) {

    return (
        <button onClick={props.onClick} className={props.className + ' square'}>
            {props.value}
        </button>
    );
}