import React from 'react';
import styled from "styled-components";

const Status = ({ percent }) => {
    const getColor = (level) => {
        if (level < 30) {
            return "#3DBB32";
        } else if (level < 50) {
            return "#FDA050";
        } else {
            return "#EE6D6F";
        }
    }
    const Status = styled.div`
        background-color: ${(props) => getColor(props.percent)};
        width: 15px;
        height: 15px;
        border-radius: 8px;
    `;

    return (
        <Status percent={percent} />
    );
}

export default Status;