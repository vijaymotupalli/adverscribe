import React from "react";
import {editUser,setUserError,getRoles} from "../actions/index";
import {connect} from "react-redux";
import './styles.css';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        console.log("----props in edit use test----",props)
        this.props.getRoles();
        this.state = {
            email: props.selectedUser.email,
            name: props.selectedUser.name,
            role: props.selectedUser.role,
            error: "",
            isActive:props.selectedUser.isActive,
        };
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({error:""})
        this.props.setUserError("");
        const {email, name, role ,isActive } = this.state;
        if(!((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))){ this.setState({
            error: "Email Not Valid"
        })}else {
            this.props.editUser({email: email, name: name, role: role,isActive:isActive}).then((result,err)=> {
                document.getElementById("close").click()
            })
        }
    }
    render() {
        const privileges = this.props.permissions
        const canEditRole = privileges.indexOf("EDIT_ROLE")> -1

        var roles = this.props.roles ? this.props.roles : []
        var listRoles = roles.map(function (role) {
            return (
                <option key={role._id} value={role.role}>{role.display_name}</option>
            )
        }, this);
        return (
            <div>
                <div className="container" >
                    <div className="modal fade" id="myUserEditModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button"  id="close" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Edit User</h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Email</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="email"  className="form-control" placeholder="Type Email ID" name="email"
                                                           value={this.state.email} disabled/>
                                                </div>
                                            </div>
                                        </div>
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
                                                    <label className="colorGray">Select Role</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <select className="form-control" id="sel1" onChange={e => this.setState({role: e.target.value})}
                                                            value={this.state.role} disabled={canEditRole ? "":"disabled"} >
                                                        <option value="" selected="selected" disabled>--Select Role--</option>
                                                        {listRoles}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group modalFields">
                                            <div className="row mt30">
                                                <div className="col-md-3">
                                                    <label className="colorGray">Status</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="checkbox" defaultChecked={this.state.isActive}
                                                           onChange={()=>this.setState({isActive: this.state.isActive ? false :true})} />
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
                                            <button type="button" className="btn blackButton"  onClick={this.onSubmit} style={{width:"100%"}}>SUBMIT</button>
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
    console.log("----satet in edit user---",state);
    return {
        userError: state.User.error,
        roles:state.User.roles,
        selectedUser: state.User.selectedUser,
        permissions:state.Permissions.permissions
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (user) => dispatch(editUser(user)),
        getRoles: () => dispatch(getRoles()),
        setUserError: (error) => dispatch(setUserError(error)),

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
