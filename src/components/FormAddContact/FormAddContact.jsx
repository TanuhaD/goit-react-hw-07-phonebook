// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations/operations';
import { getContacts } from '../../redux/selectors/selectors';
import css from './FormAddContact.module.css';

const INITIAL_FORM_STATE = {
  name: '',
  number: '',
};

export const FormAddContact = () => {
  const [name, setName] = useState(INITIAL_FORM_STATE.name);
  const [number, setNumber] = useState(INITIAL_FORM_STATE.number);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const updateContacts = ({ name, number }) => {
    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Не можна!!!');
      return false;
    }
    dispatch(addContact({ name, number }));
    return true;
  };

  const handleInputChange = ({ target }) => {
    const { name } = target;
    switch (name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
      default:
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const isOperationSuccessful = updateContacts({ name, number });
    if (isOperationSuccessful) {
      setName(INITIAL_FORM_STATE.name);
      setNumber(INITIAL_FORM_STATE.number);
    }
  };

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={css.container}
      >
        <label htmlFor="" className={css.label}>
          <span className={css.text}>Name</span>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputChange}
          />
          <span className={css.text}>Number</span>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export default FormAddContact;
