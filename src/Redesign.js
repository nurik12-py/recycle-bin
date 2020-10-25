import React, { Component } from 'react';
import {ReactComponent as TrashIcon} from './assets/trash.svg';
import {ReactComponent as TrashMiniIcon} from './assets/trash-mini.svg';
import {ReactComponent as BatteryIcon} from './assets/battery.svg';
import "./Redesign.css";

var mqtt = require("mqtt");

var options = {
  clientId: "01",
  username: "sasha.petrov.olx@gmail.com",
  password: "a6efcb63",
  protocol: "MQTT",
};

var client = mqtt.connect("mqtt://mqtt.dioty.co:8080", options);

function convert(level) {
    if(level > 90) {
        return "Полный";
    } else if(level > 50) {
        return "Средний";
    } else if (level > 33){
        return "Низкий";
    } else {
        return "Пусто";
    }
}

class Redesign extends Component {
    state = {  }
    componentDidMount() {
        client.subscribe("/sasha.petrov.olx@gmail.com/out", (data) => {
          console.log("connection+");
        });
        client.on("message", (topic, payload) => {
            const left = convert(parseInt(payload.toString().split(",")[0])/357*100);
            const center = convert(parseInt(payload.toString().split(",")[1])/357*100);
            const right = convert(parseInt(payload.toString().split(",")[2])/357*100);
            const battery = parseInt(payload.toString().split(",")[3]);
            if(!isNaN(battery)) {
                this.setState({battery, left, right, center});
            }
        });
        client.on("error", (error) => {
          console.log("MQTT Error:", error);
        });
      }
    render() { 
        return ( 
        <div className="d-flex">
            <div className="side-nav">
            <svg width="1.75em" height="1.75em" viewBox="0 0 16 16" class="bi bi-house-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
            
            </div>
            <div className="main">
                <nav>
                    <p className="brand">Система контроля мусорных контейнеров </p>
                    <div className="d-flex center">
                        <TrashIcon />
                        <TrashIcon />
                        <TrashIcon />
                        <div className="vertial-live"></div>
                        <p className="city-picker">г.Шымкент</p>
                    </div>
                </nav>
                <div className="sidenav">
                    <div className="d-flex center space">
                        <input placeholder="Поиск"/>
                        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                        </svg>                    
                </div>
                <div className="d-flex center">
                <table>
                <tr>
                    <th className="width-25">Статус</th>
                    <th className="width-25">Адрес</th>
                </tr>
                <tr>
                    <td className="d-flex center"><div className="status"></div> </td>
                    <td>Уркумбаева д.35</td>
                    <td className="text-right">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    <span>на карте</span>
                    
                    </td>
                </tr>


                </table>
                </div>
                </div>
                <div className="map">
                    <div className="trash-round popup" onclick="myFunction()">
                        <TrashIcon />
                        {this.state.battery &&
                        <div className="popupcontent">
                            <div className="popuptitle"> 
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt-fill" fill="#0466c8" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <span style={{paddingLeft: "14px"}}>ул. Уркумбаева, д. 35</span>
                            </div>
                            <div className="popupmain">
                                <div className="popupmian-tile">
                                    <BatteryIcon />
                                <div>{this.state.battery}%</div>
                                </div>
                                <div className="popupmian-tile">
                                    <TrashMiniIcon />
                                <div>{this.state.left}</div>
                                </div>
                                <div className="popupmian-tile">
                                    <TrashMiniIcon />
                                <div>{this.state.center}</div>
                                </div>
                                <div className="popupmian-tile">
                                    <TrashMiniIcon />
                                <div>{this.state.right}</div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>        
        );
    }
}
 
export default Redesign;