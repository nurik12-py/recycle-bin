import React, { Component } from 'react';
import "./Home.css";

import YandexMap from '../components/Map/YandexMap';
import SearchBox from '../components/SearchBox';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Table from '../components/Table/Table';
import { getLocations } from '../services/mainService';
import CollapseButton from '../components/CollapseButton';
import FilterButton from '../components/FilterButton';


class Redesign extends Component {
    state = {
        zoom: 12,
        locations: [],
        filtered: [],
        queried: [],
        isSidebarHidden: true,
        isTableHidden: false
    }
    async componentDidMount() {
        const { data } = await getLocations();
        this.setState({ locations: data, filtered: data, queried: data });
    }
    handleCordinate = (coordinates) => {
        console.log(coordinates, this.state.zoom);
        this.setState({ mapCenterCordinates: coordinates, zoom: 15, isTableHidden: !this.state.isTableHidden });
    }
    handleMenuClick = () => {
        this.setState({ isSidebarHidden: !this.state.isSidebarHidden });
    }
    handleCollapseClick = () => {
        console.log("Clicked");
        this.setState({ isTableHidden: !this.state.isTableHidden });
    }
    handleFilterClick = (index) => {
        if (index === -1) {
            this.setState({ filtered: this.state.locations, queried: this.state.locations });
        } else {
            const filtered = this.state.locations.filter(location => location.status === index);
            this.setState({ filtered, queried: filtered });
            console.log("Filter clicked", index);
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
                <Navbar title={"Главная"} handleMenuClick={this.handleMenuClick} />
                <div className="d-flex" style={{ height: "calc(100vh - 60px)" }}>
                    <div className="d-flex w-100">
                        <Sidebar isHidden={this.state.isSidebarHidden} />
                        <div className="w-100 d-flex p-0">
                            <div className={`p-0 border-right position-fixed bg-white z-index-9 h-100 ${!this.state.isTableHidden ? "res-width" : "w-0"}`}>
                                <div className="position-relative bg-white">
                                    <div className={this.state.isTableHidden ? "d-none" : ""}>
                                        <div className="d-flex justify-content-center align-items-center mb-3 mt-3 container">
                                            <SearchBox handleChange={this.handleChange} />
                                            <FilterButton handleFilterClick={this.handleFilterClick} />
                                        </div>
                                        <div className="p-3">
                                            <Table
                                                locations={this.state.queried}
                                                handleClick={this.handleCordinate}
                                                passLocation={true} />
                                        </div>
                                    </div>
                                    <CollapseButton handleCollapseClick={this.handleCollapseClick} isHidden={this.state.isTableHidden} />
                                </div>
                            </div>
                            <div className="col p-0">
                                <YandexMap
                                    mapCenterCordinates={this.state.mapCenterCordinates}
                                    zoom={this.state.zoom}
                                    locations={this.state.locations} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Redesign;