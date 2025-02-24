import "./Instructor.css";
import gantt from "dhtmlx-gantt";
import { fetchInstructorAssignments } from "./services/apiService"; // Assuming an API call to fetch instructor assignments

// This will track all the instructors and their availability
const initializeInstructorsCalendars = async (instructors) => {
  // Fetch assignments for all instructors to update their schedules
  try {
    const assignments = await fetchInstructorAssignments();
    
    instructors.forEach((instructor, index) => {
      // Create a calendar for each instructor
      gantt.addCalendar({
        id: `calendar_${index}`,
      });

      // Set the default work hours for the instructor
      for (let day = 1; day <= 5; day++) {
        gantt.getCalendar(`calendar_${index}`).setWorkTime({ day: day, hours: [9, 18] });
      }

      // Populate the calendar with booked times
      assignments.forEach((assignment) => {
        if (assignment.instructor_name === instructor.name) {
          const startDate = new Date(assignment.start_date);
          const endDate = new Date(assignment.end_date);

          // Add the booked time as non-working hours for this instructor
          for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
            gantt.getCalendar(`calendar_${index}`).setWorkTime({
              day: day.getDay(),
              hours: [], // No work hours for this day due to conflict
            });
          }
        }
      });
    });
  } catch (error) {
    console.error("Error initializing instructors' calendars:", error);
  }
};

// Conflict Detection Function
const isInstructorAvailable = (instructorName, newStartDate, newEndDate) => {
  const instructorIndex = Instructors.findIndex((instructor) => instructor.name === instructorName);
  const calendarId = `calendar_${instructorIndex}`;

  // Get the instructor's calendar
  const calendar = gantt.getCalendar(calendarId);

  // Loop through the calendar to check if the new course overlaps with existing bookings
  for (let day = new Date(newStartDate); day <= newEndDate; day.setDate(day.getDate() + 1)) {
    const workHours = calendar.getWorkTime(day.getDay());
    if (workHours.length === 0) {
      return false; // Conflict found, instructor is already booked for this day
    }
  }

  return true; // No conflict
};

// Example of using the conflict detection before assigning an instructor to a new course
const handleCourseAssignment = async (course, instructorName, startDate, endDate) => {
  const isAvailable = await isInstructorAvailable(instructorName, startDate, endDate);

  if (!isAvailable) {
    alert(`Conflict: ${instructorName} is already booked for this time.`);
    return; // Prevent assignment
  }

  // Proceed with assigning the instructor to the course if available
  // Add the assignment to the Gantt chart
  gantt.addTask({
    id: course.id,
    text: course.name,
    start_date: startDate,
    duration: calculateDuration(startDate, endDate),
    instructor_name: instructorName,
  });

  console.log(`${instructorName} successfully assigned to ${course.name}`);
};

// Function to calculate the duration of the course
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInDays = Math.ceil((end - start) / (1000 * 3600 * 24)); // Convert to days
  return diffInDays;
};

// Initialize the instructors when the component loads
initializeInstructorsCalendars(Instructors);

export default Instructors;
