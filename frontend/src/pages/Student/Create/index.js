import React, { useState } from 'react';
import { toast } from 'react-toastify';

import FormStudent from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function StudentUpdate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ name, street, number, complement, city, state, zip_code }) => {
    setLoading(true);
    try {
      const zip_code_formated = parseInt('21756-310'.replace('-', ''))
      await api.post('recipients', { name, street, number, complement, city, state, zip_code: zip_code_formated });
      toast.success('Destinatário cadastrado com sucesso');
    } catch (error) {
      toast.error('Erro ao cadastrar destinatário');
    }
    setLoading(false);
  };

  return (
    <Container>
      <FormStudent
        title="---"
        initialData={{}}
        handleSubmit={handleSubmit}
        loadingSubmit={loading}
      />
    </Container>
  );
}
