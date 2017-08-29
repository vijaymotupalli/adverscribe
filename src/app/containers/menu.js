import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import './styles.css';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import { postSignOutUserLog } from "../actions/index";



class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.onSignout = this.onSignout.bind(this)
    }

    onSignout(e) {
        this.props.postSignOutUserLog(localStorage.getItem("logId"))
        localStorage.clear()
    }

    openNav(e) {
        document.getElementById("mySidenav").style.width = "200px";
        document.getElementById("toggleMenu").style.marginLeft = "200px";
        document.getElementById("menu").style.marginLeft = "150px";
    }

    closeNav(e) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("toggleMenu").style.marginLeft = "0";
        document.getElementById("menu").style.marginLeft = "0";
    }
    render() {
        const privileges = JSON.parse(localStorage.getItem("loginuser"))?
            JSON.parse(localStorage.getItem("loginuser")).role.privileges :[]
        const canSeeUsers = privileges.indexOf("VIEW_USERS")> -1
        const canSeeTasks = privileges.indexOf("VIEW_TASKS")> -1
        const {match} = this.props
        return (
            <div className="container-fluid">
                <div id="mySidenav" className="sidenav">
                    {/*<a className="closebtn" onClick={this.closeNav}>&times;</a>*/}
                    <img src="../../assets/images/logo.png" className="logo2"/>
                    <div className="mainLinks">
                        <NavLink to={match.url+'/myprofile'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> My Profile </NavLink>
                        { canSeeUsers && <NavLink to={match.url+'/users'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> Users </NavLink> }
                        { canSeeTasks &&  <NavLink to={match.url+'/tasks'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> Tasks </NavLink> }
                        <NavLink to={match.url+'/mytasks'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> My Tasks </NavLink>
                        <NavLink to="/" activeClassName="active" onClick={this.onSignout} exact><img
                            src="../../assets/images/power.png"/> Signout </NavLink>
                    </div>
                </div>
                {/*<div id="main">*/}
                    {/*<img src="../../assets/images/logo1.png" className="logo1"/>*/}
                    {/*<span className="mdi mdi-menu menuIco" id="menu" onClick={this.openNav}>Menu</span>*/}
                {/*</div>*/}
            </div>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError,
        permissions:state.Permissions.permissions
    };
};


const mapDispatchToProps = (dispatch)=> {

    return {
        postSignOutUserLog: (logId) => dispatch(postSignOutUserLog(logId))
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);