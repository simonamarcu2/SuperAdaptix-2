import testData from "../data/testData";

const configureModal = (gantt) => {
  gantt.config.lightbox.sections = [
    {
      name: "description",
      height: 30,
      map_to: "text",
      type: "textarea",
      focus: true,
    },
    { name: "type", type: "typeselect", map_to: testData },
    { name: "template", height:30, type: "textarea", map_to: "my-template" },
    { name: "time", type: "duration", map_to: "auto", autofix_end: "true" },
  ];

  gantt.locale.labels.section_template = "Instructors";

  gantt.attachEvent("onBeforeLightbox", function(id) {
    var task = gantt.getTask(id);
    task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});

  // gantt.templates.lightbox_header = "Instructor";
  // gantt.attachEvent("onLightboxSave", function (id) {
  //   return true;
  // });

  // gantt.attachEvent("onLightboxSave", function (id, item) {
  //   if (!item.text) {
  //     gantt.message({ type: "error", text: "Enter a description!" });
  //     return false;
  //   }
  //   if (!item.user) {
  //     gantt.message({ type: "error", text: "Choose a worker for this task!" });
  //     return false;
  //   }
  //   return true;
  // });
};

export default configureModal;
