import { SELECT_LINE, FETCH_LINES } from 'actions/Lines';

const DEFAULT_STATE = {
  metro: [],
  cptm: [],
  selected: {}
};

export default function Lines(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SELECT_LINE:
      return Object.assign(state, { selected: action.payload });
    case FETCH_LINES:
      return Object.assign(state, { metro: action.payload.metro, cptm: action.payload.cptm });
    default:
      return state;
  }
}
