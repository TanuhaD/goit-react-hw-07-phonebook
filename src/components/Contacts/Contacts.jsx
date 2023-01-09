import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/operations/operations';
import { getContacts, getNameFilter } from '../../redux/selectors/selectors';
import css from './Contacts.module.css';

function Contacts({ children }) {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const filter = useSelector(getNameFilter);
  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <div className={css.container}>
        {children}
        <ul className={css.contactsList}>
          {filteredContacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={css.contactsItem}>
                {name} {number}
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => dispatch(deleteContact(id))}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

// Contacts.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };

export default Contacts;
