import { useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(31, 41, 55, 0.5);
  padding: 0 0.5rem;
  z-index: 10;
  border: none;
  color: white;
`;

const Content = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
`;

const Slider = ({ title, children }) => {
  const containerRef = useRef(null);
  const scroll = offset => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Wrapper>
        <Button style={{ left: 0 }} onClick={() => scroll(-300)}>&#8249;</Button>
        <Content ref={containerRef}>{children}</Content>
        <Button style={{ right: 0 }} onClick={() => scroll(300)}>&#8250;</Button>
      </Wrapper>
    </Container>
  );
};

export default Slider;
