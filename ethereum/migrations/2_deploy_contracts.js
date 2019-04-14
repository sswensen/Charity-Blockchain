var CharitableDonations = artifacts.require("CharitableDonations");
var Charity = artifacts.require("Charity");
var Helpers = artifacts.require("Helpers");

module.exports = function(deployer) {
    deployer.deploy(CharitableDonations);
    //while migrating Charity: Invalid number of parameters for "undefined". Got 0 expected 4!
    //string _name, string _description, address _sender, Helpers _h
    deployer.deploy(Helpers);

    //deployer.deploy(Charity,"TEST charity","We save Puppies",0x5fcc042DC53E6F2d2E8FF7feecE1cF2A30328fD5, Helpers() );

    // Additional contracts can be deployed here
};
