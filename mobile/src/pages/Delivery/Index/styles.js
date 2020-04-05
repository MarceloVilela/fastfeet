import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import TextStyled from "~/components/TextStyled";

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 20, paddingBottom: 40 },
})`
`;

export const Label = styled(TextStyled).attrs(() => ({ format: 'subtitle' }))``;
export const Value = styled(TextStyled).attrs(() => ({ format: 'title' }))``;

export const Box = styled.View`
  margin-left: 15px;
  margin-right: 15px;
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFF; 
`;

export const ImageWrap = styled.TouchableOpacity.attrs(() => ({
  opacity: 0.8
}))``;

export const Image = styled.Image`
  width: 50; 
  height: 50; 
  border-radius: 25;
`;


export const WelcomeWrap = styled(RectButton)`
  flex: 1;
  margin-left: 10; 
`;