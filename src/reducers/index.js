import { combineReducers } from 'redux';
import auth from './auth';
import search from './search';
import profile from './profile';

// combine all these reducers and export it by default
export default combineReducers({
    auth,
    profile,
    search,
});