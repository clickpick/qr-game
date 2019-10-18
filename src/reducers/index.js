import { combineReducers } from 'redux';
import userReducer from 'reducers/user-reducer';
import projectReducer from 'reducers/project-reducer';
import shareStoryReducer from 'reducers/share-story-reducer';
import donateFormReducer from 'reducers/donate-form-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    shareStory: shareStoryReducer,
    donateForm: donateFormReducer
});

export default rootReducer;