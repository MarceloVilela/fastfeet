import React from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz, MdInfo, MdEdit, MdDelete,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Item, Description, Wrapper } from './styles';
import useComponentVisible from './useComponentVisible';

export default function Options({
  handleInfo,
  linkEdit,
  handleDelete,
  deleteLabel,
}) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  return (
    <div>
      <Item
        onClick={() => setIsComponentVisible(true)}
      // onFocus={console.log('focus1')}
      >
        <MdMoreHoriz />
      </Item>
      {(isComponentVisible)
        && (
          <Wrapper ref={ref}>
            <Item onClick={() => { handleInfo(); setIsComponentVisible(false); }} className="info">
              <MdInfo />
              <Description>Visualizar</Description>
            </Item>

            {linkEdit
              && (
                <Item className="edit">
                  <Link to={linkEdit}>
                    <MdEdit />
                    <Description>Editar</Description>
                  </Link>
                </Item>
              )}

            {handleDelete
              && (
              <Item onClick={handleDelete} className="delete">
                <MdDelete />
                <Description>{deleteLabel}</Description>
              </Item>
              )}
          </Wrapper>
        )}
    </div>
  );
}

Options.propTypes = {
  handleInfo: PropTypes.func,
  linkEdit: PropTypes.string,
  handleDelete: PropTypes.func,
  deleteLabel: PropTypes.string,
};

Options.defaultProps = {
  handleInfo: () => { },
  linkEdit: '',
  handleDelete: () => { },
  deleteLabel: 'Excluir',
};
