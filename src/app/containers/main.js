import React from "react";
import { setLoginSuccess,setHeaders,setPermissions } from "../actions/index";
import {connect} from "react-redux";
import Menu from './menu'
import Users from './users'
import UserDetails from './userDetails'
import Myprofile from './mypofile'
import AssignTask from './assignTask'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        var token = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
        var permissions = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role.privileges :"";
        this.props.setPermissions(permissions);
        this.props.setHeaders(token);
        if(!localStorage.getItem("loginuser")){
            this.props.setLoginSuccess(false);
            this.props.history.push("/")
        }
    }
    render(){
        let {isLoginPending, isLoginSuccess, loginError,match} = this.props;
        return (
            <div id="testMain">
                <div ><Route  component={Menu} /></div>
                <div >Welcome to TFT</div>

                <div  id="toggleMenu">
                    {(this.props.permissions.indexOf("VIEW_USERS")> -1) && <Route exact  path={match.url+'/users'} component={Users} />}
                    <Route exact  path={match.url+'/tasks'} component={AssignTask} />
                    <Route exact  path={match.url+'/users/:userId'} component={UserDetails} />
                    <Route exact  path={match.url+'/myprofile'} component={Myprofile} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    console.log("-----state in main-----",state)
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError,
        permissions:state.Permissions.permissions
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setLoginSuccess: (status) => dispatch(setLoginSuccess(status)),
        setHeaders: (token) => dispatch(setHeaders(token)),
        setPermissions: (permissions) => dispatch(setPermissions(permissions)),

    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Main);