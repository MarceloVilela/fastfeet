import React from 'react';
import PropTypes from 'prop-types';

import { Wrap, IconStyled, Legend } from './styles';

export default function Title({ iconName, children, ...rest }) {
  return (
    <Wrap>
      <IconStyled name={iconName} color="primary" />
      <Legend>{children}</Legend>
    </Wrap>
  );
}

Title.propTypes = {
  iconName: PropTypes.string,
  children: PropTypes.element.isRequired
};
