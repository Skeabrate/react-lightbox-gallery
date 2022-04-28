import styled from 'styled-components';

export const MainWrapper = styled.div`
  max-width: 1500px;
  padding: 20px;
  margin: 0 auto;

  button {
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 15px;

  button {
    border: none;
    background: transparent;
    padding: 0;
    display: flex;
    overflow: hidden;
    border-radius: 5px;

    &:hover img {
      transform: scale(1.1);
      filter: grayscale(100%);
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 300px;
    transition: all 0.3s ease-in-out;
  }
`;
