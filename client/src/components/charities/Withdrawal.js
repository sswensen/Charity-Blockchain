import React, {Component} from "react";
import {Button, Dropdown, Header, Icon, Modal} from "semantic-ui-react";

export default class Withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            message: "",
            errorMessage: "",
            value: 0,
            successMessage: "",
            formLoading: false,
            options: [],
            contracts: [],
            testing: "",
            selectedCharity: {},
            charitySelected: false
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
    };

    updateContracts() {
        const objectToArray = Object.keys(this.props.drizzle.contracts).map(i => this.props.drizzle.contracts[i]);
        for (let i = 0; i < objectToArray.length; i++) {
            objectToArray[i].methods.getCharityName().call()
                .then((response) => {
                    objectToArray[i].methods.getCharityBalance().call()
                        .then((response2) => {
                            this.setState({
                                contracts: this.state.contracts.concat({name: response, bal: response2 / (10**18)})
                            })
                        })
                });
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    handleClick(c) {
        console.log('The link was clicked. ', c);
        this.setState({
            selectedCharity: c,
            charitySelected: true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var amount = this.state.value;
    }

    handleClose = () => this.setState({modalOpen: false});

    render() {
        return (
            <Modal
                trigger={
                    <Button className="ui primary labeled icon" onClick={this.handleOpen}>
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
                            {this.state.charitySelected ? <h3 className="sub header">Current amount donated: {this.state.selectedCharity.bal} Ethereum.</h3> : <h3>Please select a charity</h3>}
                        </div>
                    </h2>

                    <br/>

                    <Dropdown text={this.state.charitySelected ? this.state.selectedCharity.name : 'Select a Charity'} floating labeled button icon='filter' className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filter by tag'/>
                            <Dropdown.Divider/>
                            {
                                this.state.contracts.map((c) =>
                                    <Dropdown.Item key={c.name} text={c.name} description={c.bal} value={c.name} onClick={this.handleClick.bind(this, c)}/>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>


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
