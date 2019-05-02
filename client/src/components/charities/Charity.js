import React, {Component} from "react";
import {Button, Header, Icon, Modal, List, Item} from "semantic-ui-react";

export default class Charity extends Component {
    state = {
        modalOpen: false,
        numPlayers: "0",
        message: "",
        players: [],
        errorMessage: "",
        transactionAmounts: []
    };

    handleOpen = async () => {
        this.setState({modalOpen: true});
        //const numPlayers = await trojanSecret.methods.memberCount().call();
        //const players = this.props.convert(await trojanSecret.methods.listPlayers().call());

        //const receivedDetails = await trojanSecret.methods.getDescription(this.props.name).call();


        this.setState({
            //description: receivedDetails,
        });

        this.props.charity.methods.getTranscationAmounts().call()
            .then((response) => this.setState({
                transactionAmounts: this.props.convert(response)
            }));
    };


    handleClose = () => this.setState({modalOpen: false});

    render() {
        return (
            <Modal
                trigger={
                    <div className="ui basic blue button" onClick={this.handleOpen}>Details</div>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon
            >
                <Header icon="browser" content="Charity Details"/>
                <Modal.Content>

                    <h2 className="ui icon header center aligned">
                        <i className="copy outline icon"/>
                        <div className="content">
                            {this.props.name}
                            <h3 className="sub header">{this.props.description}</h3>
                            <br/>
                            <h4 className="sub header">Current amount donated: {this.props.balance} Ethereum.</h4>
                            <br/>
                            <h3 className="sub header">Recent donations:
                                <br/>
                                <List>
                                    {this.state.transactionAmounts.map((t) =>
                                        <Item key={t + Math.random()}>{t/(10**18)} Eth</Item>
                                    )}
                                </List>
                            </h3>

                        </div>
                    </h2>
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
