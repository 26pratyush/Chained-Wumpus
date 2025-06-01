/* Tells truffle how to move the contract on the blockchain */

const MemoryToken = artifacts.require("MemoryToken"); // import the artifact

module.exports = function(deployer) {
  deployer.deploy(MemoryToken);
};
