import { useState, useEffect } from "react";
import Gantt from "./Gantt";
import ActionBar from "../../components/ActionBar";
import { fetchAllData } from "../../services/dataService";

const DRAFT_STORAGE_KEY = "ganttDrafts";

const GanttManager = () => {
  const [ganttInstances, setGanttInstances] = useState([]);
  const [selectedInstanceId, setSelectedInstanceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const fetchedData = await fetchAllData();
        const storedDrafts = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY)) || [];

        const defaultInstance = {
          id: "main",
          name: "Main Schedule",
          data: fetchedData,
          status: "saved",
        };

        setGanttInstances([defaultInstance, ...storedDrafts]);
        setSelectedInstanceId(defaultInstance.id);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const createNewGanttInstance = () => {
    const mainGantt = ganttInstances.find((g) => g.id === "main");

    if (!mainGantt) {
      console.error("Error: Main schedule not found");
      return;
    }

    const newInstance = {
      id: Date.now(),
      name: `Draft ${ganttInstances.length}`,
      data: JSON.parse(JSON.stringify(mainGantt.data)),
      status: "draft",
    };

    setGanttInstances((prevInstances) => {
      const updatedDrafts = [...prevInstances, newInstance];

      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify(updatedDrafts.filter((g) => g.status === "draft"))
      );

      return updatedDrafts;
    });

    setTimeout(() => {
      setSelectedInstanceId(newInstance.id);
      console.log("Switched to draft:", newInstance.id);
    }, 100);
  };

  const saveDraft = (id) => {
    const draft = ganttInstances.find((g) => g.id === id);
    if (!draft || draft.status !== "draft") return;

    setGanttInstances((prevInstances) =>
      prevInstances.map((g) => (g.id === id ? { ...g, status: "saved" } : g))
    );

    localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify(ganttInstances.filter((g) => g.status === "draft"))
    );
  };

  const deleteGanttInstance = (id) => {
    if (id === "main") {
      alert("You cannot delete the main schedule.");
      return;
    }

    const updatedInstances = ganttInstances.filter((g) => g.id !== id);

    if (id === selectedInstanceId) {
      setSelectedInstanceId("main");
    }

    setGanttInstances([...updatedInstances]);
    setTimeout(() => {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify(updatedInstances.filter((g) => g.status === "draft"))
      );
    }, 100);
  };

  const selectedGantt = ganttInstances.find((g) => g.id === selectedInstanceId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <select
        className="g-dropdown"
        id="gantt-select"
        onChange={(e) => setSelectedInstanceId(e.target.value)}
        value={selectedInstanceId}
      >
        {ganttInstances.map((gantt) => (
          <option key={gantt.id} value={gantt.id}>
            {gantt.name} ({gantt.status})
          </option>
        ))}
      </select>

      <ActionBar
        data={
          selectedGantt?.data || {
            courses: [],
            instructors: [],
            assignments: [],
          }
        }
        onCreate={createNewGanttInstance}
        onDelete={() => deleteGanttInstance(selectedInstanceId)}
        onSave={() => saveDraft(selectedInstanceId)}
        isDraft={selectedGantt?.status === "draft"}
      />

      {selectedGantt && (
        <Gantt
          key={selectedInstanceId}
          data={selectedGantt.data}
          onAssignmentsUpdated={(updatedTasks) => {
            setGanttInstances((prevInstances) =>
              prevInstances.map((g) =>
                g.id === selectedInstanceId
                  ? { ...g, data: { ...g.data, assignments: updatedTasks } }
                  : g
              )
            );

            if (selectedGantt.status === "draft") {
              localStorage.setItem(
                DRAFT_STORAGE_KEY,
                JSON.stringify(
                  ganttInstances.filter((g) => g.status === "draft")
                )
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default GanttManager;
