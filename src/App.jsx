import React, { Suspense, useCallback, useState } from 'react';
import { MainWrapper, Grid } from './App.styles';
import { data } from './data';
const LightBox = React.lazy(() => import('./LightBox'));

function App() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState({});

  const handleBodyOverflow = useCallback((mode) => {
    if (mode === 'unset') {
      document.body.style.overflow = 'unset';
      document.getElementsByTagName('html')[0].style.overflow = 'unset';
    } else if (mode === 'hidden') {
      document.body.style.overflow = 'hidden';
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
  }, []);

  const handleLoad = (index) =>
    setIsLoaded((state) => ({
      ...state,
      [index]: true,
    }));

  const handleOpenLightBox = (index) => {
    handleBodyOverflow('hidden');
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
            <img
              src={item}
              alt="img"
              style={{
                opacity: isLoaded[index] ? 1 : 0,
              }}
              onLoad={() => handleLoad(index)}
            />
          </button>
        ))}
      </Grid>

      <Suspense fallback={<p>...</p>}>
        <LightBox
          data={data}
          isLoaded={isLoaded}
          isActive={isActive}
          setIsActive={setIsActive}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          handleBodyOverflow={handleBodyOverflow}
        />
      </Suspense>
    </MainWrapper>
  );
}

export default App;
