import "./Contact.css"
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li className="contact-card">
      {contact.name}: {contact.number}
      <button className="con-btn" onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </button>
    </li>
  );
};

export default Contact;