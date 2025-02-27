import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import ganttConfig from "../../GanttConfig/ganttConfig";
import columnsConfig from "../../GanttConfig/columnsConfig";
import zoomConfig from "../../GanttConfig/zoomConfig";
import ActionBar from "../ActionBar/actionBar";

const Gantt = ({ data, onAssignmentsUpdated }) => {
  const ganttContainer = useRef(null);
  
  useEffect(() => {
    if (!data?.assignments?.length) {
      return;
    }
  
    ganttConfig(gantt);
    columnsConfig(gantt);
    zoomConfig(gantt);
    
    gantt.init(ganttContainer.current);
    gantt.parse({ data: data.assignments });
    gantt.attachEvent("onAfterTaskUpdate", function(id, item) {
      onAssignmentsUpdated(gantt.serialize().data);
    });
    
    return () => {
      gantt.clearAll();
    };
  }, [data, onAssignmentsUpdated]);
  
  return (
    <div>
      <ActionBar data={data} />
      <div ref={ganttContainer} style={{ width: "100%", height: `calc(100vh - 52px)` }} />
    </div>
  );
};

Gantt.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.array.isRequired,
    instructors: PropTypes.array.isRequired,
    assignments: PropTypes.array.isRequired,
  }).isRequired,
  onAssignmentsUpdated: PropTypes.func.isRequired,
};

export default Gantt;
