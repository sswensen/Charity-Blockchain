pragma solidity ^0.4.25;

import './Charity.sol';
import './Helpers.sol';

contract CharitableDonations {
	mapping(string => address) charityNameToContractAddr;
	mapping(string => Charity) charityNameToCharityObject;
	mapping(address => string[]) userAddrToCharityName;
	uint charityCount;
	Charity[] charities;
	string charityNamesRet;
	Helpers h;

	constructor() public {
		h = new Helpers();
	}

	function deployCharity(string name, string description) public {
		//TODO Deploy charity contract (child) and add to mapping structures

		// Create charity
		Charity c = new Charity(name, description, msg.sender, h);

		// Add charity C to name to charity hashmap
		charityNameToCharityObject[name] = c;

		// Add charity to charity array
		charities.push(c);

		// Add charity address to name to charity address hashmap
		charityNameToContractAddr[name] = address(c);

		// Increment charity count
		charityCount++;

		// Add charity name to string array of charities owned by an address (hashmap)
		userAddrToCharityName[msg.sender].push(name);
	}

	// Get all charity names as a single string with spaces
	function getCharityNames() public returns (string){
		for (uint i = 0; i < charities.length; i++) {
			charityNamesRet = h.strConcat(charityNamesRet, charities[i].getCharityName(), " ");
		}
		return charityNamesRet;
	}

	// Get all charity names from the msg.sender AS BYTES
	function getUsersCharitites() public view returns (bytes) {
		string[] storage array = userAddrToCharityName[msg.sender];
		uint startindex = 0;
		uint endindex = array.length - 1;
		require(endindex >= startindex);

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

	// Get total number of charities
	function getNumCharities() public view returns (uint) {
		return charityCount;
	}

	// Get chairity address from charity name
	function getChairityAddress(string name) public view returns (address){
		return charityNameToCharityObject[name].getAddress();
	}

	// Donate to a charity based on name
	function donate(string name) public paybale returns (bool) {
		Charity c = getCharityByName(name);
		// TODO finish this (ensure paybale) and TEST
		return c.donate(msg.value, msg.sender);
	}

	// Get a charity object based on name
	function getCharityByName(string name) internal returns (Charity) {
		return charityNameToCharityObject.get(name);
	}
}