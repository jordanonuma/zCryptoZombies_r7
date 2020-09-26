pragma solidity 0.5.0;
import "../oracle/contracts/EthPriceOracle.sol";
import "../../Ownable.sol";
contract CallerContract is Ownable {
    uint256 ethPrice private;

    EthPriceOracle private oracleInstance;
    address private oracleAddress;
    mapping(uint256=>bool) myRequests;

    event newOracleAddressEvent(address oracleAddress);
    event ReceivedNewRequestIdEvent(uint256 id);
    event PriceUpdatedEvent(uint256 ethPrice, uint256 id);

    function setOracleInstanceAddress(address _oracleInstanceAddress) public onlyOwner {
        oracleAddress = _oracleInstanceAddress;
        oracleInstance = EthPriceOracleInterface(oracleAddress);
        emit newOracleAddressEvent(oracleAddress);
    } //end function setOracleInstanceAddress()

    function updateEthPrice() public {
        uint256 id = oracleInstance.getLatestEthPrice();
        myRequests[id] = true;
        emit ReceivedNewRequestIdEvent(id);
    } //end function updateEthPrice()

    function callback(uint256 _ethPrice, uint256 _id) public {
        require(myRequests[id] == true, "this request is not in my pending list.");
    } //end function callback()
} //end contract CallerContract{}