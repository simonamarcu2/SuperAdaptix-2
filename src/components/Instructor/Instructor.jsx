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
    console.error("Error initializing instructor calendars:", error);
  }
};

// const isInstructorAvailable = (instructorName, newStartDate, newEndDate) => {
//   const calendarId = `calendar_${instructorName}`;
//   const calendar = gantt.getCalendar(calendarId);

//   for (
//     let day = new Date(newStartDate);
//     day <= newEndDate;
//     day.setDate(day.getDate() + 1)
//   ) {
//     for (
//       let day = new Date(newStartDate);
//       day <= new Date(newEndDate);
//       day.setDate(day.getDate() + 1)
//     ) {
//       return false;
//     }
//   }
//   return true;
// };

// const handleCourseAssignment = async (
//   course,
//   instructorName,
//   startDate,
//   endDate
// ) => {
//   const calculateDuration = (startDate, endDate) => {
//     return Math.ceil(
//       (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
//     );
//   };
// };

const Instructor = () => {
  useEffect(() => {
    initializeInstructorCalendars();
  }, []);

  return null;
};

export default Instructor;
