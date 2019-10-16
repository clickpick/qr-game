import { combineReducers } from 'redux';
import userReducer from 'reducers/user-reducer';
import projectReducer from 'reducers/project-reducer';

const rootReducer = combineReducers({
    userReducer,
    projectReducer
});

export default rootReducer;