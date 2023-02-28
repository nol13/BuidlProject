// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../../node_modules/@ganache/console.log/console.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../../node_modules/base64-sol/base64.sol";

contract Simple is Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _postIds;

  event PostCreated(string contentHash, string previewHash, uint256 price, address indexed creator);
  event PostPurchased(address indexed purchaser, uint256 indexed postId);

  struct post {
        uint256 price;
        address creator;
        string contentHash;
        string previewHash;
        uint256 postId;
        bool privatelyHosted;
    }

    mapping (uint256 => mapping(address => bool)) public ownedBy;
    mapping(uint256 => post) public posts;
    mapping (address => mapping(uint256 => bool)) public postsOwned;

  constructor(
        address newOwner
    )
        payable
    {
        _transferOwnership(newOwner);
    }

      function createPost (string calldata contentHash, string calldata previewHash, uint256 price, address creator) public {
        _postIds.increment();
        uint256 postId = _postIds.current();
        posts[postId] = post({ 
          contentHash: contentHash,
          previewHash: previewHash,
          price: price,
          creator: creator,
          postId: postId,
          privatelyHosted: false
        });
    }

    function purchasePost (address purchaser, uint256 postId) public {
      // TODO: verify payment
      ownedBy[postId][purchaser] = true;
      postsOwned[purchaser][postId] = true;
    }
}
