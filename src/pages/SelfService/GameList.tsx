/// <reference path="../../references.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import {Link} from "react-router";
import { bindActionCreators } from "redux";

import {
    Button,
    Cells,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    SearchBar,
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta
} from "react-weui";

import { queryGames, filterGames, cancelFilterGames } from "../../redux/modules/Apply/GameList";



class GameListContent extends React.Component<any, any>{

    render() {
        const groupsNode = this.props.groups.map(
            group => (<div key={group.name}>
                <CellsTitle>{group.name}</CellsTitle>
                <Cells access>
                    { group.games.map((item) => {
                        const link = `#Category/${item.id}`;
                        return (
                            <Cell className="list_item" key={item.id} href={link}>
                                <CellBody>
                                    {item.name}
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        );
                    }) }
                </Cells>
            </div>)
        );
        return (<div access style={{display:!this.props.filting ? null : "none"}}>{groupsNode}</div>);
    }
}

class AlaphList extends React.Component<any, any> {
    render() {
        const groupsNode = this.props.groups.map(
            group =>
                (<a key={group.name}>{group.name}</a>)
           
        );
        return (<div className="AlaphList">{groupsNode}</div>);
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
    handlerClear() {
        console.log("clear");
    }
    handlerCancel() {
        console.log("Cancel");
        this.props.cancelFilterGames();
    }
    render() {
        const reg = new RegExp(`^${this.props.filter}`);
        const filter = this.props.filter;
        return (
            <div>
                <SearchBar onChange={this.handlerChange.bind(this) } onClear={this.handlerClear.bind(this) } onCancel={this.handlerCancel.bind(this) }  />
                <div>{this.props.filting}</div>
                {/*display result*/}
                <Panel access style={{
                    display:
                    this.props.filting ? null : "none", marginTop: 0
                }}>
                    <PanelHeader>
                        过滤结果：
                    </PanelHeader>
                    <PanelBody>
                        {  
                          
                            this.props.data.groups.length > 0 ?
                                this.props.data.groups.map((item, i) => {
                                    const games = item.games.filter(game => {
                                        if (filter==="" || reg.test(game.name) || reg.test(game.flpy) || filter == game.id) {
                                            return true;
                                        }
                                        return false;
                                    });
                                    return games.map((game, j) => {
                                        const link = `#Category/${game.id}`;
                                        return (
                                            <MediaBox key={j} href={link}>
                                                <MediaBoxBody>
                                                    { game.name }
                                                </MediaBoxBody>
                                            </MediaBox>

                                        );
                                    });
                                })
                                : <MediaBox>适当减少下查询条件呢，没内容了！</MediaBox>
                        }
                    </PanelBody>
                </Panel>
            </div>
            );
    }
}
class GameList extends React.Component<any, any>{
    componentWillMount() {
        this.props.queryGames();
    }
    render(){

        return (
            <section>
                <SearchPanel {... this.props} />
                <GameListContent groups={this.props.data.groups} filting = {this.props.filting} />
            </section>
        );
    }

}


const mapStateToProps = state => {
    return {
        data: state.games.data,
        isloading: state.games.isloading,
        filting: state.games.filting,
        filter: state.games.filter
    }
};



export default connect(mapStateToProps, {
    queryGames, filterGames, cancelFilterGames
})(GameList);
