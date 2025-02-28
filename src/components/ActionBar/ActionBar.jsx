import PropTypes from "prop-types";
import { gantt } from "dhtmlx-gantt";
import "./ActionBar.css";

const ActionBar = ({ data, onCreate, onSave, onDelete, isDraft }) => {
  const zoomIn = () => gantt.ext.zoom.zoomIn();
  const zoomOut = () => gantt.ext.zoom.zoomOut();

  const undo = () => gantt.undo();
  const redo = () => gantt.redo();

  const exportToExcel = () => gantt.exportToExcel();
  const importFromExcel = () => {
    // Implement the import logic here
    console.log("Import from Excel");
  };

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
      id: gantt.uid(),
      text: "New Owner",
      start_date: task.start_date,
      duration: 5,
    };

    gantt.addTask(newOwner, selectedId);
  };

  return (
    <div className="gantt-action-bar" >
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={exportToExcel}>Export Excel</button>
      <button onClick={importFromExcel}>Import Excel</button>
      <button onClick={refreshGantt}>Refresh</button>
      <button onClick={addOwner}>Add Instructor</button>
      <button onClick={onCreate}>New Draft</button>
      <button onClick={onDelete} disabled={!isDraft}>
        Delete Draft
      </button>
      <button onClick={onSave} disabled={!isDraft}>
        Save Draft
      </button>
    </div>
  );
};

ActionBar.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.array,
    instructors: PropTypes.array,
    assignments: PropTypes.array,
  }),
  onCreate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDraft: PropTypes.bool.isRequired,
};

export default ActionBar;
