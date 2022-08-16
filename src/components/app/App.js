import { useState } from 'react';
import '../../styles/style.scss';

import Banner from '../banner/Banner';
import RoverFilter from '../roverFilter/RoverFilter';
import ImageGallery from '../imageGallery/ImageGallery';

function App() {

  const [selectedRover, setSelectedRover] = useState();

  const onRoverSelected = (rover) => {
    setSelectedRover(rover);
  }

  return (
    <div className="App">
      <Banner/>
      <RoverFilter onRoverSelected={onRoverSelected} />
      <ImageGallery selectedRover={selectedRover} />
    </div>
  );
}

export default App;
