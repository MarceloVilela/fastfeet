import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
        <Title iconName='local-shipping'>Encomenda {data.counter}</Title>



        <Timeline>
          <Steep><Indicator checked={data.step >= 0} /><Caption>Aguardando retirada</Caption></Steep>
          <Steep><Indicator checked={data.step >= 1} /><Caption>Retirada</Caption></Steep>
          <Steep><Indicator checked={data.step >= 2} /><Caption>Entregue</Caption></Steep>
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
