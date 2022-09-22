import './App.css';
import React, { useState } from 'react';
import { Header, Timer, Stats } from './Components';

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <Header />
      <Timer isActive={isActive} setIsActive={setIsActive}/>
      <Stats isActive={isActive}/>
    </div>
  );
}

export default App;
