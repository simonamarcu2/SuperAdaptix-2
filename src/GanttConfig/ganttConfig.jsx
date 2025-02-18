const configureGantt = (gantt) => {
  gantt.setSkin("meadow");

  gantt.config.date_format = "%Y-%m-%d";
  gantt.config.autofit = true;
  gantt.config.branch_loading = true;
  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;
  gantt.config.sort = true; 
  gantt.config.drag_project = true;

  gantt.config.work_time = true;
  gantt.config.correct_work_time = true;

  gantt.config.auto_scheduling = true;
  gantt.config.auto_scheduling_strict = true;
  gantt.config.auto_scheduling_compatibility = true;

  gantt.templates.tooltip_text = (start, end, task) =>
    `<b>Course/Owner:</b> ${task.text}<br/><b>Instructor:</b> ${task.instructor}`;

  gantt.templates.task_class = (start, end, task) => task.instructor;
};

export default configureGantt;
