// Modules
import StitchingReact from "stitching-react";
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

// Constants
const ACTION_TYPES = {
    APP: {
        SET_CURRENT_LOCATION: "SET_CURRENT_LOCATION",
        SET_LOADING: "SET_LOADING"
    },
    AUTH: {
        SET_CREDENTIALS: "SET_CREDENTIALS"
    },
    RECORD: {
        CLEAR_RECORD_STATE: "CLEAR_RECORD_STATE",
        GET_RECORD: "GET_RECORD",
        GET_RECORDS: "GET_RECORDS",
        START_LOADING: "START_LOADING"
    }
};

// Actions
export const Actions = {
    getCurrentUserProfile: () => (dispatch) => {
        dispatch({
            loading: true,
            type: ACTION_TYPES.APP.SET_LOADING
        });

        StitchingReact.stitching.auth
            .getCredentials()
            .then((credentials) => {
                if (credentials) {
                    dispatch({
                        credentials,
                        isAuthenticated: true,
                        type: ACTION_TYPES.AUTH.SET_CREDENTIALS
                    });
                }

                dispatch({
                    loading: false,
                    type: ACTION_TYPES.APP.SET_LOADING
                });
            })
            .catch((err) => {
                console.error(err.message);
            });
    },
    setCredentials: (credentials, isAuthenticated) => ({
        credentials,
        isAuthenticated,
        type: ACTION_TYPES.AUTH.SET_CREDENTIALS
    }),
    setCurrentLocation: (currentLocation) => ({
        currentLocation,
        type: ACTION_TYPES.APP.SET_CURRENT_LOCATION
    }),
    setLoading: (loading) => ({
        loading,
        type: ACTION_TYPES.APP.SET_LOADING
    })
};

// Reducers
const initialAppState = {
    currentLocation: "/",
    loading: true
};
const initialAuthState = {
    credentials: {
        email: "",
        metadata: {
            dob: {
                type: "date",
                value: ""
            },
            name: {
                type: "text",
                value: ""
            },
            picture: {
                hidden: true,
                type: "image",
                value: ""
            },
            themeColor: {
                type: "theme",
                value: "black"
            }
        }
    },
    isAuthenticated: false
};
export const Reducers = combineReducers({
    AppState: (state = Object.assign({}, initialAppState), action) => {
        switch (action.type) {
        case ACTION_TYPES.APP.SET_CURRENT_LOCATION: {
            return {
                ...state,
                currentLocation: action.currentLocation
            };
        }
        case ACTION_TYPES.APP.SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        default:
            return state;
        }
    },
    AuthState: (state = Object.assign({}, initialAuthState), action) => {
        switch (action.type) {
        case ACTION_TYPES.AUTH.SET_CREDENTIALS: {
            return {
                ...state,
                credentials: {
                    email: action.credentials.email ? action.credentials.email : "",
                    metadata: action.credentials.metadata
                        ? {
                            dob: {
                                ...state.credentials.metadata.dob,
                                value: action.credentials.metadata.dob && action.credentials.metadata.dob.value ? action.credentials.metadata.dob.value : ""
                            },
                            name: {
                                ...state.credentials.metadata.name,
                                value: action.credentials.metadata.name && action.credentials.metadata.name.value ? action.credentials.metadata.name.value : ""
                            },
                            picture: {
                                ...state.credentials.metadata.picture,
                                value: action.credentials.metadata.picture && action.credentials.metadata.picture.value ? action.credentials.metadata.picture.value : ""
                            },
                            themeColor: {
                                ...state.credentials.metadata.themeColor,
                                value: action.credentials.metadata.themeColor && action.credentials.metadata.themeColor.value ? action.credentials.metadata.themeColor.value : ""
                            }
                        }
                        : {
                            ...initialAuthState.credentials.metadata
                        }
                },
                isAuthenticated: action.isAuthenticated ? action.isAuthenticated : false
            };
        }
        default:
            return state;
        }
    },
    routing: routerReducer
});
