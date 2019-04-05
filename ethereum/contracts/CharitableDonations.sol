pragma solidity ^0.4.25;

contract CharitableDonations {
	mapping(string => address) charityNameToContractAddr;
	mapping(address => string) userAddrToCharityName;

	function addCharity() {
		//TODO add paramaters too
	}

	function deployCharity() {
		//TODO Deploy charity contract (child) and add to mapping structures
	}
}

contract CharityFactory {
	string name;
	string description;
	uint balance; //TODO make this able to store decimals
	address owner;
	address[] donators;
	mapping(address => uint) public donations;
	string[] transactionAmount;
	string[] transactionDescription;

	enum charity_state {
		STARTED, FINISHED
	}
	charity_state public STATE;


	// Mofifiers
	modifier ongoing(){
		require(charity_state.STARTED == STATE);
		_;
	}

	modifier only_owner(){
		require(msg.sender == owner);
		_;
	}

	// EVENTS
	event DonateEvent(address donator, uint amount);
	event WithdrawalEvent(address withdrawer, uint256 amount, string reason);
}

contract Charity is CharityFactory {
	function() {
		// Callback
	}

	function Charity(string _name, string _description) {
		name = _name;
		description = _description;
		owner = msg.sender;
		balance = 0;
		STATE = charity_state.STARTED;
	}

	function getOwner() public view returns (address){
		return owner;
	}

	function getMyDonation() public view returns (uint) {
		return donations[msg.sender];
	}

	function getDonators(int x, int y) {
		//TODO Create secondary data structure (see TrojanSecret)
	}

	function getDontation() public view returns (uint) {
		return donations[msg.sender];
	}

	function donate(uint amount) public payable ongoing returns (bool) {
		uint current = donations[msg.sender] + msg.value;
		if (donations[msg.sender] > 0) {
			donations[msg.sender] = current;
		} else {
			donations[msg.sender] = current;
			donators.push(msg.sender);
		}
		balance += msg.value;

		emit DonateEvent(msg.sender, msg.value);

		return true;
	}

	function withdrawl(uint amount, string reason) public only_owner returns (bool) {
		require(balance >= amount);
		transactionAmount.push(amount);
		transactionDescription.push(reason);
		msg.sender.transfer(amount);
		emit WithdrawalEvent(msg.sender, amount, reason);
		return true;
	}
}