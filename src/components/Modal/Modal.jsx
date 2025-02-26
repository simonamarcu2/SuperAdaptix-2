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
        console.error("Error loading instructors:", error);
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
      name: "instructor",
      options: instructors.map((instructor) => ({
        key: instructor.id,
        label: instructor.name,
      })),
      map_to: "instructor_id",
      type: "select",
    },
    { name: "time", type: "duration", map_to: "auto", autofix_end: true },
  ];

  gantt.locale.labels.section_instructor = "Instructor";

  gantt.templates.task_class = (start, end, task) => {
    return task.type === "course" ? "course-task" : "owner-task";
  };

  gantt.attachEvent("onBeforeLightbox", (id) => {
    const task = gantt.getTask(id);
    if (task.type === "course") {
      gantt.config.lightbox.sections = [
        {
          name: "description",
          height: 30,
          map_to: "text",
          type: "textarea",
          focus: true,
        },
      ];
    } else {
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
          options: instructors.map((instructor) => ({
            key: instructor.id,
            label: instructor.name,
          })),
          map_to: "instructor_id",
          type: "select",
        },
        { name: "time", type: "duration", map_to: "auto", autofix_end: true },
      ];
    }
    return true;
  });

  gantt.attachEvent("onTaskLoading", (task) => {
    if (task.type === "course") {
      task.open = true;
    }
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
