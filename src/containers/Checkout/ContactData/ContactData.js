import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
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
        <input type="text" name="name" placeholder="enter your name" />
        <input type="text" name="email" placeholder="enter your email" />
        <input type="text" name="address" placeholder="enter your address" />
        <Button btnType="Success" click={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4>Enter your contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;