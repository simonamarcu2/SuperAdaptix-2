const configureZoom = (gantt) => {
  const zoomConfig = {
    levels: [
      {
        name: "hour",
        scale_height: 27,
        min_column_width: 15,
        scales: [
          { unit: "day", format: "%d" },
          { unit: "hour", format: "%H" },
        ],
      },
      {
        name: "day",
        scale_height: 27,
        min_column_width: 80,
        scales: [{ unit: "day", step: 1, format: "%d %M" }],
      },
      {
        name: "week",
        scale_height: 50,
        min_column_width: 50,
        scales: [
          {
            unit: "week",
            step: 1,
            format: function (date) {
              const dateToStr = gantt.date.date_to_str("%d %M");
              const endDate = gantt.date.add(date, 7 - date.getDay(), "day");
              const weekNum = gantt.date.date_to_str("%W")(date);
              return (
                "#" +
                weekNum +
                ", " +
                dateToStr(date) +
                " - " +
                dateToStr(endDate)
              );
            },
          },
          { unit: "day", step: 1, format: "%j %D" },
        ],
      },
      {
        name: "month",
        scale_height: 50,
        min_column_width: 120,
        scales: [
          { unit: "month", format: "%F, %Y" },
          { unit: "week", format: "Week #%W" },
        ],
      },
      {
        name: "quarter",
        height: 50,
        min_column_width: 90,
        scales: [
          {
            unit: "quarter",
            step: 1,
            format: function (date) {
              const dateToStr = gantt.date.date_to_str("%M");
              const endDate = gantt.date.add(
                date,
                2 - (date.getMonth() % 3),
                "month"
              );
              return dateToStr(date) + " - " + dateToStr(endDate);
            },
          },
          { unit: "month", step: 1, format: "%M" },
        ],
      },
      {
        name: "year",
        scale_height: 50,
        min_column_width: 30,
        scales: [{ unit: "year", step: 1, format: "%Y" }],
      },
    ],
    useKey: "ctrlKey",
    trigger: "wheel",
    element: function () {
      return gantt.$root.querySelector(".gantt_task");
    },
  };

  gantt.ext.zoom.init(zoomConfig);
  gantt.ext.zoom.setLevel("week");
};

export default configureZoom;
