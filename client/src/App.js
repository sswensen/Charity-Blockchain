import React, {Component} from "react";
import TopBar from "./components/TopBar";
import {Container} from "semantic-ui-react";
import CardContainer from "./components/CardContainer";

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
        if (this.state.loading) return "Loading Drizzle...";

        return (
            <Container>
                <TopBar/>
                <h4>
                    <p>This is a game deployed to the Rinkeby Blockchain.</p>
                    <p>
                        Actions to retrieve information should operate quickly.
                        <br/>
                        But please be aware, actions that push information to the blockchain may
                        take about 15 seconds to complete.
                    </p>
                </h4>
                <div>
                    <CardContainer
                        drizzle={this.props.drizzle}
                        drizzleState={this.state.drizzleState}
                    />
                </div>
            </Container>
        );
    }
}

export default App;
