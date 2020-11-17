import React from 'react';
import "./TrashCounter.css";
import styled from "styled-components";

const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 22px;
    height: 22px;
    color: #fff;
    font-size: 16px;
    border-radius: 50%;
    background: ${props => props.color};
    border: 2px solid #f0f0f0;
    bottom: -8px;
    right: -8px;
`;

const TrashCounter = ({ color, count }) => {
    return (
        <div className="trash-counter">
            <Circle color={color}>{count}</Circle>
        </div>
    );
}

export default TrashCounter;