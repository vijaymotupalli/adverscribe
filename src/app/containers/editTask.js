import React from "react";
import {editTask,setTaskError,getUsers,selectedTaskData} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
import 'style-loader!react-datepicker/dist/react-datepicker.css';
import 'style-loader!react-date-picker/index.css'
import DatePicker from 'react-datepicker'
var moment = require('moment');

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUsers();
        this.state = {
            title: this.props.selectedTask.title ? this.props.selectedTask.title :"",
            description: this.props.selectedTask.description ? this.props.selectedTask.description:"",
            startDate: this.props.selectedTask.startDate ? this.props.selectedTask.startDate :"",
            endDate: this.props.selectedTask.endDate ? this.props.selectedTask.endDate :"",
            assignTo: this.props.selectedTask.assignTo ? this.props.selectedTask.assignTo._id :"",
            error:""
        };
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps){
        this.setState ({
            title: nextProps.selectedTask.title ? nextProps.selectedTask.title :"",
            description: nextProps.selectedTask.description ? nextProps.selectedTask.description:"",
            startDate: nextProps.selectedTask.startDate ? moment(nextProps.selectedTask.startDate) :"",
            endDate: nextProps.selectedTask.endDate ? moment(nextProps.selectedTask.endDate) :"",
            assignTo: nextProps.selectedTask.assignTo ? nextProps.selectedTask.assignTo._id :"",
            error:""
        });

    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({error: ""})
        this.props.setTaskError("");
        const {title, description, startDate, endDate, assignTo} = this.state;
        const taskId = this.props.selectedTask._id
        this.props.editTask({
            userId:this.props.userName ?this.props.userName:JSON.parse(localStorage.getItem("loginuser")).email,
            taskId:taskId,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            assignTo: assignTo
        }).then((result,err)=>{
            if(!err){
                document.getElementById("close").click()
                this.props.selectedTaskData("");
            }
        })
    }



    render() {
        var users = this.props.users ? this.props.users : []
        var options = users.map(function (user) {
            return (
                <option key={user._id} value={user._id}>{user.name}</option>
            );
        }, this);
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="editTask" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" id="close" className="close"  data-dismiss="modal">&times;</button>
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
                                                    <input type="text"  className="form-control" placeholder="Enter Title" name="name"
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
                                                    <textarea placeholder="Enter Description" className="form-control" rows="5" id="comment"
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
                                                    <DatePicker placeholder="Select Date"
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
                                                    <DatePicker placeholder="Select Date"
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
                                                    <select className="form-control" placeholder="Select User"  onChange={e => this.setState({assignTo: e.target.value})}
                                                            value={this.state.assignTo} >
                                                        <option value="" defaultValue="--Select User--" disabled>--Select User--</option>
                                                        {options}
                                                    </select>
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
                                            <button type="button" className="btn blackButton" onClick={this.onSubmit} style={{width:"100%"}}>SUBMIT</button>
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
    console.log("------users in edit task-----",state.User.users)
    return {
        taskError: state.Tasks.error,
        users: state.User.users,
        selectedTask:state.Tasks.selectedTask,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task) => dispatch(editTask(task)),
        getUsers: () => dispatch(getUsers()),
        setTaskError: (error) => dispatch(setTaskError(error)),
        selectedTaskData: (taskData) => dispatch(selectedTaskData(taskData))


    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
