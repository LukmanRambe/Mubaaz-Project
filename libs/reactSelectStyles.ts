import { StylesConfig } from 'react-select';

import type { Option } from '../ts/types/main/Option';

type IsMulti = false;

export const dataPerPageCustomStyles: StylesConfig<Option<string>, IsMulti> = {
  control: (base, state) => ({
    ...base,
    borderRadius: 30,
    padding: '2px 5px',
    width: '100%',
    border: `1px solid #7d9e9b`,
    transition: 'all ease-in-out .08s',
    boxShadow: state.isFocused
      ? '0 0 0 .8px #66888b'
      : '0 0 0 .8px transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#66888b',
      outline: '#66888b',
    },
    '&:active': {
      border: '1px solid #66888b',
      outline: '#66888b',
    },
    '&:focus': {
      border: '1px solid transparent',
      outline: '#66888b',
    },
    '@media only screen and (max-width: 767px)': {
      width: '100%',
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? 'white' : 'black',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? '#96b4ac'
      : state.isFocused
      ? '#d1e5e2'
      : 'white',
    transition: 'all ease-in-out .08s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#96b4ac' : '#d1e5e2',
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#96b4ac',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#66888b' : '#96b4ac',
    '&:hover': {
      color: '#7d9e9b',
    },
    '&active': {
      color: '#66888b',
    },
  }),
};

export const donasiDataTypeCustomStyles: StylesConfig<
  Option<string>,
  IsMulti
> = {
  control: (base, state) => ({
    ...base,
    borderRadius: 30,
    padding: '2px 5px',
    width: '100%',
    minWidth: '141px',
    border: `1px solid #7d9e9b`,
    transition: 'all ease-in-out .08s',
    boxShadow: state.isFocused
      ? '0 0 0 .8px #66888b'
      : '0 0 0 .8px transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#66888b',
      outline: '#66888b',
    },
    '&:active': {
      border: '1px solid #66888b',
      outline: '#66888b',
    },
    '&:focus': {
      border: '1px solid transparent',
      outline: '#66888b',
    },
    '@media only screen and (max-width: 767px)': {
      width: '100%',
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? 'white' : 'black',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? '#96b4ac'
      : state.isFocused
      ? '#d1e5e2'
      : 'white',
    transition: 'all ease-in-out .08s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#96b4ac' : '#d1e5e2',
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#96b4ac',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#66888b' : '#96b4ac',
    '&:hover': {
      color: '#7d9e9b',
    },
    '&active': {
      color: '#66888b',
    },
  }),
};

export const selectStringInputCustomStyles: StylesConfig<
  Option<string>,
  IsMulti
> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '.375rem',
    padding: '3.25px 4px',
    fontSize: '.87rem',
    lineHeight: '1rem',
    width: '100%',
    border: `1px solid #7d9e9b`,
    transition: 'all ease-in-out .08s',
    boxShadow: state.isFocused
      ? '0 0 0 .8px #66888b'
      : '0 0 0 .8px transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#66888b',
      outline: '#66888b',
    },
    '&:active': {
      border: '1px solid #66888b',
      outline: '#66888b',
    },
    '&:focus': {
      border: '1px solid transparent',
      outline: '#66888b',
    },
    '@media only screen and (max-width: 767px)': {
      width: '100%',
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? 'white' : 'black',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? '#96b4ac'
      : state.isFocused
      ? '#d1e5e2'
      : 'white',
    transition: 'all ease-in-out .08s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#96b4ac' : '#d1e5e2',
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#96b4ac',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#66888b' : '#96b4ac',
    '&:hover': {
      color: '#7d9e9b',
    },
    '&active': {
      color: '#66888b',
    },
  }),
};

export const selectNumberInputCustomStyles: StylesConfig<
  Option<number>,
  IsMulti
> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '.375rem',
    padding: '3.25px 4px',
    fontSize: '.87rem',
    lineHeight: '1rem',
    width: '100%',
    border: `1px solid #7d9e9b`,
    transition: 'all ease-in-out .08s',
    boxShadow: state.isFocused
      ? '0 0 0 .8px #66888b'
      : '0 0 0 .8px transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: '#66888b',
      outline: '#66888b',
    },
    '&:active': {
      border: '1px solid #66888b',
      outline: '#66888b',
    },
    '&:focus': {
      border: '1px solid transparent',
      outline: '#66888b',
    },
    '@media only screen and (max-width: 767px)': {
      width: '100%',
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? 'white' : 'black',
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? '#96b4ac'
      : state.isFocused
      ? '#d1e5e2'
      : 'white',
    transition: 'all ease-in-out .08s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#96b4ac' : '#d1e5e2',
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#96b4ac',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#66888b' : '#96b4ac',
    '&:hover': {
      color: '#7d9e9b',
    },
    '&active': {
      color: '#66888b',
    },
  }),
};
