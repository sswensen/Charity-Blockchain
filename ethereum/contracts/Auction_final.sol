pragma solidity ^0.4.21;

contract Auction {

	address internal auction_owner;
	uint256 public auction_start;
	uint256 public auction_end;
	uint256 public highestBid;
	address public highestBidder;


	enum auction_state{
		CANCELLED, STARTED
	}

	struct car {
		string Brand;
		string Rnumber;
	}

	car public Mycar;
	address[] bidders;

	mapping(address => uint) public bids;

	auction_state public STATE;


	modifier an_ongoing_auction(){
		require(now <= auction_end);
		_;
	}

	modifier only_owner(){
		require(msg.sender == auction_owner);
		_;
	}

	function bid() public payable returns (bool){}

	function withdraw() public returns (bool){}

	function cancel_auction() external returns (bool){}

	event BidEvent(address indexed highestBidder, uint256 highestBid);
	event WithdrawalEvent(address withdrawer, uint256 amount);
	event CanceledEvent(string message, uint256 time);

}


contract MyAuction is Auction {


	function()
	{

	}


	function MyAuction(uint _biddingTime, address _owner, string _brand, string _Rnumber) public {
		auction_owner = _owner;
		auction_start = now;
		auction_end = auction_start + _biddingTime * 1  hours;
		STATE = auction_state.STARTED;
		Mycar.Brand = _brand;
		Mycar.Rnumber = _Rnumber;

	}


	function bid() public payable an_ongoing_auction returns (bool){
		uint current = bids[msg.sender] + msg.value;
		require(current > highestBid, "You can't bid, Make a higher Bid");
		highestBidder = msg.sender;
		highestBid = current;
		if (bids[msg.sender] > 0) {
			bids[msg.sender] = current;
		} else {
			bids[msg.sender] = current;
			bidders.push(msg.sender);
		}
		emit BidEvent(highestBidder, highestBid);

		return true;
	}


	function cancel_auction() external only_owner an_ongoing_auction returns (bool){

		STATE = auction_state.CANCELLED;
		auction_end = now;
		emit CanceledEvent("Auction Cancelled", now);
		return true;
	}


	function destruct_auction() external only_owner returns (bool){

		require(now > auction_end, "You can't destruct the contract,The auction is still open");
		for (uint i = 0; i < bidders.length; i++)
		{
			assert(bids[bidders[i]] == 0);
		}

		selfdestruct(auction_owner);
		return true;

	}


	function withdraw() public returns (bool){
		require(now > auction_end, "You can't withdraw, the auction is still open");
		uint amount;

		amount = bids[msg.sender];
		bids[msg.sender] = 0;
		msg.sender.transfer(amount);
		emit WithdrawalEvent(msg.sender, amount);
		return true;

	}

	function get_owner() public view returns (address){
		return auction_owner;
	}

	function getMyBid() public view returns (uint) {
		return bids[msg.sender];
	}

	function contractBalance() public view returns (uint) {
		return address(this).balance;
	}

	function buyCar() public payable returns (bool) {
		require(now >= auction_end, "Auction is still open!!");
		require(msg.sender == highestBidder);

		uint tran = bids[msg.sender];
		bids[msg.sender] = 0;
		auction_owner.transfer(tran);

		return true;
	}

	function numberOfBidders() public view returns (uint) {
		return bidders.length;
	}
}