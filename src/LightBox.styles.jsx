import styled, { keyframes } from 'styled-components';

const appear = keyframes`
	from {
		opacity: 0;
	} to {
		opacity: 1;
	}
`;

export const StyledLightBox = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'initial' : 'none')};
  animation: ${appear} 0.3s forwards;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.9;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    z-index: 10;
    font-weight: bold;
    color: #e0dfdf;
    background-color: transparent;
    border: 2px solid #e0dfdf;
    border-radius: 100px;
  }
`;

export const ImgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};
  transition: transform 0.3s ease-in-out;
`;

export const StyledImage = styled.div`
  position: absolute;
  transform: ${({ index }) => `translateX(${index * 100}%)`};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
`;

export const CloseButton = styled.button`
  top: 20px;
  right: 20px;
`;
export const PreviousButton = styled.button`
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
`;
export const NextButton = styled.button`
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`;
