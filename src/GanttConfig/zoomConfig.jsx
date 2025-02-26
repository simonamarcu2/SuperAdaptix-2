const zoomConfig = (gantt) => {
  gantt.ext.zoom.init({
    levels: [
      {
        name: "Day",
        scale_height: 27,
        min_column_width: 30,
        scales: [{ unit: "day", step: 1, format: "%d %M" }],
      },
      {
        name: "Week",
        scale_height: 50,
        min_column_width: 50,
        scales: [
          { unit: "week", step: 1, format: "Week #%W" },
          { unit: "day", step: 1, format: "%d %M" },
        ],
      },
      {
        name: "Month",
        scale_height: 50,
        min_column_width: 80,
        scales: [{ unit: "month", step: 1, format: "%F %Y" }],
      },
    ],
  });

  gantt.ext.zoom.setLevel("Week");
};

export default zoomConfig;
