import React from 'react';
import PropTypes from 'prop-types';

import { StyledText } from './styles';

export default function TextStyled({ format, children, ...rest }) {
  return (
    <StyledText format={format} {...rest}>
      {children}
    </StyledText>
  );
}

TextStyled.propTypes = {
  children: PropTypes.string,
  format: PropTypes.string,
};

TextStyled.defaultProps = {
  format: '',
};
