import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormRegistration from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function RegistrationUpdate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ name, email }) => {
    setLoading(true);
    try {
      await api.post('deliverymen', {
        name,
        email,
      });
      toast.success('Entregador cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar entregador');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormRegistration
        title="Cadastro de entregador"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
