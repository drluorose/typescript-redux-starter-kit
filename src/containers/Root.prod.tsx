import * as React from "react"
import { Router } from "react-router";

export default class Root extends React.Component<any,any> {
    render() {
     
        return (
            <Router history={this.props.history} routes={this.props.routes} />
        );
    }
}

