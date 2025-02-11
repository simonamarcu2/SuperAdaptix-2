import { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import testData from "../../data/testData.jsx";
import Instructor from "../Instructor/Instructor.jsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export default class Gantt extends Component {

    static propTypes = {
    tasks: PropTypes.object.isRequired,
  };

  state = {
    exportFields: ['id', 'text', 'start_date', 'duration', 'instructor_name'],
    importFields: ['id', 'text', 'start_date', 'duration', 'instructor_name']
  };

  handleExportFieldsChange = (event) => {
    this.setState({ exportFields: event.target.value.split(',') });
  };

  handleImportFieldsChange = (event) => {
    this.setState({ importFields: event.target.value.split(',') });
  };

  componentDidMount() {
    const { tasks } = this.props;
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.autofit = true;
    gantt.config.grid_width = 500;
    
    gantt.plugins({
      multiselect: true,
      tooltip: true,
    });

    gantt.templates.tooltip_text = function (start, end, task) {
      return (
        "<b>Task:" +
        task.text +
        "<br/><b>Instructor:" +
        task.instructor_name +
        "<br/><b>Duration:" +
        task.duration
      );
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
        name: "instructor",
        height: 30,
        map_to: "instructor_name",
        type: "textarea",
      },
      { name: "time", type: "duration", map_to: "auto", autofix_end: "true" },
    ];

    gantt.attachEvent("onLightbox", function (task_id) {
      const task = gantt.getTask(task_id);
      const instructor = task.instructor_name;
      const instructorElement = document.querySelector(
        ".gantt_task_instructor"
      );
      instructorElement.innerHTML = instructor;
    });

    gantt.config.columns = [
      { name: "count", label: "Count", width: 30, template: gantt.getWBSCode },
      { name: "text", label:"Course Name", width: "*" },
      { name: "instructor_name", label: "Name", width: "*" },
      {
        name: "start_date",
        label: "Start",
        width: 30,
        template: function (task) {
          return gantt.templates.date_grid(task.start_date);
        },
      },
      { name: "duration", label: "Days", width: 30, align: "center" },
      { name: "add", label: "", width: 44 },
    ];

    gantt.templates.date_grid = function (date) {
      return gantt.date.date_to_str("%d %M")(date);
    };

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
          const tasks = { data: result.data.map(task => {
            const filteredTask = {};
            importFields.forEach(field => {
              if (task[field] !== undefined) {
                filteredTask[field] = task[field];
              }
            });
            return filteredTask;
          })};
          gantt.clearAll();
          gantt.parse(tasks);
        },
      });
    }
  };

  render() {
    return (
      <div className="gantt-chart">
        <div>
          <button onClick={this.exportToCSV}>Export to CSV</button>
        </div>
        <div>
          <input type="file" accept=".csv" onChange={this.importFromCSV} />
        </div>
        {testData.data.map((task) => (
          <div
            ref={(input) => {
              this.ganttContainer = input;
            }}
            key={task.id}
            style={{ width: "100%", height: "100%" }}
            className={`gantt-task ${Instructor[task.instructor_name]}`}>
            {task.text}
          </div>
        ))}
      </div>
    );
  }
}
