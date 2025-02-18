import "./Instructor.css";
import gantt from "dhtmlx-gantt"; // or the appropriate import for the gantt library



const Instructors = ["Instructor 1", "Instructor 2"];
Instructors.forEach((instructor, index) => {
  gantt.addCalendar({
    id: `calendar_${index}`,
  });
  // Example: Set Monday to Friday as working days for each instructor
  for (let day = 1; day <= 5; day++) {
    gantt.getCalendar(`calendar_${index}`).setWorkTime({ day: day, hours: [9, 18] });
  }
});

export default Instructors;
