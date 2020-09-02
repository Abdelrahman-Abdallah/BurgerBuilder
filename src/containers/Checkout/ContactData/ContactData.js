import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import classes from "./ContactData.module.css";
import { connect } from "react-redux";
class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Please enter your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Please enter your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your streett",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your postal code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      delvieryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        valid: true,
      },
    },
    loading: false,
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
  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    const formUserData = {};
    for (let key in this.state.orderForm) {
      formUserData[key] = this.state.orderForm[key].value;
    }
    console.log(formUserData);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: formUserData,
    };
  };
  handleInputChange = (event, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updateElement = { ...updatedOrderForm[identifier] };
    updateElement.value = event.target.value;
    updateElement.valid = this.checkValidity(
      updateElement.value,
      updateElement.validation
    );
    updateElement.touched = true;
    updatedOrderForm[identifier] = updateElement;
    console.log(updateElement);
    let formvalid = true;
    for (let key in updatedOrderForm) {
      formvalid = updatedOrderForm[key].valid && formvalid;
    }
    this.setState({ orderForm: updatedOrderForm, validForm: formvalid });
  };
  render() {
    const formedArray = [];
    for (let key in this.state.orderForm) {
      formedArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formedArray.map((element) => (
          <Input
            label={element.id}
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => this.handleInputChange(event, element.id)}
          />
        ))}
        {/* <input type="text" name="name" placeholder="enter your name" />
        <input type="text" name="email" placeholder="enter your email" />
        <input type="text" name="address" placeholder="enter your address" /> */}
        <Button disabled={!this.state.validForm} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div style={{ textAlign: "center" }} className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
