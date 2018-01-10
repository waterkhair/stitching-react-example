// Modules
import "./init_stitching";
import {ConnectedRouter, routerMiddleware} from "react-router-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import ConfirmPage from "./pages/confirm";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import ProfilePage from "./pages/profile";
import {Provider} from "react-redux";
import React from "react";
import Reducers from "./redux/reducers";
import ResetPage from "./pages/reset";
import createHistory from "history/createBrowserHistory";
import reduxThunk from "redux-thunk";
import {render} from "react-dom";
const enhancers = process.env.NODE_ENV === "development" && typeof window.devToolsExtension === "function" ? [window.devToolsExtension()] : [];
const history = createHistory();
const store = createStore(Reducers, {}, compose(
    applyMiddleware(...[
        reduxThunk,
        routerMiddleware(history)
    ]),
    ...enhancers
));

// Render example app
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route component={HomePage} exact key={0} name="Home" path="/" />
                <Route component={ConfirmPage} key={1} name="Catalog" path="/confirm" />
                <Route component={LoginPage} key={2} name="Login" path="/login" />
                <Route component={LogoutPage} key={3} name="Logout" path="/logout" />
                <Route component={ProfilePage} key={4} name="Profile" path="/profile" />
                <Route component={ResetPage} key={5} name="Reset" path="/reset" />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#app")
);
