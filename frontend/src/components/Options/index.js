import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdInfo, MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Options({
  handleInfo,
  linkEdit,
  handleDelete
}) {
  const [visible, setVisible] = useState(false)

  /*const handleBlur = () => {
    console.log('blur')
    setVisible(false)
  }*/

  return (
    <div>
      <p
        onClick={() => setVisible(!visible)}
        //onFocus={console.log('focus1')}
      >AAA</p>
      {visible &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            border: '1px solid red',
            position: 'absolute',
            right: '20px'
          }}
        //onMouseLeave={console.log('blur')}
        //onFocus={console.log('focus')}
        >
          <button
            type="button"
            className="info"
            onClick={handleInfo}
          >
            <MdInfo style={{ marginRight: '10px' }} />
            visualizar
          </button>

          <Link to={linkEdit} className="edit">
            <button
              type="button"
              className="info"
              onClick={handleInfo}
            >
              <MdEdit style={{ marginRight: '10px' }} />
            editar
          </button>

          </Link>

          <button
            type="button"
            className="warning"
            onClick={handleDelete}
          >
            <MdDelete style={{ marginRight: '10px' }} />
            apagar
          </button>
        </div>
      }
    </div>
  );
  /*return (
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
                onChange={(e) => handleInput(e.target.value)}
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
  );*/
}

Options.propTypes = {
  handleInfo: PropTypes.func,
  linkEdit: PropTypes.string,
  handleDelete: PropTypes.func
};

Options.defaultProps = {
  handleInfo: () => { },
  linkEdit: '',
  handleDelete: () => { },
};
