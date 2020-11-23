import React from 'react';
import { ReactComponent as CursorIcon } from '../../assets/cursor.svg';
import StatusIndicator from './StatusIndicator';
import "./Table.css";

const Table = ({ handleClick, locations, buttonIcon, buttonText, passLocation }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th style={{ width: "5%" }} scope="col">Статус</th>
                    <th style={{ width: "70%" }} scope="col">Адрес</th>
                    <th style={{ width: "35%" }} scope="col"></th>
                </tr>
            </thead>
            <tbody className="vertical-scroll">
                {locations && locations.map(location =>
                    <tr className="" key={location._id}>
                        <td className="d-flex justify-content-center align-content-center"><StatusIndicator percent={location.status} /></td>
                        <td>{location.name}</td>
                        <td onClick={() => handleClick(passLocation ? [location.lon, location.lat] : location.phoneNumber)}>
                            {buttonIcon ? <button className="btn btn-sm btn-primary">{buttonText}</button> : <div className="d-flex justify-content-center align-items-center on-map-text"><CursorIcon /><p className="m-0" style={{ fontSize: "14px" }}>на карте</p></div>}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;