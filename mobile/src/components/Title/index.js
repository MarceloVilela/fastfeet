import React from 'react';
import PropTypes from 'prop-types';

import { Wrap, IconStyled, Legend } from './styles';

export default function Title({ iconName, label }) {
  return (
    <Wrap>
      <IconStyled name={iconName} color="primary" />
      <Legend>{label}</Legend>
    </Wrap>
  );
}

Title.propTypes = {
  iconName: PropTypes.string,
  label: PropTypes.string.isRequired,
};
