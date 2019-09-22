const { BN, constants, time, shouldFail } = require('openzeppelin-test-helpers');

const dai = artifacts.require('dai');

const BigNumber = web3.BigNumber;

require('chai').use(require('chai-bignumber')(BigNumber)).should();

contract('dai', accounts => {
    const owner = accounts[0];
    const Alice = accounts[1];
    const Bob = accounts[2];
    const _name = 'dai stable coin';
    const _symbol = 'dai';
    const _decimals = 0;

    const metadata = "metadata";

    before(async function () {
        this.token = await dai.new(_name, _symbol, _decimals);
    });

    describe('token attributes', function() {
        it('has the correct name', async function() {
            const name = await this.token.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', async function() {
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });

        it("should mint 1000 dai coins", async function() {
           await this.token.mint(owner, 1000);
           var supply = (await this.token.totalSupply()).toNumber();
           supply.should.equal(1000);
        });

        it("should transfer to \"players\"", async function() {
            await this.token.transfer(Alice, 100);
            await this.token.transfer(Bob, 100);
            var balanceAlice = (await this.token.balanceOf(Alice)).toNumber();
            var balanceBob = (await this.token.balanceOf(Bob)).toNumber();
            balanceAlice.should.equal(100);
            balanceBob.should.equal(100);
         });

         it("should burn 100 dai coins", async function() {
            this.token.burn(100);
            var supply = (await this.token.totalSupply()).toNumber();
            supply.should.equal(900);
         });
         
    })
})