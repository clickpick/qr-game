import * as types from 'constants/types';

const setPlatform = (platform) => ({
    type: types.SET_PLATFORM,
    platform
});

export { setPlatform };