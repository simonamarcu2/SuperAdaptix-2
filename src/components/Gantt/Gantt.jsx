import { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import PropTypes from 'prop-types';
import testData from "../../data/testData.jsx";
import Instructor from "../Instructor/Instructor.jsx";

export default class Gantt extends Component {
    setZoom(value) {
        if (!gantt.$initialized) {
            gantt.ext.zoom.setLevel(value);
        }
    }

    static propTypes = {
        tasks: PropTypes.object.isRequired,
        zoom: PropTypes.string.isRequired
    };
    
    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }
    
    state = {
        currentZoom: 'Days'
    };
     
    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }
    
    componentDidMount() {
        gantt.config.date_format = "%Y-%m-%d %H:%i";  
        const { tasks } = this.props;
        
        gantt.config.lightbox.sections = [
            {name: "description", height: 30, map_to: "text", type: "textarea", focus: true},
            {name: "instructor", height: 30, map_to: "instructor_name", type: "textarea"},
            {name: "time", type: "duration", map_to: "auto"}
        ];
        
        gantt.config.columns = [
            {name: "text", label: "Task Name", width: "*"},
            {name: "instructor_name", label: "Instructor", width: "*"},
            {name: "duration", label: "Duration", align: "center"},
            {name: "add", label: "", width: 44}
        ];
        
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);
    }

    render() {
        return (
            <div className="gantt-chart">
                {testData.data.map(task => (
                    <div
                        ref={(input) => { this.ganttContainer = input }}
                        key={task.id}
                        style={ { width: '100%', height: '100%' } }
                        className={`gantt-task ${Instructor[task.instructor_name]}`}
                    >
                        {task.text}
                    </div>
                ))}
            </div>
        );
    }
}
