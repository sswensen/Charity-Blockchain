import React, {Component} from "react";
import {Button, Header, Icon, Modal, Form, Message} from "semantic-ui-react";
import web3 from "../web3";
import trojanSecret from "../trojanSecret";

export default class ListPlayers extends Component {
    state = {
        modalOpen: false,
        numPlayers: "0",
        message: "",
        players: [],
        errorMessage: ""
    };

    convert(hex) {
        //console.log(hex);
        try {
            var str = '';
            for(var i = 0; i < hex.length; i += 2) {
                var v = parseInt(hex.substr(i, 2), 16);
                if(v) str += String.fromCharCode(v);
            }

            let params = [];
            let res = "";
            for(var i = 0; i <= str.length; i++) {
                if(str.charCodeAt(i) > 31) {
                    res = res + str[i];
                } else {
                    params.push(res);
                    res = "";
                }
            }
            params.pop();

            return params;
        } catch(e) {
            return [];
        }
    };

    handleOpen = async () => {
        this.setState({modalOpen: true});
        const numPlayers = await trojanSecret.methods.memberCount().call();
        const players = this.convert(await trojanSecret.methods.listPlayers().call());
        //const players = this.convert("0x426f6200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003416c696365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000553636f74740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005");
        this.setState({
            numPlayers: numPlayers,
            players: players
        });
    };


    handleClose = () => this.setState({modalOpen: false});

    render() {
        return (
            <Modal
                trigger={
                    <Button color="purple" onClick={this.handleOpen}>
                        List all Players
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Header icon="browser" content="List All Players"/>
                <Modal.Content>
                    <h3>
                        <ul>{this.state.players.map((player) =>
                            <li key={player}>{player}</li>
                        )}</ul>
                        <br/>
                        {this.state.numPlayers} names have
                        been registered to play this game.
                    </h3>
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
