import styled from 'styled-components/native';
import { MaterialIcons } from "@expo/vector-icons";
import { color, size } from '~/styles/values.js';

export const CameraWrap = styled.View`
  flex: 1;
  margin-bottom: 15;
`;

export const IconWrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background-color: transparent;
`;

export const IconTouchableOpacity = styled.TouchableOpacity`
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  width: 60;
  height: 60;
  border-radius: 30;
  margin-bottom: 15;
  background-color: ${color['light']};
  opacity: 0.3;
`;

export const IconStyled = styled(MaterialIcons).attrs((props) => ({
  // we can define static props
  size: props.size ? size[props.size] : size['medium'],
  color: props.color ? color[props.color] : color['primary']
}))``;
