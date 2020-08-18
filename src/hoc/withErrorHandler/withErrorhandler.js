import React from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import BackDrop from "../../components/UI/Backdrop/Backdrop";
const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(null, (err) =>
        this.setState({ error: err })
      );
    }
    clearError = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <BackDrop show={this.state.error} hide={this.clearError}></BackDrop>
          <Modal show={this.state.error} click={this.clearError}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default WithErrorHandler;
