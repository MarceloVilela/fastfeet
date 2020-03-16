import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormDeliveryman from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function DeliverymanUpdate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form) => {
    const formData = new FormData();

    formData.append('file', form.avatar);
    formData.append('name', form.name);
    formData.append('email', form.email);

    setLoading(true);
    try {
      await api.post('deliverymen', formData);
      toast.success('Entregador cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar entregador');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormDeliveryman
        title="Cadastro de entregador"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
