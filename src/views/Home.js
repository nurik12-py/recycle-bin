import React, { Component } from 'react';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { ReactComponent as TrashMiniIcon } from '../assets/trash-mini.svg';
import { ReactComponent as BatteryIcon } from '../assets/battery.svg';
import MiniTrash from "../components/MiniTrash";
import "./Home.css";
import Status from '../components/Status';

var mqtt = require("mqtt");

var options = {
    clientId: "01",
    username: "sasha.petrov.olx@gmail.com",
    password: "a6efcb63",
    protocol: "MQTT",
};

var client = mqtt.connect("mqtt://mqtt.dioty.co:8080", options);

function convert(level) {
    if (level < 10) {
        return "Пусто";
    } else if (level < 30) {
        return "Низкий";
    } else if (level < 50) {
        return "Средний";
    } else {
        return "Полный";
    }
}
function getColor(level) {
    if (level < 10) {
        return "#ffffff";
    } else if (level < 30) {
        return "#3DBB32";
    } else if (level < 50) {
        return "#FDA050";
    } else {
        return "#EE6D6F";
    }
}

class Redesign extends Component {
    state = {
        maxLevel: 357,
        isPoped: false,
        pointNames: ["Желтоқсан д.25", "Аль-Фараби д.1"],
        filtered: ["Желтоқсан д.25", "Аль-Фараби д.1"],
    }
    componentDidMount() {
        client.subscribe("/sasha.petrov.olx@gmail.com/out", (data) => {
            console.log("connection+");
        });
        client.subscribe("/sasha.petrov.olx@gmail.com/maxlevel", (data) => {
            console.log("connection+");
        });
        client.on("message", (topic, payload) => {
            console.log(topic);
            if (topic == "/sasha.petrov.olx@gmail.com/out") {
                const leftText = convert(parseInt(payload.toString().split(",")[0]) / this.state.maxLevel * 100);
                const centerText = convert(parseInt(payload.toString().split(",")[1]) / this.state.maxLevel * 100);
                const rightText = convert(parseInt(payload.toString().split(",")[2]) / this.state.maxLevel * 100);
                const left = parseInt(payload.toString().split(",")[0]);
                const center = parseInt(payload.toString().split(",")[1]);
                const right = parseInt(payload.toString().split(",")[2]);
                const battery = parseInt(payload.toString().split(",")[3]);
                if (!isNaN(battery)) {
                    this.setState({ battery, left, right, center, leftText, centerText, rightText });
                }
            } else if (topic == "/sasha.petrov.olx@gmail.com/maxlevel") {
                console.log(payload.toString());
                this.setState({ maxLevel: parseInt(payload.toString()) });
            }
        });
        client.on("error", (error) => {
            console.log("MQTT Error:", error);
        });
    }
    handleChange = (event) => {
        const filtered = this.state.pointNames.filter(pointName => pointName.toLowerCase().startsWith(event.target.value.toLowerCase()));
        this.setState({ filtered });
    }
    render() {
        return (
            <div className="d-flex">
                <div className="side-nav">
                    <svg width="1.75em" height="1.75em" viewBox="0 0 16 16" className="bi bi-house-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                </div>
                <div className="main">
                    <nav>
                        <p className="brand">Система контроля мусорных контейнеров </p>
                        <div className="d-flex center">
                            <div className="vertial-live"></div>
                            <p className="city-picker">г.Шымкент</p>
                        </div>
                    </nav>
                    <div className="sidenav">
                        <div className="d-flex center space">
                            <input placeholder="Поиск" onChange={this.handleChange} />
                        </div>
                        <div className="d-flex center">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="width-25">Статус</th>
                                        <th className="width-50">Адрес</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="d-flex center"><Status percent={(this.state.center + this.state.left + this.state.right) / 3 / this.state.maxLevel * 100} /> </td>
                                        <td>Уркумбаева д.35</td>
                                        <td className="text-right">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="d-flex center"><div className="status"></div></td>
                                        <td>"Желтоқсан д.25"</td>
                                        <td className="text-right">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                            <span></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="d-flex center"><div className="status2"></div></td>
                                        <td>Аль-Фараби д.1</td>
                                        <td className="text-right">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            </svg>
                                            <span></span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="map">

                        <div className="trash-round popup" style={{ backgroundColor: getColor((this.state.center + this.state.left + this.state.right) / 3 / this.state.maxLevel * 100) }} onClick={() => this.setState({ isPoped: !this.state.isPoped })}>
                            <TrashIcon />
                            {this.state.isPoped &&
                                <div className="popupcontent">
                                    <div className="popuptitle">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        <span style={{ paddingLeft: "14px" }}>ул. Уркумбаева, д. 35</span>
                                    </div>
                                    <div className="popupmain">
                                        <div className="popupmian-tile">
                                            <BatteryIcon />
                                            <div>{this.state.battery}%</div>
                                        </div>
                                        <div className="popupmian-tile">
                                            <MiniTrash percent={this.state.left / this.state.maxLevel * 100} />
                                            <div>{this.state.leftText} {this.state.left}см</div>
                                        </div>
                                        <div className="popupmian-tile">
                                            <MiniTrash percent={this.state.center / this.state.maxLevel * 100} />
                                            <div>{this.state.centerText} {this.state.center}см </div>
                                        </div>
                                        <div className="popupmian-tile">
                                            <MiniTrash percent={this.state.right / this.state.maxLevel * 100} />
                                            <div>{this.state.rightText} {this.state.right}см</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redesign;