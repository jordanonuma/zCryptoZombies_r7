pragma solidity 0.4.25;

import "./ZB/ZBGameMode.sol";

contract ExampleGame is ZBGameMode  {

    function beforeMatchStart(bytes serializedGameState) external {
        GameState memory gameState; //GameState instance called 'gameState'
        gameState.init(serializedGameState);
    } //end function beforeMatchStart()

} //end contract ExampleGame{}