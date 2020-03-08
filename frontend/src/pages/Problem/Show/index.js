import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  Container,
  FieldGroupList,
  List,
  Modal,
  Pagination,
} from '../../../components';
import ProblemPreview from '../Preview';

export default function HelpShow() {
  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentHelp, setCurrentHelp] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const loadHelps = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { docs, pages },
      } = await api.get(`problems?page=${page}`);
      setPageTotal(pages);
      setHelps(docs);
    } catch (error) {
      toast.error('Erro ao listar problemas');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadHelps();
  }, [page, loadHelps]);

  const handleAnswer = (help) => {
    setCurrentHelp(help);
    setOpenModal(true);
  };

  const handlePropagatesClose = () => {
    setOpenModal(false);
  };

  return (
    <Container loading={loading}>
      <FieldGroupList title="Problemas de entrega" />

      <List>
        <li>
          <div>
            <strong>Entrega</strong>
          </div>
          <div>
            <strong>Problema</strong>
          </div>
          <div>
            <strong>Ações</strong>
          </div>
        </li>
        {helps.map((help) => (
          <li key={help.id}>
            <div>
              #
              {help.delivery_id}
            </div>
            <div>{help.description}</div>
            <div>
              <button
                type="button"
                className="info"
                onClick={() => handleAnswer(help)}
              >
                responder
              </button>
            </div>
          </li>
        ))}
      </List>
      <Pagination current={page} total={pageTotal} setPage={setPage} />

      <Modal open={openModal} reset={handlePropagatesClose}>
        <ProblemPreview
          data={currentHelp}
          reset={handlePropagatesClose}
          cbAnswer={loadHelps}
        />
      </Modal>
    </Container>
  );
}
