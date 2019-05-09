//var CharitableDonations = artifacts.require("CharitableDonations");
var Charity1 = artifacts.require("Charity");
var Charity2 = artifacts.require("Charity2");
var Charity3 = artifacts.require("Charity3");
var Charity4 = artifacts.require("Charity4");
var Charity5 = artifacts.require("Charity5");
var Charity6 = artifacts.require("Charity6");
//var Helpers = artifacts.require("Helpers");

module.exports = function (deployer, network, accounts) {
    //deployer.deploy(CharitableDonations);
    //while migrating Charity: Invalid number of parameters for "undefined". Got 0 expected 4!
    //string _name, string _description, address _sender, Helpers _h
    //deployer.deploy(Helpers);

    deployer.deploy(Charity1,"Scott Swensen Foundation\n", "A foundation for the success of Scott in his CS 481a3 class.\n\nBlockchain is hard and having a good foundation to fall back on in times of need is a necessity for every college student pursuing a degree in computer science.\n", {from: accounts[0]});
    deployer.deploy(Charity2,"Claire Goldstein Foundation", "A foundation for the success of Claire in his CS 481a3 class.\n\nBlockchain is hard and having a good foundation to fall back on in times of need is a necessity for every college student pursuing a degree in computer science.\n",  {from: accounts[0]});
    deployer.deploy(Charity3,"Kenny Nguyen Foundation", "A foundation for the success of Kenny in his CS 481a3 class.\n\nBlockchain is hard and having a good foundation to fall back on in times of need is a necessity for every college student pursuing a degree in applied computing technology.\n",  {from: accounts[0]});
    deployer.deploy(Charity4,"Chipotle For All\n", "The one and only, best and greatest burrito-birthing company. Long live the guacamole\n\nWe're all about preparing food without added colors, flavors, or preservatives (other than " +
        "lemon or lime juice, which can be used as preservatives — though we use them only for taste). " +
        "Just genuine raw ingredients and their individual, delectable flavors. We source from farms rather than factories, " +
        "and spend a lot more on our ingredients than many other restaurants. " +
        "We wouldn't have it any other way.\n",  {from: accounts[0]});
    deployer.deploy(Charity5,"Blockchain Support Group\n", "Help our team afford the cups of coffee we need to stay up every night to finish this project.\n\nA blockchain, originally block chain, is a growing list of records, called blocks, which are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. By design, a blockchain is resistant to modification of the data.\n",  {from: accounts[0]});
    deployer.deploy(Charity6,"Wounded Warriors", "Support our returning troops. Go America. Why is this card formatting differently.\n\nWounded Warrior Project is a charity and veterans service organization that offers a variety of programs, services and events for wounded veterans of the military actions following September 11, 2001. It operates as a nonprofit 501 organization.\n",  {from: accounts[0]});

    // Additional contracts can be deployed here
};
