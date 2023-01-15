import '../../styles/style.scss';
import '../../styles/bgstars.scss';

import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';
import MissionManifest from '../missionManifest/MissionManifest';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

function App() {

  return (
    <main className="App">
      <div className="App__wrapper">
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
