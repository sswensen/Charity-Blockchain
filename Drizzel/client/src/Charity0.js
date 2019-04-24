import React from "react";

class Charity0 extends React.Component {
    state = {
        CharityName: null,
        Charitydescription: null
    };

    componentDidMount() {
        console.log("on did mount");
        const {drizzle} = this.props;
        const contract = drizzle.contracts.Charity;
        console.log("Charity0 ", contract);

        const description = contract.methods["getCharityDescription"].cacheCall();
        console.log("description " + description);
        const name = contract.methods["getCharityName"].cacheCall();
        console.log("name " + name);

        this.setState({
            CharityName: name,
            Charitydescription: description
        });

        // Will not update in time for console.log
        const name2 = contract.methods.getCharityName().call();
        console.log("this is name 2: ", name2);

    }

    render() {
        // get the contract state from drizzleState
        const {Charity} = this.props.drizzleState.contracts;

        const CName = Charity.getCharityName[this.state.CharityName];
        const Cdescription = Charity.getCharityDescription[this.state.Charitydescription];


        return <div>
            <h2>Charity Name: {CName && CName.value}</h2>
            description: {Cdescription && Cdescription.value};
        </div>
    }
}

export default Charity0;
