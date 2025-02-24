import { useState, useEffect } from "react";
import "./App.css";
import Gantt from "./components/Gantt";
import { fetchAllData } from "./services/apiService";  // Import the new fetchAllData function

const App = () => {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);  // Added to hold courses data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { courses, instructors, assignments } = await fetchAllData();  // Fetch all the data
        
        // Map the fetched data into the format required by the Gantt component
        const coursesMap = new Map();
        const instructorsSet = new Set();
    
        assignments.forEach(item => {
          const { course_name, instructor_name, start_date, duration } = item;
    
          if (!coursesMap.has(course_name)) {
            coursesMap.set(course_name, {
              id: course_name,
              text: course_name,
              type: "course",
              open: true,
              children: []
            });
          }
    
          coursesMap.get(course_name).children.push({
            id: `${course_name}-${instructor_name}`,
            text: instructor_name,
            start_date,
            duration,
            type: "owner",
            parent: course_name
          });
    
          instructorsSet.add(instructor_name);
        });
    
        const tasksData = Array.from(coursesMap.values());
        const instructorsData = Array.from(instructorsSet).map((name, index) => ({
          id: index + 1,
          name
        }));
    
        setTasks(tasksData);
        setInstructors(instructorsData);
        setCourses(courses);  // Set courses data

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, message];
      if (newMessages.length > 50) {
        newMessages.shift();
      }
      return newMessages;
    });
  };

  const handleDataUpdate = async (updatedTasks) => {
    setTasks(updatedTasks);
  
    addMessage("task update: " + updatedTasks.map(task => task.text).join(", "));
  
    try {
      // Implement your API call to update the task data here
    } catch (error) {
      console.error("Error updating task data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>SuperAdaptix</h1>
      <div className="gantt-container">
        <Gantt
          tasks={tasks}
          instructors={instructors}
          courses={courses}  // Pass the courses data here
          onDataUpdated={handleDataUpdate}
        />
      </div>
    </div>
  );
};

export default App;
