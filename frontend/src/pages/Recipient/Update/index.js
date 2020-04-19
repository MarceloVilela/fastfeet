import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormRecipient from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function RecipientUpdate({ match }) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      try {
        const response = await api.get(`recipients/${match.params.id}`);
        setItem(response.data);
      } catch (error) {
        toast.error('Erro ao listar destintário');
      }
      setLoading(false);
    }

    loadItem();
  }, [match]);

  const handleSubmit = async ({
    name, street, number, complement, city, state, zip_code,
  }) => {
    setLoadingSubmit(true);
    try {
      const zipCodeFormated = parseInt(zip_code.replace('-', ''));
      await api.put(`recipients/${match.params.id}`, {
        name, street, number, complement, city, state, zip_code: zipCodeFormated,
      });
      toast.success('Destinatário editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar destinatário');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      {!loading
      && (
      <FormRecipient
        title="Edição de destinatário"
        initialData={item}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
      )}

    </Container>
  );
}

RecipientUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
