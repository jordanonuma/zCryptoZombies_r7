pragma solidity 0.5.0;
import "../oracle/contracts/EthPriceOracle.sol";
import "../../Ownable.sol";
contract CallerContract is Ownable {
    EthPriceOracle private oracleInstance;
    address private oracleAddress;
    mapping(uint256=>bool) myRequests;

    event newOracleAddressEvent(address oracleAddress);
    event ReceivedNewRequestIdEvent(uint256 id);

    function setOracleInstanceAddress(address _oracleInstanceAddress) public onlyOwner {
        oracleAddress = _oracleInstanceAddress;
        oracleInstance = EthPriceOracleInterface(oracleAddress);
        emit newOracleAddressEvent(oracleAddress);
    } //end function setOracleInstanceAddress()
} //end contract CallerContract{}