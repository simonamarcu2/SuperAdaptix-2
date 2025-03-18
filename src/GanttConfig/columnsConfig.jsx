import { localData } from "../services/localData";

const columnsConfig = (gantt) => {
  const data = localData();

  gantt.config.columns = [
    {
      name: "text",
      label: "Course",
      width: "*",
      tree: true,
      template: (task) => {
        const course = data.courses.find((course) => course.id === task.id);
        return course ? course.name : "";
      }

    },
    {
      name: "start_date",
      label: "Start",
      width: 50,
      align: "center",
      template: (task) => gantt.date.date_to_str("%d-%m-%Y")(task.start_date),
    },
    {
      name: "duration",
      label: "Days",
      width: 20,
      align: "center",
      template: (task) => {
        const assignment = data.assignments.find(a => a.id === task.id);
        return assignment ? assignment.duration : "";
      },
    },
    { name: "add", label: "", width: 10 },
  ];

  const coursesMap = new Map();
  data.courses.forEach((course) => {
    coursesMap.set(course.id, {
      id: course.id,
      text: course.name,
      type: "course",
      open: true,
      children: [],
    });
  });

  data.assignments.forEach((assignment) => {
    const course = coursesMap.get(assignment.course_id);
    if (course) {
      const instructor = data.instructors.find((instructor) => instructor.id === assignment.instructor_id);
      course.children.push({
        id: assignment.id,
        text: instructor ? instructor.name : "",
        start_date: assignment.start_date,
        duration: assignment.duration,
        type: "owner",
        course_id: course.id,
      });
    }
  });

  const tasksData = Array.from(coursesMap.values());
  gantt.parse({ data: tasksData });
};

export default columnsConfig;
