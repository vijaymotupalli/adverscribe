import React from "react";
import { setLoginSuccess,googleLogin } from "../actions/index";
import {connect} from "react-redux";
import { BrowserRouter,Route ,Redirect} from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem("userToken")){
            this.props.setLoginSuccess(true);
        }
    }
    onResponseGoogle(response){
        console.log("google response",response);
        if(response.profileObj.email)this.props.googleLogin(response.profileObj.email);

    }
    render(){
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
            <div>
                { isLoginSuccess && <Redirect to={{pathname: '/dashboard/users',state: { from: this.props.location }}}/>}
                <div className="bgLogin">
                    <div className="logo">
                    </div>
                    <section className="login">
                        <h2>Login</h2>
                        <form >
                            <div className="text-center">
                                <label className="errorcolor">
                                    { isLoginPending && <div>Please wait...</div>  }
                                    { isLoginSuccess && <div>Success.</div> }
                                    { loginError && <div>{loginError}</div> }
                                </label>
                            </div>
                            <GoogleLogin
                                clientId="838976054256-mmc4cgm3eaoa0jrat1ph928lekpjiqvg.apps.googleusercontent.com"
                                buttonText="Google Login"
                                autoLoad={false}
                                style={{
                                    fontSsize: 14,
                                    width: "100%",
                                    border: 0,
                                    borderRadius: 0,
                                    padding:[10,0],
                                    margin: [20, 0, 0, 0],
                                    background: "#fb1717",
                                    textTransform: "uppercase",
                                    color: "white"
                                }}
                                onSuccess={this.onResponseGoogle.bind(this)}
                                onFailure={this.onResponseGoogle.bind(this)}
                            />
                        </form>
                    </section>
                </div>

            </div>

        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.Login.isLoginPending,
        isLoginSuccess: state.Login.isLoginSuccess,
        loginError: state.Login.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginSuccess: (status) => dispatch(setLoginSuccess(status)),
        googleLogin: (email) => dispatch(googleLogin(email)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);
