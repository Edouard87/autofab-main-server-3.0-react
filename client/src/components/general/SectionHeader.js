import React from "react"

class SectionHeader extends React.Component {
    render() {
        return (
            <h1 className="section-header">{this.props.children}</h1>
        )
    }
}

export default SectionHeader