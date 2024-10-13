import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.flex}>
        <label className={css.labelFlex}>
          Name
          <Field type="text" name="name" />
        </label>
        <label className={css.labelFlex}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.labelFlex}>
          Password
          <Field type="password" name="password" />
        </label>
        <button className={css.regBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
