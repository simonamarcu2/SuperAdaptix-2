import { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import configureGantt from "../../GanttConfig/ganttConfig";
import actionBar from "../../GanttConfig/actionBar";
import configureColumns from "../../GanttConfig/configureColumns";
import configureZoom from "../../GanttConfig/configureZoom";
import configureModal from "../../GanttConfig/configureModal";

export default class Gantt extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  state = {
    exportFields: ["id", "text", "start_date", "duration", "instructor"],
    importFields: ["id", "text", "start_date", "duration", "instructor"],
  };

  componentDidMount() {
    const { tasks } = this.props;

    configureGantt(gantt);
    configureZoom(gantt);
    configureColumns(gantt);
    configureModal(gantt);
    // actionBar(gantt);

    gantt.plugins({
      auto_scheduling: true,
      click_drag: true,
      multiselect: true,
      overlay: true,
      tooltip: true,
      undo: true,
    });

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
    // const { tasks } = this.props;
    // const { exportFields, importFields } = this.state;

    return (
      <div className="gantt-chart">
        <div className="gantt_control">
          {/* <ActionBar
            tasks={tasks}
            exportFields={exportFields}
            importFields={importFields}
            gantt={gantt}
          /> */}
        </div>
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
