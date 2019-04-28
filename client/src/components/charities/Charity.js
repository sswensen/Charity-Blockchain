import React, {Component} from "react";
import {Button, Header, Icon, Modal} from "semantic-ui-react";

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
                closeIcon
            >
                <Header icon="browser" content="Charity Details"/>
                <Modal.Content>

                    <h2 className="ui icon header center aligned">
                        <i className="copy outline icon"/>
                        <div className="content">
                            {this.props.name}
                            <h3 className="sub header">{this.props.description}</h3>
                            <h4 className="sub header">Current amount donated: {this.props.balance}</h4>
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
