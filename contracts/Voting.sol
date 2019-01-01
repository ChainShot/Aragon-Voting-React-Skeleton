pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract Voting is AragonApp {
    bytes32 constant public CREATE_VOTES_ROLE = keccak256("CREATE_VOTES_ROLE");
    bytes32 constant public CAST_VOTES_ROLE = keccak256("CAST_VOTES_ROLE");

    event VoteCast(uint256 id);
    event VoteCreated(uint256 id);

    struct Vote {
        address creator;
        string question;
        uint256 yes;
        uint256 no;
        mapping(address => uint) voters;
    }

    Vote[] public votes;

    function getCount(uint256 _voteId) public view returns (uint256 yes, uint256 no) {
        Vote storage vote = votes[_voteId];
        yes = vote.yes;
        no = vote.no;
    }

    function castVote(uint256 _voteId, bool _supports) auth(CAST_VOTES_ROLE) external {
        Vote storage vote = votes[_voteId];

        uint previousVote = vote.voters[msg.sender];
        if (previousVote == 2) {
            vote.yes = vote.yes - 1;
        }
        if (previousVote == 1) {
            vote.no = vote.no - 1;
        }

        if (_supports)
            vote.yes = vote.yes + 1;
        else
            vote.no = vote.no + 1;

        vote.voters[msg.sender] = _supports ? 2 : 1;

        VoteCast(_voteId);
    }

    function newVote(string _question) auth(CREATE_VOTES_ROLE) external {
        uint length = votes.push(Vote(msg.sender, _question, 0, 0));
        VoteCreated(length - 1);
    }
}
