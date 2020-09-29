pragma solidity 0.5.0;
// import "../../../Ownable.sol";
import "../access/Roles.sol";
import "./CallerContractInterface.sol";
import "../../../SafeMath.sol";

contract EthPriceOracle {
    uint private randNonce = 0;
    uint private modulus = 1000;
    mapping(uint256=>bool) pendingRequests;
    event GetLatestEthPriceEvent(address callerAddress, uint id);
    event SetLatestEthPriceEvent(uint256 ethPrice, address callerAddress);

    function getLatestEthPrice() public returns(uint256) {
      
    } //end function getLatestEthPrice()
} //end contract EthPriceOracle{}
