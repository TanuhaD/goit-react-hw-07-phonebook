import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/slicers/filterSlice';
import css from './Filter.module.css';
export const Filter = () => {
  const dispatch = useDispatch();
  const handleInputChange = ({ target }) => {
    dispatch(updateFilter(target.value.toLowerCase()));
  };
  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input className={css.input} type="text" onChange={handleInputChange} />
    </div>
  );
};

export default Filter;
