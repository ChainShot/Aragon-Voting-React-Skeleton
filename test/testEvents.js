const Voting = artifacts.require('Voting');
const {getAttributes} = require('./util');

function getVoteId(event) {
    const keys = Object.keys(event.args);
    assert.equal(keys.length, 1, `Expecting the ${event.event} event to only have 1 key (the vote id). Found ${keys.length} keys.`)
    return event.args[keys[0]];
}

contract('Voting', (accounts) => {
    let contract;
    let creator = accounts[0];
    before(async () => {
        contract = await Voting.new({ from: creator });
    });

    describe('creating a new vote', () => {
        let newVoteTransaction;
        let voteCreatedEvent;
        let originalQuestion = "Did we emit an event?";
        before(async () => {
            newVoteTransaction = await contract.newVote(originalQuestion);
        });

        it('should emit a VoteCreated event with a valid voteId', async () => {
            let event = findEvent(newVoteTransaction, 'VoteCreated');
            assert(event, 'did not emit an event called VoteCreated');
            const voteId = getVoteId(event);
            assert(voteId, 'Should emit a voteId');
            try {
                await contract.votes.call(voteId);
            }
            catch(ex) {
                assert.fail(null, ex, `Could not find a vote with id "${voteId}"`);
            }
        });

        describe('casting a vote', () => {
            let voteCastTransaction;
            before(async () => {
                voteCastTransaction = await contract.castVote(0, false, { from: accounts[1] });
            });

            it('should emit a VoteCast event with a valid voteId', async () => {
                const event = findEvent(voteCastTransaction, 'VoteCast');
                assert(event, 'did not emit an event called VoteCast');
                const voteId = getVoteId(event);
                assert(voteId, 'Should emit a voteId');
                try {
                    await contract.votes.call(voteId);
                }
                catch(ex) {
                    assert.fail(null, ex, `Could not find a vote with id "${voteId}"`);
                }
            });
        });

        describe('casting a vote on an older vote', () => {
            let voteCastTransaction;
            before(async () => {
                await contract.newVote("Will this new question affect the vote?");
                voteCastTransaction = await contract.castVote(0, false, { from: accounts[1] });
            });

            it('should emit a VoteCast event with the original voteId', async () => {
                const event = findEvent(voteCastTransaction, 'VoteCast');
                assert(event, 'did not emit an event called VoteCast');
                const voteId = getVoteId(event);
                assert(voteId, 'Should emit a voteId');
                let vote;
                try {
                    vote = await getAttributes(contract, 'votes', voteId);
                }
                catch(ex) {
                    assert.fail(null, ex, `Could not find a vote with id "${voteId}"`);
                }
                assert.equal(vote.question, originalQuestion, "This should have returned the original vote");
            });
        })
    });
});

function findEvent(transaction, evt) {
    return transaction.logs.filter(({ event }) => event === evt)[0];
}
