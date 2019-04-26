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
        console.log("Received charity: ", this.props.charity);
        this.setState({
            name: this.props.charity.name,
            description: this.props.charity.description
        })
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
