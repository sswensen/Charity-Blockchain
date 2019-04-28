const {balance, ether}= require('openzeppelin-test-helpers');
var Charity = artifacts.require('Charity');

contract('Charity', accounts => {
  var charity;
  //const ether = 10**18;
      async function deployContract(){
        charity = await Charity.new("Two", "hello");
      };


      function hexToStr(hex) {
           var str = '';
          for (var i = 0; i < hex.length; i += 2) {
             var v = parseInt(hex.substr(i, 2), 16);
             if (v) str += String.fromCharCode(v);
          }
            params = [];
          res = "";
          for (var i=0; i<= str.length; i++){
            if(str.charCodeAt(i) > 31){
              res = res + str[i];
            }
            else{
              params.push(res);
              res = "";
            }
          }
          params.pop();

           return params;
       }

      describe('Get Charity Info', function()  {
        before(deployContract);

        it('Charity Name : Two ' , async function(){
          let response = await charity.getCharityName();
          assert.equal("Two", response);
        });

        it('Charity description : hello ' , async function(){
          let response = await charity.getCharityDescription();
          //console.log("Charity description=", response);
          assert.equal('hello', response);
        });

        it('Before Donate: Charity balance = 0' , async () => {

           let response = await charity.getCharityBalance();
           assert.equal(0 ,response);
        });

        it('Charity 2: AFTER Donate Charity = 5' , async () => {
          var didDonate = await charity.donate({from: accounts[0], value: ether('10')});
          //console.log("didDonate ",didDonate);

          let response = await       charity.getCharityBalance();
          //console.log("charity.balance= "+balance(charity.address));
          //console.log("getCharityBalance = "+response);
          assert.equal(ether('10').toString() ,response.toString());

        });

        it('Charity 2: getOwner' , async () => {
          var owner = await charity.getOwner();
        //  console.log(owner);
          assert.equal(accounts[0] ,owner);

        });

        it('Charity 2: Withdrawls (ONLY OWNER)' , async () => {

          //0x5B74afb60E1314D631CfBE1121d2419fCC0eeF1D
          var withdrawl = await charity.withdrawl(ether('5'),"I need money", accounts[0]);
          console.log(withdrawl);
          let balance = await charity.getCharityBalance();
          assert.equal(ether('5').toString() , balance.toString());
        });

        it('Charity 2: AFTER Withdrawls Charity = 5 ether' , async () => {
          let response = await charity.getCharityBalance();
          assert.equal(ether('5').toString() ,response.toString());
        });

        it('Charity 2: AFTER Withdrawls getTranscationAmounts = -5 ether, +10 ether' , async () => {
          let response = await charity.getTranscationAmounts();
          var final = hexToStr(response);
          //console.log("getTranscationAmounts = "+ final);
          assert.equal("-"+ether('5').toString() + ",+"+ether('10').toString() ,final);

        });
        //
        // it('Charity 2: AFTER Withdrawls getTranscationDescriptions = I need money, +10 ether' , async () => {
        //   const response = await charity.getTranscationDescriptions({gas:5000000});
        //   var final = hexToStr(response);
        //   console.log("getTranscationDescriptions = "+ final);
        //   assert.equal("I need money,+"+ether('10').toString() ,final);
        //
        // });
    });
});
