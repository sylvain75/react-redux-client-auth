import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

// hoisted up not to render each time from scratch in the component (which would result in loosing focus)
const renderField = ({ input, label, type, meta: { active, touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    {touched && !active && error && <span className="text-danger">{error}</span>}
  </fieldset>
)

class SignUp extends Component {

  handleFormSubmit(formProps) {
    // Sign user up
    this.props.signupUser(formProps);
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>OOPS !</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    console.log("PROPSSS", this.props);
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={renderField} type="email" label="Email"/>
        <Field name="password" component={renderField} type="password" label="Password"/>
        <Field name="password_confirmation" component={renderField} type="password" label="Password Confirmation"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  let errors = {}
  if (!values.email) {
    errors.email = "Please enter an email";
  }
  if (!values.password) {
    errors.password = "Please enter an password";
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = "Please enter an password confirmation";
  }
  if (values.password != values.password_confirmation) {
    errors.password = 'Password and password confirmation don\'t match!'
  }

  return errors
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form:'SignUp',
  validate
})(SignUp));

// const form = reduxForm({ form: 'signUp', validate })(SignUp)
// export default connect(mapStateToProps, actions)(form)
