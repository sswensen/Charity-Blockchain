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

    deployer.deploy(Charity1,"Scott Swensen Foundation\n", "A foundation for the success of Scott in his CS 481a3 class.\n", {from: accounts[8]});
    deployer.deploy(Charity2,"Claire Goldstein Foundation", "A foundation for the success of Claire in his CS 481a3 class.\n",  {from: accounts[8]});
    deployer.deploy(Charity3,"Kenny Nguyen Foundation", "A foundation for the success of Kenny in his CS 481a3 class.\n",  {from: accounts[8]});
    deployer.deploy(Charity4,"Chipotle For All\n", "The one and only, best and greatest burrito-birthing company. Long live the guacamole\n",  {from: accounts[8]});
    deployer.deploy(Charity5,"Blockchain Support Group\n", "Help our team afford the cups of coffee we need to stay up every night to finish this project.\n",  {from: accounts[8]});
    deployer.deploy(Charity6,"Wounded Warriors", "Support our returning troops. Go America. Why is this card formatting differently.\n",  {from: accounts[8]});

    // Additional contracts can be deployed here
};
