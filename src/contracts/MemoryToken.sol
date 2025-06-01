pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract MemoryToken is ERC721Full {
  string public name = "Memory Token"; // state variable

  constructor() ERC721Full(name, "MEMORY") public {

  }

  function mint(address _to, string memory _tokenURI) public returns(bool) {
    /* here functions from ERC721Full.sol are overriden */
    uint _tokenId = totalSupply().add(1);
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    return true;
  }
}
