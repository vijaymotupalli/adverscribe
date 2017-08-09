import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers,selectedUserData} from "../actions/index";
import Newadd from './newaddUser'
import {Route, Link, Switch} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
    }
    selectedUser(user){
        const {context,history} = this.props
        console.log("test",user)
        this.props.selectedUserData(user);
        history.push(this.props.match.url+"/"+user.email)
        console.log(this.props)
    }
    render() {
        console.log("----props users page---",this.props);
        var temp = this.props.users ? this.props.users : []
        var listUsers = temp.map(function (user) {
            return (
                <tr key={user.createdAt} onClick={()=>this.selectedUser(user)}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isActive ? "Active" : "InActive"}</td>
                    <td>{user.createdAt}</td>
                    <td>
                        <button style={{display:((this.props.permissions.indexOf("DELETE_USER"))> -1) ? "show":"none"}} className="btn blackButton">Remove</button>
                    </td>
                </tr>
            );
        }, this);
        return (
            <div>
                <div>
                    <Newadd/>
                    <div className="row" id="title">
                        <div className="col-sm-8" id="userslist">Users List</div>

                        <div  style={{display:((this.props.permissions.indexOf("ADD_USER"))> -1) ? "show":"none"}} className="col-sm-4">
                            <button type="button" id="adduser" className="btn blackButton" data-toggle="modal"
                                                          data-target="#myUserAddModal" >Add User
                        </button>
                        </div>

                    </div>
                    <div className="gridTable">
                        <table className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Is Active</th>
                                <th>Added At</th>
                                <th>Action</th>


                            </tr>
                            </thead>
                            <tbody>
                            {listUsers}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.User.users,
        selectedUser: state.User.selectedUser,
        permissions:state.Permissions.permissions
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        selectedUserData: (data) => dispatch(selectedUserData(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(User);