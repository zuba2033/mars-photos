import { useState } from 'react';
import '../../styles/style.scss';

import Banner from '../banner/Banner';
import FilterForm from '../filterForm/FilterForm';
import ImageGallery from '../imageGallery/ImageGallery';

function App() {

  const [selectedRover, setSelectedRover] = useState(null);

  const onRoverSelected = (rover) => {
    setSelectedRover(rover);
  }

  return (
    <div className="App">
      <Banner/>
      <FilterForm onRoverSelected={onRoverSelected} />
      <ImageGallery selectedRover={selectedRover} />
    </div>
  );
}

export default App;
