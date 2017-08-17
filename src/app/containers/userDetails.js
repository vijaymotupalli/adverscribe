import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers,getUserTasks,getUserDetails} from "../actions/index";
import {Tasks} from "../components/tasks"
import TasksNew from "./tasks"
import  moment from 'moment'
import EditUser from './editUser'


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserDetails(props.match.params.userId)
        this.props.getUserTasks(props.match.params.userId);
    }
    render() {
        return (
            <div className="container-fluid">
                <h3  className="title">User Details</h3>
                <div  className="row">
                    <div  className="col-md-12">
                        <div  className="cardWidget">
                            <div  className="cardBottom">
                                <div  className="row">
                                    <div  className="col-md-4">
                                        <p ><strong >Email</strong> <span >{this.props.selectedUser.email}</span></p>
                                        <p ><strong >Name</strong> <span >{this.props.selectedUser.name}</span></p>
                                    </div>
                                    <div  className="col-md-4 text-center">
                                        <p ><strong >Date of Joining</strong> <span >{moment(this.props.selectedUser.createdAt).format('L')}</span></p>
                                        <p ><strong >Active </strong> <span >{this.props.selectedUser.isActive ?  "Active" :"In Active"} </span></p>
                                    </div>
                                    <div  className="col-md-4 text-right">
                                        <button  style={{display:((this.props.permissions.indexOf("EDIT_USER"))> -1) ? "show":"none"}} className="btn blackButton" data-toggle="modal"
                                                data-target="#myUserEditModal">Edit</button>
                                        <button  className="btn blackButton">Delete User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  className="row">

                            {this.props.userTasks.todayTasks && <TasksNew items={this.props.userTasks.todayTasks} title="Today Tasks" color="antiquewhite" /> }
                            {this.props.userTasks.pendingTasks && <TasksNew items={this.props.userTasks.pendingTasks} title="Pending Tasks" color="antiquewhite" /> }
                            {this.props.userTasks.upcomingTasks && <TasksNew items={this.props.userTasks.upcomingTasks} title="Upcoming Tasks" color="antiquewhite" /> }

                        </div>
                    </div>
                </div>
                {this.props.selectedUser  && <EditUser />}
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    console.log("----state in user new details----",state)
    return {
        selectedUser: state.User.selectedUser,
        userTasks:state.User.userTasks,
        permissions:state.Permissions.permissions,
        boardAddModalShow:state.User.boardAddModalShow,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTasks:(user)=> dispatch(getUserTasks(user)),
        getUserDetails:(email)=> dispatch(getUserDetails(email))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);