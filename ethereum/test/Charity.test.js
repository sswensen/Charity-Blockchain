
// Dose not work 

const Charity = artifacts.require('Charity');
const Helpers = artifacts.require('Helpers');

contract('Charity', function () {
      async function deployContract(){
        var h = await Helpers.new();
        this.contract = await Charity.new("One", "We save puppies",  0x5fcc042DC53E6F2d2E8FF7feecE1cF2A30328fD5, h);
      };

      describe('Get Charity Info', function()  {
        before(deployContract);

        it('Charity Name should be One ' , async function(){
          let response = await this.contract.getCharityName();
          assert.equal("One", response);
        });

        it('Charity Address should be 0x5fcc042DC53E6F2d2E8FF7feecE1cF2A30328fD5 ' , async function(){
          await this.contract.deployCharity("One","We save Puppies")
          let response = await this.contract.getAddress();
          assert.equal(0x5fcc042DC53E6F2d2E8FF7feecE1cF2A30328fD5, response);
        });

        it('Charity description should be We save puppies ' , async function(){
          await this.contract.deployCharity("One","We save Puppies")
          let response = await this.contract.getCharityDescription();
          assert.equal('We save puppies', response);
        });

    });


});// end of contract('CharitableDonations', function () {
