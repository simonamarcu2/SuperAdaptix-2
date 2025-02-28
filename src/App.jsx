import "./App.css";
import Header from "./components/Header/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import GanttManager from "./components/Gantt/GanttManager";

const App = () => {
  return (
    <ErrorBoundary>
      <div>
        <Header />
        <div className="gantt-container">
          <GanttManager />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
