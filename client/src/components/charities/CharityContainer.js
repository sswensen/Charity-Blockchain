import React, {Component} from "react";
import {Card} from "semantic-ui-react";
import Charity from "./Charity";
import DonateToCharity from "./DonateToCharity";

export default class CharityContainer extends Component {
    state = {
        name: "",
        description: "This is a test",
        balance: 0
    };

    componentDidMount() {
        console.log("Received charity fro CardContainer: ", this.props.charity);

        this.props.charity.methods.getCharityName().call()
            .then((response) => this.setState({
                name: response
            }));

        this.props.charity.methods.getCharityDescription().call()
            .then((response) => this.setState({
                description: response
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

    render() {
        return (
            <Card>
                <Card.Content>
                    <div className="header">{this.state.name}</div>
                    <div className="meta">
                        <span className="date">Created in Sep 2014</span>
                    </div>
                </Card.Content>
                <Card.Content>
                    {this.state.description}
                </Card.Content>
                <div className="extra content">
                    <div className="ui two buttons">
                        <DonateToCharity name={this.state.name} convert={this.props.convert}/>
                        <Charity name={this.state.name} convert={this.props.convert}/>
                    </div>
                </div>
            </Card>
        );
    }
}
