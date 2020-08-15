import React from "react"
import BasicInfo from "./BasicInfo/BasicInfo"
import TimeSelect from "./TimeSelect/TimeSelect"
import SubmitButton from "./general/SubmitButton"
import DateSelect from "./DateSelect/DateSelect"
import ValidationError from "./errors/ValidationError"
import Submitting from "./general/Submitting"
import axios from "axios"
import ErrorMsg from "./general/ErrorMsg"
import LoginForm from "./authentication/LoginForm"
import {Redirect} from "react-router-dom";

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machine: null,
            blocks: [],
            date: null,
            justification: null,
            validationError: false,
            isLoading: false,
            isError: false,
            isLoggedIn: true, // Starts out as true to make the dialogue nicer
            errorMessage: "",
            isLoggedIn: true,
            email: "",
            password: "",
            passwordIncorrect: false,
            isSubmitting: false,
            redirect: ""
        }
        this.handleMachineChange = this.handleMachineChange.bind(this);
        this.handleBlocksChange = this.handleBlocksChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeValidationErr = this.closeValidationErr.bind(this);
    }
    closeValidationErr() {
        this.setState({
            validationError: false
        })
    }
    showValidationErr = () => {
        this.setState({
            validationError: true
        })
    }
    closeErrorMenu = () => {
        this.setState({
            isError: false,
            errorMessage: ""
        })
    }
    handleSubmit() {
        // Validate
        if (this.state.machine == null || this.state.blocks.length == 0 || this.state.date == null || this.state.justification == null) {
            this.showValidationErr();
            return;
        }
        // Submit
        this.setState({
            isSubmitting: true
        });
        axios({
            method: 'post',
            url: '/res/new',
            data: {
                machine: this.state.machine,
                blocks: this.state.blocks,
                date: this.state.date,
                description: this.state.justification
            }
        }).then(res => {
            // Lift the reservation information to state
            // Reset the state back to normal
            // this.props.getReservationConfirmation({
            //     machine: this.state.machine,
            //     date: this.state.date,
            //     blocks: [],
            //     description: this.state.description
            // });
            this.setState({
                redirect: "/confirmation"
            });
        }).catch(err => {
            /* 
             * The error is most likely because there was a conflict.
             * There is most likely a conflict.
             * Note that conflicts should never occur as it should not even
             * be possible to make a conflcting reservation.
             */
            this.setState({
                isSubmitting: false,
                isError: true,
                errorMessage: "An error occured. Your reservation could not be completed. Please try again later or consult the help documentation."
            })
        });
    }
    handleChange(ev) {
        // Change the state based on the justificaton
        // console.log("justification set to: " + text)
        console.log("clicked!")
        console.log(ev);
        this.setState({
            ...this.state,
            justification: ev.target.value
        })
    }
    handleMachineChange(_id) {
        this.setState({
            ...this.state,
            machine: _id
        })
        console.log(this.state.machine)
        // console.log(_id);
    }
    /**
     * Handles updating the time slots. Note that it must also check to
     * make sure that time slots are sequential. Time slots must be consecutive,
     * with one taking place after the other.
     */
    handleBlocksChange(index) {
        let blocks = this.state.blocks;
        if (blocks === null) {
            blocks = [];
        }
        if (blocks.includes(index)) { // Toggle the selected index from selected to unselected
            for (let i = 0; i < blocks.length; i++) { // Removes the target index in O(n) time
                let val = blocks[i];
                if (val === index) {
                    // We have found the value
                    // Note that the following exsists ensure that
                    // the proper behaviour is observed. What is desired is that all blocks
                    // to the right should be removed if the first time slot is selected.
                    if (i === 0) {
                        blocks.shift();
                    } else {
                        blocks.splice(i, blocks.length); // Delete everything in the array from that point onwards
                    }
                }
            }
        } else { // Add the block to the array
            if (blocks.length != 0) { // NaN will be produced if there is less than 3 elements
                // Determine what are the maximum and minimum indices that should be removed
                // Note that these are possible because the array of time slots is sorted from least to greatest
                let upperBound = blocks[blocks.length - 1] + 1;
                let lowerBound = blocks[0] - 1;
                if (lowerBound < 0) {
                    lowerBound = 0;
                };
                // Compare the requested value to the upper and lower bounds 
                if (index === upperBound || index === lowerBound) {
                    blocks.push(index);
                    blocks.sort((a, b) => { return a - b }); // The indices must always be sorted from least to greatest
                }
            } else {
                blocks.push(index);
            }
            
        }
        this.setState({
            ...this.state,
            blocks: blocks
        })
        console.log(this.state.blocks);
    }
    handleDateChange(date) {
        // The selected date is in mm/dd/yyyy
        this.setState({
            ...this.state,
            date: date
        })
    }
    componentDidMount() {
    }
    handleLoginFieldEdit = (ev) => {
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
            url:  "/auth/login",
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            // Login was successful
            this.setState({
                isLoading: false,
                isLoggedIn: true,
                passwordIncorrect: false
            });
        }).catch(err => {
            // Login was not successful
            if (err.response.status == 401) {
                // The password is incorrect
                this.setState({
                    passwordIncorrect: true
                })
            }
            this.setState({
                isLoggedIn: false,
                isLoading: false
            });
        })
    }
    handle401 = () => {
        this.setState({
            isLoggedIn: false
        });
    }
    render() {
        return (<div>
            {/* Redirect route */}
            {/* Redirect only if this.state.redirect is truthy */} 
            <Redirect to={{
                pathname: this.state.redirect,
                state: {
                    machine: this.state.machine,
                    date: this.state.date,
                    blocks: this.state.blocks,
                    justification: this.state.justification
                }
            }} />
            {/* The actual app */}
            <Submitting show={this.state.isSubmitting} />
            <LoginForm passwordIncorrect={this.state.passwordIncorrect} isLoading={this.state.isLoading} handleLoginFieldEdit={this.handleLoginFieldEdit} email={this.state.email} password={this.state.password} handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn}/>
            <ErrorMsg closeErrorMenu={this.closeErrorMenu} isError={this.state.isError}>{this.state.errorMessage}</ErrorMsg>
            {/* <Loading isLoading={this.state.isLoading} /> */}
            <ValidationError closeValidationErr={this.closeValidationErr} show={this.state.validationError}/>
            <div style={this.props.isLoggedIn ? {display: "none"} : {display: "block" }}>
                <BasicInfo handle401={this.handle401} isLoggedIn={this.state.isLoggedIn} handleChange={this.handleChange} justification={this.props.justification} selectedMachine={this.state.machine} handleMachineChange={this.handleMachineChange} />
                <DateSelect handle401={this.handle401} isLoggedIn={this.state.isLoggedIn} selectedDate={this.state.date} handleDateChange={this.handleDateChange} />
                <TimeSelect handle401={this.handle401} isLoggedIn={this.state.isLoggedIn} handleBlocksChange={this.handleBlocksChange} formData={this.state} />
            </div>
            <SubmitButton handleSubmit={this.handleSubmit} />
        </div>)
    }
}

export default MainContent;