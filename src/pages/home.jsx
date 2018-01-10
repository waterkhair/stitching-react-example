// Modules
import MainLayout from "../layout/main";
import React from "react";
import {connectComponent} from "../common/utils";

// Page Component
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageContent: "Home"};
    }

    render() {
        return (
            <MainLayout>
                <span>
                    {this.state.pageContent}
                </span>
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(HomePage);
