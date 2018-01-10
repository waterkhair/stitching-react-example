// Modules
import {FIRST_INDEX, PARAM_NAME_INDEX, SECOND_INDEX, VALUE_INDEX} from "../common/constants";
import {Confirm} from "stitching-react";
import MainLayout from "../layout/main";
import React from "react";
import {connectComponent} from "../common/utils";

// Page Component
class ConfirmPage extends React.Component {
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
            <MainLayout>
                <Confirm
                    themeColor={themeColor}
                    token={this.state.params.token}
                    tokenId={this.state.params.tokenId} />
            </MainLayout>
        );
    }
}

// Export Page Component
export default connectComponent(ConfirmPage);
