import { useState, useEffect } from "react";
import "./App.css";
import Gantt from "./components/Gantt";
// import Toolbar from "./components/Toolbar";
import testData from "./data/testData";

const App = () => {
    // const [currentZoom, setZoom] = useState("Days");
    // const [messages, setMessages] = useState([]);
    const [tasks, setTasks] = useState(testData);

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever they are updated
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // const addMessage = (message) => {
    //     setMessages(arr => [...arr, message]);
    // }

    const logDataUpdate = (type, action, item, id) => {
        let text = item && item.text ? ` (${item.text})` : '';
        let message = `${type} ${action}: ${id} ${text} `;
        if (type === 'link' && action !== 'delete') {
            message += ` ( source: ${item.source}, target: ${item.target} )`;
        }
        addMessage(message);
    }

    // const handleZoomChange = (zoom) => {
    //     setZoom(zoom);
    // }

    const handleDataUpdate = (updatedTasks) => {
        setTasks(updatedTasks);
        logDataUpdate('task', 'update', updatedTasks);
    }

    return (
        <div>
            <h2>SuperAdaptix</h2>
            {/* <div className="zoom-bar">
            </div> */}
            <div className="gantt-container">
                <Gantt
                    tasks={tasks}
                    onDataUpdated={handleDataUpdate}
                />
            </div>
        </div>
    );
}

export default App;
