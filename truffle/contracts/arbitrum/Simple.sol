// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../../node_modules/@ganache/console.log/console.sol";
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
        uint256 price,
        address indexed creator
    );

    event PostPurchased(address indexed purchaser, uint256 indexed postId);

    struct post {
        uint256 price;
        address creator;
        string contentHash;
        string previewHash;
        bool privatelyHosted;
    }

    mapping(uint256 => address[]) public ownedByArray;
    mapping(uint256 => mapping(address => bool)) public ownedBy;
    mapping(uint256 => post) public posts;
    mapping(address => uint256[]) postsOwnedArray;
    mapping(address => mapping(uint256 => bool)) public postsOwned;
    uint256 protocolFee = 0;
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
        _postIds.increment();
        uint256 postId = _postIds.current();
        posts[postId] = post({
            contentHash: contentHash,
            previewHash: previewHash,
            price: price,
            creator: msg.sender,
            privatelyHosted: false
        });

        emit PostCreated(contentHash, previewHash, price, msg.sender);
    }

    function updatePost(
        uint256 postId,
        uint256 price,
        string calldata contentHash,
        string calldata previewHash
    ) public {
        require(msg.sender == posts[postId].creator, "not ur post");
        posts[postId] = post({
            creator: msg.sender,
            price: price,
            contentHash: contentHash,
            previewHash: previewHash,
            privatelyHosted: false
        });

        emit PostUpdated(contentHash, previewHash, price, msg.sender);
    }

    function purchasePost(address purchaser, uint256 postId) public payable {
        post memory p = posts[postId];
        require(msg.value >= p.price, "pay more");
        address payable addy = payable(p.creator);
        address payable protoAddy = payable(protocolTreasury);
        uint256 fee = msg.value * protocolFee;
        uint256 royalties = msg.value - fee;

        (bool success, ) = addy.call{value: royalties}("");
        require(success, "Failed to send payment to creator");

        if (fee > 0) {
            (bool successProto, ) = protoAddy.call{value: royalties}("");
            require(successProto, "Failed to send fee to us");
        }

        ownedBy[postId][purchaser] = true;
        postsOwned[purchaser][postId] = true;

        ownedByArray[postId][ownedByArray[postId].length] = purchaser;
        postsOwnedArray[purchaser].push(postId);

        emit PostPurchased(purchaser, postId);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        protocolTreasury = newTreasury;
    }
}
