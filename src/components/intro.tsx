import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-top: 150px;
`;

const StyledImage = styled.img<{ isActive: boolean; isExiting: boolean }>`
  position: absolute;
  left: 0;
  width: 15%;
  transition:
    transform 2s,
    width 2s,
    opacity 2s,
    left 2s;
  opacity: 0;

  ${({ isActive }) =>
    isActive &&
    `
    transform: translateX(0);
    width: 50%;
    opacity: 1;
    left: 25%;
  `}

  ${({ isExiting }) =>
    isExiting &&
    `
    transform: translateX(300%);
    opacity: 0;
  `}
`;
const Intro: React.FC = () => {
  const images = ['/assets/calender.png', '/assets/alarm.png', '/assets/create.png', '/assets/schedule.png'];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [exitIndex, setExitIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setExitIndex(activeIndex);
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, activeIndex]);

  return (
    <Container>
      {images.map((image, index) => (
        <StyledImage
          key={image}
          src={image}
          alt={`Slide ${index}`}
          isActive={index === activeIndex}
          isExiting={index === exitIndex}
        />
      ))}
    </Container>
  );
};

export default Intro;
