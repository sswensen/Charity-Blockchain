pragma solidity ^0.4.25;

contract Charity4 {
	string name;
	string description;
	uint balance; //TODO make this able to store decimals
	address owner;
	address[] donators;
	mapping(address => uint) public donations;
	string[] transactionAmounts;
	string[] transactionDescriptions;
	uint transactionCount;
	//Helpers h;

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


	constructor(string _name, string _description) public {
		//h = _h;
		name = _name;
		description = _description;
	//	owner = _sender;
		owner = msg.sender;
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

	function donate() public payable ongoing returns (bool) {
		uint current = donations[msg.sender] + msg.value;
		if (donations[msg.sender] > 0) {
			donations[msg.sender] = current;
		} else {
			donations[msg.sender] = current;
			donators.push(msg.sender);
		}
		balance += msg.value;

		transact(msg.value, toAsciiString(msg.sender));

		emit DonateEvent(msg.sender, msg.value);

		return true;
	}


	function withdrawal(uint amount, string reason) public only_owner(msg.sender) returns (bool) {
		require(balance >= amount);
		//transact(amount, reason);
		balance -= amount;
		owner.transfer(amount);
		emit WithdrawalEvent(msg.sender, amount, reason);
		return true;
	}

	function transact(uint amount, string reason) public {
		transactionAmounts.push(uint2str(amount));
		transactionDescriptions.push(reason);
		transactionCount++;
	}

	function closeCharity(address sender) public only_owner(sender) {
		STATE = charity_state.FINISHED;
	}

	// Convert string array to bytes (modified from https://hackernoon.com/serializing-string-arrays-in-solidity-db4b6037e520)
	function getBytesOfArray(uint startindex, uint endindex, string arrayName) private view returns (bytes serialized){
		string[] storage array = transactionAmounts;
		if (compareStrings(arrayName, "transactionAmounts")) {
			array = transactionAmounts;
		}
		if (compareStrings(arrayName, "transactionDescriptions")) {
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

	// ------------------------ HELPER FUNCTIONS ------------------------ //
	// Convert uint to string (https://ethereum.stackexchange.com/questions/6591/conversion-of-uint-to-string)
	function uint2str(uint i)  public pure returns (string){
		if (i == 0) return "0";
		uint j = i;
		uint length;
		while (j != 0) {
			length++;
			j /= 10;
		}
		bytes memory bstr = new bytes(length);
		uint k = length - 1;
		while (i != 0) {
			bstr[k--] = byte(48 + i % 10);
			i /= 10;
		}
		return string(bstr);
	}

	// Get size of String (from https://github.com/pouladzade/Seriality/blob/master/src/SizeOf.sol)
	function sizeOfString(string memory _in) public pure returns (uint _size) {
		_size = bytes(_in).length / 32;
		if (bytes(_in).length % 32 != 0)
			_size++;

		_size++;
		// first 32 bytes is reserved for the size of the string
		_size *= 32;
	}

	// Convert String to bytes (from https://github.com/pouladzade/Seriality/blob/master/src/TypesToBytes.sol)
	function stringToBytes(uint _offst, bytes memory _input, bytes memory _output) public pure {
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
	function compareStrings(string a, string b) public pure returns (bool){
		return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
	}

	// Address to string (https://ethereum.stackexchange.com/questions/8346/convert-address-to-string)
	function toAsciiString(address x) public pure returns (string) {
		bytes memory s = new bytes(40);
		for (uint i = 0; i < 20; i++) {
			byte b = byte(uint8(uint(x) / (2 ** (8 * (19 - i)))));
			byte hi = byte(uint8(b) / 16);
			byte lo = byte(uint8(b) - 16 * uint8(hi));
			s[2 * i] = char(hi);
			s[2 * i + 1] = char(lo);
		}
		return string(s);
	}

	function char(byte b) public pure returns (byte c) {
		if (b < 10) return byte(uint8(b) + 0x30);
		else return byte(uint8(b) + 0x57);
	}

	// String concat
	function strConcat(string a, string b, string c) public pure returns (string){
		bytes memory ba = bytes(a);
		bytes memory bb = bytes(b);
		bytes memory bc = bytes(c);

		string memory str = new string(ba.length + bb.length + bc.length);
		bytes memory bStr = bytes(str);
		uint k = 0;
		for (uint i = 0; i < ba.length; i++) {
			bStr[k++] = ba[i];
		}
		for (i = 0; i < bb.length; i++) {
			bStr[k++] = bb[i];
		}
		for (i = 0; i < bc.length; i++) {
			bStr[k++] = bc[i];
		}


		return string(bStr);
	}
}
