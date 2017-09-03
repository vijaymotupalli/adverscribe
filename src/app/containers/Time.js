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
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.setCount(1);
    }

    render() {
        console.log("----this count-----",this.props.Ncount)
        var times = this.props.selectedDateData.map(function (data) {
            return (
                <EachTime data={data}/>
            )
        })
        var newTimes = (this.props.Ncount).map(function (each) {
            return(<EachTime/>)
        })
        return (
            <div>
                <div className="col-sm-12" id="titleheader">
                    <div className="col-sm-2">HOURS</div>
                    <div className="col-sm-2">MINS</div>
                    <div className="col-sm-3">PROJECTS</div>
                    <div className="col-sm-4">DESCRIPTION</div>
                    <div className="col-sm-1" onClick={this.onSubmit}>+</div>
                </div>
                <h1>welcome:{this.props.Ncount.length}</h1>
                {times}
                {/*{this.props.count.length ? newTimes :""}*/}
            </div>

        )
    }
}
;

const mapStateToProps = (state) => {

    console.log("----sate in time hello how----",state.Event.count)

    return {
        Ncount:state.Event.count,
        selectedDateData:state.Event.selectedDateData

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCount:(count)=>dispatch(setCount(count))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Time);
