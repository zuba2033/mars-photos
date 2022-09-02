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
  const [manifestData, setManifestData] = useState(null);
  const [totalPhotosInSol, setTotalPhotosInSol] = useState(null);

  const onTotalPhotosInSolChanged = (totalPhotos) => {
    setTotalPhotosInSol(totalPhotos);
  }

  const onRoverSelected = (rover) => {
    setSelectedRover(rover);
  }

  const onSolSelected = (sol) => {
    setSelectedSol(sol);
  }

  const onRoverClicked = (rover) => {
    setClickedRover(rover);
  }

  return (
    <div className="App">
      <Banner/>
      <div className="App__wrapper">
        <FilterForm onRoverSelected={onRoverSelected}
                    onRoverClicked={onRoverClicked}
                    onSolSelected={onSolSelected}
                    maxSol={maxSol}
                    manifestData={manifestData}
                    onTotalPhotosInSolChanged={onTotalPhotosInSolChanged}  />
        <MissionManifest clickedRover={clickedRover} setMaxSol={setMaxSol} setManifestData={setManifestData}/>
      </div>
      <ImageGallery key={selectedRover + selectedSol} 
                    selectedRover={selectedRover} 
                    selectedSol={selectedSol}
                    totalPhotosInSol={totalPhotosInSol} />
    </div>
  );
}

export default App;
