import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";
import { color, size } from '~/styles/values.js';

export const EmptyItemWrap = styled(RectButton)`
  margin-bottom: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  
  border: 1px solid #CCC;
  border-radius: 10px;
  padding: 10px;
  margin-left: 0;
`;

export const RowHeader = styled.Text`
  font-weight: ${props =>
    props.bold === true ? 'bold' : 'normal'};
  font-size: 16px;
  color: #666;
`;

export const IconStyled = styled(MaterialIcons).attrs((props) => ({
  // we can define static props
  size: props.size ? size[props.size] : size['medium'],
  color: props.color ? color[props.color] : color['primary']
}))``;
