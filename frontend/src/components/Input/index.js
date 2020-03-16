import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

interface Props extends InputProps {
  name: string;
}

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName, defaultValue = '', registerField, error,
  } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue('');
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  if (!('mask' in rest)) {
    //return <input ref={inputRef} defaultValue={defaultValue} {...rest} />;
    return (
      <React.Fragment>
        <input ref={inputRef} defaultValue={defaultValue} {...rest} />
        {error && <span className="error">{error}</span>}
      </React.Fragment>
    );
  }

  //if it has a initial data, wait until it is informed
  if (rest.initial && !rest.defaultValue) {
    return <input></input>;
  }

  return <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
}
