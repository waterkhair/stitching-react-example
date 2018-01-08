// Modules
import {Col, Grid, Row} from "react-bootstrap";
import {Confirm, Login, Profile, ResetPassword, stitching} from "stitching-react";
import {NavLink, Redirect} from "react-router-dom";
import {Actions} from "./redux";
import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";

// Constants
const ACTIVE_LINK_STYLE = {
    backgroundColor: "#000"
};
const COL_PROPS = {
    md: 4,
    mdOffset: 4,
    sm: 6,
    smOffset: 3,
    xs: 10,
    xsOffset: 1
};
const FIRST_INDEX = 0;
const LINK_STYLE = {
    color: "white",
    textDecoration: "none"
};
const PARAM_NAME_INDEX = 0;
const PATHS = {
    AUTHENTICATED: [
        "/",
        "/profile"
    ],
    PUBLIC: [
        "/",
        "/confirm",
        "/login",
        "/register",
        "/reset"
    ]
};
const SECOND_INDEX = 1;
const VALUE_INDEX = 1;

// Utils
const mapStateToProps = (state) => ({
    AppState: state.AppState,
    AuthState: state.AuthState
});
const matchDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);
const renderMenuLink = (to, text, onClick) => <li><NavLink activeStyle={ACTIVE_LINK_STYLE} onClick={onClick} style={LINK_STYLE} to={to}>{text}</NavLink></li>;

// Components
class BaseReactComponent extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.AuthState.isAuthenticated) {
            this.props.getCurrentUserProfile();
        }
        this.onLogout = this.onLogout.bind(this);
    }

    componentWillMount() {
        if (PATHS.AUTHENTICATED.includes(this.props.location.pathname)) {
            this.props.setCurrentLocation(this.props.location.pathname);
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.AuthState.isAuthenticated && !PATHS.AUTHENTICATED.includes(this.props.location.pathname)) {
            this.props.history.push(this.props.AppState.currentLocation);
        }
    }

    onLogout(event) {
        event.preventDefault();
        stitching.auth
            .logout()
            .then(() => {
                this.props.setCredentials({}, false);
            });
    }

    render() {
        let loadingScreen = null;
        if (this.props.AppState.loading) {
            loadingScreen =
                <div className="loading-screen">
                    <div className="loading"></div>
                </div>;
        }
        if (!this.props.AuthState.isAuthenticated && !PATHS.PUBLIC.includes(this.props.location.pathname)) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <Grid>
                { loadingScreen }
                <Row>
                    <Col {...COL_PROPS} className="menu">
                        <ul>
                            <li>
                                <NavLink activeStyle={ACTIVE_LINK_STYLE} exact style={LINK_STYLE} to="/">
                                    Home
                                </NavLink>
                            </li>
                            {this.props.AuthState.isAuthenticated ? null : renderMenuLink("/login", "Login")}
                            {this.props.AuthState.isAuthenticated ? renderMenuLink("/profile", "Profile") : null}
                            {this.props.AuthState.isAuthenticated ? renderMenuLink("/logout", "Logout", this.onLogout) : null}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col {...COL_PROPS}>
                        <hr />
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
const BaseComponent = withRouter(connect(mapStateToProps, matchDispatchToProps)(BaseReactComponent));
class ConfirmReactComponent extends React.Component {
    constructor(props) {
        super(props);
        const params = {};
        props.location.search.substring(SECOND_INDEX).split("&")
            .forEach((param) => {
                const paramArray = param.split("=");
                if (paramArray.length > FIRST_INDEX) {
                    params[paramArray[PARAM_NAME_INDEX]] = paramArray[VALUE_INDEX];
                }
            });
        this.state = {params};
    }

    render() {
        const {themeColor} = this.props.AppState;
        return (
            <BaseComponent>
                <Confirm
                    themeColor={themeColor}
                    token={this.state.params.token}
                    tokenId={this.state.params.tokenId} />
            </BaseComponent>
        );
    }
}
class HomeReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageContent: "Home"};
    }

    render() {
        return (
            <BaseComponent>
                <span>
                    {this.state.pageContent}
                </span>
            </BaseComponent>
        );
    }
}
class LoginReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.onResetPassword = this.onResetPassword.bind(this);
    }

    onLogin(credentials) {
        this.props.setCredentials(credentials, true);
    }

    onResetPassword(event) {
        event.preventDefault();
        this.props.history.push("/reset");
    }

    render() {
        const {themeColor} = this.props.AppState;
        return (
            <BaseComponent>
                <Login
                    facebookButton={true}
                    googleButton={true}
                    onLogin={this.onLogin}
                    onResetPassword={this.onResetPassword}
                    themeColor={themeColor}
                    twitterButton={true} />
            </BaseComponent>
        );
    }
}
class ProfileReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdateProfile = this.onUpdateProfile.bind(this);
    }

    onUpdateProfile(profile) {
        this.props.setCredentials(profile, true);
    }

    render() {
        const {credentials} = this.props.AuthState;
        return (
            <BaseComponent>
                <Profile
                    onUpdateProfile={this.onUpdateProfile}
                    profile={credentials}
                    themeColor={credentials.metadata.themeColor.value} />
            </BaseComponent>
        );
    }
}
class ResetReactComponent extends React.Component {
    constructor(props) {
        super(props);
        const params = {};
        props.location.search.substring(SECOND_INDEX).split("&")
            .forEach((param) => {
                const paramArray = param.split("=");
                if (paramArray.length > FIRST_INDEX) {
                    params[paramArray[PARAM_NAME_INDEX]] = paramArray[VALUE_INDEX];
                }
            });
        this.state = {
            params
        };
        this.onPasswordReset = this.onPasswordReset.bind(this);
        this.onSendResetPassword = this.onSendResetPassword.bind(this);
    }

    onPasswordReset() {
        if (this.props.resetPassword) {
            this.props.resetPassword();
        }
    }

    onSendResetPassword() {
        if (this.props.sendResetPassword) {
            this.props.sendResetPassword();
        }
    }

    render() {
        const {themeColor} = this.props.AppState;
        return (
            <BaseComponent>
                <ResetPassword
                    onPasswordReset={this.onPasswordReset}
                    onSendResetPassword={this.onSendResetPassword}
                    themeColor={themeColor}
                    token={this.state.params.token}
                    tokenId={this.state.params.tokenId} />
            </BaseComponent>
        );
    }
}

// Export Components
export const ConfirmComponent = connect(mapStateToProps, matchDispatchToProps)(ConfirmReactComponent);
export const HomeComponent = connect(mapStateToProps, matchDispatchToProps)(HomeReactComponent);
export const LoginComponent = connect(mapStateToProps, matchDispatchToProps)(LoginReactComponent);
export const ProfileComponent = connect(mapStateToProps, matchDispatchToProps)(ProfileReactComponent);
export const ResetComponent = connect(mapStateToProps, matchDispatchToProps)(ResetReactComponent);
export default {
    ConfirmComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ResetComponent
};
