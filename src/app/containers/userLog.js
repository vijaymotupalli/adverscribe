import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers,selectedUserData} from "../actions/index";
import {Route, Link, Switch} from 'react-router-dom';
var moment = require('moment');


class UserLog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedUserLog : this.props.selectedUserLog
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            selectedUserLog : nextProps.selectedUserLog
        })

    }
    render() {
        var logs = this.state.selectedUserLog
        var userLogs = logs.map(function (userLog) {
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
                    <h5>{moment(userLog.date).format("DD-MM-YYYY")}</h5>
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
        }, this);
        return (
            <div>
                <div>
                    <div className="row" id="title">
                        <div className="col-sm-8" id="userslist">Users Log</div>

                    </div>
                    <div className="row">
                        {userLogs}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.User.users,
        selectedUserLog: state.User.selectedUserLog,
        permissions:state.Permissions.permissions
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        selectedUserData: (data) => dispatch(selectedUserData(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLog);