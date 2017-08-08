import React from "react";
import {addUser,setUserError,getRoles} from "../actions/index";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
import {RadioGroup,Radio} from 'react-mdl'

class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.props.getRoles();
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
        this.setState({error:""})
        this.props.setUserError("");
        const {email, confirmEmail, name, role} = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else if (email == confirmEmail) {
           this.props.addUser({email: email, name: name, role: role}).then((result,err)=> {
               if(!err){
                   this.setState({
                       email:"",name:"",role:"",confirmEmail:"",error:""
                   })
               }
            })
        } else {
            this.setState({
                error: "Email Not Matched"
            });
        }
    }
    render() {
        var roles = this.props.roles ? this.props.roles : []
        var listRoles = roles.map(function (role) {
            return (
                <option key={role._id} value={role.role}>{role.display_name}</option>
            )
        }, this);
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Add User</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text"  className="form-control" placeholder="Type Name" name="name"
                                                           onChange={e => this.setState({name: e.target.value})} value={this.state.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           onChange={e => this.setState({email: e.target.value})}
                                                           value={this.state.email} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email(confirm)</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           onChange={e => this.setState({confirmEmail: e.target.value})}
                                                           value={this.state.confirmEmail} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Select Role</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <select className="form-control" id="sel1" onChange={e => this.setState({role: e.target.value})} value={this.state.role}>                                              <option value="" selected="selected" disabled>--Select Role--</option>
                                                          {listRoles}
                                                        </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <label className="errorcolor">
                                            { this.state.error && <div>{this.state.error}</div>  }
                                            { this.props.userError && <div>{ this.props.userError}</div>}
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton" data-dismiss="modal"
                                                    style={{width:"100%",background:"#fff",color:"#333"}}>CANCEL</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn blackButton"  onClick={this.onSubmit} style={{width:"100%"}}>CREATE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
        userError: state.User.error,
        userDataClear:state.User.userDataClear,
        roles:state.User.roles
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        getRoles: () => dispatch(getRoles()),
        setUserError: (error) => dispatch(setUserError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Adduser);
