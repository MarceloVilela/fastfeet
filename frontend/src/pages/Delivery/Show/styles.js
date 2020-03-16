import styled from 'styled-components';

const statusColor = {
  pending: { backgroundColor: '#f0f0df', color: '#c1bc35' },
  withdrawal: { backgroundColor: '#bad2ff', color: '#4d85ee' },
  delivered: { backgroundColor: '#dff0df', color: '#2ca42b' },
  canceled: { backgroundColor: '#fab0b0', color: '#de3b3b' },
};

export const Status = styled.span`
  border: 1px solid black;
  border-radius: 10px;
  padding: 3px;
  display: flex;
  width: fit-content;
  background: ${(props) => statusColor[props.name].backgroundColor};

  span {
    color: ${(props) => statusColor[props.name].color}
  }

  span:nth-of-type(1) {
    display: block;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    margin-right: 5px;
    background: ${(props) => statusColor[props.name].color}
  }
`;
