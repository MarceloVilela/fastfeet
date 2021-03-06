import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormDelivery from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function DeliveryCreate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ recipientId, deliverymanId, product }) => {
    setLoading(true);
    try {
      await api.post('deliveries', { recipient_id: recipientId, deliveryman_id: deliverymanId, product });
      toast.success('Encomenda cadastrada com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar encomenda');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormDelivery
        title="Cadastro de entregas"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
