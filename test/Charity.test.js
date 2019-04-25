
// Dose not work

const Charity = artifacts.require('Charity');

contract('Charity', function () {
  async function deployContract(){
    this.contract = await Charity.new("One", "We save puppies");
  };

  describe('Get Charity Info', function()  {
    before(deployContract);

    it('Charity Name should be One ' , async function(){
      let response = await this.contract.getCharityName();
      assert.equal("One", response);
    });

    it('Charity description should be We save puppies ' , async function(){
      let response = await this.contract.getCharityDescription();
      console.log("Charity description=", response);
      assert.equal('We save puppies', response);
    });

    it('Charity balance should be Zero ' , async function(){
      let response = await this.contract.getCharityBalance();
      console.log("getCharityBalance = "+response);
      assert.equal(0, response);
    });

    it('Charity Can be Donated to' , async function(){
      let response = await this.contract.donate(10, '0x1cCB5Dbd7EA1386b67B50e23332e963483D80ED1',
          {from: 0x5fcc042DC53E6F2d2E8FF7feecE1cF2A30328fD5, to: this.contract.Address, value: 10 });
      //let response = await this.contract.donate.send(1, 0x1cCB5Dbd7EA1386b67B50e23332e963483D80ED1);
      console.log("donate response = "+response);
      assert.equal(true, response);
    });

    it('Charity balance should be 10' , async function(){
      let response = await this.contract.getCharityBalance();
      console.log("this.contract.balance= "+this.contract.balance);
      console.log("getCharityBalance = "+response);
      assert.equal(10 ,response);
    });


  });


});// end of contract('CharitableDonations', function () {
