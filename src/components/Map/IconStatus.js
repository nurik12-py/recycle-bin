import React from 'react';
import { ReactComponent as TrashBinIcon } from '../../assets/trash.svg';
import { ReactComponent as BatteryIcon } from '../../assets/battery.svg';

const IconStatus = ({ percent, iconName, reverse }) => {
    const getColor = (level) => {
        if (level === 0) {
            return "#3DBB32";
        } else if (level === 1) {
            return "#FDA050";
        } else {
            return "#EE6D6F";
        }
    }
    const getReversedColor = (percent) => {
        if (percent === 0) {
            return "#3DBB32";
        } else if (percent === 1) {
            return "#FDA050";
        } else {
            return "#EE6D6F";
        }
    }
    const getIcon = (iconName) => {
        if (iconName === "trash") {
            return <TrashBinIcon />
        } else if (iconName === "battery") {
            return <BatteryIcon />
        } else {
            return "No icon";
        }
    }
    return (
        <div style={{ color: reverse ? getReversedColor(percent) : getColor(percent) }}>
            {getIcon(iconName)}
        </div>
    );
}

export default IconStatus;