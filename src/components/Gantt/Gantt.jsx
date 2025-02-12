import { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import testData from "../../data/testData.jsx";
import Instructor from "../Instructor/Instructor.jsx";

export default class Gantt extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  state = {
    exportFields: ["id", "text", "start_date", "duration", "owner"],
    importFields: ["id", "text", "start_date", "duration", "owner"],
  };

  handleExportFieldsChange = (event) => {
    this.setState({ exportFields: event.target.value.split(",") });
  };

  handleImportFieldsChange = (event) => {
    this.setState({ importFields: event.target.value.split(",") });
  };

  componentDidMount() {
    const { tasks } = this.props;
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.autofit = true;
    gantt.config.grid_width = 500;
    gantt.setSkin("skyblue");
    gantt.templates.tooltip_text = function (start, end, task) {
      return (
        "<b>Task:</b> " +
        task.text +
        "<br/><b>Instructor:</b> " +
        task.owner
      );
    };

    gantt.templates.task_class = function (start, end, task) {
      return task.color;
    };

    gantt.config.lightbox.sections = [
      {
        name: "description",
        height: 30,
        map_to: "text",
        type: "textarea",
        focus: true,
      },
      {
        name: "template",
        height: 30,
        type: "textarea",
        map_to: "owner",
      },
      { name: "time", type: "duration", map_to: "auto", autofix_end: "true" },
    ];
    gantt.locale.labels.section_template = "Instructor";
    gantt.attachEvent("onBeforeLightbox", function (id) {
      return true;
    });

    gantt.config.columns = [
      { name: "count", label: "Count", width: 30, template: gantt.getWBSCode },
      { name: "text", label: "Course Name", width: "*" },
      { name: "owner", label: "Instructor", width: "*" },
      {
        name: "start_date",
        label: "Start",
        width: 30,
        template: function (task) {
          return gantt.date.date_to_str("%d-%m")(task.start_date);
        },
      },
      { name: "duration", label: "Days", width: 30, align: "center" },
      { name: "add", label: "", width: 44 },
    ];

    gantt.templates.date_grid = function (date) {
      return gantt.date.date_to_str("%d %M")(date);
    };
    gantt.templates.scale_cell_class = function (date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };
    gantt.templates.timeline_cell_class = function (item, date) {
      if (!gantt.isWorkTime(date)) return "weekend";
    };

    const zoomConfig = {
      levels: [
        {
          name: "hour",
          scale_height: 27,
          min_column_width: 15,
          scales: [
            { unit: "day", format: "%d" },
            { unit: "hour", format: "%H" },
          ],
        },
        {
          name: "day",
          scale_height: 27,
          min_column_width: 80,
          scales: [{ unit: "day", step: 1, format: "%d %M" }],
        },
        {
          name: "week",
          scale_height: 50,
          min_column_width: 50,
          scales: [
            {
              unit: "week",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%d %M");
                var endDate = gantt.date.add(date, 7 - date.getDay(), "day");
                var weekNum = gantt.date.date_to_str("%W")(date);
                return (
                  "#" +
                  weekNum +
                  ", " +
                  dateToStr(date) +
                  " - " +
                  dateToStr(endDate)
                );
              },
            },
            { unit: "day", step: 1, format: "%j %D" },
          ],
        },
        {
          name: "month",
          scale_height: 50,
          min_column_width: 120,
          scales: [
            { unit: "month", format: "%F, %Y" },
            { unit: "week", format: "Week #%W" },
          ],
        },
        {
          name: "quarter",
          height: 50,
          min_column_width: 90,
          scales: [
            {
              unit: "quarter",
              step: 1,
              format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(
                  date,
                  2 - (date.getMonth() % 3),
                  "month"
                );
                return dateToStr(date) + " - " + dateToStr(endDate);
              },
            },
            { unit: "month", step: 1, format: "%M" },
          ],
        },
        {
          name: "year",
          scale_height: 50,
          min_column_width: 30,
          scales: [{ unit: "year", step: 1, format: "%Y" }],
        },
      ],
      useKey: "ctrlKey",
      trigger: "wheel",
      element: function () {
        return gantt.$root.querySelector(".gantt_task");
      },
    };

    gantt.ext.zoom.init(zoomConfig);
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.correct_work_time = true;
    gantt.config.auto_scheduling = true;
    gantt.config.auto_scheduling_strict = true;
    gantt.config.auto_scheduling_compatibility = true;
    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("week");

    gantt.plugins({
      auto_scheduling: true,
      click_drag: true,
      marker: true,
      multiselect: true,
      overlay: true,
      quick_info: true,
      tooltip: true,
      undo: true,
    });

    gantt.templates.quick_info_content = function(start, end, task){ 
      return task.owner || task.text;
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

    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;

    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  exportToCSV = () => {
    const { tasks } = this.props;
    const { exportFields } = this.state;
    const csv = Papa.unparse(tasks.data, { columns: exportFields });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "gantt_tasks.csv");
  };

  importFromCSV = (event) => {
    const { importFields } = this.state;
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const tasks = {
            data: result.data.map((task) => {
              const filteredTask = {};
              importFields.forEach((field) => {
                if (task[field] !== undefined) {
                  filteredTask[field] = task[field];
                }
              });
              return filteredTask;
            }),
          };
          gantt.clearAll();
          gantt.parse(tasks);
        },
      });
    }
  };

  zoomIn = () => {
    gantt.ext.zoom.zoomIn();
  };

  zoomOut = () => {
    gantt.ext.zoom.zoomOut();
  };

  render() {
    return (
      <div className="gantt-chart">
        <div className="gantt_control">
          <button onClick={this.exportToCSV}>Export</button>
          <input className="import-csv" type="file" accept=".csv" onChange={this.importFromCSV} />
          <button
            className="gantt-undo"
            value="Undo"
            type="button"
            onClick={() => gantt.undo()}
          >
            Undo
          </button>
          <button
            className="gantt-redo"
            value="Redo"
            type="button"
            onClick={() => gantt.redo()}
          >
            Redo
          </button>
          <button onClick={this.zoomIn}>Zoom In</button>
          <button onClick={this.zoomOut}>Zoom Out</button>
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
