import React, {Component} from "react";
import {Message, Icon} from "semantic-ui-react";
import CharityContainer from "./CharityContainer";

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoBox: true
            // dataKey: null,
            // testObject: {
            //     "index": -1,
            //     "name": "",
            //     "description": ""
            // },

            // testIndex: "",
            // testName: "",
            // testDesription: "",

            // value: "",
            // message: "",

            // charityNames: [
            //     "Scott Swensen Foundation",
            //     "Claire Goldstein Foundation",
            //     "Kenny Nguyen Foundation",
            //     "Chipotle For All",
            //     "Wounded Warriors",
            //     "Blockchain Support Group",
            // ],
            // charityDescriptions: [
            //     "A foundation for the success of Scott in his CS 481a3 class.",
            //     "A foundation for the success of Claire in his CS 481a3 class.",
            //     "A foundation for the success of Kenny in his CS 481a3 class.",
            //     "The one and only, best and greatest burrito-birthing company. Long live the guacamole",
            //     "Support our returning troops.",
            //     "Help our team afford the cups of coffee we need to stay up every night to finish this project.",
            // ],

            // charities: [
            // {
            //     "index": 0,
            //     "name": "Scott Swensen Foundation",
            //     "description": "A foundation for the success of Scott in his CS 481a3 class."
            // },
            // {
            //     "index": 1,
            //     "name": "Claire Goldstein Foundation",
            //     "description": "A foundation for the success of Claire in his CS 481a3 class."
            // },
            // {
            //     "index": 2,
            //     "name": "Kenny Nguyen Foundation",
            //     "description": "A foundation for the success of Kenny in his CS 481a3 class."
            // },
            // {
            //     "index": 3,
            //     "name": "Chipotle For All",
            //     "description": "The one and only, best and greatest burrito-birthing company. Long live the guacamole"
            // },
            // {
            //     "index": 4,
            //     "name": "Blockchain Support Group",
            //     "description": "Help our team afford the cups of coffee we need to stay up every night to finish this project."
            // },
            // {
            //     "index": 5,
            //     "name": "Wounded Warriors",
            //     "description": "Support our returning troops. Go America. Why is this card formatting differently."
            // }

            // ]

        };
        this.closeInfoBox = this.closeInfoBox.bind(this);
    }

    componentDidMount() {
        // const {drizzle} = this.props;


        // console.log("on did mount");
        //
        // const contract = drizzle.contracts.Charity;
        // console.log("Drizzle Contracts: ", drizzle.contracts);
        // console.log("Charity1 Contract ", contract);

        // const contract2 = drizzle.contracts.Charity2;
        // console.log("Charity2 ", contract2);
        //
        // const contract3 = drizzle.contracts.Charity3;
        // console.log("Charity3 ", contract3);
        //
        // const contract4 = drizzle.contracts.Charity4;
        // console.log("Charity4 ", contract4);
        //
        // const contract5 = drizzle.contracts.Charity5;
        // console.log("Charity5 ", contract5);
        //
        // const contract6 = drizzle.contracts.Charity6;
        // console.log("Charity6 ", contract6);


        // let drizzle know we want to watch the `myString` method
        //const dataKey = contract.methods["getCharityName"].cacheCall();

        // save the `dataKey` to local component state for later reference
        //this.setState({dataKey});


        // this.setState({modalOpen: true});
        //const receivedCharityNames = contract.methods["getCharityNames"].cacheCall();
        //console.log("Charity Names: ", receivedCharityNames);

        // this.setState({
        //     charityNames: receivedNumCharities,
        //     numCharities: this.convert(receivedCharityNames)
        // });


        // const contractName1 = contract.methods["getCharityName"].cacheCall();
        // console.log("Charity Name 1: ", contractName1);
        //
        // const contractDescription1 = contract.methods["getCharityDescription"].cacheCall();
        // console.log("Charity Description 1: ", contractName1);
        //
        // let contractInfo = {
        //     "name": contractName1,
        //     "description": contractDescription1
        // };
        // let ret = {};
        // contract.methods.getCharityName().call()
        //     .then(function (name) {
        //         contract.methods.getCharityDescription().call()
        //             .then(function (description) {
        //                 contract.methods.getAddress().call()
        //                     .then(function (addr) {
        //                         ret = {
        //                             "index": addr,
        //                             "name": name,
        //                             "description": description
        //                         };
        //                         this.setState({
        //                             testObject: ret
        //                         });
        //                     });
        //             });
        //     })
        //     .then((name) => this.setState(name));

        // contract.methods.getCharityName().call()
        //     .then((response) => this.setState({
        //         testName: response
        //     }));
        //
        // contract.methods.getCharityDescription().call()
        //     .then((response) => this.setState({
        //         testDescription: response
        //     }));
        //
        // contract.methods.getAddress().call()
        //     .then((response) => this.setState({
        //         testAddress: response
        //     }));
    };

    // getCharity(contract) {
    //     contract.methods.getCharityName().call()
    //         .then(function (name) {
    //             contract.methods.getCharityDescription().call()
    //                 .then(function (description) {
    //                     contract.methods.getAddress().call()
    //                         .then(function (addr) {
    //                             let ret = {
    //                                 "index": addr,
    //                                 "name": name,
    //                                 "description": description
    //                             };
    //                             console.log("Returning: ", ret);
    //                             return ret;
    //                         });
    //                 });
    //         });
    // }

    closeInfoBox() {
        this.setState({
            infoBox: false
        })
    }

    render() {
        // console.log(this.props.drizzleState.contracts);
        //
        // // get the contract state from drizzleState
        // const { NameStore1 } = this.props.drizzleState.contracts;
        //
        // console.log(NameStore1);
        //
        // // using the saved `dataKey`, get the variable we're interested in
        // const Name1 = NameStore1.getCharityName[this.state.dataKey];
        //
        // // if it exists, then we display its value
        // console.log(Name1.value);

        // Convert the charities object to an array so we can map
        const objectToArray = Object.keys(this.props.drizzle.contracts).map(i => this.props.drizzle.contracts[i]);

        return (
            <div>
                <Message
                    icon
                    hidden={!this.state.infoBox}
                    warning
                >
                    <Icon name='info circle'/>
                    <Message.Content>
                        <Message.Header>All charities have been reset since presentation!</Message.Header>
                        We needed to fix a bug in our contract. All money has been re-donated to the respective charities.
                    </Message.Content>
                    <Icon name='window close outline' float="right" onClick={this.closeInfoBox}/>

                </Message>
                <div className="ui three cards stackable">
                    {objectToArray.map((c) =>
                        <CharityContainer key={c.address} charity={c} convert={this.convert} web3={this.props.drizzle.web3}/>
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
