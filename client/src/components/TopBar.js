import React, { Component } from "react";
import { Menu, Header, Dropdown } from "semantic-ui-react";

class TopBar extends Component {
  state = {
    contractSymbol: "",
    contractName: ""
  };

  async componentDidMount() {
    // const contractSymbol = await trojanSecret.methods.symbol().call();
    // const contractName = await trojanSecret.methods.name().call();
    // this.setState({ contractSymbol, contractName });
  }

  render() {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Menu.Item position="left">
          <Dropdown item icon="wrench" simple>
            <Dropdown.Menu>
              <Dropdown.Item>Symbol={this.state.contractSymbol}</Dropdown.Item>
              <Dropdown.Item>Name={this.state.contractName}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <Header size="large">Welcome to the TROJAN SECRETS Game!</Header>
        </Menu.Item>
        <Menu.Item postion="right">
          <img
            src="/trojan.png"
            alt="Trojan Helmet"

          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default TopBar;
