import React, {Component} from "react";
import {Button, Header, Icon, Modal, Form, Message} from "semantic-ui-react";

export default class Charity extends Component {
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

        //const receivedDetails = await trojanSecret.methods.getDescription(this.props.name).call();


        this.setState({
            //description: receivedDetails,
        });
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
            >
                <Header icon="browser" content="Charity Details"/>
                <Modal.Content>

                    <h4>{this.props.name}</h4>
                    <br />
                    <h3>
                        {this.props.description}
                    </h3>
                    <h3> Charity Owner: </h3>
                    <h3> Charity Balance: </h3>


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
