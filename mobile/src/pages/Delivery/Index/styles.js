import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import TextStyled from "~/components/TextStyled";
import { color, size } from '~/styles/values';

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
  width: 50px; 
  height: 50px; 
  border-radius: 25px;
`;

export const WelcomeWrap = styled(RectButton)`
  flex: 1;
  margin-left: 10px; 
`;

//wrap title options
export const FilterWrap = styled.View`
  flex-direction: row; 
  align-items: baseline; 
  justify-content: space-between;
  padding: 0 15px;
`;

export const FilterTitle = styled(TextStyled).attrs(() => ({ format: 'title' }))`
  flex: 1;
`;

export const FilterOptions = styled.View`
  flex-direction: row;
`
export const FilterLabel = styled.Text`
  margin-left: 10px;
  color: ${props => props.selected ? `${color['primary']}` : `${color['muted']}`};
  border: ${props => props.selected ? `1px solid ${color['primary']}` : `${color['white']}`};
  border-width: 0;
  border-bottom-width: 3;
`