import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz, MdInfo, MdEdit, MdDelete,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Item, Description, Wrapper } from './styles';

export default function Options({
  handleInfo,
  linkEdit,
  handleDelete,
}) {
  const [visible, setVisible] = useState(false);

  /* const handleBlur = () => {
    console.log('blur')
    setVisible(false)
  } */

  return (
    <div>
      <Item
        onClick={() => setVisible(!visible)}
      // onFocus={console.log('focus1')}
      >
        <MdMoreHoriz />
      </Item>
      {visible
        && (
          <Wrapper>
            <Item onClick={handleInfo} className="info">
              <MdInfo />
              <Description>Visualizar</Description>
            </Item>

            <Item className="edit">
              <Link to={linkEdit}>
                <MdEdit />
                <Description>Editar</Description>
              </Link>
            </Item>

            <Item onClick={handleDelete} className="delete">
              <MdDelete />
              <Description>Apagar</Description>
            </Item>
          </Wrapper>
        )}
    </div>
  );
}

Options.propTypes = {
  handleInfo: PropTypes.func,
  linkEdit: PropTypes.string,
  handleDelete: PropTypes.func,
};

Options.defaultProps = {
  handleInfo: () => { },
  linkEdit: '',
  handleDelete: () => { },
};
