pragma solidity 0.5.0;
// import "../../../Ownable.sol";
import "../access/Roles.sol";
import "./CallerContractInterface.sol";
import "../../../SafeMath.sol";

contract EthPriceOracle {
    using Roles for Roles.Role;
    Roles.Role private owners;
    Roles.Role private oracles;

    using SafeMath for uint256;
    uint private randNonce = 0;
    uint private modulus = 1000;
    uint private numOracles = 0;
    uint private THRESHOLD = 0;

    mapping (uint256=>Response[]) public requestIdToResponse;
    mapping(uint256=>bool) pendingRequests;

    struct Response {
        address oracleAddress;
        address callerAddress;
        uint256 ethPrice;
    } //end struct Response{}

    event GetLatestEthPriceEvent(address callerAddress, uint id);
    event SetLatestEthPriceEvent(uint256 ethPrice, address callerAddress);
    event AddOracleEvent(address oracleAddress);
    event RemoveOracleEvent(address oracleAddress);
  
    constructor (address _owner) public {
        owners.add(_owner);
    } //end constructor()

    function addOracle(address _oracle) public {
        require(owners.has(msg.sender), "Not an owner!");
        require(!oracles.has(_oracle), "Already an oracle!");
        oracles.add(_oracle);
        emit AddOracleEvent(_oracle);
    } //end function addOracle()

    function removeOracle(address _oracle) public {
        require(owners.has(msg.sender), "Not an owner!");
        require(oracles.has(_oracle), "Not an oracle!");
        require(numOracles > 1, "Not allowed to remove the last oracle!");
        oracles.remove(_oracle);
        numOracles--;
        emit RemoveOracleEvent(_oracle);
    
    } //end function removeOracle()

    function getLatestEthPrice() public returns(uint256) {
        randNonce++;
        uint id = uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % modulus;
        pendingRequests[id] = true;
        emit GetLatestEthPriceEvent(msg.sender, id);
        return id;
    } //end function getLatestEthPrice()

    function setLatestEthPrice(uint256 _ethPrice, address _callerAddress, uint256 _id) public {
        require(oracles.has(msg.sender), "Not an oracle!");
        require(pendingRequests[_id], "This request is not in my pending list.");

        Response memory resp; //declares resp
        resp = new Response(msg.sender, _callerAddress, _ethPrice); //initializes resp
        requestIdToResponse[_id].push(resp); //pushes resp to the requestIdToResponse[] mapping

        uint numResponses = requestIdToResponse[_id].length; //initializes variable to number of responses to given request

        if (numResponses == THRESHOLD) {
            uint computedEthPrice = 0;
            for (uint f=0; f < requestIdToResponse[_id].length; f++) {
                computedEthPrice =  computedEthPrice.add(requestIdToResponse[_id][f].ethPrice);
            } //end for()

            computedEthPrice = computedEthPrice.div(numResponses);

            delete pendingRequests[_id];
            delete requestIdToResponse[_id];

            CallerContractInterface CallerContractInstance;
            CallerContractInstance = CallerContractInterface(_callerAddress);
            CallerContractInstance.callback(computedEthPrice, _id);
            emit SetLatestEthPriceEvent(computeEthPrice, _callerAddress);
        } //end if()

    } //end function setLatestEthPrice()
} //end contract EthPriceOracle{}
