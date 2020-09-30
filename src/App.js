import React from "react";
import "./App.css";
import styled from "styled-components";
import Loading from "./Loading";
var mqtt = require("mqtt");

var options = {
  clientId: "01",
  username: "sasha.petrov.olx@gmail.com",
  password: "a6efcb63",
  protocol: "MQTT",
};

var client = mqtt.connect("mqtt://mqtt.dioty.co:8080", options);

const Status = styled.div`
  background: ${(props) => getGreenToRed(props.height)};
  width: 100px;
  height: ${(props) => props.height > 18 && props.height + "%"};
  z-index: 1;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 600;
  &:after {
    content: "${(props) => 357 - props.sm}см";
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const getGreenToRed = (percent) => {
  const r = (255 * percent) / 100;
  const g = 255 - (255 * percent) / 100;
  return "rgb(" + r + "," + g + ",0)";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    client.subscribe("/sasha.petrov.olx@gmail.com/out", (data) => {
      this.setState({ isLaoding: false });
      console.log("connection+");
    });
    client.on("message", (topic, payload) => {
      var height = (parseInt(payload.toString().split(":")[1]) / 27) * 100;
      console.log(height);
      if (!isNaN(height)) {
        this.setState({
          height: Math.floor(height),
          sm: 357 - parseInt(payload.toString().split(":")[1]),
        });
      }
    });
    client.on("error", (error) => {
      console.log("MQTT Error:", error);
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Trash #1</h1>
        <div className="trash">
          {!this.state.isLaoding ? (
            <Status height={this.state.height} sm={this.state.sm} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}

export default App;
