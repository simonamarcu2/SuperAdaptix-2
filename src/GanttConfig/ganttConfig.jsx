const ganttConfig = (gantt) => {
  gantt.setSkin("meadow");

  gantt.plugins({
    auto_scheduling: true,
    click_drag: true,
    multiselect: true,
    overlay: true,
    tooltip: true,
    undo: true,
  });

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

  gantt.config.open_tree_initially = true;

  
  gantt.templates.date_grid = function (date) {
    return gantt.date.date_to_str("%d %M")(date);
  };
  gantt.templates.scale_cell_class = function (date) {
    if (!gantt.isWorkTime(date)) return "weekend";
  };
  gantt.templates.timeline_cell_class = function (item, date) {
    if (!gantt.isWorkTime(date)) return "weekend";
  };

  gantt.attachEvent("onBeforeAutoSchedule", function () {
    gantt.message("Recalculating project schedule...");
    return true;
  });

  gantt.attachEvent(
    "onAfterTaskAutoSchedule",
    function (task, new_date, constraint, predecessor) {
      gantt.message({
        text:
          "<b>" +
          task.text +
          "</b> has been rescheduled to " +
          gantt.templates.task_date(new_date) +
          " due to <b>" +
          predecessor.text +
          "</b> constraint",
        expire: 4000,
      });
    }
  );

  gantt.templates.tooltip_text = (start, end, data) => {
      return ` ${data.text}<br/>
              <b>Start:</b> ${gantt.templates.task_date(start)}`;
    };

  gantt.templates.task_class = function (start, end, task) {
    return "custom-task";
  };

  gantt.templates.task_text = function (start, end, task) {
    return `<div className="custom-color-task" style="background-color: ${task.color}">
              ${task.text}
            </div>`;
  };
};

export default ganttConfig;
