import app from './app';

function loadVote(voteId) {
  return app
      .call('votes', voteId)
      .map(vote => ({ ...vote, yes: parseInt(vote.yes, 10), no: parseInt(vote.no, 10), id }));
}

export default loadVote;
