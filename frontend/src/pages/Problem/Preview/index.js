import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ProblemPreview({ data }) {
  return (
    <Container>
      <strong>VISUALIZAR PROBLEMA</strong>
      <p>{data.description}</p>
    </Container>
  );
}

ProblemPreview.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
