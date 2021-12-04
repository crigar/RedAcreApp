import React, { Fragment, useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent/MapComponent.component';
import List from './components/list/list.component';

function App() {
  let [listId, setListId] = useState(1);
  
  return (
    <div className="App">
      <div className="app-container">
      <h1 className="title">Movements Monitor {listId}</h1>
      <div className="seconds-movement">
          
        </div>
        <div className="map-container">
          <div className="list">
            <List toggleList={(listId) => setListId(listId)}></List>
          </div>
          <div className="map">
            <MapComponent 
              listId={listId}
              >
            </MapComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
