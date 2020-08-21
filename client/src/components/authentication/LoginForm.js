import React from "react"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class LoginForm extends React.Component {
    render() {
        return (<Modal
                show={!this.props.isLoggedIn}
                backdrop="static"
                keyboard={false}>
            <Modal.Header>
                <Modal.Title><Spinner
                    style={this.props.isLoading ? { display: "inline-block" } : { display: "none" }}
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />Please Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-clean">
                    <form method="post">
                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration"><span className="text-center" style={{ fontSize: '40px' }}>Autofab 3.0</span></div>
                        <Alert style={this.props.passwordIncorrect ? {display: "block"} : {display: "none"}} variant="danger">Your username or password is incorrect. Please <Link to="#">reset your password</Link> if this is a mistake.</Alert>
                        <div className="form-group"><input disabled={this.props.isLoading} value={this.props.email} onChange={this.props.handleLoginFieldEdit} className="form-control" type="email" name="email" placeholder="Email" /></div>
                        <div className="form-group"><input disabled={this.props.isLoading} value={this.props.password} onChange={this.props.handleLoginFieldEdit} className="form-control" type="password" name="password" placeholder="Password" /></div>
                        <div className="form-group">
                            <Button disabled={this.props.isLoading} onClick={this.props.handleLogin} variant="primary" block type="submit">{this.props.isLoading ? "Logging you in..." : "Log In"}</Button>
                            <Link style={this.props.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="btn btn-primary btn-block" type="submit">How do I get an Account?</Link>
                        </div>
                        <Link style={this.props.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="forgot" href="#">Forgot your email or password?</Link><br/>
                        <Link style={this.props.isLoading ? { pointerEvents: 'none' } : {}} to="#" className="forgot" href="#">Login Help</Link>
                    </form>
                </div>
            </Modal.Body>
        </Modal>)
    }
}

export default LoginForm