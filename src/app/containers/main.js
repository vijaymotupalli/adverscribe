import React from "react";
import { setLoginSuccess } from "../actions/index";
import {connect} from "react-redux";
import Menu from './menu'
import Users from './users'
import UserDetails from './userDetails'
import Adduser from './addUser'
import newAdd from './newaddUser'
import AssignTask from './assignTask'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log("------user-----",localStorage.getItem("userToken"))
        if(!localStorage.getItem("userToken")){
            this.props.setLoginSuccess(false);
            this.props.history.push("/")
        }
    }
    render(){
        let {isLoginPending, isLoginSuccess, loginError,match} = this.props;
        return (
            <div id="testMain">
                <div ><Route  component={Menu} /></div>
                <div  id="toggleMenu">
                    <Route exact  path={match.url+'/adduser'} component={newAdd} />
                    <Route exact  path={match.url+'/users'} component={Users} />
                    <Route exact  path={match.url+'/tasks'} component={AssignTask} />
                    <Route exact  path={match.url+'/userdetails'} component={UserDetails} />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        setLoginSuccess: (status) => dispatch(setLoginSuccess(status))
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Main);