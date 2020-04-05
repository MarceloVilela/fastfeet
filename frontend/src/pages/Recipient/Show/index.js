import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Options, Pagination,
} from '../../../components';

export default function RecipientShow() {
  const [itens, setItens] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadItens = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`recipients?q=${q}&page=${page}`);
      const { docs, pages } = response.data;
      setPageTotal(pages);
      setItens(docs);
    } catch (error) {
      toast.error('Erro ao listar destinatários');
    }
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadItens();
  }, [loadItens]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar destinatário?')) {
      setLoading(true);
      try {
        await api.delete(`recipients/${id}`);
        toast.success('Destinatário apagado com sucesso');
        loadItens();
      } catch (error) {
        toast.error('Erro ao apagar destinatário');
      }
      setLoading(false);
    }
  };

  return (
    <Container loading={loading}>
      <FieldGroupList
        title="Gerenciando destinatários"
        location="/destinatario.cadastrar"
        handleInput={setQ}
        inputPlaceholder="Buscar por destinatários"
      />

      <List>
        <li>
          <div>
            <strong>ID</strong>
          </div>
          <div>
            <strong>Nome</strong>
          </div>
          <div>
            <strong>Endereço</strong>
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
            <div>{item.name}</div>
            <div>
              {item.street}
              ,
              {' '}
              {item.number}
              ,
              {' '}
              {item.city}
              {' '}
              -
              {' '}
              {item.state}
            </div>
            <div>
              <Options linkEdit={`destinatario.editar/${item.id}`} handleDelete={() => handleDelete(item.id)} />
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />
    </Container>
  );
}
