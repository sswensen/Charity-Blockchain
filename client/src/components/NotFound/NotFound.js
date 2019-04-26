import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {
    Button,
    Container,
    Header,
    Icon,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react'
import {Link} from "react-router-dom";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined'
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
            content='Page Not Found'
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
            content='Looks like something went wrong.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge' href="/">
            Save Me
            <Icon style={{paddingLeft: 12}} name='undo'/>
        </Button>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({fixed: false})
    showFixedMenu = () => this.setState({fixed: true})

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
                            backgroundRepeat: 'no-repeat'
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
                                <a className="item" href="/about">About</a>
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
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({sidebarOpened: false})

    handleToggle = () => this.setState({sidebarOpened: true})

    render() {
        const {children} = this.props
        const {sidebarOpened} = this.state

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
                    <Menu.Item><Link to="/">Home</Link></Menu.Item>
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

const NotFound = () => (
    <ResponsiveContainer className="full">

    </ResponsiveContainer>
);

export default NotFound
