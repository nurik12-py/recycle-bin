import React, { Component } from 'react';
import "./History.css";
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBox from '../components/SearchBox';
import { getLocations, getLogs } from '../services/mainService';
import Table from '../components/Table/Table';
import FilterButton from '../components/FilterButton';

class History extends Component {
    constructor(props) {
        super();
        const queriedPhoneNumber = props.match.params["id"];
        this.state = {
            locations: [],
            phoneNumber: queriedPhoneNumber,
            selectedLocation: null,
            filtered: [],
            queried: [],
            isSidebarHidden: true,
            isTableHidden: false,
            isModalShown: false,
        }
    }
    async componentDidMount() {
        const { data } = await getLocations();
        this.handleClick(this.state.phoneNumber);
        this.setState({ locations: data, filtered: data, queried: data });
    }
    handleClick = async (phoneNumber) => {
        const { data } = await getLogs(phoneNumber);
        this.props.history.push("/history/" + phoneNumber);
        this.setState({ selectedLocation: data, isModalShown: true });

    }
    handleModalClose = () => {
        this.setState({ isModalShown: false })
    }
    handleMenuClick = () => {
        this.setState({ isSidebarHidden: !this.state.isSidebarHidden });
    }
    handleCollapseClick = () => {
        this.setState({ isTableHidden: !this.state.isTableHidden });
    }
    handleFilterClick = (index) => {
        if (index === -1) {
            this.setState({ filtered: this.state.locations, queried: this.state.locations });
        } else {
            const filtered = this.state.locations.filter(location => location.status === index);
            this.setState({ filtered, queried: filtered });
        }
    }
    handleChange = (e) => {
        const queried = this.state.filtered.filter(location =>
            location.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        console.log(queried);
        this.setState({ queried });
        console.log("Text", e.target.value);
    }
    render() {
        return (
            <div className="h-100">
                <Navbar title={"История"} handleMenuClick={this.handleMenuClick} />
                <div className="d-flex" style={{ height: "calc(100vh - 60px)" }}>
                    <div className="d-flex">
                        <Sidebar isHidden={this.state.isSidebarHidden} />
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-12 p-0 border-right">
                        <div className="d-flex justify-content-center align-items-center mb-3 mt-3 container">
                            <SearchBox handleChange={this.handleChange} />
                            <FilterButton handleFilterClick={this.handleFilterClick} />
                        </div>
                        <div className="p-3">
                            <Table
                                locations={this.state.queried}
                                buttonText={"История"}
                                handleClick={this.handleClick}
                                buttonIcon={true} />
                        </div>
                    </div>
                    {this.state.selectedLocation &&
                        <div className="modal d-sm-none d-md-none" style={{ display: this.state.isModalShown ? "block" : "none" }} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                            <div className="modal-dialog" role="document">
                                {this.state.selectedLocation &&
                                    <div className="modal-content d-lg-none">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{this.state.selectedLocation.name}</h5>
                                            <button onClick={this.handleModalClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body vertical-scroll">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "10%" }} scope="col">#</th>
                                                        <th style={{ width: "90%" }} scope="col">Дата</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.selectedLocation.logs !== undefined && this.state.selectedLocation.logs.map((log, key) =>
                                                        <tr key={key}>
                                                            <th scope="row" >{key}</th>
                                                            <td>{new Date(log.loadingDate).toUTCString()} </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    <div className="col d-flex p-0 hide-in-sm">
                        <div className="col res-height vertical-scroll">
                            <div className="m-3 ">
                                {this.state.selectedLocation ?
                                    <div>
                                        <h2 className="text-center">{this.state.selectedLocation.name}</h2>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "10%" }} scope="col">#</th>
                                                    <th style={{ width: "90%" }} scope="col">Дата</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.selectedLocation.logs.length > 0 && this.state.selectedLocation.logs.map((log, key) =>
                                                    <tr key={key}>
                                                        <th scope="row" >{key}</th>
                                                        <td>{new Date(log.loadingDate).toUTCString()} </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <h2 className="text-center">Выберите адрес</h2>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div >);
    }
}

export default History;