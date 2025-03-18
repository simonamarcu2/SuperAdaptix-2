export const localData = () => ({
  courses: [
    { id: 1, name: "Data Science" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Cybersecurity" },
    { id: 4, name: "Cloud Computing" },
    { id: 5, name: "Machine Learning" },
    { id: 6, name: "Programming" },
    { id: 7, name: "JavaScript" },
    { id: 8, name: "Python" },
    { id: 9, name: "Java" },
    { id: 10, name: "C#" },
  ],

  instructors: [
    { id: 1, name: "Alice Smith", color: "#264653" },
    { id: 2, name: "Bob Johnson", color: "#2A9D8F" },
    { id: 3, name: "Carol Williams", color: "#E9C46A" },
    { id: 4, name: "Frank Miller", color: "#F4A261" },
    { id: 5, name: "Grace Brown", color: "#E76F51" },
    { id: 6, name: "Henry Davis", color: "#6D597A" },
    { id: 7, name: "Ivy Wilson", color: "#8D99AE" },
    { id: 8, name: "Jack White", color: "#D62828" },
    { id: 9, name: "Kelly Harris", color: "#457B9D" },
    { id: 10, name: "Larry Martin", color: "#1D3557" },
  ],

  assignments: [
    { id: 1, course_id: 1, instructor_id: 1, start_date: "2025-03-01", end_date: "2025-03-10", duration: 10 },
    { id: 2, course_id: 2, instructor_id: 2, start_date: "2025-03-05", end_date: "2025-03-12", duration: 7 },
    { id: 3, course_id: 3, instructor_id: 3, start_date: "2025-03-10", end_date: "2025-03-20", duration: 10 },
    { id: 4, course_id: 4, instructor_id: 4, start_date: "2025-03-01", end_date: "2025-03-07", duration: 6 },
    { id: 5, course_id: 5, instructor_id: 5, start_date: "2025-03-12", end_date: "2025-03-19", duration: 7 },
    { id: 6, course_id: 6, instructor_id: 6, start_date: "2025-03-15", end_date: "2025-03-25", duration: 10 },
    { id: 7, course_id: 7, instructor_id: 7, start_date: "2025-03-03", end_date: "2025-03-10", duration: 7 },
    { id: 8, course_id: 8, instructor_id: 8, start_date: "2025-03-01", end_date: "2025-03-10", duration: 9 },
    { id: 9, course_id: 9, instructor_id: 9, start_date: "2025-03-14", end_date: "2025-03-21", duration: 7 },
    { id: 10, course_id: 10, instructor_id: 10, start_date: "2025-03-07", end_date: "2025-03-14", duration: 10 },
    { id: 11, course_id: 1, instructor_id: 2, start_date: "2025-03-15", end_date: "2025-03-25", duration: 10 },
    { id: 12, course_id: 1, instructor_id: 3, start_date: "2025-03-01", end_date: "2025-03-10", duration: 10 },
  ]
});
