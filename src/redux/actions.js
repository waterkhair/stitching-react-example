// Modules
import {ACTION_TYPES} from "../common/enums";
import StitchingReact from "stitching-react";

// Actions
export default {
    getCurrentUserProfile: StitchingReact.Actions.getCurrentUserProfile,
    setCredentials: StitchingReact.Actions.setCredentials,
    setCurrentLocation: (currentLocation) => ({
        currentLocation,
        type: ACTION_TYPES.SET_CURRENT_LOCATION
    }),
    setLoading: StitchingReact.Actions.setLoading
};
