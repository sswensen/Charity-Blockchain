pragma solidity ^0.4.25;

contract MyStringStore {
  string public myString = "Hello World";

  function set(string memory x) public {
    myString = x;
  }
}
