pragma solidity ^0.4.25;

contract CharitableDonations {
	mapping(string => address) charityNameToContractAddr;
	mapping(string => Charity) charityNameToCharityObject;
	mapping(address => string[]) userAddrToCharityName;
	uint charityCount;
	Charity[] charities;
	string name;

	function deployCharity(string name, string description) {
		//TODO Deploy charity contract (child) and add to mapping structures
		Charity c = new Charity(name, description, msg.sender);
		charityNameToCharityObject[name] = c;
		charities.push(c);
		charityNameToContractAddr[name] =  address(c);
		charityCount++;
		userAddrToCharityName[msg.sender].push(name);
	}

	function getCharityNames() public view returns (string){
		for(uint i = 0; i < charities.length; i++) {
			name = strConcat(name,charities[i].getCharityName(), " ");
			//ret = strConcat(ret, " ", name);
		}

		return name;
	}

	function getChairityAddress(string name) view returns (address){
		return charityNameToCharityObject[name].getAddress();
	}

	// String concat
	function strConcat(string a, string b, string c) returns (string){
		bytes memory ba = bytes(a);
		bytes memory bb = bytes(b);
		bytes memory bc = bytes(c);

		string memory str = new string(ba.length + bb.length + bc.length);
		bytes memory bStr = bytes(str);
		uint k = 0;
		for (uint i = 0; i < ba.length; i++){
			bStr[k++] = ba[i];
		}
		for (i = 0; i < bb.length; i++){
			bStr[k++] = bb[i];
		}
		for (i = 0; i < bc.length; i++){
			bStr[k++] = bc[i];
		}


		return string(bStr);
	}
}

contract CharityFactory {
	string name;
	string description;
	uint balance; //TODO make this able to store decimals
	address owner;
	address[] donators;
	mapping(address => uint) public donations;
	string[] transactionAmounts;
	string[] transactionDescriptions;
	uint transactionCount;

	enum charity_state {
		STARTED, FINISHED
	}
	charity_state public STATE;


	// ------------------------ Modifiers ------------------------ //
	modifier ongoing(){
		require(charity_state.STARTED == STATE);
		_;
	}

	modifier only_owner(){
		require(msg.sender == owner);
		_;
	}

	// ------------------------ EVENTS ------------------------ //
	event DonateEvent(address donator, uint amount);
	event WithdrawalEvent(address withdrawer, uint256 amount, string reason);
}

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
		if(transactionCount <= 0) {
			return getBytesOfArray(0, 0, "transactionAmounts");
		} else {
			return getBytesOfArray(0, transactionCount - 1, "transactionAmounts");
		}
	}

	function getTranscationDescriptions() view returns (bytes) {
		if(transactionCount <= 0) {
			return getBytesOfArray(0, 0, "transactionDescriptions");
		} else {
			return getBytesOfArray(0, transactionCount - 1, "transactionDescriptions");
		}
	}

	// ------------------------ ACTIONS ------------------------ //

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
		transactionAmounts.push(uint2str(amount));
		transactionDescriptions.push(reason);
		transactionCount++;
		msg.sender.transfer(amount);
		emit WithdrawalEvent(msg.sender, amount, reason);
		return true;
	}

	// ------------------------ HELPER FUNCTIONS ------------------------ //
	// Convert uint to string (https://ethereum.stackexchange.com/questions/6591/conversion-of-uint-to-string)
	function uint2str(uint i) internal pure returns (string){
		if (i == 0) return "0";
		uint j = i;
		uint length;
		while (j != 0){
			length++;
			j /= 10;
		}
		bytes memory bstr = new bytes(length);
		uint k = length - 1;
		while (i != 0){
			bstr[k--] = byte(48 + i % 10);
			i /= 10;
		}
		return string(bstr);
	}

	// Convert string array to bytes (modified from https://hackernoon.com/serializing-string-arrays-in-solidity-db4b6037e520)
	function getBytesOfArray(uint startindex, uint endindex, string arrayName) private view returns (bytes serialized){
		string[] array;
		if(compareStrings(arrayName, "transactionAmounts")) {
			array = transactionAmounts;
		}
		if(compareStrings(arrayName, "transactionDescriptions")) {
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

			stringToBytes(offset, bytes(out1), buffer);
			offset -= sizeOfString(out1);
		}

		return (buffer);
	}

	// Get size of String (from https://github.com/pouladzade/Seriality/blob/master/src/SizeOf.sol)
	function sizeOfString(string memory _in) internal pure returns (uint _size) {
		_size = bytes(_in).length / 32;
		if (bytes(_in).length % 32 != 0)
			_size++;

		_size++;
		// first 32 bytes is reserved for the size of the string
		_size *= 32;
	}

	// Convert String to bytes (from https://github.com/pouladzade/Seriality/blob/master/src/TypesToBytes.sol)
	function stringToBytes(uint _offst, bytes memory _input, bytes memory _output) internal pure {
		uint256 stack_size = _input.length / 32;
		if (_input.length % 32 > 0) stack_size++;

		assembly {
			stack_size := add(stack_size, 1)//adding because of 32 first bytes memory as the length
			for {let index := 0} lt(index, stack_size){index := add(index, 1)} {
				mstore(add(_output, _offst), mload(add(_input, mul(index, 32))))
				_offst := sub(_offst, 32)
			}
		}
	}

	// utility function to compare strings
	function compareStrings(string a, string b) private view returns (bool){
		return keccak256(a) == keccak256(b);
	}
}