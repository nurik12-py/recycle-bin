import React from 'react';
import { ReactComponent as CursorIcon } from '../../assets/cursor.svg';
import StatusIndicator from './StatusIndicator';
import "./Table.css";

const Table = ({ handleClick, locations, buttonIcon, buttonText, passLocation }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th style={{ width: "10%" }} scope="col">Статус</th>
                    <th style={{ width: "80%" }} scope="col">Адрес</th>
                    <th style={{ width: "10%" }} scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {locations && locations.map(location =>
                    <tr key={location._id}>
                        <td><StatusIndicator percent={location.status} /></td>
                        <td>{location.name}</td>
                        <td onClick={() => handleClick(passLocation ? [location.lon, location.lat] : location.phoneNumber)}>
                            {buttonIcon ? <button className="btn btn-sm btn-primary">{buttonText}</button> : <CursorIcon />}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;