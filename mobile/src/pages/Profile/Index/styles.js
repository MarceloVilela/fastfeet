import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import TextStyled from '~/components/TextStyled';

export const Field = styled(RectButton)`
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
`;

export const Label = styled(TextStyled).attrs(() => ({ format: 'subtitle' }))``;
export const Value = styled(TextStyled).attrs(() => ({ format: 'title' }))``;

export const ImageWrap = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: 0.8
}))``

export const Image = styled.Image`
  width: 128;
  height: 128;
  border-radius: 64;
  margin: 0 auto;
`
export const Box = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;
