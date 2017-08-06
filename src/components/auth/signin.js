import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    // Need to do something
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops !</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  fieldHelper(field){
    return(
      <div>
        <input {...field.input } type={field.type} className="form-control" />
      </div>
    );
  }
  render() {
    console.log("PROPS", this.props);
    const { handleSubmit } = this.props;
    return (
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))} >
        <fieldset className="form-group">
          <label>Email:</label>
          <Field type="text" name="email" component={this.fieldHelper} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field type="password" name="password" component={this.fieldHelper} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
}
const form = reduxForm({ form: 'signin' })(Signin)
export default connect(mapStateToProps, actions)(form)
