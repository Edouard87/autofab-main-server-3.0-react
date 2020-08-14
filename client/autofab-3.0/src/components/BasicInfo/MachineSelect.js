import React from "react"
import MachineSelectBox from "./MachineSelectBox"
import axios from "axios";

class MachineSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            machines: [] // Array of all machines
        }
    }
    getData = () => {
        axios.get("/hardware/machines/view")
            .then(res => {
                this.setState({
                    machines: res.data
                })
                this.state.machines.map(machine => {
                    return (<MachineSelectBox machine={machine} />)
                })
            })

    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn != this.props.isLoggedIn) {
            this.getData();
        }
    }
    render() {
        return (<div className="selection-box-container">
                {this.state.machines.map(machine => {
                    return <MachineSelectBox selectedMachine={this.props.selectedMachine} handleMachineChange={this.props.handleMachineChange} key={machine._id} machine={machine} />
                })}
        </div>)
    }
}

export default MachineSelect