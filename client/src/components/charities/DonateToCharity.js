import React, {Component} from "react";
import {Button, Header, Icon, Modal, Form, Message} from "semantic-ui-react";

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
            errorMessage: "",
            message: "waiting for blockchain transaction to complete..."
          });
          try {
            const accounts = await this.props.web3.eth.getAccounts();
            console.log(Number.parseInt(this.state.value));
            //console.log(this.state.value);
            await this.props.charity.methods.donate(Number.parseInt(this.state.value)) // contains the donation Amount
                  .send({
                    from: accounts[1]
                  });


            this.setState({
              message: "You have donated"
            });
          } catch (err) {
            this.setState({
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
                closeIcon
            >
                <Header icon="dollar sign" content="Donate to Charity"/>
                <Modal.Content>
                    <h2 className="ui icon header center aligned">
                        <i className="money bill alternate outline icon"/>
                        <div className="content">
                            Donate
                            <h3 className="sub header">{this.props.name}</h3>
                        </div>
                    </h2>

                    <br/>

                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Donation amount:</label>
                            <input
                                placeholder="Amount"
                                onChange={event => this.setState({value: event.target.value})}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <div className="ui buttons">
                            <button className="ui button active" loading={this.state.loading}
                                    onClick={this.handleClose}>Cancel
                            </button>
                            <div className="or"/>
                            <button className="ui positive button" loading={this.state.loading} type="submit">Donate
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
