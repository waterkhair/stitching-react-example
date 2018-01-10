// Modules
import {ACTION_TYPES} from "../common/enums";
import StitchingReact from "stitching-react";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

// Constants
const {StitchingReactState} = StitchingReact.Reducers;
const initialAppState = {
    currentLocation: "/",
    themeColor: StitchingReact.ThemeColors.BLACK
};

// Reducers
export default combineReducers({
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
