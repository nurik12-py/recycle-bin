import React, { Component } from 'react';
import "./Navbar.css";
import { getStatus } from '../../services/mainService';
import TrashCounter from './TrashCounter';
import { ReactComponent as BurgerIcon } from '../../assets/burger.svg';


class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {
            status: [0, 0, 0]
        }
    }
    async componentDidMount() {
        const { data } = await getStatus()
        this.setState({ status: data.status });
    }
    render() {
        return (
            <nav className="navbar navbar-light d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <BurgerIcon onClick={() => this.props.handleMenuClick()} />
                    <span className="navbar-brand  ml-3 mb-1 h2">{this.props.title}</span>
                </div>
                <div className="d-flex align-items-center">
                    <TrashCounter color={"#EE6D6F"} count={this.state.status[2]} />
                    <TrashCounter color={"#FDA050"} count={this.state.status[1]} />
                    <TrashCounter color={"#3DBB32"} count={this.state.status[0]} />
                    <span className="vertical-stick m-1"></span>
                    <span className="d-none d-lg-block ml-2">г. Шымкент</span>
                </div>
            </nav>
        );
    }
}


export default Navbar;