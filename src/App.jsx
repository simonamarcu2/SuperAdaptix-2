import  { useState } from "react";
import "./App.css";
import Gantt from "./components/Gantt";
import Toolbar from "./components/Toolbar";
import testData from "./data/testData";
// import { ModalConfigBox } from "./components/ModalConfigBox";

const App = () => {
    const [currentZoom, setZoom] = useState("Days");
    const [messages, setMessages] = useState([]);
  
    const addMessage = (message) => {
      setMessages(arr => [...arr, message]);
    }
  
    const logDataUpdate = (type, action, item, id) => {
      let text = item && item.text ? ` (${item.text})` : '';
      let message = `${type} ${action}: ${id} ${text} `;
      if (type === 'link' && action !== 'delete') {
        message += ` ( source: ${item.source}, target: ${item.target} )`;
      }
      addMessage(message);
    }
  
    const handleZoomChange = (zoom) => {
      setZoom(zoom);
    }
    
    return (
        <div>
            <h1>SuperAdaptix</h1>
          <div className="zoom-bar">
            <Toolbar
              zoom={currentZoom}
              setZoom={handleZoomChange}
            />
          </div>
          <div className="gantt-container">
            <Gantt
              tasks={testData}
              zoom={currentZoom}
              onDataUpdated={logDataUpdate}
            />
          </div>
        </div>
    );
}

export default App;
