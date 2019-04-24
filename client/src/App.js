import React, {Component} from "react";
import Home from "./components/home/Home";

class App extends Component {
    state = { loading: true, drizzleState: null };

    componentDidMount() {
        const { drizzle } = this.props;

        // subscribe to changes in the store
        this.unsubscribe = drizzle.store.subscribe(() => {
            // every time the store updates, grab the state from drizzle
            const drizzleState = drizzle.store.getState();

            // check to see if it's ready, if so, update local component state
            if (drizzleState.drizzleStatus.initialized) {

                this.setState({ loading: false, drizzleState  });
            }
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
    };

    render() {
        // if (this.state.loading) return (
        //     <div className="ui segment wrapper absolute">
        //         <div className="ui active dimmer">
        //             <div className="ui massive text loader">Loading Web3 Interface...</div>
        //         </div>
        //         <p></p>
        //         <p></p>
        //         <p></p>
        //     </div>
        // );

        return (
            <Home
                className="wrapper"
            />
        );
    }
}

export default App;
