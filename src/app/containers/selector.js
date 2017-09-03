import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
import Time from './Time'
var moment = require('moment');

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            count:[]
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e) {
        e.preventDefault();
         (this.state.count).push(1)
        this.setState({
            count:this.state.count
        });
    }
    render() {
        var count = this.state.count
        var options = count.map(function (each) {
            return (
                <Time/>
            );
        });
        return (
            <div className="col-sm-12" id="titleheader">
                <div className="col-sm-2">HOURS</div>
                <div className="col-sm-2">MINS</div>
                <div className="col-sm-3">PROJECTS</div>
                <div className="col-sm-4">DESCRIPTION</div>
                <div className="col-sm-1" onClick={this.onSubmit}>+</div>
                {options}
            </div>

        )
    }
};

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Selector);
