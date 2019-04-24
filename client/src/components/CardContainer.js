import React, {Component} from "react";
import {Container, Card} from "semantic-ui-react";
import CharityContainer from "./CharityContainer";

class CardContainer extends Component {
    state = {
        value: "",
        message: "",

        charityNames: [
            "Charity Name One",
            "Charity Name Two"
        ],
        charityDescriptions: [
            "Charity One Description",
            "Charity Two Description"
        ],
    };

    componentDidMount() {
        console.log("on did mount");
        const {drizzle} = this.props;
        const contract = drizzle.contracts.Charity;
        console.log("Charity0 ", contract);

        this.setState({modalOpen: true});
        //const recievedNumCharities = await trojanSecret.methods.charityCount().call();
        //const recievedCharityNames = this.convert(await trojanSecret.methods.getCharityNames().call());

        //const receivedNumCharities = this.state.charityNames.length;
        //const receivedCharityNames = contract.methods["getCharityNames"].cacheCall();
        //console.log("Charity Names: ", receivedCharityNames);

        // this.setState({
        //     charityNames: receivedNumCharities,
        //     numCharities: this.convert(receivedCharityNames)
        // });
    };

    render() {
        return (
                <div>
                    <Card.Group>
                        {this.state.charityNames.map((name) =>
                            <CharityContainer key={name} name={name} />
                        )}
                    </Card.Group>

                </div>
        );
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
}

export default CardContainer;
