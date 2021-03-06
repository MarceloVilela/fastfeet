import React, { useState } from 'react';
import api from '~/services/api';
import PropTypes from 'prop-types';

import Container from '~/components/Container';
import Title from '~/components/Title';
import {
  Wrapper,
  StyledIcon,
  FieldRow,
  Definition,
  DefinitionTitle,
  DefinitionData,
  Box,
  ActionWrap,
  Action,
  ActionDescription
} from './styles';

export default function DeliveryDetails({ route, navigation }) {
  const { deliveryData } = route.params;
  const { recipient } = route.params.deliveryData;

  const [loading, setLoading] = useState(false);

  const { street, number, city, state, zip_code } = recipient;
  const address = `${street}, ${number}, ${city} - ${state}, ${zip_code}`;

  const navigateNew = () => navigation.navigate('ProblemNew', { deliveryData });
  const navigateShow = () => navigation.navigate('Problems', { deliveryData });
  const navigateConfirm = () => navigation.navigate('DeliveryConfirm', { deliveryData });
  const registerWithdrawal = async () => {
    setLoading(true);

    try {
      const uri = `/deliverymen/${deliveryData.id}/delivery-init`;
      const response = await api.put(uri);
      navigation.navigate('DeliveryIndex', { deliveryData });
    } catch (error) {
      alert(error.response.data.error);
    }

    setLoading(false);
  };

  const createHeader = (title, iconName) => {
    return (
      <Title iconName={iconName} label={title}></Title>
    )
  };

  const createField = (label, value) => {
    return (
      <Definition>
        <DefinitionTitle>{label}</DefinitionTitle>
        <DefinitionData>{value}</DefinitionData>
      </Definition>
    )
  };

  const createAction = (description, action, iconName, iconColorContextual, hasBorder = true) => {
    return (
      <Action border={hasBorder} onPress={() => action()}>
        <StyledIcon name={iconName} color={iconColorContextual} size="large" />
        <ActionDescription>{description}</ActionDescription>
      </Action>
    )
  };

  return (
    <Container loading={loading} scrollable spaced>
      <Wrapper>
        <Box>
          {createHeader('Informações da entrega', 'local-shipping')}

          {createField('DESTINATÁRIO', recipient.name)}
          {createField('ENDEREÇO DE ENTREGA', address)}
          {createField('PRODUTO', deliveryData.product)}
        </Box>

        <Box>
          {createHeader('Situação da entrega', 'event')}

          {createField('STATUS', deliveryData.statusDesc)}

          <FieldRow>
            {createField('DATA DE RETIRADA', deliveryData.startDateFormated)}
            {createField('DATA DE ENTREGA', deliveryData.endDateFormated)}
          </FieldRow>
        </Box>

        <Box>
          <ActionWrap>
            {deliveryData.statusDesc === 'Retirada' &&
              createAction('Informar problema', navigateNew, 'cancel', 'danger', false)
            }
            {createAction('Visualizar problema', navigateShow, 'info', 'warning')}
            {deliveryData.statusDesc === 'Pendente' &&
              createAction('Registrar retirada', registerWithdrawal, 'update', 'primary')
            }
            {deliveryData.statusDesc === 'Retirada' &&
              createAction('Confirmar entrega', navigateConfirm, 'check-circle', 'primary')
            }
          </ActionWrap>
        </Box>

      </Wrapper>
    </Container>
  );
}

DeliveryDetails.propTypes = {
  data: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    answer: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
