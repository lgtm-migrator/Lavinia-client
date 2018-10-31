﻿import * as React from "react";
import { NavMenu } from "./NavigationMenu";
import { PresentationContainer } from "./Presentation";
import { PresentationMenu } from "./PresentationSettings";
import { SettingsMenuContainer } from "./ComputationMenu";

export interface LayoutProps {
    initializeState: () => any;
}

export class LayoutComponent extends React.Component<LayoutProps, {}> {
    async componentWillMount() {
        await this.props.initializeState();
    }

    public render() {
        return (
            <div className="container-fluid">
                <NavMenu />
                <div className="row">
                    <div className="col-md-3">
                        <SettingsMenuContainer />
                    </div>
                    <div className="col-md-6">
                        <PresentationContainer />
                    </div>
                    <div className="col-md-3">
                        <PresentationMenu />
                    </div>
                </div>
            </div>
        );
    }
}
