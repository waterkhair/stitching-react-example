// Modules
import MainLayout from "../layout/main";
import {Profile} from "stitching-react";
import React from "react";
import {connectComponent} from "../common/utils";

// Page Component
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdateProfile = this.onUpdateProfile.bind(this);
    }

    onUpdateProfile(profile) {
        this.props.setCredentials(profile, true);
    }

    render() {
        const {credentials} = this.props.StitchingReactState;
        return (
            <MainLayout>
                <Profile
                    onUpdateProfile={this.onUpdateProfile}
                    profile={credentials}
                    themeColor={credentials.metadata.themeColor.value} />
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(ProfilePage);
