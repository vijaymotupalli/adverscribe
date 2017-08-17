import React from "react";
import './styles.css';
import { selectedTaskData } from "../actions/index";
import {connect} from "react-redux";
var moment = require('moment');
import EditTask from "../containers/editTask"


class TasksNew extends React.Component {
    constructor(props){
        console.log("-----props in new tasks---",props)
        super(props);
        this.state={
            tasks :props.items,
            title:props.title,
            color:props.color
        }
    }
    selectedTaskData(task){
        this.props.selectedTaskData(task);
            document.getElementById("taskdiv").click
    }

    render(){
        console.log("----local In New State----",this.state)
        var temp = this.state.tasks ? this.state.tasks : []
        var listTasks = temp.map(function (task) {
            return (
                <div  id="taskdiv" key={task._id} className="taskCardList" onClick={()=>{this.selectedTaskData(task)}
                } data-toggle="modal"
                     data-target="#editTask">
                    <div className="taskContainer" style={{backgroundColor: this.state.color}}>
                        <h4><b>{task.title}</b></h4>
                        <p>{moment(task.startDate).format('L')}</p>
                        <p>{task.assignTo.name}</p>
                    </div>
                </div>
            )
        }, this);
        return (
            <div>
                <div  className="col-md-4">
                    <div  className="panel panel-default productWidget">
                        <div  className="panel-heading">
                            <div  className="row">
                                <div  className="col-md-9">
                                    <p >{this.state.title}<strong >{this.state.tasks.length}</strong></p>
                                </div>
                                <div  className="col-md-3 text-right">
                                    <a  href="javascript:;">View All</a>
                                </div>
                            </div>
                        </div>
                        <div  className="panel-body">
                            {listTasks}
                        </div>
                    </div>
                    {this.props.selectedTask && <EditTask/>}
                </div>
            </div>
        );
    }

};
const mapStateToProps = (state) => {
    console.log("----state in New Tasks---",state)
    return {
        selectedTask:state.Tasks.selectedTask
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectedTaskData: (taskData) => dispatch(selectedTaskData(taskData)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(TasksNew);
