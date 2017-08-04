import React from "react"
import {Route, Link, Switch} from 'react-router-dom';
import './styles.css';
import {NavLink} from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    onSubmit(e) {
        localStorage.clear()
        this.context.history.push("/");
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
        const {match} = this.props
        return (
            <div className="container-fluid">
                <div id="mySidenav" className="sidenav">
                    <a className="closebtn" onClick={this.closeNav}>&times;</a>
                    <img src="../../assets/images/logo.png" className="logo2"/>
                    <div className="mainLinks">
                        <NavLink to={match.url+'/users'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> Users </NavLink>
                        <NavLink to={match.url+'/tasks'}  activeClassName="active"  exact><img
                            src="../../assets/images/multiple-users-silhouette.png"/> Tasks </NavLink>
                        <NavLink to={match.url+'/signout'}  activeClassName="active" onClick={this.onSubmit} exact><img
                            src="../../assets/images/power.png"/> Signout </NavLink>
                    </div>
                </div>
                <div id="main">
                    <img src="../../assets/images/logo1.png" className="logo1"/>
                    <span className="mdi mdi-menu menuIco" id="menu" onClick={this.openNav}>Menu</span>
                </div>
            </div>



        )
    }

}


export default Menu;