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
           name: Yup.string()
    .min(3, "Must be at least 3 letters")
    .max(50, "Must be 50 letters or less")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in format XXX-XX-XX")
    .required("Number is required"),
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