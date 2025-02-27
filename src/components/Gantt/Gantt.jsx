import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Gantt.css";
import PropTypes from "prop-types";
import ganttConfig from "../../GanttConfig/ganttConfig";
import columnsConfig from "../../GanttConfig/columnsConfig";
import zoomConfig from "../../GanttConfig/zoomConfig";

const Gantt = ({ data }) => {
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
  
    return () => {
      gantt.clearAll();
    };
  }, [data]);
  
  return (
    <div>
      <div
        ref={ganttContainer}
        style={{ width: "100%", height: `calc(100vh - 52px)` }}
      />
    </div>
  );
};

Gantt.propTypes = {
  data: PropTypes.shape({
    courses: PropTypes.array.isRequired,
    instructors: PropTypes.array.isRequired,
    assignments: PropTypes.array.isRequired,
  }).isRequired,
};

export default Gantt;
