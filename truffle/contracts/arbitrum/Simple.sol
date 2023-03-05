// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract Simple is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    event PostCreated(
        string contentHash,
        string previewHash,
        uint256 price,
        address indexed creator
    );

    event PostUpdated(
        string contentHash,
        string previewHash,
        uint256 indexed postId
    );

    event PriceUpdated(
        uint256 indexed postId,
        uint256 price
    );

    event PostEnabled(
        uint256 indexed postId
    );

    event PostDisabled(
        uint256 indexed postId
    );

    event PostPurchased(address indexed purchaser, uint256 indexed postId);

    struct post {
        uint256 price;
        address creator;
        string contentHash;
        string previewHash;
        bool disabled;
    }

    // TODO: delete stuff that doesnt need to be stored onchain
    mapping(uint256 => address[]) public ownedByArray;
    mapping(uint256 => mapping(address => bool)) public ownedBy;
    mapping(uint256 => post) public posts;
    mapping(address => uint256[]) postsOwnedArray;
    mapping(address => mapping(uint256 => bool)) public postsOwned;
    mapping(address => uint256[]) public postsCreatedArray;
    uint8 protocolFee = 0;
    address protocolTreasury;

    constructor(address newOwner) payable {
        _transferOwnership(newOwner);
        protocolTreasury = newOwner;
    }

    function createPost(
        string calldata contentHash,
        string calldata previewHash,
        uint256 price
    ) public {
      require(price >= 0, "we no pay you");

        _postIds.increment();
        uint256 postId = _postIds.current();
        posts[postId] = post({
            contentHash: contentHash,
            previewHash: previewHash,
            price: price,
            creator: msg.sender,
            disabled: false
        });
        postsCreatedArray[msg.sender].push(postId);

        emit PostCreated(contentHash, previewHash, price, msg.sender);
    }

    function updatePrice(
        uint256 postId,
        uint256 price
    ) public {
        require(msg.sender == posts[postId].creator, "not ur post cant change price");
        posts[postId].price = price;
        emit PriceUpdated(price, postId);
    }

    function toggleNewPurchasesEnabled(
        uint256 postId,
        bool disabled
    ) public {
        require(msg.sender == posts[postId].creator, "not ur post cant disable");
        require(posts[postId].disabled != disabled, "already set like that");
        posts[postId].disabled = disabled;
        if (disabled) { emit PostDisabled(postId); }
        else { emit PostEnabled(postId); }
    }

    function addressCanSeePost(
        uint256 postId,
        address addyThatWantsToSeeIt
    ) public view returns (bool) {
        if (posts[postId].price == 0) return true;
        return ownedBy[postId][addyThatWantsToSeeIt];
    }

    // TODO: remove these when we can
    function postsOwnedByAddress(
        address addy
    ) public view returns (uint256[] memory) {
        uint256[] memory b = new uint256[](postsOwnedArray[addy].length);
        for (uint i=0; i < b.length; i++) {
            b[i] = postsOwnedArray[addy][i];
        }
        return b;
    }

    function postsByAddress(
        address addy
    ) public view returns (uint256[] memory) {
        uint256[] memory b = new uint256[](postsCreatedArray[addy].length);
        for (uint i=0; i < b.length; i++) {
            b[i] = postsCreatedArray[addy][i];
        }
        return b;
    }

    function ownersOfPost(
        uint256 postId
    ) public view returns (address[] memory) {
        address[] memory b = new address[](ownedByArray[postId].length);
        for (uint i=0; i < b.length; i++) {
            b[i] = ownedByArray[postId][i];
        }
        return b;
    }

    function purchasePost(address purchaser, uint256 postId) public payable {
        post memory p = posts[postId];
        require(msg.value >= p.price, "pay more");
        address payable addy = payable(p.creator);
        address payable protoAddy = payable(protocolTreasury);
        uint256 fee = msg.value * protocolFee / 100;
        uint256 royalties = msg.value - fee;

        (bool success, ) = addy.call{value: royalties}("");
        require(success, "Failed to send payment to creator");

        if (fee > 0) {
            (bool successProto, ) = protoAddy.call{value: fee}("");
            require(successProto, "Failed to send fee to us");
        }

        ownedBy[postId][purchaser] = true;
        postsOwned[purchaser][postId] = true;

        ownedByArray[postId].push(purchaser);
        postsOwnedArray[purchaser].push(postId);

        emit PostPurchased(purchaser, postId);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        protocolTreasury = newTreasury;
    }

    function setProtocolFee(uint8 newFee) external onlyOwner {
      require(newFee >= 0, "we no pay fee");
      require(newFee <= 18, "lets no get crazy now");
      protocolFee = newFee;
    }
}