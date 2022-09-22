import './App.css';

import { Navbar, Timer, Stats} from './Components';
// import Navbar from './Components/navbar/Navbar'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Timer />
      <Stats />
    </div>
  );
}

export default App;
