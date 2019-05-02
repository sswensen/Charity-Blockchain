import React, {Component} from "react";
import {Card} from "semantic-ui-react";
import Charity from "./Charity";
import DonateToCharity from "./DonateToCharity";

export default class CharityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "This is a test",
            balance: 0
        };

        this.updateCharityBalance = this.updateCharityBalance.bind(this);
    }

    componentDidMount() {
        console.log("Received charity from CardContainer: ", this.props.charity);

        this.props.charity.methods.getCharityName().call()
            .then((response) => this.setState({
                name: response
            }));

        this.props.charity.methods.getCharityDescription().call()
            .then((response) => this.setState({
                description: response
            }));

        this.props.charity.methods.getCharityBalance().call()
            .then((response) => this.setState({
                balance: response / (10**18) // scale to ethereum
            }));


        // this.setState({
        //     name: this.props.charity.contractName,
        //     description: this.props.charity.description
        // })
    };

    async loadDetails() {
        //const receivedDetails = await trojanSecret.methods.getDescription(this.props.name).call();


        // this.setState({
        //     description: receivedDetails,
        // });
    }

    updateCharityBalance() {
        this.props.charity.methods.getCharityBalance().call()
            .then((response) => this.setState({
                balance: response / (10**18)
            }));
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <div className="header">{this.state.name}</div>
                    <div className="meta">
                        <span className="date">Current donations: {this.state.balance}</span>
                    </div>
                </Card.Content>
                <Card.Content>
                    {this.state.description}
                </Card.Content>
                <div className="extra content">
                    <div className="ui two buttons">
                        <DonateToCharity name={this.state.name} charity={this.props.charity} web3={this.props.web3} balance={this.state.balance} updateCharityBalance={this.updateCharityBalance} convert={this.props.convert}/>
                        <Charity name={this.state.name} charity={this.props.charity} description={this.state.description} balance={this.state.balance} convert={this.props.convert}/>
                    </div>
                </div>
            </Card>
        );
    }
}
