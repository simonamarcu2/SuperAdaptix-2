const configureColumns = (gantt) => {
  gantt.config.columns = [
    {
      name: "text",
      label: "Course/Owner",
      width: "*",
      template: (task) => {
        if (task.type === "course") {
          return task.text;
        } else if (task.type === "owner") {
          return task.text;
        }
        return "";
      },
    },
    {
      name: "start_date",
      label: "Start",
      width: 30,
      template: (task) => gantt.date.date_to_str("%d-%m")(task.start_date),
    },
    { name: "duration", label: "Days", width: 30, align: "center" },
    { name: "add", label: "", width: 44 },
  ];
};

export default configureColumns;
