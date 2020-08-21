import React from "react"

class MachineSelectBox extends React.Component {
    render() {
        return (
            <div style={this.props.selectedMachine === this.props.machine._id ? {border: "1px solid black"} : {}} onClick={() => {this.props.handleMachineChange(this.props.machine._id)}} className="selection-box">
                <span className="selection-box-text">{this.props.machine.name}</span>
            </div>
        )
    }
}

export default MachineSelectBox;