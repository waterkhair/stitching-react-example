// Modules
import StitchingReact from "stitching-react";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

// Constants
const {getCurrentUserProfile, setCredentials, setLoading} = StitchingReact.Actions;
const ACTION_TYPES = {
    SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION"
};
const {StitchingReactState} = StitchingReact.Reducers;

// Actions
export const Actions = {
    getCurrentUserProfile,
    setCredentials,
    setCurrentLocation: (currentLocation) => ({
        currentLocation,
        type: ACTION_TYPES.SET_CURRENT_LOCATION
    }),
    setLoading
};

// Reducers
const initialAppState = {
    currentLocation: "/",
    themeColor: StitchingReact.ThemeColors.BLACK
};
export const Reducers = combineReducers({
    AppState: (state = Object.assign({}, initialAppState), action) => {
        switch (action.type) {
        case ACTION_TYPES.SET_CURRENT_LOCATION: {
            return {
                ...state,
                currentLocation: action.currentLocation
            };
        }
        default:
            return state;
        }
    },
    StitchingReactState,
    routing: routerReducer
});
