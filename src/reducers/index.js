import { combineReducers } from 'redux';
import userReducer from 'reducers/user-reducer';
import projectReducer from 'reducers/project-reducer';
import shareStoryReducer from 'reducers/share-story-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    shareStory: shareStoryReducer
});

export default rootReducer;