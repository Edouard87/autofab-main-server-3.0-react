import React from "react"
import "../../css/Login-Form-Clean.css"
import axios from "axios"
import {Link, Redirect, useLocation} from "react-router-dom"
import {Alert, Button} from "react-bootstrap"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            passwordIncorrect: false,
        }
    }
    handleLoginFieldEdit = ev => {
        if (ev.target.name == "email") {
            this.setState({
                email: ev.target.value
            });
            return;
        }
        if (ev.target.name == "password") {
            this.setState({
                password: ev.target.value
            })
        }
    }
    handleLogin = ev => {
        // No need to bind anything as arrow uses global 'this'
        // data should have email + password
        // Remove the login thingy
        ev.preventDefault();
        this.setState({
            isLoading: true
        });
        // Get the auth token
        axios({
            method: 'post',
            url: "/auth/login",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            // Login was successful
            this.props.route('/');
        }).catch(err => {
            // Login was not successful
            this.setState({
                isLoading: false
            });
            if (err.response.status == 401) {
                // The password is incorrect
                return this.setState({
                    passwordIncorrect: true
                })
            }
            this.props.changeModal("ErrorMsg","An unknown error occured.")
        })
    }
    render() {
        return (<div className="login-clean">
            <Redirect to={this.props.redirect}/>
            <form method="post">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><span className="text-center" style={{ fontSize: '40px' }}>Autofab 3.0</span></div>
                <Alert style={this.state.passwordIncorrect ? { display: "block" } : { display: "none" }} variant="danger">Your username or password is incorrect. Please <Link to="#">reset your password</Link> if this is a mistake.</Alert>
                <div className="form-group"><input disabled={this.state.isLoading} value={this.state.email} onChange={this.handleLoginFieldEdit} className="form-control" type="email" name="email" placeholder="Email" /></div>
                <div className="form-group"><input disabled={this.state.isLoading} value={this.state.password} onChange={this.handleLoginFieldEdit} className="form-control" type="password" name="password" placeholder="Password" /></div>
                <div className="form-group">
                    <Button disabled={this.state.isLoading} onClick={this.handleLogin} variant="primary" block type="submit">{this.state.isLoading ? "Logging you in..." : "Log In"}</Button>
                    <Link style={this.state.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="btn btn-primary btn-block" type="submit">How do I get an Account?</Link>
                </div>
                <Link style={this.state.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="forgot" href="#">Forgot your email or password?</Link><br />
                <Link style={this.state.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="forgot" href="#">Login Help</Link>
            </form>
        </div>)
    }
}

export default Login