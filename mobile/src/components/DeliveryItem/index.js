import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import Title from '~/components/Title';
import {
  DeliveryItemWrap, Description, Field, Label, Value, SeeMore, SeeMoreText,
  Timeline, Steep, Indicator, Caption
} from './styles';

export default function DeliveryItem({ data, navigation }) {
  const navigate = () => {
    navigation.navigate('Details', { deliveryData: data });
  }

  return (
    <DeliveryItemWrap>
      <Title iconName='local-shipping' label={`Encomenda ${data.id}`}></Title>



      <Timeline>
        <Steep>
          <LinearGradient
            start={[0.3, 0.3]}
            end={[1, 1]}
            colors={['#FFF', '#7159C1']}
            style={{ borderRadius: 3, height: 1, width: '100%' }}
          />
          <Indicator checked={data.step >= 0} />
          <Caption>Aguardando retirada</Caption>
        </Steep>

        <Steep>
          <LinearGradient
            start={[0, 0]}
            end={[1, 1]}
            colors={['#7159C1', '#7159C1']}
            style={{ borderRadius: 3, height: 1, width: '100%' }}
          />
          <Indicator checked={data.step >= 1} />
          <Caption>Retirada</Caption>
        </Steep>

        <Steep>
          <LinearGradient
            start={[0, 0]}
            end={[0.7, 0.7]}
            colors={['#7159C1', '#FFF']}
            style={{ borderRadius: 3, height: 1, width: '100%' }}
          />
          <Indicator checked={data.step >= 2} />
          <Caption>Entregue</Caption>
        </Steep>
      </Timeline>



      <Description>
        <Field space={false}>
          <Label>Data</Label>
          <Value>{data.createdAtFormated}</Value>
        </Field>

        <Field>
          <Label>Cidade</Label>
          <Value>{data.recipient.city}</Value>
        </Field>

        <Field>
          <Label></Label>
          <SeeMore onPress={() => { navigate(data) }}>
            <SeeMoreText>Ver detalhes</SeeMoreText>
          </SeeMore>
        </Field>
      </Description>
      {/*<Time>{dateParsed}</Time>*/}
    </DeliveryItemWrap>
  );
}

DeliveryItem.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    counter: PropTypes.number,
  }).isRequired,
};
