import React, { Fragment, useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent/MapComponent.component';
import List from './components/list/list.component';
import SecondsMovement from './components/secondsMovement/secondsMovement.component';
import RouteService from './servicies/route.service';

function App() {
  let [secondsMovement, setSeconds] = useState(1);
  let [listId, setListId] = useState(1);
  const handlePath = (listId) => {
    setListId(listId);
  }


  return (
    <div className="App">
      <div className="app-container">
      <h1 className="title">Movements Monitor {secondsMovement} {listId}</h1>
      <div className="seconds-movement">
          <SecondsMovement toggleSeconds={(seconds) => setSeconds(seconds)}></SecondsMovement>
        </div>
        <div className="map-container">
          <div className="list">
            <List toggleList={(listId) => setListId(listId)}></List>
          </div>
          <div className="map">
            <MapComponent toggleSeconds={(listId) => handlePath(listId)} listId={listId}></MapComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
