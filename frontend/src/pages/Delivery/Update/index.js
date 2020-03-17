import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormDelivery from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function DeliveryUpdate({ match }) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      try {
        const response = await api.get(`deliveries/${match.params.id}`);
        setItem(response.data);
      } catch (error) {
        toast.error('Erro ao listar encomenda');
      }
      setLoading(false);
    }

    loadItem();
  }, [match.params.id]);

  const handleSubmit = async ({ recipientId, deliverymanId, product }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`deliveries/${match.params.id}`, { recipient_id: recipientId, deliveryman_id: deliverymanId, product });
      toast.success('Encomenda editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar encomenda');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormDelivery
        title="Edição de encomenda"
        initialData={item}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

DeliveryUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
