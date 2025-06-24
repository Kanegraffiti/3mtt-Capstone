import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Box = styled.div`
  background: #374151;
  border-radius: 4px;
  width: 100%;
  height: ${props => props.height || '1rem'};
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -200px;
    height: 100%;
    width: 200px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: ${shine} 1.2s infinite;
  }
`;

const Placeholder = ({ height }) => <Box height={height} />;

export default Placeholder;
