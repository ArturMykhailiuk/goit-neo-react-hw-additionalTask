import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.flex}>
        <label className={css.labelFlex}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.labelFlex}>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit" className={css.logBtn}>
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
