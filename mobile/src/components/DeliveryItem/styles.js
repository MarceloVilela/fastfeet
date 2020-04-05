import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { color } from '~/styles/values.js';

export const DeliveryItemWrap = styled(RectButton)`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-between;
`;

export const Description = styled.View`
  /*border: 1px solid black;*/
  display: flex;
  /*flex-wrap: wrap;*/
  flex-direction: row;
  align-items: center;
  background: #f8f9fd;
  padding: 10px;
  margin-top: 10px;
`;

export const Field = styled.View`
  /*border: 1px solid black;*/
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${props =>
    props.space === false ? '0' : `15px`};
  height: 100%;
`;

export const Label = styled.Text`
  font-size: 12px;
`;

export const Value = styled.Text`
  font-weight:bold;
  font-size: 14px;
`;

export const SeeMore = styled.TouchableOpacity`
`;

export const SeeMoreText = styled.Text`
  font-weight: bold;
  align-self: center;
  justify-content: center;
  color: #7D60F7;
`;

export const Timeline = styled.View`
  flex-direction: row;
  justify-content: space-between
`;

export const Steep = styled.View`
  flex: 1;
  border: 0 solid #7159c1;
  border-top-width: 1px;
  align-items: center;
  text-align: center;
`;

export const Indicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid #7159c1;
  background-color: ${props => props.checked ? '#7159c1' : '#ffffff'};
  margin: 0 auto;
  top: -5px;
`;

export const Caption = styled.Text`
  text-align: center;
`;
