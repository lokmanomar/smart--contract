// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var SafeMathLib = artifacts.require("./SafeMathLib.sol");
var ERC20Lib = artifacts.require("./ERC20Lib.sol");
var MintableTokenLib = artifacts.require("./MintableTokenLib.sol");
var SmartTokenLib = artifacts.require("./SmartTokenLib.sol");
// var EternalTokenStorage = artifacts.require("zeppelin-solidity/contracts/token/EternalTokenStorage.sol");
// var SmartController = artifacts.require("./SmartController.sol");
var BlacklistValidator = artifacts.require("./BlacklistValidator.sol");
var USD = artifacts.require("./USD.sol");
var EUR = artifacts.require("./EUR.sol");

var TokenStorageLib = artifacts.require("./TokenStorageLib.sol");
var TokenStorage = artifacts.require("./TokenStorage.sol");
var StandardController = artifacts.require("./StandardController");


// TODO: Registry?

module.exports = function(deployer) {

  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, TokenStorageLib, ERC20Lib);
  deployer.deploy([TokenStorageLib, ERC20Lib]);
  deployer.link(TokenStorageLib, TokenStorage);
  deployer.link(ERC20Lib, StandardController);

  deployer.deploy(TokenStorage).then(() => {
    return deployer.deploy(StandardController, 0x0, TokenStorage.address, 10000);
  });

  /*
  // MetaCoin
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);

  // SafeMathLib, ERC2Lib & SmartTokenLib, BlacklistValidator
  deployer.deploy(SafeMathLib);
  deployer.link(SafeMathLib, [ERC20Lib, MintableTokenLib]);
  // deployer.deploy([ERC20Lib, MintableTokenLib, SmartTokenLib, BlacklistValidator, EternalTokenStorage]);

  // SmartToken
  deployer.link(ERC20Lib, SmartController);
  deployer.link(MintableTokenLib, SmartController);
  deployer.link(SmartTokenLib, SmartController);

  // USD
  deployer.deploy(USD).then(() => {
    deployer.deploy(SmartController, USD.address, BlacklistValidator.address, "USD").then(() => {
      USD.at(USD.address).setController(SmartController.address);
    });
  });
//  // EUR
  deployer.deploy(EUR).then(() => {
    deployer.deploy(SmartController, EUR.address, BlacklistValidator.address, "EUR").then(() => {
      EUR.at(EUR.address).setController(SmartController.address);
    });
  });
  */
};
