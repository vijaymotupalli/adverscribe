import React from "react";
import { setLoginSuccess,setHeaders,setPermissions } from "../actions/index";
import {connect} from "react-redux";
import Menu from './menu'
import Users from './users'
import UserDetails from './userDetails'
import Myprofile from './mypofile'
import AssignTask from './assignTask'
import Mytasks from './userTasks'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        localStorage.getItem("loginuser")?this.props.setLoginSuccess(true):this.props.setLoginSuccess(false)
        var token = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).access_token :"";
        var permissions = JSON.parse(localStorage.getItem("loginuser")) ? JSON.parse(localStorage.getItem('loginuser')).role.privileges :[];
        this.props.setPermissions(permissions);
        this.props.setHeaders(token);
       if(!localStorage.getItem("loginuser")) {this.props.setLoginSuccess(false); this.props.history.push('/')}
    }
    render(){
        let {isLoginPending, isLoginSuccess, loginError,match} = this.props;
        const privileges = this.props.permissions
        const canSeeUsers = privileges.indexOf("VIEW_USERS")> -1
        const canSeeTasks = privileges.indexOf("VIEW_TASKS")> -1
        const canSeeUserdetails = privileges.indexOf("VIEW_USER_DETAILS")> -1
        console.log("-----in main above to render------")
        return (
            <div id="testMain">
                <div ><Route  component={Menu} /></div>
                <div >Welcome to This For That</div>
                <div  id="toggleMenu">
                    {canSeeUsers && <Route exact  path={match.url+'/users'} component={Users} /> }
                    {canSeeTasks &&  <Route exact  path={match.url+'/tasks'} component={AssignTask} /> }
                    {canSeeUserdetails && <Route exact  path={match.url+'/users/:userId'} component={UserDetails} /> }
                    <Route exact  path={match.url+'/mytasks'} component={Mytasks} />
                    <Route exact  path={match.url+'/myprofile'} component={Myprofile} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    console.log("-----main state-----",state)
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