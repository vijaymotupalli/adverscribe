import React from "react";
import { setLoginSuccess } from "../actions/index";
import {connect} from "react-redux";
import Menu from './menu'
import Users from './users'
import Adduser from './addUser'
import newAdd from './newaddUser'
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import './styles.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem("userToken")){
            this.props.setLoginSuccess(true);
        }
    }
    render(){
        let {isLoginPending, isLoginSuccess, loginError,match} = this.props;
        return (
            <div>
                { !isLoginSuccess && <Redirect to={{pathname: '/'}}/>}
                   <div ><Route  component={Menu} /></div>

                <div  id="toggleMenu">
                    <Route exact  path={match.url+'/adduser'} component={newAdd} />
                    <Route exact  path={match.url+'/users'} component={Users} />
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