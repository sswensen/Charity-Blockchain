import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import trojanSecret from "../trojanSecret";

export default class Register extends Component {
  state = {
    modalOpen: false,
    value: "",
    message: "",
    errorMessage: "",
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await trojanSecret.methods
        .registerTrojan(this.state.value) // contains the user account name
        .send({
          from: accounts[0]
        });
      this.setState({
        loading: false,
        message: "You have been registered as a new Trojan"
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction or else this account is already in use, please try another name."
      });
    }
  };

  render() {
    return (
      <Modal
        trigger={
          <Button primary onClick={this.handleOpen}>
            Create Account
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Trojan User Registration" />
        <Modal.Content>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Account Name</label>
              <input
                placeholder="Name"
                onChange={event =>
                  this.setState({
                    value: event.target.value
                  })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary type="submit" loading={this.state.loading}>
              <Icon name="check" />
              Create Account
            </Button>
            <hr />
            <h2>{this.state.message}</h2>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
