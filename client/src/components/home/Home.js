import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import Footer from "../footer/Footer";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({mobile}) => (
    <Container text>
        <Header
            as='h1'
            content='A Transparent Charity'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '40%',
            }}
        />
        <Header
            as='h2'
            content='View and track donations without worrying about misuse'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <a href="./charities">
            <Button primary size='huge'>
                Get Started
                <Icon name='right arrow'/>
            </Button>
        </a>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({fixed: false});
    showFixedMenu = () => this.setState({fixed: true});

    render() {
        const {children} = this.props;
        const {fixed} = this.state;

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} className="full">
                <Visibility
                    className="full"
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        className="full"
                        inverted
                        textAlign='center'
                        style={{
                            minHeight: 800, padding: '1em 0em',
                            backgroundImage: "url(https://static1.squarespace.com/static/5b9845555ffd2046651ad901/5b986df070a6ad55d7a4c50f/5bc606a8ec212d219f564787/1555511911781/IMG_8501.jpg?format=2500w",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'fixed'
                        }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                {/*<Menu.Item active>*/}
                                {/*<Link to="/">Home</Link>*/}
                                {/*</Menu.Item>*/}
                                {/*<Menu.Item><Link to="/charities">Charities</Link></Menu.Item>*/}
                                {/*<Menu.Item><Link to="/company">Company</Link></Menu.Item>*/}
                                {/*<Menu.Item><Link to="/about">About</Link></Menu.Item>*/}

                                <a className="item active" href="/">Home</a>
                                <a className="item" href='/charities'>Charities</a>
                                <a className="item" href="/company">Company</a>
                                <a className="item" href="/about">About</a>

                                <Menu.Item position='right'>
                                    <Button as='a' inverted={!fixed}>
                                        Log in
                                    </Button>
                                    <Button as='a' inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <HomepageHeading/>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

class MobileContainer extends Component {
    state = {};

    handleSidebarHide = () => this.setState({sidebarOpened: false});

    handleToggle = () => this.setState({sidebarOpened: true});

    render() {
        const {children} = this.props;
        const {sidebarOpened} = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as='a' active>
                        Home
                    </Menu.Item>
                    <Menu.Item active>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item><Link to="/charities">Charities</Link></Menu.Item>
                    <Menu.Item><Link to="/company">Company</Link></Menu.Item>
                    <Menu.Item><Link to="/about">About</Link></Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{minHeight: 350, padding: '1em 0em'}}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar'/>
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                                    </Button>
                                    <Button as='a' inverted style={{marginLeft: '0.5em'}}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile/>
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
};

const ResponsiveContainer = ({children}) => (
    <div className="full">
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

const Home = () => (
    <ResponsiveContainer>
        <Segment style={{padding: '5em 0em'}} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            We Make Your Dreams Come True
                        </Header>
                        <p style={{fontSize: '1.33em'}}>
                            <Image src='https://semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            We Make Bananas That Can Dance
                        </Header>
                        <p style={{fontSize: '1.33em'}}>
                            <Image src='https://semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image rounded size='medium'
                               //src='https://www.ethereum.org/images/logos/ETHEREUM-LOGO_PORTRAIT_Black_small.png'/>
                               src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/2000px-Ethereum_logo_2014.svg.png'/>
                    </Grid.Column>
                </Grid.Row>
                {/*<Grid.Row>*/}
                {/*<Grid.Column textAlign='center'>*/}
                {/*<Button size='huge'>Check Them Out</Button>*/}
                {/*</Grid.Column>*/}
                {/*</Grid.Row>*/}
            </Grid>
        </Segment>

        <Segment style={{padding: '0em'}} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                    <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            "What a Company"
                        </Header>
                        <p style={{fontSize: '1.33em'}}>That is what they all say about us</p>
                    </Grid.Column>
                    <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            "I shouldn't have gone with their competitor."
                        </Header>
                        <p style={{fontSize: '1.33em'}}>
                            <i className="chart bar icon"/>
                            <b>Nan</b> Chief Fun Officer Acme Toys
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment style={{padding: '5em 0em'}} vertical>
            <Container text>
                <Header as='h3' style={{fontSize: '2em'}}>
                    Breaking The Grid, Grabs Your Attention
                </Header>
                <p style={{fontSize: '1.33em'}}>
                    <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
                </p>
                <Button as='a' size='large'>
                    Read More
                </Button>

                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{margin: '3em 0em', textTransform: 'uppercase'}}
                >
                    <a href='/'>More information</a>
                </Divider>

                <Header as='h3' style={{fontSize: '2em'}}>
                    Did We Tell You About Our Bananas?
                </Header>
                <p style={{fontSize: '1.33em'}}>
                    <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
                </p>
                <Button as='a' size='large'>
                    Read More
                </Button>
            </Container>
        </Segment>
        <Footer/>
    </ResponsiveContainer>
)

export default Home
