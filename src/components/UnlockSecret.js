import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import trojanSecret from "../trojanSecret";

export default class UnlockSecret extends Component {
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
      await trojanSecret.methods.unlockMessage(this.state.value).send({
        from: accounts[0],
        value: web3.utils.toWei("1", "ether")
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({
      loading: false,
      message: "The message has been unlocked!"
    });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button color="orange" onClick={this.handleOpen}>
            Unlock a Secret Message
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Unlock Message (you will be charged 1 ether)" />
        <Modal.Content>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Account Name</label>
              <input
                placeholder="Name"
                onChange={event => this.setState({ value: event.target.value })}
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary type="submit" loading={this.state.loading}>
              <Icon name="check" />
              Submit{" "}
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

