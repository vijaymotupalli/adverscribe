import React from "react";
import './styles.css';
import { selectedTaskData } from "../actions/index";
import {connect} from "react-redux";
var moment = require('moment');
import EditTask from "../containers/editTask"




class TasksNew extends React.Component {
    constructor(props){
        super(props);
        this.props.selectedTaskData("");
        this.state={
            tasks :props.items,
            title:props.title,
            color:props.color,
            user:props.user,
            modalclose:false
        }
    }
    selectedTaskData(task){
            this.props.selectedTaskData(task);

    }
    render(){
        var tasks = this.props.userTasks[this.state.tasks] ? this.props.userTasks[this.state.tasks] :[]
        var listTasks = tasks.map(function(task) {
            return (
                <div  key={task._id} className="taskCardList" onClick={()=>{this.selectedTaskData(task)}}  data-toggle="modal"
                     data-target="#editTask" >
                    <div className="taskContainer" style={{backgroundColor: this.state.color}}>
                        <h4><b>{task.title}</b></h4>
                        <p>{moment(task.startDate).format('DD-MM-YYYY')}</p>
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
                                    <p >{this.state.title}<strong >{this.props.userTasks[this.state.tasks].length}</strong></p>
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

                      <EditTask userName={this.state.user}/>

                </div>
            </div>
        );
    }

};
const mapStateToProps = (state) => {
    return {
        selectedTask:state.Tasks.selectedTask,
        userTasks:state.User.userTasks,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectedTaskData: (taskData) => dispatch(selectedTaskData(taskData)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(TasksNew);
