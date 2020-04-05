import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Options, Pagination,
} from '../../../components';

export default function DeliverymanShow() {
  const [itens, setItens] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadItens = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { docs, pages },
      } = await api.get(`deliverymen?q=${q}&page=${page}`);

      setPageTotal(pages);
      setItens(docs);
    } catch (error) {
      toast.error('Erro ao listar entregador');
    }
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadItens();
  }, [loadItens]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar entregador?')) {
      setLoading(true);
      try {
        await api.delete(`registrations/${id}`);
        toast.success('Entregador apagado com sucesso');
        loadItens();
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
        location="/entregador.cadastrar"
        handleInput={setQ}
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
        {itens.map((item) => (
          <li key={item.id}>
            <div>
              #
              {item.id}
            </div>
            <div>
              <img
                src={`http://localhost:3333/files/${item.avatar_id}`}
                data-src={`https://whattt.glitch.me/files/${item.avatar_id}`}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                alt="Preview"
              />
            </div>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>
              <Options linkEdit={`entregador.editar/${item.id}`} handleDelete={() => handleDelete(item.id)} />
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />
    </Container>
  );
}
