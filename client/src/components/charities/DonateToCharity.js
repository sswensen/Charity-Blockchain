import React, {Component} from "react";
import {Button, Header, Icon, Modal, Form, Message} from "semantic-ui-react";

export default class DonateToCharity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            numPlayers: "0",
            message: "",
            players: [],
            errorMessage: "",
            value: 0,
            contractBalance: 0,
            yourContribution: 0,
            transactionAmounts: [],
            transactionDescriptions: [],
            successMessage: "",
            formLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen = async () => {
        this.setState({modalOpen: true});
        //const numPlayers = await trojanSecret.methods.memberCount().call();
        //const players = this.props.convert(await trojanSecret.methods.listPlayers().call());

        this.props.charity.methods.getCharityBalance().call()
            .then((response) => this.setState({
                contractBalance: response / (10**18)
            }));

        this.props.charity.methods.getMyDonation().call()
            .then((response) => this.setState({
                yourContribution: response / (10**18)
            }));
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var that = this;
        var amount = this.state.value;

        this.props.web3.eth.getAccounts((error, accounts) => {
            this.setState({
                formLoading: true,
                successMessage: "",
                errorMessage: ""
            });
            var donatePromise = this.props.charity.methods.donate().send({
                from: accounts[0],
                value: this.props.web3.utils.toWei(this.state.value, "ether"),
                gas: "4500000"
            })
                .then((result) => {
                    //console.log(result);
                    this.setState({
                        formLoading: false
                    });
                    this.props.charity.methods.getMyDonation().call()
                        .then((response) => this.setState({
                            yourContribution: response
                        }));
                    that.setState({
                        successMessage: "Successfully donated " + amount + " Etherium!"
                    })
                });

            donatePromise.catch(function (error) {
                console.log(error);
                that.setState({
                    errorMessage: error.toString(),
                    formLoading: false
                })
            });
        });

    }


    handleClose = () => this.setState({modalOpen: false});

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
                            Donate ${this.state.value}
                            <h3 className="sub header">{this.props.name}</h3>
                            <h3 className="sub header">Current amount donated: {this.state.contractBalance}</h3>
                            <h3 className="sub header">Your donation: {this.state.yourContribution}</h3>
                        </div>
                    </h2>

                    <br/>

                    <Form onSubmit={this.handleSubmit} loading={this.state.formLoading} success={!!this.state.successMessage} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Donation amount:</label>
                            <input
                                placeholder="Amount"
                                onChange={event => this.setState({value: event.target.value})}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <Message success header="Success!" content={this.state.successMessage}/>
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
