import { saveAs } from "file-saver";
import Papa from "papaparse";
import PropTypes from "prop-types";
import "./ActionBar.css";
import { Gantt } from "dhtmlx-gantt";

class ActionBar extends Gantt {
  constructor(props) {
    super(props);
  }

  handleExportFieldsChange = (event) => {
    this.setState({ exportFields: event.target.value.split(",") });
  };

  handleImportFieldsChange = (event) => {
    this.setState({ importFields: event.target.value.split(",") });
  };

  exportToCSV = () => {
    const { tasks } = this.props;
    const { exportFields } = this.state;
    const csv = Papa.unparse(tasks.data, { columns: exportFields });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "gantt_tasks.csv");
  };

  importFromCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const tasks = {
            data: result.data.map((task) => {
              const filteredTask = {};
              this.props.importFields.forEach((field) => {
                if (task[field] !== undefined) {
                  filteredTask[field] = task[field];
                }
              });
              return filteredTask;
            }),
          };
          this.props.gantt.clearAll();
          this.props.gantt.parse(tasks);
        },
      });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.exportToCSV}>Export to CSV</button>
        <input type="file" accept=".csv" onChange={this.importFromCSV} />
        <button
          className="gantt-undo"
          onClick={() => this.props.gantt.undo()}
        >
          Undo
        </button>
        <button
          className="gantt-redo"
          onClick={() => this.props.gantt.redo()}
        >
          Redo
        </button>
        <button onClick={this.zoomIn}>Zoom In</button>
        <button onClick={this.zoomOut}>Zoom Out</button>
      </div>
    );
  }
}

ActionBar.propTypes = {
  tasks: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  exportFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  importFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  gantt: PropTypes.shape({
    clearAll: PropTypes.func.isRequired,
    parse: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
  }).isRequired,
};

export default ActionBar;
