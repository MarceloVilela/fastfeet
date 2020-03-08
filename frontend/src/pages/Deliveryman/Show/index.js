import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Pagination,
} from '../../../components';

export default function RegistrationShow() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { docs, pages },
      } = await api.get(`deliverymen?page=${page}`);

      setPageTotal(pages);
      setDeliverymen(docs);
    } catch (error) {
      toast.error('Erro ao listar entregador');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadRegistrations();
  }, [page, loadRegistrations]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar entregador?')) {
      setLoading(true);
      try {
        await api.delete(`registrations/${id}`);
        toast.success('Entregador apagado com sucesso');
        loadRegistrations();
      } catch (error) {
        toast.error('Erro ao apagar entregador');
      }
      setLoading(false);
    }
  };

  return (
    <Container loading={loading}>
      <FieldGroupList
        title="Gerenciando entregadores"
        location="/deliveryman.new"
        handleChange={() => { }}
        inputPlaceholder="Buscar por entregadores"
      />

      <List>
        <li>
          <div>
            <strong>ID</strong>
          </div>
          <div>
            <strong>Foto</strong>
          </div>
          <div>
            <strong>Nome</strong>
          </div>
          <div>
            <strong>Email</strong>
          </div>
          <div>
            <strong>Ações</strong>
          </div>
        </li>
        {deliverymen.map((item) => (
          <li key={item.id}>
            <div>
              #
              {item.id}
            </div>
            <div>---</div>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>
              <Link to={`deliveryman.edit/${item.id}`} className="edit">
                <span className="edit">editar</span>
              </Link>

              <button
                type="button"
                className="warning"
                onClick={() => handleDelete(item.id)}
              >
                apagar
              </button>
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />
    </Container>
  );
}
