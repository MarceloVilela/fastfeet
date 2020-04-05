import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ProblemItemWrap = styled(RectButton)`
  margin-bottom: 15px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;
  flex: 1;
  
  border: 1px solid #CCC;
  border-radius: 10px;
  padding: 10px;
  margin-left: ${props =>
    props.space === false ? '0' : `15px`};
`;

export const RowHeader = styled.Text`
  font-weight: ${props =>
    props.bold === true ? 'bold' : 'normal'};
  font-size: 16px;
  color: #666
`;

export const RowData = styled.Text`
  font-size: 12px;
  color: #999
`;
