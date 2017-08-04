import React from "react";
import {addUser} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';

class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            confirmEmail: "",
            name: "",
            role: "",
            error: ""
        };

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        const {email, confirmEmail, name, role} = this.state;
        if (email == confirmEmail) {
            this.props.addUser({email: email, name: name, role: role})
            if (!this.props.userError) {
                this.setState({
                    email: "",
                    confirmEmail: "",
                    name: "",
                    role: "",
                    error: ""
                });
            }
        } else {
            console.log("----iam in error----")
            this.setState({
                error: "Email Not Matched"
            });
        }

    }

    render() {
        console.log("----localstate---", this.state)
        return (
            <div>
                <div className="cardWidget">
                    <div className="cardBottom">
                        <div className="row">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group pr">
                                    <input type="text" className="form-control" placeholder="name" name="name"
                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name}
                                    />

                                </div>
                                <div className="form-group pr">
                                    <input type="email" className="form-control" placeholder="Email" name="email"
                                           onChange={e => this.setState({email: e.target.value})}
                                           value={this.state.email} required/>
                                </div>
                                <div className="form-group pr">
                                    <input type="email" className="form-control" placeholder="Email(confirm)"
                                           name="confirmemail"
                                           onChange={e => this.setState({confirmEmail: e.target.value})}
                                           value={this.state.confirmEmail} required/>
                                </div>
                                <div className="form-group pr">
                                    <input type="text" className="form-control" placeholder="role" name="role"
                                           onChange={e => this.setState({role: e.target.value})} value={this.state.role}
                                           required/>

                                </div>
                                <div className="text-center">
                                    <label className="errorcolor">
                                        { this.state.error && <div>{this.state.error}</div>  }
                                        { this.props.userError && <div>{ this.props.userError}</div>}
                                    </label>
                                </div>
                                <div className="form-group text-center">
                                    <button className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    console.log("----state----", state)
    return {
        userError: state.User.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Adduser);
