import React from "react"
import moment from "moment"

class TimeSelectBox extends React.Component {
    render() {
        return (
            <div style={this.props.selectedBlocks.includes(this.props.index) || this.props.selectedBlocks.length == 0 ? {border: "1px solid black"} : {border: "1px dotted black"}} onClick={() => {this.props.handleBlocksChange(this.props.index)}} className="selection-box time-selection"><span className="text-center selection-box-text" style={{ height: "auto" }}>{moment(this.props.display.start, "x").format("hh:mm A")} to {moment(this.props.display.end, "x").format("hh:mm A")}</span></div>
        );
    }
}

export default TimeSelectBox;