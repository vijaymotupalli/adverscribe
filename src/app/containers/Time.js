import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './styles.css';
var moment = require('moment');
import EachTime from "./EachTime"
import {setCount} from "../actions/index";


class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDateData : props.selectedDateData
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState ({
            selectedDateData:nextProps.selectedDateData
        });

    }
    onSubmit(e) {
        e.preventDefault();
        this.props.setCount(1);
    }
    render() {
        var times = this.state.selectedDateData.map(function (data) {
            return (
                <EachTime data={data}/>
            )
        })
        var newTimes = (this.props.count).map(function (each) {
            return(<EachTime/>)
        })
        return (
            <div>
                <h3>{this.props.selectedDate ? moment(this.props.selectedDate).format("LL") : ""}</h3>
                <div className="col-sm-12" id="titleheader">
                    <div className="col-sm-2">HOURS</div>
                    <div className="col-sm-2">MINS</div>
                    <div className="col-sm-3">PROJECTS</div>
                    <div className="col-sm-4">DESCRIPTION</div>
                    <div className="col-sm-1" onClick={this.onSubmit}>+</div>
                </div>
                {this.state.selectedDateData && times}
                {this.props.count.length ? newTimes :""}
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {

    return {
        count:state.Event.count,
        selectedDate:state.Event.selectedDate
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCount:(count)=>dispatch(setCount(count))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Time);
