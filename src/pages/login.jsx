// Modules
import {Login} from "stitching-react";
import MainLayout from "../layout/main";
import React from "react";
import {connectComponent} from "../common/utils";

// Page Component
class LoginPage extends React.Component {
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
            <MainLayout>
                <Login
                    border={true}
                    facebookButton={true}
                    googleButton={true}
                    padding={true}
                    onLogin={this.onLogin}
                    onResetPassword={this.onResetPassword}
                    themeColor={themeColor}
                    twitterButton={true} />
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(LoginPage);
