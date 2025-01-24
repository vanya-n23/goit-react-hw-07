import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { fetchContacts, deleteContact } from '../../redux/contactsOps';
import "./ContactList.css"

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(state => state.contacts.loading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="list-con">
        {contacts.map(({ id, name, number }) => (
          <li className="contact-card" key={id}>
            {name}: {number}
            <button className='con-btn' onClick={() => dispatch(deleteContact(id))}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;