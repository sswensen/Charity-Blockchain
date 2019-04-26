import React, {Component} from "react";
import {Card} from "semantic-ui-react";
import Charity from "./Charity";
import DonateToCharity from "./DonateToCharity";

export default class CharityContainer extends Component {
    state = {
        loading: true,
        drizzleState: null,

        name: "",
        description: "This is a test",
        balance: 0
    };

    componentDidMount() {
        const {drizzle} = this.props;

        // subscribe to changes in the store
        this.unsubscribe = drizzle.store.subscribe(() => {
            // every time the store updates, grab the state from drizzle
            const drizzleState = drizzle.store.getState();

            // check to see if it's ready, if so, update local component state
            if (drizzleState.drizzleStatus.initialized) {

                this.setState({loading: false, drizzleState});
            }
        });

        console.log("Received charity: ", this.props.charity);
        this.setState({
            name: this.props.charity.name,
            description: this.props.charity.description
        })
    };

    componentWillUnmount() {
        this.unsubscribe();
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
