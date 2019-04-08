pragma solidity ^0.4.25;

import './CharityFactory.sol';
import './Helpers.sol';

contract Charity is CharityFactory {
	function() {
		// Callback
	}

	function Charity(string _name, string _description, address _sender) {
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

	function getDonators(int x, int y) {
		//TODO Create secondary data structure (see TrojanSecret)
	}

	function getTranscationAmounts() view returns (bytes) {
		if (transactionCount <= 0) {
			return getBytesOfArray(0, 0, "transactionAmounts");
		} else {
			return getBytesOfArray(0, transactionCount - 1, "transactionAmounts");
		}
	}

	function getTranscationDescriptions() view returns (bytes) {
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

		transact(amount, Helpers.toAsciiString(donator));


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

	function transact(uint amount, string reason) {
		transactionAmounts.push(Helpers.uint2str(amount));
		transactionDescriptions.push(reason);
		transactionCount++;
	}

	function closeCharity(address sender) public only_owner(sender) {
		STATE = charity_state.FINISHED;
	}

	// Convert string array to bytes (modified from https://hackernoon.com/serializing-string-arrays-in-solidity-db4b6037e520)
	function getBytesOfArray(uint startindex, uint endindex, string arrayName) private view returns (bytes serialized){
		string[] array;
		if (Helpers.compareStrings(arrayName, "transactionAmounts")) {
			array = transactionAmounts;
		}
		if (Helpers.compareStrings(arrayName, "transactionDescriptions")) {
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

			Helpers.stringToBytes(offset, bytes(out1), buffer);
			offset -= Helpers.sizeOfString(out1);
		}

		return (buffer);
	}
}