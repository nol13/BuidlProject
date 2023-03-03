let simpleStorageInstance;

const SimpleStorage = artifacts.require("Simple");

contract("Simple", accounts => {

  beforeEach(async () => {
    simpleStorageInstance = await SimpleStorage.new();
  })

  it("...should store the value 89.", async () => {
    // Set value of 89
    const tx = await simpleStorageInstance.createPost('wf', 'wrgwe', 45645, 0x6f3c67DA2827aaE123d1379939E2E7294d62C06B, { from: accounts[0]});

    // Get stored value
    const storedData = await simpleStorageInstance.posts.call(0);

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
