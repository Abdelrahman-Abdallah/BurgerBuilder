import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
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
  render() {
    const formedArray = [];
    for (let key in this.state.controls) {
      formedArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formedArray.map((formElement) => (
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
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
