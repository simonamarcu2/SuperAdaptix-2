 import { saveAs } from "file-saver";
import Papa from "papaparse";
// import PropTypes from "prop-types";
import "./ActionBar.css";

const actionBar = () => {

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

  addOwner = () => {
    const selectedId = this.props.gantt.getSelectedId();
    if (!selectedId) {
      this.props.gantt.message({ type: "error", text: "No course selected!" });
      return;
    }

    const task = this.props.gantt.getTask(selectedId);
    if (task.type !== "course") {
      this.props.gantt.message({ type: "error", text: "Please select a course!" });
      return;
    }

    const newOwner = {
      id: this.props.gantt.uid(),
      text: "New Owner",
      start_date: task.start_date,
      duration: 5,
      instructor: "Instructor 1",
      type: "owner",
      parent: task.id,
    };
    this.props.gantt.addTask(newOwner, task.id);
  };

  // render() {
  //   return (
  //     <div>
  //       <button onClick={this.exportToCSV}>Export to CSV</button>
  //       <input type="file" accept=".csv" onChange={this.importFromCSV} />
  //       {/* <button
  //         className="gantt-undo"
  //         onClick={() => this.props.gantt.undo()}
  //       >
  //         Undo
  //       </button>
  //       <button
  //         className="gantt-redo"
  //         onClick={() => this.props.gantt.redo()}
  //       >
  //         Redo
  //       </button> */}
  //       <button onClick={this.addOwner}>Add Owner</button>
  //     </div>
  //   );
  // }


// ActionBar.propTypes = {
//   tasks: PropTypes.shape({
//     data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   }).isRequired,
//   exportFields: PropTypes.arrayOf(PropTypes.string).isRequired,
//   importFields: PropTypes.arrayOf(PropTypes.string).isRequired,
//   gantt: PropTypes.shape({
//     clearAll: PropTypes.func.isRequired,
//     parse: PropTypes.func.isRequired,
//     addTask: PropTypes.func.isRequired,
//     getSelectedId: PropTypes.func.isRequired,
//     getTask: PropTypes.func.isRequired,
//     uid: PropTypes.func.isRequired,
//     message: PropTypes.func.isRequired,
//     // undo: PropTypes.func.isRequired,
//     // redo: PropTypes.func.isRequired,
//   }).isRequired,
// };
}

export default actionBar;
