import { useState } from 'react';

import '../../styles/style.scss';

import Banner from '../banner/Banner';
import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';
import MissionManifest from '../missionManifest/MissionManifest';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {

  const [selectedRover, setSelectedRover] = useState(null);
  const [clickedRover, setClickedRover] = useState(null);
  const [selectedSol, setSelectedSol] = useState(null);
  const [maxSol, setMaxSol] = useState('-');
  const [manifestData, setManifestData] = useState(null);
  const [totalPhotosInSol, setTotalPhotosInSol] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <ErrorBoundary>
        <Banner/>
      </ErrorBoundary>
      <div className="App__wrapper">
        <ErrorBoundary>
          <FilterForm onRoverSelected={onRoverSelected}
                      loading={loading}
                      onRoverClicked={onRoverClicked}
                      onSolSelected={onSolSelected}
                      maxSol={maxSol}
                      manifestData={manifestData}
                      onTotalPhotosInSolChanged={onTotalPhotosInSolChanged} />
        </ErrorBoundary>
        <ErrorBoundary>
          <MissionManifest setLoading={setLoading} 
                          clickedRover={clickedRover} 
                          setMaxSol={setMaxSol} 
                          setManifestData={setManifestData}/>
        </ErrorBoundary>
      </div>
      <ErrorBoundary>
        <ImageGallery key={selectedRover + selectedSol} 
                      selectedRover={selectedRover} 
                      selectedSol={selectedSol}
                      totalPhotosInSol={totalPhotosInSol} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
