// Modules
import {Col, Grid, Row} from "react-bootstrap";
import {Loading, stitching} from "stitching-react";
import {NavLink, Redirect} from "react-router-dom";
import {connectComponentWithRouter, renderMenuLink} from "../common/utils";
import React from "react";

// Constants
const COL_PROPS = {
    md: 8,
    mdOffset: 2,
    sm: 6,
    smOffset: 3,
    xs: 10,
    xsOffset: 1
};
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

// Component
class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.StitchingReactState.isAuthenticated) {
            this.props.getCurrentUserProfile(stitching);
        }
    }

    componentWillMount() {
        if (PATHS.AUTHENTICATED.includes(this.props.location.pathname)) {
            this.props.setCurrentLocation(this.props.location.pathname);
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.StitchingReactState.isAuthenticated && !PATHS.AUTHENTICATED.includes(this.props.location.pathname)) {
            this.props.history.push(this.props.AppState.currentLocation);
        }
    }

    render() {
        if (!this.props.StitchingReactState.isAuthenticated && !PATHS.PUBLIC.includes(this.props.location.pathname)) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <Grid>
                <Loading loading={this.props.StitchingReactState.loading} />
                <Row>
                    <Col {...COL_PROPS} className="menu">
                        <ul>
                            <li>
                                <NavLink activeClassName="active-link" className="link" exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            {this.props.StitchingReactState.isAuthenticated ? null : renderMenuLink("/login", "Login")}
                            {this.props.StitchingReactState.isAuthenticated ? renderMenuLink("/profile", "Profile") : null}
                            {this.props.StitchingReactState.isAuthenticated ? renderMenuLink("/logout", "Logout") : null}
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

// Export Component
export default connectComponentWithRouter(MainLayout);
