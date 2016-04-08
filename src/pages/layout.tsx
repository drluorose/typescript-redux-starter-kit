import * as  React from "react";
import {Link} from "react-router";
export default class Layout extends React.Component<any,any>{
    
    render(){
        return (<div>{this.props.children}</div>);
    }
}
