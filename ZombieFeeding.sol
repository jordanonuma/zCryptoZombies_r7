pragma solidity >=0.5.0 <0.6.0;
import "./ZombieFactory.sol";

contract ZombieFeeding is ZombieFactory {

    function feedAndMulitply(uint _zombieId, uint _targetDna) public {
        require(msg.sender == zombieToOwner[_zombieId]);
    } //end function feedAndMultiply()
} //end contract ZombieFeeding{}