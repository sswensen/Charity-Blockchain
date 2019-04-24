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
                    <br />
                    <h3>
                        {this.props.description}
                    </h3>

                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Donation amount:</label>
                            <input
                                placeholder="Name"
                                onChange={event => this.setState({ value: event.target.value })}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <div className="ui buttons">
                            <button className="ui button active" loading={this.state.loading} onClick={this.handleClose}>Cancel</button>
                            <div className="or"></div>
                            <button className="ui positive button" loading={this.state.loading} type="submit">Donate</button>
                        </div>
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
