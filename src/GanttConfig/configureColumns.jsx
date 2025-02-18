import { instructor_names} from "../data/testData";

const configureColumns = (gantt) => {
  gantt.config.columns = [
    { name: "text", label: "Course Name", width: 100 },
    { name: "users", label: "Users", width: "*" ,map_to: instructor_names },
    {
      name: "start_date",
      label: "Start",
      width: "*",
      template: function (task) {
        return gantt.templates.date_grid(task.start_date);
      },
    },
    { name: "duration", label: "Days", width: 30, align: "center" },
    { name: "add", label: "", width: 44 },
  ];
  gantt.config.keep_grid_width = false;
	gantt.config.grid_resize = true;
};

export default configureColumns;
