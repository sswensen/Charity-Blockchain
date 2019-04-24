import React, {Component} from "react";
import {Container, Card} from "semantic-ui-react";
import Charity from "./Charity";

export default class CharityContainer extends Component {
    state = {
        name: "",
        description: "",
        balance: 0
    };

    render() {
        return (
            <Card>
                <Card.Content>
                    <div className="header">{this.props.name}</div>
                    <div className="meta">
                        <span className="date">Created in Sep 2014</span>
                    </div>
                </Card.Content>
                <Card.Content>
                    <Charity name={this.props.name}></Charity>
                </Card.Content>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button">Donate</div>
                        <div className="ui basic orange button">Details</div>
                    </div>
                </div>
            </Card>
        );
    }
}
