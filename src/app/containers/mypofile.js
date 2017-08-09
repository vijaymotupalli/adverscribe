import React from "react";
import {connect} from "react-redux";
import './styles.css';
import {getUserDetails} from "../actions/index";
import  moment from 'moment'
import EditUser from './editUser'

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        var email = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).email :"";
        this.props.getUserDetails(email)
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
                                        <button  className="btn blackButton" data-toggle="modal" data-target="#myUserEditModal">Edit</button>
                                    </div>
                                </div>
                            </div>
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
        selectedUser: state.User.selectedUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails:(email)=> dispatch(getUserDetails(email))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);