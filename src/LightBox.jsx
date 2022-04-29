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

  const handleCloseLightBox = () => {
    document.body.style.overflow = 'unset';
    document.getElementsByTagName('html')[0].style.overflow = 'unset';
    setIsActive(false);
  };

  const handleAction = (type) => {
    if (!throttle.current) {
      throttle.current = true;

      setTimeout(() => {
        throttle.current = false;
      }, 350);

      sliderRef.current.style.transitionDuration = '300ms';
      if (type === 'prev') setCurrentIndex((state) => state - 1);
      else if (type === 'next') setCurrentIndex((state) => state + 1);
    }
  };

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

    return () =>
      document.removeEventListener('transitionend', handleTransition);
  }, [currentIndex, data]);

  return (
    <StyledLightBox $isActive={isActive}>
      <CloseButton onClick={handleCloseLightBox}>X</CloseButton>
      <PreviousButton onClick={() => handleAction('prev')}>
        {'<'}
      </PreviousButton>
      <NextButton onClick={() => handleAction('next')}>{'>'}</NextButton>

      <ImgWrapper
        $currentIndex={currentIndex}
        $dataLength={data.length}
        ref={sliderRef}
      >
        <StyledImage
          key={data.length + 1}
          $isLoaded={isLoaded[data.length - 1]}
        >
          <img src={data[data.length - 1]} alt="img" />

          {!isLoaded[data.length - 1] ? (
            <StyledLoading>
              <ClipLoader color="#e0dfdf" />
            </StyledLoading>
          ) : null}
        </StyledImage>

        {data.map((item, index) => (
          <StyledImage
            key={index}
            $dataLength={data.length}
            $isLoaded={isLoaded[index]}
          >
            <img src={item} alt="img" />

            {!isLoaded[index] ? (
              <StyledLoading>
                <ClipLoader color="#e0dfdf" />
              </StyledLoading>
            ) : null}
          </StyledImage>
        ))}

        <StyledImage key={data.length + 2} $isLoaded={!isLoaded[0]}>
          <img src={data[0]} alt="img" />
          {!isLoaded[0] ? (
            <StyledLoading>
              <ClipLoader color="#e0dfdf" />
            </StyledLoading>
          ) : null}
        </StyledImage>
      </ImgWrapper>
    </StyledLightBox>
  );
};

export default LightBox;
