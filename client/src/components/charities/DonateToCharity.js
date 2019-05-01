import React, {Component} from "react";
import {Button, Header, Icon, Modal, Form, Message} from "semantic-ui-react";
import Charity from "../../contracts/Charity";
import web3 from "../../web3";


export default class DonateToCharity extends Component {
    state = {
        modalOpen: false,
        numPlayers: "0",
        message: "",
        players: [],
        errorMessage: "",
    };

    handleOpen = async () => {
        this.setState({modalOpen: true});
        //const numPlayers = await trojanSecret.methods.memberCount().call();
        //const players = this.props.convert(await trojanSecret.methods.listPlayers().call());
    };


    handleClose = () => this.setState({modalOpen: false});

    onSubmit = async event => {
      event.preventDefault();
      this.setState({
        loading: true,
        errorMessage: "",
        message: "waiting for blockchain transaction to complete..."
      });
      try {
        const accounts = await web3.eth.getAccounts();
        await Charity.methods
          .donate({from: accounts[9], value: (this.state.value)}); // contains the donation Amount

        this.setState({
          loading: false,
          message: "You have donated"
        });
      } catch (err) {
        this.setState({
          loading: false,
          errorMessage: err.message,
          message: "Donation Error"
        });
      }
    };

    render() {
        return (
            <Modal
                trigger={
                    <div className="ui basic green button" onClick={this.handleOpen}>Donate</div>

                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Header icon="browser" content="Charity Details"/>
                <Modal.Content>

                    <h4>{this.props.name}</h4>
                    <br/>
                    <h3>
                        {this.props.description}
                    </h3>

                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Donation amount:</label>
                            <input
                                placeholder="Donation Amount"
                                onChange={event => this.setState({value: event.target.value})}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <div className="ui buttons">

                            <button className="ui button active" loading={this.state.loading}
                                    onClick={this.handleClose}>Cancel
                            </button>
                            <div className="or"/>

                            <button className="ui positive button" loading={this.state.loading} type="submit">
                              Donate
                            </button>



                        </div>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" onClick={this.handleClose} inverted>
                        <Icon name="cancel"/> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}
