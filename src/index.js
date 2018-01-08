// Modules
import "./init_stitching";
import {ConfirmComponent, HomeComponent, LoginComponent, ProfileComponent, ResetComponent} from "./components";
import {ConnectedRouter, routerMiddleware} from "react-router-redux";
import {Route, Switch} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";
import {Reducers} from "./redux";
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
                <Route component={HomeComponent} exact key={0} name="Home" path="/" />
                <Route component={LoginComponent} key={1} name="Login" path="/login" />
                <Route component={ConfirmComponent} key={3} name="Catalog" path="/confirm" />
                <Route component={ProfileComponent} key={4} name="Profile" path="/profile" />
                <Route component={ResetComponent} key={5} name="Reset" path="/reset" />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#app")
);
