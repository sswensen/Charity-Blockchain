pragma solidity ^0.4.25;

contract TrojanSecret {
    // Data Types

    // Remember: simple variables can be viewed with a CALL without having to define a getter function

    string public name;
    string public symbol;

    string[] public names;

    uint amount_for_unlock;
    uint public memberCount;

    mapping(string => address)Trojans;     // account names
    mapping(string => string) secrets;     // account secret messages
    mapping(string => address[]) access;   // dynamic list of accounts that have unlocked a particular account secret
    mapping(address => uint) balance;      // account piggy-banks.  No ether, just increments each time someone unlocks my secret.


    //Constructor

    // Set up state variables
    constructor() public{
        name = "Secrets";
        // not really used for anything
        symbol = "A";
        // neither is this one
        amount_for_unlock = 1 ether;
        // how much ether need to unlock a secret
        // don't need to set memberCount, it is already zero, so don't waste gas
    }

    //functions

    // Return all users registered
    function listPlayers() view returns (bytes) {
        if(memberCount <= 0) {
            return getBytes(0, 0);
        } else {
            return getBytes(0, memberCount - 1);
        }
    }

    // utility function to compare strings
    function compareStrings(string a, string b) view returns (bool){
        return keccak256(a) == keccak256(b);
    }

    // Remove from names array
    function removeFromNames(string name) private returns (bool) {
        for (uint i = 0; i < names.length; i++) {
            if (compareStrings(names[i], name)) {
                delete names[i];


                // Code adapted from https:
                // ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array
                // Move all remaining indexes down to fill deleted index
                //                for (uint j = i; i < names.length - 1; j++){
                //                    names[j] = array[j + 1];
                //                }
                //                delete names[names.length - 1];
                //                names.length--;

                // Or just swap last item with empty (my version)
                names[i] = names[names.length - 1];
                names.length--;

                return true;
            }
        }
        return false;
    }

    // Convert string array to bytes (modified from https://hackernoon.com/serializing-string-arrays-in-solidity-db4b6037e520)
    function getBytes(uint startindex, uint endindex) public view returns (bytes serialized){

        require(endindex >= startindex);

        if (endindex > (names.length - 1)) {
            endindex = names.length - 1;
        }

        //64 byte is needed for safe storage of a single string.
        //((endindex - startindex) + 1) is the number of strings we want to pull out.
        uint offset = 64 * ((endindex - startindex) + 1);

        bytes memory buffer = new  bytes(offset);
        string memory out1 = new string(32);


        for (uint i = startindex; i <= endindex; i++) {
            out1 = names[i];

            stringToBytes(offset, bytes(out1), buffer);
            offset -= sizeOfString(out1);
        }

        return (buffer);
    }

    // Get size of String (from https://github.com/pouladzade/Seriality/blob/master/src/SizeOf.sol)
    function sizeOfString(string memory _in) internal pure returns (uint _size){
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


    // Register a new Trojan account
    function registerTrojan(string name) public {
        // Throw exception if ten users have already registered
        require(memberCount < 10);

        // throw exception if user name is null or already registered
        require(!compareStrings(name, "") && Trojans[name] == address(0));
        memberCount ++;
        Trojans[name] = msg.sender;

        // Add name to array
        names.push(name);
    }

    // Delete a user account
    function unregisterTrojan(string name) public {
        // ensure that the account exists and belongs to the sender
        require(Trojans[name] != address(0) && Trojans[name] == msg.sender);
        Trojans[name] = address(0);
        memberCount--;

        // Call removeFromNames
        removeFromNames(name);
    }

    // Create a secret message for an account
    function setSecret(string name, string message) public {
        // ensure that the account exists and belongs to the sender
        require(Trojans[name] != address(0) && Trojans[name] == msg.sender);
        secrets[name] = message;

    }

    // read the secret message if it is unlocked
    function getSecret(string name) public view returns (string){
        require(Trojans[name] != address(0));
        bool flag = false;
        // this is a memory variable; just FYI

        // check to see if user is in list of users that have unlocked the message
        for (uint i = 0; i < access[name].length; i ++) {
            if (access[name][i] == msg.sender) {
                flag = true;
                break;
            }
        }
        if (flag) {
            return secrets[name];
        }
        return "message is locked";
    }


    // pay to play:  unlock someone's message
    function unlockMessage(string name) public payable {
        require(Trojans[name] != address(0) && msg.value == amount_for_unlock);
        balance[Trojans[name]] += msg.value;
        Trojans[name].transfer(msg.value);
        access[name].push(msg.sender);
    }

    // piggy-bank to keep track of how much money I made from users that have unlocked my secret message
    function getBalance() public view returns (uint) {
        return balance[msg.sender];
    }

}