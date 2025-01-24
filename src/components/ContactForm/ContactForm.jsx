import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import './ContactForm.css'

const ContactsForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
     name: Yup.string()
    .min(3, "Must be at least 3 letters")
    .max(50, "Must be 50 letters or less")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in format XXX-XX-XX")
    .required("Number is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const isDuplicate = contacts.some(contact => contact.name === values.name);

      if (isDuplicate) {
        alert(`${values.name} is already in contacts.`);
        return;
      }

      dispatch(addContact({ id: nanoid(), name: values.name, number: values.number }));
      resetForm();
    },
  });

  return (
    <form className='contact-form' onSubmit={formik.handleSubmit}>
      <label className='lab-con' htmlFor="name">Name</label>
      <input
        className='in-con'
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
        <div style={{ color: 'red' }}>{formik.errors.name}</div>
      ) : null}

      <label className='lab-con' htmlFor="number">Number</label>
      <input
        className='in-con'
        id="number"
        name="number"
        type="text"
        value={formik.values.number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.number && formik.errors.number ? (
        <div style={{ color: 'red' }}>{formik.errors.number}</div>
      ) : null}

      <button type="submit">Add Contact</button>
      </form>
    
  );
};

export default ContactsForm;