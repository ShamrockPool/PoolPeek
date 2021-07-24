import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps'
import 'reactjs-popup/dist/index.css';


const width = window.innerWidth;

class MapChart extends React.Component {

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

  // const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  // const [isShown, setIsShown] = useState(false);
  // const [latSelected, setlatSelected] = useState(0);
  // const [longSelected, setlongSelected] = useState(0);

  getPopout() {
    var tickers = [];
    this.props.poolsData.poolpeek.geo.map(function (item, key) {
      // if (this.state.longSelected == item.location_lon && this.state.latSelected == item.location_lat) {
      //   tickers.push(item.name)
      // }
    });


  }


  // getMarkers() {
  //   var markers = [];


  //   this.props.poolsData.map(function (item, key) {
  //     var location;
  //     if (item.extended_meta.location.includes(',')) {
  //       location = item.location.split(",")[0];
  //     }
  //     // else if (item.location.includes(' ')) {
  //     //   location = item.location.split(" ")[0];
  //     // }
  //     else {
  //       location = item.location;
  //     }

  //     var shouldAdd = true;
  //     if (markers.length == 0) {
  //       markers.push({ markerOffset: 1, name: location, coordinates: [item.location_lon, item.location_lat] });
  //     }

  //     markers.map(function (addedMarker, key) {

  //       if (addedMarker.coordinates[0] == item.location_lon && addedMarker.coordinates[1] == item.location_lat) {
  //         //dont add
  //         shouldAdd = false;
  //         return;
  //       }

  //       if (addedMarker.name.includes(location)) {
  //         //dont add
  //         shouldAdd = false;
  //         return;
  //       }
  //     });

  //     if (shouldAdd) {
  //       markers.push({ markerOffset: 1, name: location, coordinates: [item.location_lon, item.location_lat] });
  //     }
  //   });

  //   return markers;
  // }

  getMarkers2() {
    var markers = [];
    var poolsData = this.props.poolsData;
    poolsData.pools.map(function (item, key) {
      var location = item.extended_meta.location;
      var lat = 0;
      var long = 0;



      lat = Number(item.extended_meta.location_lat);
      long = Number(item.extended_meta.location_lon);

      if (lat != 0 && long != 0) {

        var shouldAdd = true;
        if (markers.length == 0) {
          markers.push({ name: location, lat: lat, long: long });
        }
        markers.map(function (addedMarker, key) {

          if (addedMarker.lon == item.location_lon && addedMarker.lat == item.location_lat) {
            //dont add location exists
            shouldAdd = false;
            return;
          }
        });

        if (shouldAdd) {
          markers.push({ name: location, lat: lat, long: long });
        }
      }
    });

    // this.setState({ totalMarkers: markers.length });

    return markers;
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
    var filteredMarkers = this.getMarkers2();
    this.setState({ totalMarkers: filteredMarkers.length });
    this.setState({ markersFiltered: filteredMarkers });
  }

  render() {
    return (
      <div>
        <h3><b>Click a marker below to display all pools at that location.</b></h3>
        {/* <h3>Total pools with locations: {this.props.poolsData.poolpeek.geo.length + 1}</h3> */}
        <h3>Total unique pool locations: {this.state.totalMarkers}</h3>
        <div style={{ width: "99%", height: "95%", margin: "5px", alignItems: "center" }}>
          <Map defaultCenter={[50.879, 4.6997]} defaultZoom={3} width={this.state.mapWidth} height={800}>
            {this.state.markersFiltered.map(({ name, long, lat }) => (

              <Marker anchor={[lat, long]}
                color='red'
                payload={name}
                onClick={({ event, anchor, payload }) => {

                  this.state.latSelected = anchor[1];
                  this.state.longSelected = anchor[0];
                  this.setState({ latSelected: anchor[1], longSelected: anchor[0] });

                  this.state.locationSelected = payload;
                  this.setState({ locationSelected: payload, isShown: true });
                  this.state.isShown = true;

                  var host = window.location.protocol + "//" + window.location.host;
                  this.openInNewTab(host + '/poolsearch/' + payload);
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

export default MapChart;
