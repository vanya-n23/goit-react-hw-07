import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import "./ContactForm.css"

const ContactForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      number: Yup.string().matches(/^\d+$/, 'Invalid phone number').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <form className='contact-form' onSubmit={formik.handleSubmit}>
      <input 
        className='in-con'
        type="text" 
        name="name" 
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Name"
      />
      {formik.errors.name && <p>{formik.errors.name}</p>}

      <input 
        className='in-con'
        type="text" 
        name="number" 
        value={formik.values.number}
        onChange={formik.handleChange}
        placeholder="Number"
      />
      {formik.errors.number && <p>{formik.errors.number}</p>}

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;