const columnsConfig = (gantt) => {
  gantt.config.columns = [
    {
      name: "text",
      label: "Course / Instructor",
      width: 120,
      tree: true,
      template: (task) => {
        if (task.type === "course") {
          return `<span style="font-weight: bold;">${task.text}</span>`;
        } else if (task.type === "instructor") {
          return `<span style="color: ${task.color};">${task.text}</span>`;
        }
        return task.text;
      },
    },
    {
      name: "start_date",
      label: "Start",
      width: 80,
      align: "center",
      template: (task) => gantt.date.date_to_str("%d-%m")(task.start_date),
    },
    {
      name: "duration",
      label: "Days",
      width: 50,
      align: "center",
    },
    { name: "add", label: "", width: 44 },
  ];
};

export default columnsConfig;
