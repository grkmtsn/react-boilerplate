import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, FormItem } from '@jbuschke/formik-antd';
import { Button, Icon, Alert } from 'antd';

import { authenticationService } from '@/services';

const styles = {
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  image: { width: 400 },
  form: { padding: 24 },
  alert: { marginBottom: 24 },
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      const { history } = this.props;
      history.push('/dashboard');
    }
  }

  handleSubmit = ({ username, password }, { setStatus, setSubmitting }) => {
    setStatus();
    authenticationService.login(username, password).then(
      () => {
        // eslint-disable-next-line react/destructuring-assignment
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { history } = this.props;
        history.push(from);
      },
      error => {
        setSubmitting(false);
        setStatus(error);
      },
    );
  };

  renderLoginForm = ({ handleSubmit, isSubmitting, status }) => (
    <div style={styles.wrapper}>
      <img
        src="https://image.freepik.com/free-vector/programmer-working-with-sql_52683-22997.jpg"
        style={styles.image}
        alt="intro"
      />
      <Form onSubmit={handleSubmit} style={styles.form}>
        <h2>React Boilerplate</h2>
        <FormItem name="username" required>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="text"
            name="username"
            placeholder="Username"
          />
        </FormItem>
        <FormItem name="password" required>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            placeholder="Password"
          />
        </FormItem>
        {status && <Alert style={styles.alert} type="error" description={status} />}
        <Button loading={isSubmitting} disabled={isSubmitting} type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );

  render() {
    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    });

    const initialValues = {
      username: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        render={this.renderLoginForm}
      ></Formik>
    );
  }
}

export { LoginPage };
