import React, {Component} from "react";
import {Button, Container, Header, Icon, Menu, Responsive, Segment, Sidebar, Visibility} from "semantic-ui-react";
import PropTypes from "prop-types";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";

class Company extends Component {
    state = {loading: true};

    componentDidMount() {

    };

    componentWillUnmount() {

    };

    render() {
        return (
            <ResponsiveContainer>


                <Segment style={{padding: '5em 0em'}} vertical>
                    <Container text>
                        <Header as='h3' style={{fontSize: '2em'}}>
                            Abstract
                        </Header>
                        <div style={{fontSize: '1.33em'}}>

                            Blockchain technology is disrupting many sectors of our economy.
                            By using blockchain technology, charities can be transparent on where the money goes to
                            after it is donated.
                            With the help of the Truffle Suite and Solidity Ethereum contracts, we proposed a technical
                            solution that will help societal and technological development.

                            <br/>
                            <br/>
                            <Header as='h3' style={{fontSize: '1em'}}>
                                Motivation
                            </Header>

                            Money does not buy happiness unless you spend your money on others. New studies have shown
                            that if you spend money on others or give money to charity it will increase your happiness
                            more than spending that money on yourself (The Guardian). Grassroots and crowdfunding
                            campaigns have opened an approachable way for people to interact with causes that they want
                            to support. Many people are skeptical to donate money to a foundation because they do not
                            know where the money will end up entirely. The Charity Platform is similar to GoFundMe,
                            allowing users to create a campaign. When donating money to a campaign there are small
                            percentages of money going to GoFundMe, but not the Transparent Charity Platform. When an
                            organizer pulls their money out of a campaign there is a heavy transaction fee through the
                            bank for GoFundMe, but not the Charity Platform. Donators do not see where the money goes
                            after their donation on GoFundMe, but the Charity Platform uses Blockchain Technology to
                            solve this problem with the transparency of transactions.

                            <br/>
                            <br/>
                            <Header as='h5' style={{fontSize: '1em'}}>
                                Goals
                            </Header>
                            The team, consisting of Scott Swensen, Claire Goldstein, and Kenny Nguyen wanted to base an
                            idea of helping humanity, they concluded on creating a platform for creating and donating to
                            charities. The goal was using Blockchain technology to devise a clear, transparent platform
                            for charity donations. The platform would allow users to create charities for other people,
                            letting other users see the description of the charity and how much has been donated. The
                            unique part of the platform is that everything is transparent allowing donors to see where
                            and how the money is being allocated from the charity fund.
                            <br/>
                            <br/>
                            <Header as='h5' style={{fontSize: '1em'}}>
                                Architect - Planning
                            </Header>
                            The team developed the Charity Platform using a tech stack consisting of Solidity, React,
                            Ganache, Truffle, Express, and Drizzle. The root of the solution comes from the smart
                            contracts that allow donator and owner functionalities. Backend development started out on
                            Etherium’s Remix platform to test the contracts functions in the early development stage. We
                            then integrated with the Truffle Suite. We got our smart contracts up and working with
                            Ganache, a test blockchain that can be deployed locally. The testing functionality is
                            handled by Truffle and Ganache that has a connection with the Mocha and Chai testing
                            frameworks to test integration onto the local blockchain. We used Open Zeppelin libraries to
                            handle our conversions of Ether and to monitor the balances of our contracts. The front end
                            was created with ReactJS. We used React Router to simulate different pages within our Single
                            Page App (SPA) to create a layout the use would be more accustomed to. To make an appealing
                            aesthetic for our app, we used SemanticUI for frontend styling. Because of the number of
                            packages we had at our disposal, we had many ideas on how to compile our frontend and
                            backend applications together. We decided against using Webpack, a common module bundler for
                            React apps, to compile our code because of the added syntax changes and dependencies that
                            would be included in our app. The goal is to keep things as simple as possible.
                            After many hours of research, we stumbled upon Drizzle, a new frontend framework from the
                            Truffle Suite that helps to simplify the process of connecting the Solidity contracts to
                            web3 and the ReactJS. There was an initial learning curve, but it made our frontend to
                            backend integration seamless. Finally, we used an Express Server to serve the React app when
                            running on a production server, in this case, Heroku. In our development and testing phases,
                            we used NPM for package management and bundling our project.
                            <br/>
                            <br/>
                            <Header as='h5' style={{fontSize: '1em'}}>
                                Technical Solutions
                            </Header>
                            While trying to figure out how to get our contracts to talk to the frontend React code we
                            ran into a plethora of issues. We were struggling with how to connect our ABI, how to
                            connect Web3 and in general, how to get the information of the contract to show up on the
                            website. We watched a lot of Youtube videos, but the main problem we kept running into was
                            downloading all the dependencies. We would get the example to work but then we wouldn’t be
                            able to figure out what dependencies we needed to fit into our contracts and our React.js
                            code. We solved our problem by going beyond the scope of the class and learned how to use
                            Drizzle. Drizzle is a Truffle Suite add on that helps to connect the frontend to the
                            contract ABIs. The best part about Drizzle is that everything comes pre-packaged. The only
                            thing that needed to be installed was Drizzle itself. Drizzle takes care of the ABI update
                            every time the project migrates. Thus, the ABI is always accounted for and up to date.
                            Drizzle also takes care of installing and launching web3.js. There was a little bit of a
                            learning curve when trying to call the contract functions and binding them back to React
                            elements, but after a few hours of hard work, we got it working.
                            <br/>
                            <br/>
                            Overall this project required a lot of learning. Many of the technologies used were bleeding
                            edge, thus, requiring us to create solutions that probably have never been seen before. Our
                            initial plans were much loftier than what actually happened in our project. We did a lot of
                            learning on how Solidity contracts interacted with each other, the users, and with web3. We
                            had many work days where would remove more than we would add the project. These times felt
                            hopeless, but without them, we would not have learned about Drizzle, Web3, and many other
                            bleeding edge technologies. The simplification of Web3 made our lives easier. Our team
                            learned valuable information about the benefits of testing. Since we could not solely rely
                            on Remix, many Truffle tests were written to ensure the functionality of our contracts.
                            Mocha testing helped us trust that our contracts worked so that we could focus our energy on
                            frontend integration. The biggest thing our team has taken away from this project is just
                            how frustrating, but also exciting, working with new technology can be. We have had many
                            moments when we wished that Solidity and Truffle was a more developed language like the
                            object-oriented languages we are accustomed to. We adapted to the obstacles that were
                            presented to us and proudly created a functional application.
                            <br/>
                            <br/>
                            <Header as='h5' style={{fontSize: '1em'}}>
                                Conclusion
                            </Header>
                            While our solution may not be flawless, we have done the initial steps to creating a
                            decentralized application that encourages people to donate to charities. With the
                            transparency of blockchain technology, we created a project to support and make the world a
                            better place. The project currently is at a point where it can be used, but there are many
                            more features to be added. To make this a successful platform, mass marketing has to be
                            involved to convince individuals that blockchain technology is the answer to 100%
                            transparency.

                        </div>


                    </Container>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        );
    }
}

export default Company;

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

const PageHeading = ({mobile}) => (
    <Container text>
        <Header
            as='h1'
            content='Company'
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
                                <a className="item active" href="/company">Company</a>
                                <a className="item" href="/about">About</a>

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
}

const ResponsiveContainer = ({children}) => (
    <div className="full">
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

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
