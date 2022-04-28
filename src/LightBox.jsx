import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledLightBox,
  CloseButton,
  PreviousButton,
  NextButton,
  StyledImage,
  ImgWrapper,
} from './LightBox.styles';

const LightBox = ({ data, lightBox, setLightBox }) => {
  const handleCloseLightBox = () => {
    document.body.style.overflow = 'unset';
    document.getElementsByTagName('html')[0].style.overflow = 'unset';
    setLightBox((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  const nextSlide = () =>
    setLightBox((state) => ({
      ...state,
      index: state.index + 1,
    }));

  const prevSlide = () =>
    setLightBox((state) => ({
      ...state,
      index: state.index - 1,
    }));

  return (
    <StyledLightBox $isOpen={lightBox.isOpen}>
      <CloseButton onClick={handleCloseLightBox}>X</CloseButton>
      {lightBox.index ? (
        <PreviousButton onClick={prevSlide}>{'<'}</PreviousButton>
      ) : null}
      {lightBox.index < data.length - 1 ? (
        <NextButton onClick={nextSlide}>{'>'}</NextButton>
      ) : null}

      <ImgWrapper $currentIndex={lightBox.index}>
        {data.map((item, index) => (
          <StyledImage key={index} index={index}>
            <img src={item} alt="img" />
          </StyledImage>
        ))}
      </ImgWrapper>
    </StyledLightBox>
  );
};

LightBox.propTypes = {
  data: PropTypes.array.isRequired,
  lightBox: PropTypes.object.isRequired,
  setLightBox: PropTypes.func.isRequired,
};

export default LightBox;
