// Modules
import Actions from "../redux/actions";
import {NavLink} from "react-router-dom";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";

// Utils
const mapStateToProps = (state) => ({
    AppState: state.AppState,
    StitchingReactState: state.StitchingReactState
});
const matchDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

// Export utils
export const connectComponent = (component) => connect(mapStateToProps, matchDispatchToProps)(component);
export const connectComponentWithRouter = (component) => withRouter(connect(mapStateToProps, matchDispatchToProps)(component));
export const renderMenuLink = (to, text) => <li><NavLink activeClassName="active-link" className="link" to={to}>{text}</NavLink></li>;
export default {
    connectComponent,
    connectComponentWithRouter,
    renderMenuLink
};
