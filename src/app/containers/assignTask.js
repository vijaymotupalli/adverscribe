import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers} from "../actions/index";
import Task from './task'

class AssignTask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("------this props----",this.props.tasks)
      // var temp = this.props.tasks ? this.props.tasks : []
        var temp =  [1,2,3,4,5]
        var likstTasks = temp.map(function (task) {
            console.log("-----task----",task.title)
            return (

                    <div className="taskCard">
                        <div className="taskContainer">
                            <h4><b>{task}</b></h4>
                            <p>{task}</p>
                        </div>
                    </div>

            );
        }, this);
        return (
            <div>
                <div>
                    <Task/>
                    <div className="row" id="title">
                        <div className="col-sm-8" id="userslist">All Tasks</div>
                        <div className="col-sm-4"><button type="button" id="adduser" className="btn btn-info btn-lg" data-toggle="modal"
                                                          data-target="#myModal" >Assign Task
                        </button></div>
                    </div>
                    <div className="gridTasks">
                   {likstTasks}
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
        getUsers: () => dispatch(getUsers())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignTask);