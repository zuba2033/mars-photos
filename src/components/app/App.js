import '../../styles/style.scss';
import '../../styles/bgstars.scss';

import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';
import MissionManifest from '../missionManifest/MissionManifest';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import { useSelector } from 'react-redux';

function App() {

  const { submitedSol } = useSelector(state => state.form);

  return (
    <main className="App">
      <div className="App__wrapper" style={submitedSol ? {margin: '0'} : null}>
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
  );
}

export default App;
