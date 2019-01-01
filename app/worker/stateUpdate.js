import loadVote from './loadVote';
import promisefy from './promisefy';

let loadVotePromise = promisefy(loadVote);
let initialState = { votes: [] }

async function stateUpdate(state, data) {
  if(state == null) state = initialState;
  const { votes } = state;
  const { returnValues, event } = data;

  if(event === 'VoteCreated' || event === 'VoteCast') {
    const { id } = returnValues;
    const vote = await loadVotePromise(id);
    const idx = votes.findIndex(v => v.id === vote.id);
    if(idx > -1) {
      votes[idx] = vote;
    }
    else {
      votes.push(vote);
    }
    return { votes }
  }

  return state;
}

export default stateUpdate;
