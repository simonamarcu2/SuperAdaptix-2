import "./Instructor.css";
import { useEffect } from "react";
import { fetchInstructorAssignments } from "../../services/apiService";
import { gantt } from "dhtmlx-gantt";


const initializeInstructorCalendars = async () => {
  try {
    const assignments = await fetchInstructorAssignments();

    assignments.forEach(({ instructor_name, start_date, end_date }) => {
      const calendarId = `calendar_${instructor_name}`;

      gantt.addCalendar({ id: calendarId });

      for (let day = 1; day <= 5; day++) {
        gantt.getCalendar(calendarId).setWorkTime({ day: day, hours: [9, 18] });
      }

      const start = new Date(start_date);
      const end = new Date(end_date);
      for (
        let day = new Date(start);
        day.getTime() <= end.getTime();
        day.setDate(day.getDate() + 1)
      ) {
        gantt.getCalendar(calendarId).setWorkTime({ date: day });
      }
    });
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
  }
};

const Instructor = () => {
  useEffect(() => {
    initializeInstructorCalendars();
  }, []);

  return null;
};

export default Instructor;
