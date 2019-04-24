import {Container, Grid, Header, List, Segment} from "semantic-ui-react";
import React, {Component} from "react";

class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical style={{ padding: '4em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a' href='/about'>Contact Us</List.Item>
                                    <List.Item as='a' href='https://summitdrift.com'>SummitDrift</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Companies' />
                                <List link inverted>
                                    <List.Item as='a' href='https://scottswensen.com'>Scott Swensen Photography</List.Item>
                                    <List.Item as='a' href='https://summitdrift.com'>SummitDrift</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Welcome to the Future
                                </Header>
                                <p>
                                    A ReactJS application
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
