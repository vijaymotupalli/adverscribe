import React from "react";
import {addTask,setTaskError} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
import 'style-loader!react-datepicker/dist/react-datepicker.css';
import 'style-loader!react-date-picker/index.css'
import DatePicker from 'react-datepicker'
var moment = require('moment');

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            assignedTo: "",
            error:"",
            tasks:[]
        };

        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange(date){
        console.log(date)
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setTaskError("");
        const {title, description, startDate, endDate,assignedTo} = this.state;
        this.props.addTask({title:title,description:description,startDate:startDate,endDate:endDate,assignedTo:assignedTo})
         console.log("Task Data",{title:title,description:description,startDate:startDate,endDate:endDate,assignedTo:assignedTo})
    }
    render() {
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Assign Task</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Title</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({title: e.target.value})} value={this.state.title} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Description</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <textarea className="form-control" rows="5" id="comment"
                                                           onChange={e => this.setState({description: e.target.value})} value={this.state.description} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Start Date</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <DatePicker
                                                        onChange={e => this.setState({startDate: e})} value={this.state.startDate}
                                                        dateFormat="DD/MM/YYYY"
                                                        selected={this.state.startDate}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">End Date</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <DatePicker
                                                        onChange={e => this.setState({endDate: e})} value={this.state.endDate}
                                                        selected={this.state.endDate}
                                                        dateFormat="DD/MM/YYYY"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Assigned To</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({assignedTo: e.target.value})} value={this.state.assignedTo} />
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.taskError && <div>{ this.props.taskError}</div>}
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" onClick={this.onSubmit} style={{width:"100%"}}>ASSIGN</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        taskError: state.Tasks.error,
        taskDataClear:state.Tasks.taskDataClear
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => dispatch(addTask(task)),
        setTaskError: (error) => dispatch(setTaskError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Task);
