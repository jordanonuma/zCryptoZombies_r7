pragma solidity 0.4.25;

import "./ZB/ZBGameMode.sol";

contract ExampleGame is ZBGameMode  {

    function beforeMatchStart(bytes serializedGameState) external {
        GameState memmory gameState; //GameState instance called 'gameState'
    } //end function beforeMatchStart()

} //end contract ExampleGame{}