import React from "react";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

class Nav extends React.Component {
    render() {
        return (
            <Navbar variant="light" expand="lg" className="text-uppercase" id="mainNav" style={{ backgroundColor: '#d00017' }}>
                <Container><Navbar.Brand>Autofab 3.0</Navbar.Brand><Navbar.Toggle data-toggle="collapse" data-target="#navbarResponsive" className="text-white navbar-toggler-right text-uppercase text-white rounded" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" /></Navbar.Toggle>
                    <Navbar.Collapse className="collapse navbar-collapse" id="navbarResponsive">
                        <div className="ml-auto">
                            <Container>
                                <div className="row">
                                    <div className="col text-center"><span className="text-center" style={{ color: 'rgb(255,255,255)', fontSize: '28px' }}>ADMIN</span></div>
                                </div>
                                <div className="row">
                                    <div className="col text-center"><span style={{ color: 'rgb(255,255,255)' }}>Log &nbsp;Out</span></div>
                                    <div className="col text-center my-auto" style={{ verticalAlign: 'middle' }}><span style={{ color: 'rgb(255,255,255)' }}>Admin Panel</span></div>
                                </div>
                            </Container>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Nav