const { expect } = require('chai')



describe('Interact test', function () {
  let token;
  let presaleToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const APPROVE_AMOUNT = '20000';

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory('Token');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    token = await Token.deploy();
    await token.deployed();

    const PresaleToken = await ethers.getContractFactory('PresaleToken');
    presaleToken = await PresaleToken.deploy(token.address);
    await presaleToken.deployed();

    await token.connect(owner).approve(presaleToken.address, APPROVE_AMOUNT);
  })

  describe("Deployment", async function() {
    it(`Should assign ${APPROVE_AMOUNT} tokens to the PresaleToken`, async function() {
        const amount = await token.allowance(owner.address, presaleToken.address);
        expect(amount).to.equal(APPROVE_AMOUNT);
    });
  });

  describe("TicketSale", async function() {

  });

  describe("TimeLogic", async function() {
    
  });
})
