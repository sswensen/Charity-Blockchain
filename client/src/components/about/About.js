import React, {Component} from "react";
import {Button, Container, Header, Icon, Menu, Responsive, Segment, Sidebar, Visibility} from "semantic-ui-react";
import PropTypes from "prop-types";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";


class About extends Component {
    render() {
        return (
            <ResponsiveContainer>
                <Segment style={{padding: '5em 0em'}} vertical secondary>
                    <Container>
                        <div>
                            <div className="ui three column grid stackable">
                                <div className="column">
                                    {/* Scott */}
                                    <div className="ui fluid card teal">
                                        <div className="image">
                                            <img alt="Scott"
                                                 src="https://semantic-ui.com/images/avatar2/large/matthew.png"/>
                                        </div>
                                        <div className="content">
                                            <div className="header">Scott Swensen</div>
                                            <div className="meta">
                                                <a href="about">React Master</a>
                                            </div>
                                            <div className="description">
                                                2019 CSU Grad Seeking Security Related Software Engineering Position
                                            </div>
                                        </div>
                                        <div className="extra content">
                                      <span className="right floated">
                                          <a href="https://linkedin.com/in/scott-swensen">
                                              <i className="linkedin icon"/>
                                          </a>
                                          <a href="https://github.com/sswensen">
                                              <i className="github icon"/>
                                          </a>
                                      </span>
                                            <span>
                                        <i className="user icon"/>
                                        Scott
                                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    {/* Claire */}
                                    <div className="ui fluid card purple">
                                        <div className="image">
                                            <img alt="Claire"
                                                 src="https://semantic-ui.com/images/avatar2/large/molly.png"/>
                                        </div>
                                        <div className="content">
                                            <div className="header">Claire Goldstein</div>
                                            <div className="meta">
                                                <a href="about">Drizzle Master</a>
                                            </div>
                                            <div className="description">
                                                Pursuing a degree in Computer Science, with a Human Centered Computing
                                                concentration from CSU
                                            </div>
                                        </div>
                                        <div className="extra content">
                                      <span className="right floated">
                                          <a href="https://linkedin.com/in/claire-goldstein2019">
                                              <i className="linkedin icon"/>
                                          </a>
                                          <a href="https://github.com/crgoldstein">
                                              <i className="github icon"/>
                                          </a>
                                      </span>
                                            <span>
                                        <i className="user icon"/>
                                        Claire
                                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    {/* Kenny */}
                                    <div className="ui fluid card yellow">
                                        <div className="image">
                                            <img alt="Kenny"
                                                 src="https://semantic-ui.com/images/avatar2/large/elyse.png"/>
                                        </div>
                                        <div className="content">
                                            <div className="header">Kenny Nguyen</div>
                                            <div className="meta">
                                                <a href="/about">Testing Master</a>
                                            </div>
                                            <div className="description">
                                                Data Engineering and Management (Student Worker) at Nasdaq
                                            </div>
                                        </div>
                                        <div className="extra content">
                                      <span className="right floated">
                                          <a href="https://linkedin.com/in/kenny-nguyen-40a423135">
                                              <i className="linkedin icon"/>
                                          </a>
                                          <a href="https://github.com/kendngu">
                                              <i className="github icon"/>
                                          </a>
                                      </span>
                                            <span>
                                        <i className="user icon"/>
                                        Kenny
                                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        );
    }
}

export default About;

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

const PageHeading = ({mobile}) => (
    <Container text>
        <Header
            as='h1'
            content='About'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '',
            }}
        />
    </Container>
);

PageHeading.propTypes = {
    mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({fixed: false})
    showFixedMenu = () => this.setState({fixed: true})

    render() {
        const {children} = this.props
        const {fixed} = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} className="full">
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        className="full"
                        inverted
                        textAlign='center'
                        style={{
                            padding: '1em 0em',
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
                                <a className="item" href="/">Home</a>
                                <a className="item" href='/charities'>Charities</a>
                                <a className="item" href="/company">Company</a>
                                <a className="item active" href="/about">About</a>

                                <Menu.Item position='right'>
                                    <Button as='a' inverted={!fixed} href="/login">
                                        Log in
                                    </Button>
                                    <Button as='a' inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}}
                                            href="/sign-up">
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Container>
                        </Menu>
                        <PageHeading/>
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

const ResponsiveContainer = ({children}) => (
    <div className="full">
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
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
                    <Menu.Item><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item><Link to="/charities">Charities</Link></Menu.Item>
                    <Menu.Item active><Link to="/company">Company</Link></Menu.Item>
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
                                    <Button as='a' inverted href="/login">
                                        Log in
                                    </Button>
                                    <Button as='a' inverted style={{marginLeft: '0.5em'}}
                                            href="/sign-up">
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <PageHeading mobile/>
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