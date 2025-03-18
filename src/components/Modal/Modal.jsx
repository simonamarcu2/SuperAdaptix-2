import { gantt } from "dhtmlx-gantt";
import { localData } from "../../services/localData";
import "./Modal.css";

const Modal = () => {
  const data = localData();
  const owners = data.instructors.map((instructor) => ({
    key: instructor.id,
    label: instructor.name,
    backgroundColor: instructor.backgroundColor,
    textColor: instructor.textColor,
  }));

  function findById(ownerId) {
    for (let i = 0; i < owners.length; i++) {
        if (owners[i].key == ownerId) {
            return owners[i];
        }
    }
    return owners[0];
  };

  gantt.config.lightbox.sections = [
    {
      name: "description",
      height: 30,
      map_to: "text",
      type: "textarea",
      focus: true,
    },
    {
      name: "template",
      label: "Instructor",
      height: 22,
      map_to: "instructor_id",
      type: "select",
      options: owners,
    },
    {
      name: "template",
      map_to: "my_template",
      type: "select",
      options: data.instructors.map((instructor) => ({
        key: instructor.id,
        label: instructor.name,
      })),
    },
    { name: "time", type: "duration", map_to: "auto", autofix_end: true },
  ];

  gantt.locale.labels.section_template = "Owner";

  function colorizeTask(task) {
    const owner = findById(task.owner_id);
    task.color = owner.backgroundColor;
    task.textColor = owner.textColor;
  }

  gantt.attachEvent("onAfterTaskAdd", function (id, item) {
    colorizeTask(item);
  });

  gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
    colorizeTask(item);
  });

  gantt.attachEvent("onBeforeLightbox", function(id) {
    const task = gantt.getTask(id);
    task.my_template = "<span id='title1'>Instructors: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
  });
  
  gantt.batchUpdate(function () {
    gantt.eachTask(function (task) {
        colorizeTask(task);
    })
})

  gantt.attachEvent("onBeforeTaskChanged", (id, mode, task) => {
    if (task.type === "owner") {
      const course_id = gantt.getTask(task.course_id);
      const children = gantt.getChildren(course_id.id);
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
