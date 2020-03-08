import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container, FieldGroupList, List, Pagination,
} from '../../../components';

export default function StudentShow() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`recipients?q=${q}&page=${page}`);
      const { docs, pages } = response.data;
      setPageTotal(pages);
      setStudents(docs);
    } catch (error) {
      toast.error('Erro ao listar destinatários');
    }
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadStudents();
  }, [q, loadStudents]);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza que deseja apagar destinatário?')) {
      setLoading(true);
      try {
        await api.delete(`students/${id}`);
        toast.success('Destinatário apagado com sucesso');
        loadStudents();
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
        location="/recipient.new"
        handleChange={setQ}
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
        {students.map((item) => (
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
              <Link to={`recipient.edit/${item.id}`} className="edit">
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
