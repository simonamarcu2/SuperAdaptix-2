import { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import configureColumns from '../../GanttConfig/configureColumns';
import configureModal from '../../GanttConfig/configureModal';
import configureGantt from '../../GanttConfig/ganttConfig';
import testData from "../../data/testData";

export default class Gantt extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { tasks } = this.props; 
    configureGantt(gantt);
  
    // gantt.templates.tooltip_text = (start, end, task) => {
    //   const resource = testData.resources.find(r => r.id === task.resource_id);
    //   return `<b>Title:</b> ${task.text}<br/><b>Instructor:</b> ${resource ? resource.text : 'Unknown'}`;
    // };
  
    // gantt.templates.task_class = (start, end, task) => {
    //   const resource = testData.resources.find(r => r.id === task.resource_id);
    //   return resource ? resource.text : 'default-color';
    // };

    gantt.plugins({
      auto_scheduling: true,
      click_drag: true,
      multiselect: true,
      overlay: true,
      tooltip: true,
      undo: true,
    });
    
    configureColumns(gantt);
    configureModal(gantt);

    gantt.templates.date_grid = function (date) {
      return gantt.date.date_to_str("%d %M")(date);
    };
    gantt.templates.scale_cell_class = function (date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };
    gantt.templates.timeline_cell_class = function (item, date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };

    gantt.attachEvent("onBeforeAutoSchedule", function () {
      gantt.message("Recalculating project schedule...");
      return true;
    });

    gantt.attachEvent(
      "onAfterTaskAutoSchedule",
      function (task, new_date, constraint, predecessor) {
        gantt.message({
          text:
            "<b>" +
            task.text +
            "</b> has been rescheduled to " +
            gantt.templates.task_date(new_date) +
            " due to <b>" +
            predecessor.text +
            "</b> constraint",
          expire: 4000,
        });
      }
    );

    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  render() {
    return (
      <div className="gantt-chart">
        <input type="button" value="Load tasks" onClick={() => gantt.parse(this.props.tasks)} />
        <input type="button" value="Remove tasks" onClick={() => gantt.clearAll()} />
        <div
          ref={(input) => {
            this.ganttContainer = input;
          }}
          style={{ width: "100%", height: `calc(100vh - 52px)` }}
        />
      </div>
    );
  }
}
