pragma solidity 0.5.0;
import "../oracle/contracts/EthPriceOracle.sol";
contract CallerContract {
    address private oracleAddress;
    function setOracleInstanceAddress(address _oracleInstanceAddress) public {
        oracleAddress = _oracleInstanceAddress;
    } //end function setOracleInstanceAddress()
} //end contract CallerContract{}