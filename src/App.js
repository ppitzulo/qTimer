import './App.css';
import React, { useState } from 'react';
import { Navbar, Timer, Stats} from './Components';
// import Navbar from './Components/navbar/Navbar'
function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Timer isActive={isActive} setIsActive={setIsActive}/>
      <Stats isActive={isActive}/>
    </div>
  );
}

export default App;
