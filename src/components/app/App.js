import { useState } from 'react';
import '../../styles/style.scss';

import Banner from '../banner/Banner';
import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';
import MissionManifest from '../missionManifest/MissionManifest';

function App() {

  const [selectedRover, setSelectedRover] = useState(null);
  const [clickedRover, setClickedRover] = useState(null);
  const [selectedSol, setSelectedSol] = useState(null);
  const [maxSol, setMaxSol] = useState('-');

  const onRoverSelected = (rover) => {
    setSelectedRover(rover);
  }

  const onSolSelected = (sol) => {
    setSelectedSol(sol);
  }

  const onRoverClicked = (rover) => {
    setClickedRover(rover);
  }

  const getMaxSol = (sol) => {
    setMaxSol(sol);
  }

  return (
    <div className="App">
      <Banner/>
      <div className="App__wrapper">
        <FilterForm onRoverSelected={onRoverSelected}
                    onRoverClicked={onRoverClicked}
                    onSolSelected={onSolSelected}
                    maxSol={maxSol}  />
        <MissionManifest clickedRover={clickedRover} getMaxSol={getMaxSol}/>
      </div>
      <ImageGallery key={selectedRover + selectedSol} selectedRover={selectedRover} selectedSol={selectedSol} />
    </div>
  );
}

export default App;
