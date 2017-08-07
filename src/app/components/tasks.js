import React from "react";
import '../containers/styles.css';
var moment = require('moment');

export const Tasks = (props) => {
    console.log("-----props in tasks----",props)
    var temp = props.items ? props.items : []
    var listTasks = temp.map(function (task) {
        return (
            <div key={task._id} className="taskCardList">
                <div className="taskContainer" style={{backgroundColor: props.color}}>
                    <h4><b>{task.title}</b></h4>
                    <p>{moment(task.startDate).format('L')}</p>
                    <p>{task.assignTo}</p>
                </div>
            </div>
        )
    }, this);
    return (
        <div>
            <div  className="col-md-4">
                <div  className="panel panel-default productWidget">
                    <div  className="panel-heading">
                        <div  className="row">
                            <div  className="col-md-9">
                                <p >{props.title}<strong >{props.items.length}</strong></p>
                            </div>
                            <div  className="col-md-3 text-right">
                                <a  href="javascript:;">View All</a>
                            </div>
                        </div>
                    </div>
                    <div  className="panel-body">
                        {listTasks}
                    </div>
                </div>
            </div>
        </div>
    );
};