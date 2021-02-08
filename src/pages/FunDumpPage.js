import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';

class FunDumpPage extends React.Component {
  state = {
    funDumps: [],
    loading: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

 async getFunDumps(){
    //var query = this.props.location.search.replace("?","&");
    //var pos = query.indexOf("&dumptype=");
    //var dumptype =  ReactHtmlParser(decodeURIComponent(query.substring(pos+10)));

    //alert(this.props.query);

    var u = 'https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17' + this.props.query;
    //alert(u);
    const response = await fetch(u);
    const data = await response.json();

    console.log(data);
    this.setState({ funDumps: data.poolpeek.funDumps, loading: false});
  }

  async componentDidMount() {
    this.getFunDumps();
    window.scrollTo(0, 0);    
  };

  render() {
      
    if (this.state.loading) {
      return <div>loading...</div>
    }


    return (

    
      <Page
        className="FunDumpPage"
        title={this.props.title}
      >


        {this.state.funDumps.map(function (item, key) { 

          return <div>

          <a target="_blank" href={item.homepage}>{ReactHtmlParser(item.dump_text)}</a>
          

                      <a href={"https://pool.pm/" + item.pool_id} target="_blank" rel="noreferrer">  
                                <img
                                                                    src={PoolPmImage}
                                                                    className="pr-2"
                                                                    alt=""
                                                                /></a>
                      
                      





          </div>



        })}

    

      </Page>
    );
  }
}
export default FunDumpPage;
