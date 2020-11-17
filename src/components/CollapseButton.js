import React from 'react';
import "./CollapseButton.css";
import { ReactComponent as CaretRightIcon } from '../assets/caret-right.svg';
import { ReactComponent as CaretLeftIcon } from '../assets/caret-left.svg';


const CollapseButton = ({ isHidden, handleCollapseClick }) => {
    return (
        <button onClick={() => handleCollapseClick()} className="position-absolute collapse-btn">
            {isHidden ? <CaretRightIcon /> : <CaretLeftIcon />}
        </button>
    );
}

export default CollapseButton;