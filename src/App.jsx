import { useState } from 'react';
import { MainWrapper, Grid } from './App.styles';
import { data } from './data';
import LightBox from './LightBox';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenLightBox = (index) => {
    document.body.style.overflow = 'hidden';
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    setIsActive(true);
    setCurrentIndex(index + 1);
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

      <LightBox
        data={data}
        isActive={isActive}
        setIsActive={setIsActive}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </MainWrapper>
  );
}

export default App;
