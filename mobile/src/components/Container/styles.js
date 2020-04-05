import styled from 'styled-components/native';
import { color } from '~/styles/values.js';

export const Wrap = styled.View`
  flex: 1;
  /*padding: 80px 30px 0 30px;*/
  padding: ${props =>
    props.spaced ? '15px' : `0`};
  background-color: ${color.white};
`;

export const WrapLoading = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 0, paddingBottom: 0 },
})`
  align-self: stretch;
`;
