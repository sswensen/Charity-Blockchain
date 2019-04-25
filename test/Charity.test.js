
const {balance, ether}= require('openzeppelin-test-helpers');

// Dose not work
var Charity = artifacts.require('Charity');
//
// const ether = 10**18; // 1 ether = 1000000000000000000 wei
//
// contract("SimpleCharity - basic initialization", function(accounts) {
//   const alice = accounts[1];
//
//   const charity = await Charity("NewCharity", "hello").deploy();
//
//   it("should have a name: NewCharity", async () => {
//       let name = await charity.getCharityName();
//       assert.equal("NewCharity", response);
//     });
//
//   it("should have a Description: hello ", async () => {
//       let des = await charity.getCharityDescription();
//       assert.equal('hello', des);
//   });
//
// });

contract('Charity', accounts => {
  var charity;
  //const ether = 10**18;
      async function deployContract(){
        charity = await Charity.new("Two", "hello");
      };

      describe('Get Charity Info', function()  {
        before(deployContract);

        it('Charity Name : Two ' , async function(){
          let response = await         charity.getCharityName();
          assert.equal("Two", response);
        });

        it('Charity description : hello ' , async function(){
          let response = await charity.getCharityDescription();
          //console.log("Charity description=", response);
          assert.equal('hello', response);
        });

        it('Before Donate: Charity balance = 0' , async () => {
             
           let response = await      charity.getCharityBalance();
           assert.equal(0 ,response);
        });



        it('Charity 2: AFTER Donate Charity = 5' , async () => {
          var didDonate = await charity.donate({from: accounts[0], value: ether('10')});
          //console.log("didDonate ",didDonate);

          let response = await       charity.getCharityBalance();
          //console.log("charity.balance= "+balance(charity.address));
          console.log("getCharityBalance = "+response);
          assert.equal(ether('10').toString() ,response.toString());

        });

        it('Charity 2: getOwner' , async () => {
          var owner = await charity.getOwner();
        //  console.log(owner);
          //0x5B74afb60E1314D631CfBE1121d2419fCC0eeF1D
          assert.equal("0x5B74afb60E1314D631CfBE1121d2419fCC0eeF1D" ,owner);

        });

        it('Charity 2: Withdrawls (ONLY OWNER)' , async () => {

          //0x5B74afb60E1314D631CfBE1121d2419fCC0eeF1D
          var withdrawl = await charity.withdrawl(ether('5'),"I need money", "0x5B74afb60E1314D631CfBE1121d2419fCC0eeF1D");
          //console.log(withdrawl);
          let balance = await charity.getCharityBalance();

          assert.equal(ether('5').toString() , balance.toString());
        });




    });
});
