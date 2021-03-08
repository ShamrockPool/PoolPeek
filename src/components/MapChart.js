import Page from 'components/Page';
import React from 'react';
import Popout from 'components/Popout';
import { Map, Marker, Overlay } from 'pigeon-maps'
import 'reactjs-popup/dist/index.css';
import QuickQueriesPage from '../pages/QuickQueriesPage';
import FetchPoolList from 'components/FetchPoolList';
import * as queries from '../assets/queries/quickqueries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
class MapChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      poolData: null,
      position: 0,
      isShown: 0,
      latSelected: 0,
      longSelected: 0,
      locationSelected: ''

    }
  }

  // const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  // const [isShown, setIsShown] = useState(false);
  // const [latSelected, setlatSelected] = useState(0);
  // const [longSelected, setlongSelected] = useState(0);

  getPopout() {
    var tickers = [];
    console.log(this.state.latSelected)
    console.log(this.state.longSelected)


    this.props.poolsData.poolpeek.geo.map(function (item, key) {
      // if (this.state.longSelected == item.location_lon && this.state.latSelected == item.location_lat) {
      //   tickers.push(item.name)
      // }
      console.log(item.name);
    });


  }


  getMarkers() {
    var markers = [];


    this.props.poolsData.poolpeek.geo.map(function (item, key) {
      var location;
      if (item.location.includes(',')) {
        location = item.location.split(",")[0];
      }
      // else if (item.location.includes(' ')) {
      //   location = item.location.split(" ")[0];
      // }
      else {
        location = item.location;
      }

      var shouldAdd = true;
      if (markers.length == 0) {
        markers.push({ markerOffset: 1, name: location, coordinates: [item.location_lon, item.location_lat] });
      }

      markers.map(function (addedMarker, key) {

        if (addedMarker.coordinates[0] == item.location_lon && addedMarker.coordinates[1] == item.location_lat) {
          //dont add
          shouldAdd = false;
          return;
        }

        if (addedMarker.name.includes(location)) {
          //dont add
          shouldAdd = false;
          return;
        }
      });

      if (shouldAdd) {
        markers.push({ markerOffset: 1, name: location, coordinates: [item.location_lon, item.location_lat] });
      }
    });

    console.log(markers.length)
    return markers;
  }

  getMarkers2() {
    var markers = [];




    this.props.poolsData.poolpeek.geo.map(function (item, key) {
      var location = "";
      var lat = 0;
      var long = 0;
      // if (item.location.includes(',')) {
      //   location = item.location.split(",")[0];
      // }
      // // else if (item.location.includes(' ')) {
      // //   location = item.location.split(" ")[0];
      // // }
      // else {
      location = item.location;
      //}

      lat = Number(item.location_lat);
      long = Number(item.location_lon);

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
    });

    console.log(markers.length)

    return markers;
  }

  componentDidMount() {
    this.state.poolData = this.props.poolsData;
    console.log(this.state.poolData);
  }

  render() {
    return (
      <div>
        <h3>The red dots represent pools.</h3>
        <h3>Click the country to view all the pools in there.</h3>

        <div style={{ width: "99%", height: "95%", margin: "5px", alignItems: "center" }}>
          <Map defaultCenter={[50.879, 4.6997]} defaultZoom={3} width={1600} height={800}>
            {this.getMarkers2().map(({ name, long, lat }) => (

              <Marker anchor={[lat, long]}
                color='red'
                payload={name}
                onClick={({ event, anchor, payload }) => {

                  this.state.latSelected = anchor[1];
                  this.setState({ latSelected: anchor[1] });
                  this.state.longSelected = anchor[0];
                  this.setState({ longSelected: anchor[0] });
                  console.log('Clicked marker nr: ', payload);
                  console.log('Clicked marker nr anchor: ', anchor);

                  this.state.locationSelected = payload;
                  this.setState({ locationSelected: payload });
                  
                  this.state.isShown = true;
                  this.setState({ isShown: true });
                }}
              >

              </Marker>
            ))}
            {/* <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
      <img src='pigeon.jpg' width={240} height={158} alt='' />
    </Overlay> */}
          </Map>

          {this.state.isShown && (<Popout {...this.props} title='Pools in this location' closeWindow={() => this.setState({ isShown: false })}>
            <FetchPoolList {...this.props} query={"&location="+this.state.locationSelected} multiPoolOperators={true} pageDescription={"Location search:"+this.state.locationSelected}
            showFilters={false}/>
        </Popout>)}

          {/* <ComposableMap>
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      const { NAME, POP_EST } = geo.properties;
                      console.log(`${NAME} — ${POP_EST}`);

                      //  history.push("/poolsearch");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}

                    fill="#9998A3"
                    stroke="#EAEAEC"
                  />
                ))
              }
            </Geographies>
            {getMarkers().map(({ name, coordinates, markerOffset }) => (

              <Marker key={name} coordinates={coordinates}
              >
                <circle r={0.3} fill="#F00" stroke="#fff" strokeWidth={0} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 0.5 }}
                >
                  {name}
                </text>
              </Marker>

            ))}
          </ZoomableGroup>
        </ComposableMap> */}
        </div>

      </div >
    );
  }
};

export default MapChart;
