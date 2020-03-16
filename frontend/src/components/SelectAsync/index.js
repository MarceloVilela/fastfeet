import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
}
const SelectAsync: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        } else {
          if (!ref.select.state || !ref.select.state.value) {
            return '';
          }
          return ref.select.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  //if it has a initial data, wait until it is informed
  if (rest.initial && !rest.defaultValue) {
    return <select></select>;
  }

  return (
    <Select
      cacheOptions
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};
export default SelectAsync;
