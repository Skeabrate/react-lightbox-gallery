import React, { useRef, useEffect } from 'react';
import {
  StyledLightBox,
  CloseButton,
  PreviousButton,
  NextButton,
  StyledImage,
  ImgWrapper,
} from './LightBox.styles';

const LightBox = (props) => {
  const { data, isActive, setIsActive, currentIndex, setCurrentIndex } = props;
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
        dataLength={data.length}
        ref={sliderRef}
      >
        <StyledImage key={data.length + 1}>
          <img src={data[data.length - 1]} alt="img" />
        </StyledImage>

        {data.map((item, index) => (
          <StyledImage key={index} dataLength={data.length}>
            <img src={item} alt="img" />
          </StyledImage>
        ))}

        <StyledImage key={data.length + 2}>
          <img src={data[0]} alt="img" />
        </StyledImage>
      </ImgWrapper>
    </StyledLightBox>
  );
};

export default LightBox;
