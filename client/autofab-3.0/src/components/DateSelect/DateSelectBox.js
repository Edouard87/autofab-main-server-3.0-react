import React from "react"

class DateSelectBox extends React.Component {
    render() {
        return (
            <div style={this.props.selectedDate == this.props.day.raw ? {border: "1px solid black"} : {}} onClick={() => this.props.handleDateChange(this.props.day.raw)} className="selection-box time-selection">
                <span className="selection-box-text">{this.props.day.date}</span>
            </div>
        )
    }
}

export default DateSelectBox;