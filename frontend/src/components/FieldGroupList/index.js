import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import indicator from '~/assets/load.gif';

import { FieldGroup, InputContainer } from './styles';

export default function FieldGroupList({
  title,
  location,
  handleInput,
  inputPlaceholder,
}) {
  return (
    <FieldGroup>
      <h1>{title}</h1>

      <article>
        {inputPlaceholder && (
          <div>
            <InputContainer>
              <MdSearch
                style={{
                  left: '5px', top: '10px', position: 'relative', zIndex: 9,
                }}
              />
              <input
                type="text"
                name="search"
                placeholder={inputPlaceholder}
                onChange={(e) => { handleInput(e.target.value); }}
              />
            </InputContainer>
          </div>
        )}

        {location && (
          <Link to={location}>
            <button type="button">
              <MdAdd style={{ marginRight: '10px' }} />
              CADASTRAR
            </button>
          </Link>
        )}
      </article>
    </FieldGroup>
  );
}

FieldGroupList.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  handleInput: PropTypes.func,
  inputPlaceholder: PropTypes.string,
};

FieldGroupList.defaultProps = {
  location: '',
  handleInput: () => {},
  inputPlaceholder: '',
};
