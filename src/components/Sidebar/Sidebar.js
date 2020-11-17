import React from 'react';
import { ReactComponent as HomeFillIcon } from '../../assets/home-fill.svg';
import { ReactComponent as HistoryIcon } from '../../assets/history.svg';
import { ReactComponent as GearIcon } from '../../assets/gear.svg';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = ({ isHidden }) => {
    return (
        <div className={isHidden ? "d-none" : "d-flex sidebar flex-column align-items-center"} style={{ width: "60px", minWidth: "60px", background: "#2A52BB", color: "white" }}>
            <Link to="/">
                <HomeFillIcon />
            </Link>
            <Link to="/history">
                <HistoryIcon />
            </Link>
            <Link to="/settings">
                <GearIcon />
            </Link>
        </div>
    );
}

export default Sidebar;