import './App.css';
import Dice from './components/Dice';
import HeadsOrTails from './components/HeadsTails';
import RandomNambers from './components/RandomNumbers';

function App() {
  return (
    <div className="App">
      {/* <RandomNambers></RandomNambers> */}
      {/* <HeadsOrTails></HeadsOrTails> */}
      <Dice></Dice>
    </div>
  );
}

export default App;
