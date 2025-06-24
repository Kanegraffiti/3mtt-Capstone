import styled from 'styled-components';

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${props => (props.filled ? '#fbbf24' : '#374151')};
  font-size: 1rem;
`;

const Rating = ({ value = 0, outOf = 5 }) => {
  const stars = [];
  for (let i = 1; i <= outOf; i++) {
    stars.push(<Star key={i} filled={i <= value}>&#9733;</Star>);
  }
  return <Stars>{stars}</Stars>;
};

export default Rating;
