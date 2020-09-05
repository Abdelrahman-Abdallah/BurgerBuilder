import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "email",
          placeholder: "Please enter your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "password",
          placeholder: "Please enter your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    validForm: false,
    isSignUp: false,
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  handleInputChange = (event, identifier) => {
    const updateControls = {
      ...this.state.controls,
      [identifier]: {
        ...this.state.controls[identifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[identifier].validation
        ),
        touched: true,
      },
    };

    let formvalid = true;
    for (let key in updateControls) {
      formvalid = updateControls[key].valid && formvalid;
    }
    this.setState({ controls: updateControls, validForm: formvalid });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };
  render() {
    const formedArray = [];
    for (let key in this.state.controls) {
      formedArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formedArray.map((formElement) => (
      <Input
        key={formElement.id}
        Label={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.handleInputChange(event, formElement.id)}
      />
    ));
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }
    if (this.props.loading) form = <Spinner />;
    let isAuthenticated = this.props.isAuthenticated ? (
      <Redirect to="/" />
    ) : null;
    return (
      <div className={classes.Auth}>
        {isAuthenticated}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          <h3>{this.state.isSignUp ? "SignUp" : "SignIn"}</h3>
          {form}
          <Button disabled={!this.state.validForm} btnType="Success">
            {this.state.isSignUp ? "SignUp" : "SignIn"}
          </Button>
        </form>
        <Button btnType="Danger" click={this.switchAuthModeHandler}>
          Switch to {!this.state.isSignUp ? "SignUp" : "SignIn"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
