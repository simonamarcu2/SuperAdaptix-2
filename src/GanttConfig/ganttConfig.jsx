const ganttConfig = (gantt) => {
  gantt.setSkin("meadow");

  gantt.config.work_time = true;
  gantt.config.correct_work_time = true;
  gantt.config.skip_off_time = true;

  gantt.config.auto_scheduling = true;
  gantt.config.auto_scheduling_strict = true;
  gantt.config.auto_scheduling_compatibility = true;

  gantt.config.date_format = "%Y-%m-%d";
  gantt.config.autofit = true;
  gantt.config.branch_loading = true;
  gantt.config.order_branch = true;
  gantt.config.sort = true;
  gantt.config.drag_project = true;

  gantt.templates.tooltip_text = (start, end, data) => {
    if (data.parent === 0) {
      return `<b>Course:</b> ${data.text}<br/><b>Start:</b> ${gantt.templates.task_date(start)}<br/><b>End:</b> ${gantt.templates.task_date(end)}`;
    }
    return `<b>Instructor:</b> ${data.text}<br/><b>Start:</b> ${gantt.templates.task_date(start)}<br/><b>End:</b> ${gantt.templates.task_date(end)}`;
  };
  
  gantt.templates.task_class = (start, end, data) => {
    if (data.parent === 0) return "gantt_course_task";
    return "gantt_instructor_task";
  };
};

export default ganttConfig;
