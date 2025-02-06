import { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import PropTypes from 'prop-types';
 
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
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);
    }

    initZoom(){
        this.shouldComponentUpdate
        this.componentDidUpdate
        this.handleZoomChange
        
    }

    render() {
       return (
           <div
                ref={ (input) => { this.ganttContainer = input } }
                style={ { width: '100%', height: '100%' } }
            ></div>
       );
    }
}
