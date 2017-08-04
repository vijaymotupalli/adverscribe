import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUsers} from "../actions/index";
import Newadd from './newaddUser'
import {Route, Link, Switch} from 'react-router-dom';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
    }


    render() {
        var temp = this.props.users ? this.props.users : []
        var listUsers = temp.map(function (user) {
            return (
                <tr key={user.createdAt}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isActive ? "Active" : "InActive"}</td>
                    <td>{user.createdAt}</td>
                </tr>
            );
        }, this);
        return (
            <div>
                <div>
                    <Newadd/>
                    <div className="row" id="title">
                        <div className="col-sm-8" id="userslist">Users List</div>
                        <div className="col-sm-4"><button type="button" id="adduser" className="btn btn-info btn-lg" data-toggle="modal"
                                                          data-target="#myModal" >Add User
                        </button></div>
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(User);