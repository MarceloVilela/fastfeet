import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import FormStudent from '../_Form';
import api from '~/services/api';
import { Container } from '../../../components';

export default function StudentUpdate({ match }) {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      try {
        const response = await api.get(`recipients/${match.params.id}`);
        const docs = {
          ...response.data,
          zip_code: `${response.data.zip_code}`.replace(/(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,"$1$2$3$4$5-$6$7$8"),
        };
        setStudent(docs);
      } catch (error) {
        toast.error('Erro ao listar destintário');
      }
      setLoading(false);
    }

    loadStudent();
  }, [match]);

  const handleSubmit = async ({
    name, street, number, complement, city, state, zip_code,
  }) => {
    setLoadingSubmit(true);
    try {
      await api.put(`recipients/${match.params.id}`, {
        name, street, number, complement, city, state, zip_code,
      });
      toast.success('Destinatário editado com sucesso');
    } catch (error) {
      toast.error('Erro ao editar destinatário');
    }
    setLoadingSubmit(false);
  };

  return (
    <Container loading={loading}>
      <FormStudent
        title="Edição de destinatário"
        initialData={student}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </Container>
  );
}

StudentUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
