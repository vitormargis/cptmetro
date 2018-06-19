import { combineReducers } from 'redux';
import About from 'reducers/About';
import Lines from 'reducers/Lines';

const rootReducer = combineReducers({
  about: About,
  lines: Lines
});

export default rootReducer;
