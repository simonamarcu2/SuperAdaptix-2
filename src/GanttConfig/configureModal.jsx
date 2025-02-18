import { instructor_names} from "../data/testData";

const configureModal = (gantt) => {

  // const instructors = ["Instructor 1", "Instructor 2", "Instructor 3", "Instructor 4", "Instructor 5", "Instructor 6", "Instructor 7", "Instructor 8", "Instructor 9", "Instructor 10"];
  instructor_names.forEach((instructor_names, index) => {
    gantt.addCalendar({
      id: `calendar_${index}`,
    });
    // Example: Set Monday to Friday as working days for each instructor
    for (let day = 1; day <= 5; day++) {
      gantt.getCalendar(`calendar_${index}`).setWorkTime({ day: day, hours: [9, 18] });
    }
  });

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
    return true;
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
};


  

export default configureModal;
