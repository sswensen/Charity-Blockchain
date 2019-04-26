import React, {Component} from "react";
import CharityContainer from "./CharityContainer";

class CardContainer extends Component {

    state = {
        loading: true,
        drizzleState: null,

        value: "",
        message: "",

        charityNames: [
            "Scott Swensen Foundation",
            "Claire Goldstein Foundation",
            "Kenny Nguyen Foundation",
            "Chipotle For All",
            "Wounded Warriors",
            "Blockchain Support Group",
        ],
        charityDescriptions: [
            "A foundation for the success of Scott in his CS 481a3 class.",
            "A foundation for the success of Claire in his CS 481a3 class.",
            "A foundation for the success of Kenny in his CS 481a3 class.",
            "The one and only, best and greatest burrito-birthing company. Long live the guacamole",
            "Support our returning troops.",
            "Help our team afford the cups of coffee we need to stay up every night to finish this project.",
        ],

        charities: [
            {
                "index": 0,
                "name": "Scott Swensen Foundation",
                "description": "A foundation for the success of Scott in his CS 481a3 class."
            },
            {
                "index": 1,
                "name": "Claire Goldstein Foundation",
                "description": "A foundation for the success of Claire in his CS 481a3 class."
            },
            {
                "index": 2,
                "name": "Kenny Nguyen Foundation",
                "description": "A foundation for the success of Kenny in his CS 481a3 class."
            },
            {
                "index": 3,
                "name": "Chipotle For All",
                "description": "The one and only, best and greatest burrito-birthing company. Long live the guacamole"
            },
            {
                "index": 4,
                "name": "Blockchain Support Group",
                "description": "Help our team afford the cups of coffee we need to stay up every night to finish this project."
            },
            {
                "index": 5,
                "name": "Wounded Warriors",
                "description": "Support our returning troops. Go America. Why is this card formatting differently."
            }

        ]
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

        console.log("on did mount");
        const contract = drizzle.contracts.Charity;
        console.log("Charity0 ", contract);
        this.setState({modalOpen: true});
    };

    componentWillUnmount() {
        this.unsubscribe();
    };

    render() {
        if (this.state.loading || true) return (
            <div className="ui segment wrapper">
                <div className="ui active dimmer inverted">
                    <div className="ui massive text loader">Loading Web3 Interface...</div>
                </div>
                <p></p>
                <p></p>
                <p></p>
            </div>
        );
        return (
            <div>
                <div className="ui three cards">
                    {this.state.charities.map((c) =>
                        <CharityContainer key={c.index} charity={c} convert={this.convert}
                                          drizzle={this.props.drizzle}
                                          drizzleState={this.state.drizzleState}
                        />
                    )}
                </div>

            </div>
        );
    };

    convert(hex) {
        //console.log(hex);
        try {
            var str = '';
            for (var i = 0; i < hex.length; i += 2) {
                var v = parseInt(hex.substr(i, 2), 16);
                if (v) str += String.fromCharCode(v);
            }

            let params = [];
            let res = "";
            for (var j = 0; j <= str.length; j++) {
                if (str.charCodeAt(j) > 31) {
                    res = res + str[j];
                } else {
                    params.push(res);
                    res = "";
                }
            }
            params.pop();

            return params;
        } catch (e) {
            return [];
        }
    };
}

export default CardContainer;
