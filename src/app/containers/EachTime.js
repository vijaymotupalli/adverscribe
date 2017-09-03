import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
var moment = require('moment');

class EachTime extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            _id:props.data ? props.data._id :"",
            hours:props.data ? props.data.hours :"",
            mins:props.data ?props.data.mins:"" ,
            projects:props.data ? props.data.projects :"",
            description:props.data ? props.data.description :"",
        }
        this.onAdd = this.onAdd.bind(this)
    }

    onAdd(e) {
        e.preventDefault();
        console.log("----final state-----",this.state)
    }
    render() {
        console.log("----Each time props--------",this.props)

        return (
            <div>
                <form >
                    <div className="col-sm-12">
                        <div className="col-sm-2">
                            <select className="form-control" id="hours" value={this.state.hours} onChange={e => this.setState({hours: e.target.value})}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <select className="form-control" id="mins" value={this.state.mins} onChange={e => this.setState({mins: e.target.value})}>
                                <option value="0" >0min</option>
                                <option value="10">10min</option>
                                <option value="20">20min</option>
                                <option value="30">30min</option>
                                <option value="40">40min</option>
                                <option value="50">50min</option>
                            </select></div>
                        <div className="col-sm-3">
                            <select className="form-control" id="projects" value={this.state.projects} onChange={e => this.setState({projects: e.target.value})}>
                                <option value="" defaultValue="--SelectUser--" disabled="disabled">--select--</option>
                                <option value="Adverscribe">Adverscribe</option>
                            </select></div>
                        <div className="col-sm-4" id="description" >
                            <textarea className="form-control" id="exampleTextarea" rows="3" value={this.state.description} onChange={e => this.setState({description: e.target.value})}/></div>
                        <div className="col-sm-1">
                            <button type="submit" onClick={this.onAdd}>Add</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EachTime);
