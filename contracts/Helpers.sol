pragma solidity ^0.4.25;

contract Helpers {
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