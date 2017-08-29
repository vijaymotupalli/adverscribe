import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUserTasks} from "../actions/index";
import {Tasks} from "../components/tasks"
import TasksNew from "./tasks"

import  moment from 'moment'
import EditUser from './editUser'

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        const loggedUser = JSON.parse(localStorage.getItem('loginuser'))?JSON.parse(localStorage.getItem('loginuser')).email:""
        this.props.getUserTasks(loggedUser);
    }
    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">My Tasks</h3>
                <div  className="row">
                    <div  className="col-md-12">
                        <div  className="row">
                            {this.props.userTasks && this.props.userTasks.todayTasks && <TasksNew items="todayTasks"  title="Today Tasks" color="antiquewhite" /> }
                            {this.props.userTasks && this.props.userTasks.pendingTasks && <TasksNew items="pendingTasks" title="Pending Tasks" color="burlywood" /> }
                            {this.props.userTasks && this.props.userTasks.upcomingTasks && <TasksNew items="upcomingTasks" title="Upcoming Tasks" color="#eee"/> }
                        </div>
                    </div>
                </div>
                {this.props.selectedUser  && <EditUser/>}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectedUser: state.User.selectedUser,
        userTasks:state.User.userTasks,
        permissions:state.Permissions.permissions,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTasks:(user)=> dispatch(getUserTasks(user))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);