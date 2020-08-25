import React from "react";
import Button from "../../../components/UI/Button/Button";
class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  render() {
    return (
      <div>
        <h4>Enter your contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="enter your name" />
          <input type="text" name="email" placeholder="enter your email" />
          <input type="text" name="address" placeholder="enter your address" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}
export default ContactData;
