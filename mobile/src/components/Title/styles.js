import styled from 'styled-components/native';
import { MaterialIcons } from "@expo/vector-icons";

import TextStyled from "~/components/TextStyled";
import { color, size } from '~/styles/values.js';

export const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 0 15px 0;
`;

export const IconStyled = styled(MaterialIcons).attrs((props) => ({
  // we can define static props
  size: props.size ? size[props.size] : size['medium'],
  color: props.color ? color[props.color] : color['primary']
}))``;

export const Legend = styled(TextStyled).attrs(() => ({ format: 'primary' }))`
  margin-left: 10px;
`;

