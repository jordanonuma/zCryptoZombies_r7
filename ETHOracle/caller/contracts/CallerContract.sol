pragma solidity 0.5.0;
import "../oracle/contracts/EthPriceOracle.sol";
import "../../Ownable.sol";
contract CallerContract is Ownable {
    EthPriceOracle private oracleInstance;
    address private oracleAddress;
    function setOracleInstanceAddress(address _oracleInstanceAddress) public {
        oracleAddress = _oracleInstanceAddress;
        oracleInstance = EthPriceOracleInterface(oracleAddress);
    } //end function setOracleInstanceAddress()
} //end contract CallerContract{}