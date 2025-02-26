import { useState, useEffect } from "react";
import "./App.css";
import Gantt from "./components/Gantt";
import { fetchAllData } from "../src/services/apiService";

const App = () => {
  const [data, setData] = useState({ courses: [], instructors: [], assignments: [] });
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
        } else {
          console.error("❌ Received invalid data structure:", fetchedData);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>SuperAdaptix</h1>
      <div className="gantt-container">
        <Gantt data={data} />
      </div>
    </div>
  );
};

export default App;
