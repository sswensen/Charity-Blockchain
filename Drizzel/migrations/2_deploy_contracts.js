const MyStringStore = artifacts.require("MyStringStore");
const Charity = artifacts.require("Charity");

module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Charity,"TEST charity", "We save Puppies");
};
