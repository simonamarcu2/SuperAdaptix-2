import { useState, useEffect } from "react";
import "./App.css";
import Gantt from "./components/Gantt";
import { fetchAllData } from "../src/services/apiService";
import Header from "./components/Header/Header";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [data, setData] = useState({
    courses: [],
    instructors: [],
    assignments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchAllData();
        if (fetchedData?.courses && fetchedData?.assignments) {
          setData({
            courses: fetchedData.courses,
            instructors: fetchedData.instructors,
            assignments: fetchedData.assignments,
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleDataUpdate = async (updatedTasks) => {
    setData((prevData) => ({
      ...prevData,
      assignments: updatedTasks,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ErrorBoundary>
      <div>
        <Header instructors={data.instructors} />
        <div className="gantt-container">
          <Gantt data={data} onAssignmentsUpdated={handleDataUpdate} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
