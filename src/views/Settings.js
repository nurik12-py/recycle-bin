import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import SearchBox from '../components/SearchBox';
import { getLocation, getLocations, postLocation, updateLocation } from '../services/mainService';
import Table from '../components/Table/Table';
import FilterButton from '../components/FilterButton';
import YandexMap from '../components/Map/YandexMap';
import SettingsYandexMap from '../components/Map/SettingsYandexMap';

class Settings extends Component {

    state = {
        mapCenterCordinates: [42.318329, 69.596277],
        zoom: 12,
        filtered: [],
        queried: [],
        locations: [],
        isSidebarHidden: true,
        isTableHidden: false,
        isModalShown: false,
        isCreateMode: false
    }


    async componentDidMount() {
        const { data } = await getLocations();
        this.setState({ locations: data, filtered: data, queried: data });
    }

    handleClick = async (phoneNumber) => {
        const { data } = await getLocation(phoneNumber);
        this.setState({ location: data, phoneNumber: data.phoneNumber, isCreateMode: false });
    }

    handleUpdate = async (event) => {
        event.preventDefault();
        await updateLocation(this.state.location.phoneNumber, this.state.location);
        document.location.pathname = "/settings";
    }

    handleCreate = async (event) => {
        event.preventDefault();
        await postLocation(this.state.location);
        document.location.pathname = "/settings";

    }

    handleModalClose = () => {
        this.setState({ isModalShown: false })
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


    handleFormInputChange = (e) => {
        const location = this.state.location && { ...this.state.location };
        location[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ location });
    }
    handleMapCoords = (coords) => {
        const location = { ...this.state.location };
        location.lat = coords[1];
        location.lon = coords[0];
        console.log("Clicked");
        this.setState({ location });
    }
    handleCreateMode = () => {
        const location = {
            name: "",
            lon: 42,
            lat: 69,
            phoneNumber: ""
        }
        this.setState({ isCreateMode: true, location });
    }
    render() {
        return (
            <div className="h-100">
                <Navbar title={"Настройка"} handleMenuClick={this.handleMenuClick} />
                <div className="d-flex" style={{ height: "calc(100vh - 60px)" }}>
                    <div class="d-flex w-100">
                        <Sidebar isHidden={this.state.isSidebarHidden} />
                        <div className="w-100 d-lg-flex p-0">
                            <div className="col-12 col-lg-3 p-0 border-right">
                                <div class="d-flex justify-content-center align-items-center mb-3 mt-3 container">
                                    <SearchBox handleChange={this.handleChange} />
                                    <FilterButton handleFilterClick={this.handleFilterClick} />
                                </div>
                                <div className="pl-3 pr-3 d-flex justify-content-end">
                                    <button onClick={this.handleCreateMode} className="btn btn-sm btn-outline-primary">Создать</button>
                                </div>
                                <div className="p-3">
                                    <Table locations={this.state.queried} buttonText={"Изменить"} handleClick={this.handleClick} buttonIcon={true} />
                                </div>
                            </div>
                            <div className="w-100 p-lg-3 d-flex">
                                <div className="col-6 border d-none d-lg-block p-0">
                                    <SettingsYandexMap getOnClickCoords={this.handleMapCoords} zoom={this.state.zoom} location={this.state.location} />
                                </div>
                                {this.state.location &&
                                    <form className="col-12 col-lg-6 pb-3">
                                        <h3 className="text-center">Данные</h3>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput">Имя</label>
                                            <input type="text"
                                                class="form-control"
                                                id="formGroupExampleInput"
                                                onChange={this.handleFormInputChange}
                                                name="name"
                                                value={this.state.location.name}
                                                placeholder="Имя"
                                                required="true"

                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput">Lon</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="formGroupExampleInput"
                                                placeholder="Lon"
                                                name="lon"
                                                onChange={this.handleFormInputChange}
                                                value={this.state.location.lon}
                                                required="true"

                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput">Lat</label>
                                            <input type="text"
                                                class="form-control"
                                                id="formGroupExampleInput"
                                                placeholder="Lat"
                                                name="lat"
                                                onChange={this.handleFormInputChange}
                                                value={this.state.location.lat}
                                                required="true"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="formGroupExampleInput2">Телефон номер</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="formGroupExampleInput2"
                                                placeholder="Телефон номер"
                                                name="phoneNumber"
                                                onChange={this.handleFormInputChange}
                                                value={this.state.location.phoneNumber}
                                                required="true"

                                            />
                                        </div>
                                        {!this.state.isCreateMode ?
                                            <button onClick={this.handleUpdate} className="btn btn-primary">Сохранить</button> :
                                            <button onClick={this.handleCreate} className="btn btn-success ml-2">Добавить</button>}
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;