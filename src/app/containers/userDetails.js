import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers,getUserTasks,getUserDetails,getUserLog} from "../actions/index";
import {Tasks} from "../components/tasks"
import TasksNew from "./tasks"
import  moment from 'moment'
import EditUser from './editUser'
import UserLog from './userLog'


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserDetails(props.match.params.userId)
        this.props.getUserTasks(props.match.params.userId);
        this.props.getUserLog(props.match.params.userId);

        this.state={
            selectedUser:props.match.params.userId
        }
    }

    render() {
        var userLog =  this.props.selectedUserLog ? this.props.selectedUserLog[0]:""
        var  LogData = function (userLog) {
            var logData = (userLog.log).map(function (log) {
                var signIn = moment(log.signIn).format('MMMM Do YYYY, h:mm:ss a')
                var signOut = log.signOut ? moment(log.signOut).format('MMMM Do YYYY, h:mm:ss a') :"Not Signed Out"
                return(
                    <tr>
                        <td>{signIn}</td>
                        <td>{signOut}</td>
                    </tr>
                )
            });
            return (
                <div>
                    <div className="gridTable">
                        <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>SignIn</th>
                                <th>SignOut</th>
                            </tr>
                            </thead>
                            <tbody>
                            {logData}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
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
                        {userLog &&  <h5 className="title"> Last Logged On :{moment(userLog.date).format("DD-MM-YYYY")}</h5>}
                        <div  className="userLog">
                                    {userLog && LogData(userLog)}
                        </div>

                        <h5 className="title"> Tasks </h5>
                        <div  className="row">
                            {this.props.userTasks.todayTasks && <TasksNew user={this.state.selectedUser} items="todayTasks" title="Today Tasks" color="antiquewhite" /> }
                            {this.props.userTasks.pendingTasks && <TasksNew user={this.state.selectedUser} items="pendingTasks" title="Pending Tasks" color="antiquewhite" /> }
                            {this.props.userTasks.upcomingTasks && <TasksNew user={this.state.selectedUser} items="upcomingTasks" title="Upcoming Tasks" color="antiquewhite" /> }

                        </div>
                    </div>
                </div>
                {this.props.selectedUser  && <EditUser />}
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectedUser: state.User.selectedUser,
        selectedUserLog: state.User.selectedUserLog,
        userTasks:state.User.userTasks,
        permissions:state.Permissions.permissions,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTasks:(user)=> dispatch(getUserTasks(user)),
        getUserDetails:(email)=> dispatch(getUserDetails(email)),
        getUserLog:(email)=> dispatch(getUserLog(email)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);