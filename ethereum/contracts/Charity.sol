pragma solidity ^0.4.25;

import './Helpers.sol';

contract Charity {
	string name;
	string description;
	uint balance; //TODO make this able to store decimals
	address owner;
	address[] donators;
	mapping(address => uint) public donations;
	string[] transactionAmounts;
	string[] transactionDescriptions;
	uint transactionCount;
	Helpers h;

	enum charity_state {
		STARTED, FINISHED
	}
	charity_state public STATE;


	// ------------------------ Modifiers ------------------------ //
	modifier ongoing(){
		require(charity_state.STARTED == STATE);
		_;
	}

	modifier only_owner(address _sender){
		require(_sender == owner);
		_;
	}

	// ------------------------ EVENTS ------------------------ //
	event DonateEvent(address donator, uint amount);
	event WithdrawalEvent(address withdrawer, uint256 amount, string reason);

	function() public {
		// Callback
	}

	constructor(string _name, string _description, address _sender, Helpers _h) public {
		h = _h;
		name = _name;
		description = _description;
		owner = _sender;
		balance = 0;
		transactionCount = 0;
		STATE = charity_state.STARTED;
	}

	// ------------------------ GETTERS ------------------------ //
	function getAddress() public view returns (address) {
		return address(this);
	}

	function getCharityName() public view returns (string) {
		return name;
	}

	function getCharityDescription() public view returns (string) {
		return description;
	}

	function getOwner() public view returns (address) {
		return owner;
	}

	function getMyDonation() public view returns (uint) {
		return donations[msg.sender];
	}

	function getCharityBalance() public view returns (uint) {
		return balance;
	}

	function getTranscationAmounts() public view returns (bytes) {
		if (transactionCount <= 0) {
			return getBytesOfArray(0, 0, "transactionAmounts");
		} else {
			return getBytesOfArray(0, transactionCount - 1, "transactionAmounts");
		}
	}

	function getTranscationDescriptions() public view returns (bytes) {
		if (transactionCount <= 0) {
			return getBytesOfArray(0, 0, "transactionDescriptions");
		} else {
			return getBytesOfArray(0, transactionCount - 1, "transactionDescriptions");
		}
	}

	// ------------------------ ACTIONS ------------------------ //

	function donate(uint amount, address donator) public payable ongoing returns (bool) {
		uint current = donations[donator] + amount;
		if (donations[donator] > 0) {
			donations[donator] = current;
		} else {
			donations[donator] = current;
			donators.push(donator);
		}
		balance += amount;

		transact(amount, h.toAsciiString(donator));


		emit DonateEvent(msg.sender, msg.value);

		return true;
	}

	function withdrawl(uint amount, string reason, address sender) public only_owner(sender) returns (bool) {
		require(balance >= amount);
		transact(amount, reason);
		msg.sender.transfer(amount);
		emit WithdrawalEvent(msg.sender, amount, reason);
		return true;
	}

	function transact(uint amount, string reason) public {
		transactionAmounts.push(h.uint2str(amount));
		transactionDescriptions.push(reason);
		transactionCount++;
	}

	function closeCharity(address sender) public only_owner(sender) {
		STATE = charity_state.FINISHED;
	}

	// Convert string array to bytes (modified from https://hackernoon.com/serializing-string-arrays-in-solidity-db4b6037e520)
	function getBytesOfArray(uint startindex, uint endindex, string arrayName) private view returns (bytes serialized){
		string[] storage array = transactionAmounts;
		if (h.compareStrings(arrayName, "transactionAmounts")) {
			array = transactionAmounts;
		}
		if (h.compareStrings(arrayName, "transactionDescriptions")) {
			array = transactionDescriptions;
		}

		require(endindex >= startindex);

		if (endindex > (array.length - 1)) {
			endindex = array.length - 1;
		}

		//64 byte is needed for safe storage of a single string.
		//((endindex - startindex) + 1) is the number of strings we want to pull out.
		uint offset = 64 * ((endindex - startindex) + 1);

		bytes memory buffer = new  bytes(offset);
		string memory out1 = new string(32);


		for (uint i = startindex; i <= endindex; i++) {
			out1 = array[i];

			h.stringToBytes(offset, bytes(out1), buffer);
			offset -= h.sizeOfString(out1);
		}

		return (buffer);
	}
}