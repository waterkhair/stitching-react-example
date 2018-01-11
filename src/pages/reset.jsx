// Modules
import {FIRST_INDEX, PARAM_NAME_INDEX, SECOND_INDEX, VALUE_INDEX} from "../common/constants";
import MainLayout from "../layout/main";
import React from "react";
import {ResetPassword} from "stitching-react";
import {connectComponent} from "../common/utils";

// Page Component
class ResetPage extends React.Component {
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
            <MainLayout>
                <span className="title">Reset your password</span>
                <ResetPassword
                    disableBorder={true}
                    onPasswordReset={this.onPasswordReset}
                    onSendResetPassword={this.onSendResetPassword}
                    themeColor={themeColor}
                    token={this.state.params.token}
                    tokenId={this.state.params.tokenId} />
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(ResetPage);
