const CharitableDonations = artifacts.require('CharitableDonations');


contract('CharitableDonations', function () {
      async function deployContract(){
        this.contract = await CharitableDonations.new();
      };

      describe('Add a Charity', function()  {
        before(deployContract);

        it('should say getNumCharities = 0 ' , async function(){
          let supply = await this.contract.getNumCharities();
          assert.equal(0, supply);
        });

        it('should say getNumCharities = 1 ' , async function(){
          await this.contract.deployCharity("One","We save Puppies")
          let supply = await this.contract.getNumCharities();
          assert.equal(1, supply);
        });

        // it('should Say Charitys name is One ' , async function(){
        //
        //   Charity one = await this.contract.getCharityName("One");
        //   var name = one.getCharityName();
        //
        //   assert.equal("One", name);
        // });

    });


});// end of contract('CharitableDonations', function () {
