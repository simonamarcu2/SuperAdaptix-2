import { useState, useEffect } from 'react';

const Modal = (gantt) => {

  const [instructorNames, setInstructorNames] = useState([]);

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
      options: instructorNames.map((instructorName, index) => ({ key: `calendar_${index}`, label: instructorName })),
      map_to: "instructor_names",
      type: "select",
    },
    { name: "time", type: "duration", map_to: "auto", autofix_end: "true" },
  ];
  gantt.templates.task_class = (_, __, task) => {
  gantt.locale.labels.section_template = "Instructor";

  gantt.templates.task_class = (start, end, task) => {
    if (task.type === "course") {
      return "course-task";
    }
    return "owner-task";
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
          height: 30,
          map_to: "instructor_names",
          type: "select",
          options: instructor_names.map((instructor_names, index) => ({ key: `calendar_${index}`, label: instructor_names })),
        },
        { name: "time", type: "duration", map_to: "auto", autofix_end: "true" },
      ];
    }
    return true;
  });
  gantt.attachEvent("onTaskLoading", (task) => {
    if (task.type === "course") {
      task.open = true;
    }
  gantt.attachEvent("onBeforeTaskChanged", (_, __, task) => {
  });

  gantt.attachEvent("onBeforeTaskChanged", (id, mode, task) => {
    if (task.type === "owner") {
      const parent = gantt.getTask(task.parent);
      const children = gantt.getChildren(parent.id);
      for (let i = 0; i < children.length; i++) {
        const child = gantt.getTask(children[i]);
        if (child.id !== task.id && gantt.isTaskExists(child.id)) {
          if (
            (task.start_date >= child.start_date &&
              task.start_date < gantt.calculateEndDate(child)) ||
            (gantt.calculateEndDate(task) > child.start_date &&
              gantt.calculateEndDate(task) <= gantt.calculateEndDate(child))
          ) {
            gantt.message({
              type: "error",
              text: "Conflict detected: Double booking of instructor.",
            });
            return false;
          }
        }
      }
    }
    return true;
  });
})
  }}

export default Modal;
