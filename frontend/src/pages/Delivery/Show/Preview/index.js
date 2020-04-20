import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function DeliveryPreview({ data }) {
  const { recipient } = data;
  console.log(recipient);
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
        <p>{data.start_date ? data.start_date_formatted : '---'}</p>
      </div>

      <div>
        <strong>Entrega:</strong>
        <p>{data.end_date ? data.end_date_formatted : '---'}</p>
      </div>

      {data.signature_id_url
      && (
      <img
        src={data.signature_id_url}
        style={{ width: '300px', borderRadius: '50%' }}
        alt="Preview"
      />
      )}
    </Container>
  );
}

DeliveryPreview.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    start_date_formatted: PropTypes.string,
    end_date_formatted: PropTypes.string,
    signature_id_url: PropTypes.string,
    recipient: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.string,
      zip_code: PropTypes.number,
    }),
  }).isRequired,
};
