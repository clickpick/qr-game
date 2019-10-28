import { combineReducers } from 'redux';
import userReducer from 'reducers/user-reducer';
import projectReducer from 'reducers/project-reducer';
import shareStoryReducer from 'reducers/share-story-reducer';
import donateFormReducer from 'reducers/donate-form-reducer';
import notificationReducer from 'reducers/notification-reducer';
import requestFundingReducer from 'reducers/request-funding-reducer';
import cheatReducer from 'reducers/cheat-reducer';
import platformReducer from 'reducers/platform-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    shareStory: shareStoryReducer,
    donateForm: donateFormReducer,
    notification: notificationReducer,
    requestFunding: requestFundingReducer,
    cheat: cheatReducer,
    platform: platformReducer,
});

export default rootReducer;