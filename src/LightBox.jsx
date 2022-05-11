import React, { useRef, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  StyledLightBox,
  CloseButton,
  PreviousButton,
  NextButton,
  StyledImage,
  ImgWrapper,
  StyledLoading,
} from './LightBox.styles';

const LightBox = ({
  data,
  isLoaded = [],
  isActive,
  setIsActive,
  currentIndex,
  setCurrentIndex,
}) => {
  const sliderRef = useRef(null);
  const throttle = useRef(false);

  const handleCloseLightBox = () => setIsActive(false);

  const throttleFunc = (func = () => {}, delay = 350) => {
    return (...args) => {
      if (!throttle.current) {
        throttle.current = true;

        setTimeout(() => {
          throttle.current = false;
        }, delay);

        func(...args);
      }
    };
  };

  const handleArrowAction = throttleFunc((type) => {
    if (sliderRef.current) sliderRef.current.style.transitionDuration = '300ms';
    if (type === 'prev') setCurrentIndex((state) => state - 1);
    else if (type === 'next') setCurrentIndex((state) => state + 1);
  });

  useEffect(() => {
    const handleKeyAction = throttleFunc((e) => {
      if (isActive && e.keyCode === 37) {
        sliderRef.current.style.transitionDuration = '300ms';
        setCurrentIndex((state) => state - 1);
      } else if (isActive && e.keyCode === 39) {
        sliderRef.current.style.transitionDuration = '300ms';
        setCurrentIndex((state) => state + 1);
      } else if (isActive && e.keyCode === 27) {
        setIsActive(false);
      }
    });

    document.addEventListener('keydown', handleKeyAction);
    return () => document.removeEventListener('keydown', handleKeyAction);
  }, [isActive, currentIndex, setCurrentIndex]);

  useEffect(() => {
    const handleTransition = () => {
      if (currentIndex <= 0) {
        sliderRef.current.style.transitionDuration = '0ms';
        setCurrentIndex(data.length);
      }
      if (currentIndex >= data.length + 1) {
        sliderRef.current.style.transitionDuration = '0ms';
        setCurrentIndex(1);
      }
    };

    document.addEventListener('transitionend', handleTransition);
    return () => document.removeEventListener('transitionend', handleTransition);
  }, [currentIndex, data, setCurrentIndex, sliderRef]);

  return (
    <StyledLightBox $isActive={isActive}>
      <CloseButton aria-label='close fullscreen' onClick={handleCloseLightBox}>
        X
      </CloseButton>
      <PreviousButton aria-label='go to previous image' onClick={() => handleArrowAction('prev')}>
        {'<'}
      </PreviousButton>
      <NextButton aria-label='go to next image' onClick={() => handleArrowAction('next')}>
        {'>'}
      </NextButton>

      <ImgWrapper $currentIndex={currentIndex} $dataLength={data.length} ref={sliderRef}>
        <StyledImage $isLoaded={isLoaded[data.length - 1]}>
          <img src={data[data.length - 1]} alt='img' />

          {!isLoaded[data.length - 1] ? (
            <StyledLoading>
              <ClipLoader color='#e0dfdf' />
            </StyledLoading>
          ) : null}
        </StyledImage>

        {data.map((item, index) => (
          <StyledImage key={index} $dataLength={data.length} $isLoaded={isLoaded[index]}>
            <img src={item} alt='img' />

            {!isLoaded[index] ? (
              <StyledLoading>
                <ClipLoader color='#e0dfdf' />
              </StyledLoading>
            ) : null}
          </StyledImage>
        ))}

        <StyledImage $isLoaded={isLoaded[0]}>
          <img src={data[0]} alt='img' />
          {!isLoaded[0] ? (
            <StyledLoading>
              <ClipLoader color='#e0dfdf' />
            </StyledLoading>
          ) : null}
        </StyledImage>
      </ImgWrapper>
    </StyledLightBox>
  );
};

export default LightBox;
