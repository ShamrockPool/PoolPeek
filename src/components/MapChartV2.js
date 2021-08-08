import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps'
import 'reactjs-popup/dist/index.css';


const width = window.innerWidth;

class MapChartV2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isShown: 0,
      latSelected: 0,
      longSelected: 0,
      locationSelected: '',
      markersFiltered: [],
      totalMarkers: 0,
      mapWidth: 0

    }
  }

  openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  setMapWidth() {
    if (width > 600) {
      this.state.mapWidth = 1500;
    } else {
      this.state.mapWidth = 800;
    }
  }

  componentDidMount() {
    this.setMapWidth();

  }

  render() {
    return (
      <div>
        <h3><b>Pool search map of all pool owner locations.</b></h3>
        <h3>Click a marker below to display all pools at that location.</h3>
        {/* <h3>Total pools with locations: {this.props.poolsData.poolpeek.geo.length + 1}</h3> */}
        {this.props.poolsData != null && <h3>Total unique pool locations: {this.props.poolsData.length}</h3>}
        <div style={{ width: "99%", height: "95%", margin: "5px", alignItems: "center" }}>
          <Map defaultCenter={[50.879, 4.6997]} defaultZoom={3} width={this.state.mapWidth} height={800}>

            {this.props.poolsData.map(({ extended_meta }) => (

              <Marker anchor={[Number(extended_meta.location_lat), Number(extended_meta.location_lon)]}
                color='red'
                payload={extended_meta.location}
                onClick={({ event, anchor, payload }) => {

                  this.state.latSelected = anchor[1];
                  this.state.longSelected = anchor[0];
                  this.setState({ latSelected: anchor[1], longSelected: anchor[0] });

                  this.state.locationSelected = payload;
                  this.setState({ locationSelected: payload, isShown: true });
                  this.state.isShown = true;

                  var host = window.location.protocol + "//" + window.location.host;
                  this.openInNewTab(host + '/#/poolsearch/' + payload);
                }}
              >

              </Marker>
            ))}
            {/* <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
      <img src='pigeon.jpg' width={240} height={158} alt='' />
    </Overlay> */}
          </Map>

          {/* {this.state.isShown && (<Popout {...this.props} title='Pools in this location' closeWindow={() => this.setState({ isShown: false })}>
            <FetchPoolList {...this.props} query={"&location=" + this.state.locationSelected} multiPoolOperators={true} pageDescription={"Location search:" + this.state.locationSelected}
              showFilters={false} />
          </Popout>)} */}

        </div>
        <small>(If your pool is missing and you would like to see it listed, please update your meta data 'location' field.)</small>

      </div >
    );
  }
};

export default MapChartV2;
