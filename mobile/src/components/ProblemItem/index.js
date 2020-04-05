import React from 'react';
import PropTypes from 'prop-types';

import { ProblemItemWrap, Row, RowHeader, RowData } from './styles';

export default function Checkin({ data }) {
  return (
    <ProblemItemWrap>
      <Row space={false}>
        <RowHeader>{data.description}</RowHeader>
        <RowData>{data.createdAtFormated}</RowData>
      </Row>
    </ProblemItemWrap>
  );
}

Checkin.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }).isRequired,
};
