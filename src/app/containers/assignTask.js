import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getTasks} from "../actions/index";
import Task from './task'
var moment = require('moment');

class AssignTask extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getTasks();
    }
    render() {
        console.log("----props in tasks---",this.props);
        var temp = this.props.tasks ? this.props.tasks : []
        var listTasks = temp.map(function (task) {
            return (
                <div key={task._id} className="taskCard">
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
                    <Task />
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
        getTasks: () => dispatch(getTasks())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignTask);