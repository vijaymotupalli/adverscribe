import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getTasks,selectedTaskData} from "../actions/index";
import Task from './task'
var moment = require('moment');
import EditTask from "../containers/editTask"


class AssignTask extends React.Component {
    constructor(props) {
        super(props);
        this.props.getTasks();
    }
    selectedTaskData(task){
        this.props.selectedTaskData(task);

    }

    render() {
        console.log("----props in tasks---",this.props);
        var temp = this.props.tasks ? this.props.tasks : []
        var listTasks = temp.map(function (task) {
            return (
                <div key={task._id} className="taskCard" onClick={()=>{this.selectedTaskData(task)}}  data-toggle="modal"
                     data-target="#editTask">
                    <div className="taskContainer">
                        <h4><b>{task.title}</b></h4>
                        <p>{moment(task.startDate).format('L')}</p>
                        <p>{task.assignTo.name}</p>
                    </div>
                </div>
            )
        }, this);
        return (
            <div>
                <div>
                    <div className="row" id="title">
                        <div className="col-sm-8" id="userslist">All Tasks</div>
                        <div className="col-sm-4"><button type="button" id="adduser" className="btn btn-info btn-lg" data-toggle="modal"
                                                          data-target="#myModal" >Assign Task
                        </button></div>
                    </div>
                    <div className="gridTasks">
                        {listTasks}
                    </div>
                </div>
                <EditTask/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.Tasks.tasks,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: () => dispatch(getTasks()),
        selectedTaskData: (taskData) => dispatch(selectedTaskData(taskData)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignTask);