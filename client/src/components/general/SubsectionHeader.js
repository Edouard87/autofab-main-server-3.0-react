import React from "react"

class SubsectionHeader extends React.Component {
    render() {
        return (
        <h2 className="field-header" style={{ fontSize: '22px', color: 'rgb(91,95,99)' }}>{this.props.children}</h2>
        )
    }
}
export default SubsectionHeader