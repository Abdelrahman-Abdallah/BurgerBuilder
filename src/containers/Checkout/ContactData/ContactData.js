import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import classes from "./ContactData.module.css";
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
      },
      email: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Please enter your email",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your streett",
        },
        value: "",
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your postal code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          //put here the attributes
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
      },
      delvieryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
      },
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Abdelrahman",
        email: "test@test.com",
        address: "test Address",
      },
      delvieryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <Input
          label="address"
          inputtype="text"
          elementType="..."
          elementConfig="..."
          value="..."
        />
        {/* <input type="text" name="name" placeholder="enter your name" />
        <input type="text" name="email" placeholder="enter your email" />
        <input type="text" name="address" placeholder="enter your address" /> */}
        <Button btnType="Success" click={this.orderHandler}>
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
export default ContactData;
