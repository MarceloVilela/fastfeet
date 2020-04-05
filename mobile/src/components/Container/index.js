import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { color } from '~/styles/values.js';
import { Wrap, WrapLoading, Scroll } from './styles';

export default function Container({
  children,
  loading,
  scrollEnabled,
  spaced,
  ...rest
}) {
  return (
    <Wrap {...rest} scrollEnabled={scrollEnabled} spaced={spaced}>
      {loading ? (
        <WrapLoading>
          <ActivityIndicator size="large" color={color.primary} />
        </WrapLoading>
      ) : (
        <>{scrollEnabled ? <Scroll>{children}</Scroll> : <>{children}</>}</>
      )}
    </Wrap>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  spaced: PropTypes.bool,
};

Container.defaultProps = {
  loading: false,
  scrollEnabled: false,
};
