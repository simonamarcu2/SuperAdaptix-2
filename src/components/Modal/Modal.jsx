import { useState, useEffect } from "react";
import { gantt } from "dhtmlx-gantt";
import { fetchAllData } from "../../services/apiService";

const Modal = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const loadInstructors = async () => {
      try {
      const data = await fetchAllData();
      setInstructors(data.instructors || []);
      } catch (error) {
      gantt.message({
        type: "error",
        text: "Failed to load instructors. Please try again later.",
      });
      }
    };
    loadInstructors();
  }, []);


  gantt.config.lightbox.sections = [
    {
      name: "description",
      height: 30,
      map_to: "text",
      type: "textarea",
      focus: true,
    },
    {
      name: "textColor",
      height: 22,
      map_to: "textColor",
      type: "select",
      options: instructors.map((instructor) => ({
        key: instructor.color,
        label: instructor.name,
      })),
    },
    {
      name: "template",
      options: instructors.map((instructor) => ({
        key: instructor.id,
        label: instructor.name,
      })),
      map_to: "my_template",
      type: "select",
    },
    { name: "time", type: "duration", map_to: "auto", autofix_end: true },
  ];

  gantt.locale.labels.section_template = "Instructor";

  gantt.attachEvent("onBeforeLightbox", function(id) {
    const task = gantt.getTask(id);
    task.my_template = "<span id='title1'>Instructors: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});

  gantt.attachEvent("onBeforeTaskChanged", (id, mode, task) => {
    if (task.type === "owner") {
      const parent = gantt.getTask(task.parent);
      const children = gantt.getChildren(parent.id);
      for (const childId of children) {
        const child = gantt.getTask(childId);
        if (child.id !== task.id && gantt.isTaskExists(child.id)) {
          if (
            (task.start_date >= child.start_date &&
              task.start_date < gantt.calculateEndDate(child)) ||
            (gantt.calculateEndDate(task) > child.start_date &&
              gantt.calculateEndDate(task) <= gantt.calculateEndDate(child))
          ) {
            gantt.message({
              type: "error",
              text: "Conflict detected: Instructor is already booked.",
            });
            return false;
          }
        }
      }
    }
    return true;
  });

  return null;
};

export default Modal;
