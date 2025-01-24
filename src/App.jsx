import React, { Component } from 'react';
import Gantt from './components/Gantt';
import './App.css';
import testData from './data/testData';

class App extends Component {
    render() {
        return (
            <div>
              <h1>Super Adaptix</h1>
                <div className="gantt-container">
                    <Gantt tasks={testData}/>
                </div>
            </div>
        );
    }
}
export default App;
