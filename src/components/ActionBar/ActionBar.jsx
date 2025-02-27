import PropTypes from "prop-types";
import { gantt } from "dhtmlx-gantt";
import "./actionBar.css";

const ActionBar = ({ data }) => {
  const zoomIn = () => gantt.ext.zoom.zoomIn();
  const zoomOut = () => gantt.ext.zoom.zoomOut();

  const undo = () => gantt.undo();
  const redo = () => gantt.redo();

  const exportToExcel = () => gantt.exportToExcel();

  const refreshGantt = () => {
    gantt.clearAll();
    gantt.parse({ data: data.assignments });
  };

    const addOwner = () => {
      const selectedId = gantt.getSelectedId();
      if (!selectedId) {
        gantt.message({ type: "error", text: "No course selected!" });
        return;
      }
  
      const task = gantt.getTask(selectedId);
      if (task.type !== "course") {
        gantt.message({ type: "error", text: "Please select a course!" });
        return;
      }
  
      const newOwner = {
              id: this.props.gantt.uid(),
              text: "New Owner",
              start_date: task.start_date,
              duration: 5,
          render() {
            return (
              <div>
                <button onClick={this.exportToCSV}>Export to CSV</button>
                <input type="file" accept=".csv" onChange={this.importFromCSV} />
                <button onClick={this.addOwner}>Add Owner</button>
              </div>
            );
          
          }
      };

      gantt.addTask(newOwner, selectedId);
    }
  
    return (
      <div className="gantt-action-bar">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={exportToExcel}>Export Excel</button>
        <button onClick={refreshGantt}>Refresh</button>
        <button onClick={addOwner}>Add Instructor</button>
      </div>
    );
  };


ActionBar.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.array.isRequired,
    instructors: PropTypes.array.isRequired,
    assignments: PropTypes.array.isRequired,
  }).isRequired,
};

export default ActionBar;
