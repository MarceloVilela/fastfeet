import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";

import TextStyled from "~/components/TextStyled";
import {color, size} from '~/styles/values';

export const Wrapper = styled.View`
  padding: 0 10px 15px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #fff;
`;

export const StyledIcon = styled(MaterialIcons).attrs((props) => ({
  // we can define static props
  size: props.size ? size[props.size] : size['medium'],
  color: props.size ? color[props.color] : color['primary']
}))``;

export const FieldRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Definition = styled(RectButton)`
  flex-direction: column;
  padding: 5px 0;
`;

export const DefinitionTitle = styled(TextStyled).attrs(() => ({ format: 'definitionTitle' }))``;
export const DefinitionData = styled(TextStyled).attrs(() => ({ format: 'DefinitionData' }))``;

export const Box = styled.View`
  margin-top: 15px;
`;

export const ActionWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #FAFAFA;
`;

export const Action = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin-bottom: 10px;
  align-items: center;
  border-color: #CCCCCC; 
  border-left-width: ${props => props.border === false ? 0 : '1px'} 
`;

export const ActionDescription = styled.Text`
  color: #666;
  text-align: center;
`;