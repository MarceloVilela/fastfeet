import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DeliveryPreview({ data }) {
  const { recipient } = data;

  return (
    <Container>
      <strong>Informações da encomenda</strong>
      <p>
        {`${recipient.street}, ${recipient.number}`}
      </p>
      <p>
        {`${recipient.city} - ${recipient.state}`}
      </p>
      <p>{recipient.zip_code}</p>

      <strong>Informações da encomenda</strong>
      <div>
        <strong>Retirada:</strong>
        <p>{data.start_date ? data.start_date : '---'}</p>
      </div>
      <div>
        <strong>Entrega:</strong>
        <p>{data.end_date ? data.end_date : '---'}</p>
      </div>

    </Container>
  );
}

DeliveryPreview.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
