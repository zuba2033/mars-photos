import '../../styles/style.scss';
import '../../styles/bgstars.scss';

import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';
import MissionManifest from '../missionManifest/MissionManifest';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import { useSelector } from 'react-redux';

function App() {

  const { submitedSol } = useSelector(state => state.form);

  const { imagesLoadingStatus } = useSelector(state => state.images);
  const loading = imagesLoadingStatus === "loading";
  const starsAnimationSpeed = loading ? { animationDuration: "5s" } : null;

  return (
    <>
      <div id='stars' style={starsAnimationSpeed}></div>
      <div id='stars2' style={starsAnimationSpeed} ></div>
      <div id='stars3' style={starsAnimationSpeed}></div>
      <main className="App">
      <div className="App__wrapper" style={submitedSol ? {padding: '0'} : null}>
        <ErrorBoundary>
          <FilterForm/>
        </ErrorBoundary>
        <ErrorBoundary>
          <MissionManifest/>
        </ErrorBoundary>
      </div>
        <ErrorBoundary>
          <ImageGallery/>
        </ErrorBoundary>
      </main>
    </>
    
  );
}

export default App;
