import React from "react"
import {Redirect} from "react-router-dom"

class ServerError extends React.Component {
    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>server error</title>
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="assets/fonts/font-awesome.min.css" />
                <link rel="stylesheet" href="assets/css/styles.css" />
                <div className="jumbotron" style={{ backgroundColor: 'rgb(133,27,25)', borderRadius: 0 }}>
                    <h1 style={{ color: 'white' }}><i className="fa fa-times p-4" />You had one Job!</h1>
                    <p style={{ color: 'white' }}>We we know –– sorry! Whatever you were doing that got you to this page probably didn't work. If the issue persists, please contact your administrator to inform them as soon as possible.</p>
                </div>
                <Redirect to={this.props.redirect}/>
            </div>)
    }
}

export default ServerError