import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { EmptyItemWrap, Row, RowHeader, RowData, IconStyled } from './styles';

export default function Checkin({ data }) {
  return (
    <EmptyItemWrap>
      <Row>
        <IconStyled name="info" color="warning" />
        <RowHeader>{data.description ? data.description : 'Sem registros'}</RowHeader>
      </Row>
    </EmptyItemWrap>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }).isRequired,
};
