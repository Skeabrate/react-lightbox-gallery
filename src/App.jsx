import { useState } from 'react';
import { MainWrapper, Grid } from './App.styles';
import { data } from './data';
import LightBox from './LightBox';

function App() {
  const [lightBox, setLightBox] = useState({
    isOpen: false,
    index: 0,
  });

  const handleOpenLightBox = (index) => {
    document.body.style.overflow = 'hidden';
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    setLightBox({
      isOpen: true,
      index,
    });
  };

  return (
    <MainWrapper>
      <h1>React Gallery</h1>

      <Grid>
        {data.map((item, index) => (
          <button
            key={index}
            aria-label="open image in fullscreen"
            onClick={() => handleOpenLightBox(index)}
          >
            <img src={item} alt="img" />
          </button>
        ))}
      </Grid>

      <LightBox data={data} lightBox={lightBox} setLightBox={setLightBox} />
    </MainWrapper>
  );
}

export default App;
