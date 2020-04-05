import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Description = styled.View`
  border: 1px solid black;
  display: flex;
  flex: 1;
  /*flex-wrap: wrap;*/
  flex-direction: row;
  align-items: center;
  margin-top: 30px;

  background: #ccc;
  width: 100%;
  justify-content: space-between;
`;

export const Field = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${props =>
    props.space === false ? '0' : `15px`};
`;

export const Label = styled.Text`
  
`;

export const Value = styled.Text`
  font-weight:bold;
  font-size: 16px;
`;

export const SeeMore = styled.Text`
  
`;

export const SeeMoreText = styled.Text`
  font-weight: bold;
  align-self: center;
  justify-content: center;
  color: #7D60F7;
`;
