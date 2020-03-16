import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DeliveryPreview({ data }) {
  const { recipient } = data;

  return (
    <Container>
      <div>
        <strong>Informações da encomenda</strong>

        <p>
          {`${recipient.street}, ${recipient.number}`}
        </p>
        <p>
          {`${recipient.city} - ${recipient.state}`}
        </p>
        <p>{recipient.zip_code}</p>
      </div>

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
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zip_code: PropTypes.number,
    }),
  }).isRequired,
};
