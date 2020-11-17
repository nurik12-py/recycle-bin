import React, { Component } from 'react';
import "./Login.css";
class Login extends Component {
    state = {
        email: "",
        password: "",
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = () => {
        const data = this.state.email + this.state.password;
        localStorage.setItem("loginData", data);
        document.location.href = "/";
    }
    render() {
        return (
            <form className="form-signin text-center d-flex align-items-center justify-content-center flex-column">
                <h1 className="h3 mb-3 font-weight-normal">Войдите в систему</h1>
                <label htmlFor="inputEmail" className="sr-only">Username</label>
                <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    required={true}
                    autoFocus={true} />
                <label htmlFor="inputPassword" className="sr-only">Попроль
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control"
                    placeholder="Пороль"
                    onChange={this.handleInputChange}
                    required={true} />
                <button
                    onClick={this.handleSubmit}
                    className="btn btn-lg btn-primary btn-block"
                    type="button">Войти</button>
            </form>
        );
    }
}

export default Login;