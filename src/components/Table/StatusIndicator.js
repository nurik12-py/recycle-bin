import React from 'react';
import styled from "styled-components";

const getColor = (level) => {
    if (level === 0) {
        return "#3DBB32";
    } else if (level === 1) {
        return "#FDA050";
    } else {
        return "#EE6D6F";
    }
}

const Status = styled.div`
    display: inline-block;
    background-color: ${(props) => getColor(props.percent)};
    width: 15px;
    height: 15px;
    border-radius: 8px;
`;

const StatusIndicator = ({ percent }) => {
    return (
        <Status percent={percent} />
    );
}

export default StatusIndicator;