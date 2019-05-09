import React, {Component} from "react";
import {Button, Dropdown, Form, Grid, Header, Icon, Message, Modal} from "semantic-ui-react";

export default class Withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            successMessage: "",
            errorMessage: "",
            value: 0,
            formLoading: false,
            loading: false,
            dropLoading: false,
            options: [],
            contracts: [],
            fullContracts: {},
            selectedCharity: {},
            charitySelected: false,
            account: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleOpen = async () => {
        this.setState({modalOpen: true});
        //const numPlayers = await trojanSecret.methods.memberCount().call();
        //const players = this.props.convert(await trojanSecret.methods.listPlayers().call());

        // return (
        //     <div>
        //         <div className="ui three cards stackable">
        //             {objectToArray.map((c) =>
        //                 <CharityContainer key={c.address} charity={c} convert={this.convert} web3={this.props.drizzle.web3}/>
        //             )}
        //         </div>
        //
        //     </div>
        // );

        this.updateContracts();

        this.props.drizzle.web3.eth.getAccounts((error, accounts) => {
            console.log(accounts);
            this.setState({
                account: accounts[0]
            });
        });
    };

    updateContracts() {
        this.setState({
            contracts: []
        });
        let myContracts = new Map();

        const objectToArray = Object.keys(this.props.drizzle.contracts).map(i => this.props.drizzle.contracts[i]);
        for (let i = 0; i < objectToArray.length; i++) {
            objectToArray[i].methods.getCharityName().call()
                .then((response) => {
                    objectToArray[i].methods.getCharityBalance().call()
                        .then((response2) => {
                            objectToArray[i].methods.getOwner().call()
                                .then((response3) => {
                                    myContracts.set(response, objectToArray[i]);
                                    this.setState({
                                        contracts: this.state.contracts.concat({
                                            name: response,
                                            bal: response2 / (10 ** 18),
                                            owner: response3
                                        })
                                    })
                                })
                        })
                });
        }

        this.setState({
            fullContracts: myContracts
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick(c) {
        this.setState({
            selectedCharity: c,
            charitySelected: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var that = this;
        var amount = this.state.value * (10 ** 18);

        this.props.drizzle.web3.eth.getAccounts((error, accounts) => {
            this.setState({
                loading: true,
                formLoading: true,
                dropLoading: true,
                successMessage: "",
                errorMessage: ""
            });
            var donatePromise = this.state.fullContracts.get(this.state.selectedCharity.name).methods.withdrawal(amount, "").send({
                from: accounts[0],
                //value: this.props.drizzle.web3.utils.toWei(amount, "ether"),
                gas: "4500000"
            })
                .then((result) => {
                    //console.log(result);
                    this.setState({
                        loading: false,
                        formLoading: false,
                        dropLoading: false,
                    });
                    that.setState({
                        successMessage: "Successfully withdrew " + amount / (10 ** 18) + " Ethereum!"
                    });
                });

            donatePromise.catch(function (error) {
                console.log(error);
                that.setState({
                    errorMessage: error.toString(),
                    loading: false,
                    formLoading: false,
                    dropLoading: false
                })
            });
        });
    }

    handleClose = () => this.setState({modalOpen: false, errorMessage: "", successMessage: ""});

    render() {
        return (
            <Modal
                trigger={
                    <Button className="ui primary labeled icon" onClick={this.handleOpen} floated="right">
                        <i className="minus icon"/>
                        Withdraw
                    </Button>

                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon
            >
                <Header icon="dollar sign" content="Withdrawal"/>
                <Modal.Content>
                    <h2 className="ui icon header center aligned">
                        <i className="money bill alternate outline icon"/>
                        <div className="content">
                            Withdrawal from a Charity
                            {this.state.charitySelected ? <h3 className="sub header">Current amount
                                    donated: {this.state.selectedCharity.bal} Ethereum.</h3> :
                                <h3>Please select a charity</h3>}
                        </div>
                    </h2>

                    <br/>

                    <Grid columns={2} divided stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown loading={this.state.formLoading} fluid
                                          text={this.state.charitySelected ? this.state.selectedCharity.name : 'Please Select a Charity'}
                                          floating labeled button icon='filter' className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='tags' content='Filter by name'/>
                                        <Dropdown.Divider/>
                                        {
                                            this.state.contracts.map((c) =>
                                                <Dropdown.Item key={c.name} text={c.name} description={c.bal}
                                                               value={c.name} onClick={this.handleClick.bind(this, c)}
                                                               disabled={c.owner !== this.state.account}
                                                />
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid.Column>
                            <Grid.Column>
                                <Form onSubmit={this.handleSubmit} loading={this.state.formLoading}
                                      success={!!this.state.successMessage} error={!!this.state.errorMessage}>
                                    <Form.Field>
                                        <div className="ui right labeled input" data-children-count="1">
                                            <label htmlFor="amount" className="ui label">$</label>
                                            <input type="text" placeholder="Amount in Ethereum" id="amount"
                                                   onChange={event => this.setState({value: event.target.value})}
                                            />
                                            <div className="ui basic label"> Ethereum</div>
                                        </div>


                                    </Form.Field>
                                    <Message error header="Oops!" content={this.state.errorMessage}/>
                                    <Message success header="Success!" content={this.state.successMessage}/>
                                    <Button.Group floated='right'>
                                        <Button active loading={this.state.loading}
                                                onClick={this.handleClose}>Cancel
                                        </Button>
                                        <div className="or"/>
                                        <Button primary loading={this.state.loading}
                                                type="submit">Withdrawal
                                        </Button>
                                    </Button.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>


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
