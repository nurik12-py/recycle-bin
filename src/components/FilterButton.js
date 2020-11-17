import React, { useState } from 'react';
import "./FilterButton.css";

import { ReactComponent as FunnelIcon } from '../assets/funnel.svg';

const FilterButton = ({ handleFilterClick }) => {
    const [isHidden, changeVisibilty] = useState(true);

    return (
        <div className="position-relative">
            <FunnelIcon onClick={() => changeVisibilty(!isHidden)} />
            <div style={{ display: isHidden ? "none" : "block" }} className="filter-options position-absolute shadow">
                <div onClick={() => handleFilterClick(-1)} className="filter-option">Все</div>
                <div onClick={() => handleFilterClick(2)} className="filter-option">Полный</div>
                <div onClick={() => handleFilterClick(1)} className="filter-option">Срений</div>
                <div onClick={() => handleFilterClick(0)} className="filter-option">Низкий</div>
            </div>
        </div>
    );
}

export default FilterButton;