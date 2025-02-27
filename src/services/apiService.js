const BASE_URL = "http://localhost:1337/api";
const API_URL_COURSES = `${BASE_URL}/courses`;
const API_URL_INSTRUCTORS = `${BASE_URL}/instructors`;
const API_URL_ASSIGNMENTS = `${BASE_URL}/assignments`;

export const fetchAllData = async () => {
  try {
    const [coursesResponse, instructorsResponse, assignmentsResponse] = await Promise.all([
      fetch(API_URL_COURSES),
      fetch(API_URL_INSTRUCTORS),
      fetch(API_URL_ASSIGNMENTS),
    ]);

    if (!coursesResponse.ok || !instructorsResponse.ok || !assignmentsResponse.ok) {
      throw new Error("Failed to fetch all data");
    }

    const coursesData = await coursesResponse.json();
    const instructorsData = await instructorsResponse.json();
    const assignmentsData = await assignmentsResponse.json();

    const instructorColors = instructorsData.instructors.reduce((acc, instructor) => {
      acc[instructor.name] = instructor.color || "#49cda3";
      return acc;
    }, {});

    const formattedAssignments = assignmentsData.assignments.map((assignment) => ({
      id: assignment.id,
      text: assignment.name,
      start_date: assignment.start_date,
      end_date: assignment.end_date,
      parent: assignment.parent || 0,
      instructor_name: assignment.instructor_name,
      color: instructorColors[assignment.instructor_name] || "#49cda3",
    }));

    return {
      courses: coursesData?.courses ?? [],
      instructors: instructorsData?.instructors ?? [],
      assignments: formattedAssignments,
    };
  } catch (error) {
    return { courses: [], instructors: [], assignments: [] };
  }
};

const apiRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Request failed: ${errorDetails}`);
    }

    if (response.status === 204) {
      return { message: `${method} request successful`, status: response.status };
    }

    return response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const addCourse = (course) => apiRequest(API_URL_COURSES, "POST", course);
export const updateCourse = (id, course) => apiRequest(`${API_URL_COURSES}/${id}`, "PUT", course);
export const deleteCourse = (id) => apiRequest(`${API_URL_COURSES}/${id}`, "DELETE");

export const addInstructor = (instructor) => apiRequest(API_URL_INSTRUCTORS, "POST", instructor);
export const updateInstructor = (id, instructor) => apiRequest(`${API_URL_INSTRUCTORS}/${id}`, "PUT", instructor);
export const deleteInstructor = (id) => apiRequest(`${API_URL_INSTRUCTORS}/${id}`, "DELETE");

export const addAssignment = (assignment) => apiRequest(API_URL_ASSIGNMENTS, "POST", assignment);
export const updateAssignment = (id, assignment) => apiRequest(`${API_URL_ASSIGNMENTS}/${id}`, "PUT", assignment);
export const deleteAssignment = (id) => apiRequest(`${API_URL_ASSIGNMENTS}/${id}`, "DELETE");
