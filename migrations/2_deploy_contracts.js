var Customers = artifacts.require("Customers");

module.exports = function (deployer) {
    deployer.deploy(Customers);
};