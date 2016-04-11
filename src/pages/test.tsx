/// <reference path="../references.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import {Link} from "react-router";
import { bindActionCreators } from "redux";


import { queryList, filterList, cancelFilterList } from "../redux/modules/test";



class GameListContent extends React.Component<any, any>{

    render() {
        const groupsNode = this.props.data.map(
            (item,i) => (<div key={i}>
                <div>{item.name}</div>
            </div>)
        );
        return (<div access style={{display:!this.props.filting ? null : "none"}}>{groupsNode}</div>);
    }
}


class SearchPanel extends React.Component<any, any> {
    fiterTimer: any;

    handlerChange(text) {
        if (this.fiterTimer) {
            window.clearTimeout(this.fiterTimer);
        }
        this.fiterTimer = window.setTimeout(() => {
            if (text) {
                this.props.filterGames(text);
            }
            else {
                this.props.cancelFilterGames();
            }
        },500);
       
    }   
    render() {
        const reg = new RegExp(`^${this.props.filter}`);
        const filter = this.props.filter;
        return (
            <div>
               <input type="search" onChange={this.handlerChange}/> 
              
                {/*display result*/}
                <ul style={{ display:this.props.filting ? null:"none" }}>
                    {
                      this.props.data.map( (item,i) => {
                          if(reg.test(item.name)){
                               return (
                                    <li key={i}>item.name</li>
                                );  
                          }
                          return null;
                       
                      })
                    }
                </ul>
            </div>
         );
    }
}
class MyList extends React.Component<any, any>{
    componentWillMount() {
        this.props.queryList();
    }
    render(){

        return (
            <section>
                <SearchPanel {... this.props} />
                <GameListContent groups={this.props.data} filting = {this.props.filting} />
            </section>
        );
    }

}


const mapStateToProps = state => {
    return {
        data: state.user.data,
        isloading: state.user.isloading,
        filting: state.user.filting,
        filter: state.user.filter
    }
};



export default connect(mapStateToProps, {
    queryList, filterList, cancelFilterList
})(MyList);
