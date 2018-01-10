// Modules
import {Logout} from "stitching-react";
import MainLayout from "../layout/main";
import React from "react";
import {connectComponent} from "../common/utils";

// Page Component
class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.setCredentials({}, false);
    }

    render() {
        const {themeColor} = this.props.AppState;
        return (
            <MainLayout>
                <Logout
                    onLogout={this.onLogout}
                    themeColor={themeColor} />
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(LogoutPage);
