import {Container, Grid, Header, List, Segment} from "semantic-ui-react";
import React, {Component} from "react";

class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical style={{padding: '4em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About'/>
                                <List link inverted>
                                    <List.Item as='a' href='/about'>Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='External Links'/>
                                <List link inverted>
                                    <List.Item as='a' href='https://github.com/sswensen/Charity-Blockchain'>GitHub Repository</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Powered by ReactJS
                                </Header>
                                <List link inverted>
                                    <List.Item as='a' href='https://reactjs.org/'>Learn how to code the future</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
