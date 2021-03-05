import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Graticule
} from "react-simple-maps";
// import  { useHistory }  from "react-router-dom";

// const history = useHistory();

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function getMarkers() {
    var markers = [];

    props.poolsData.poolpeek.geo.map(function (item, key) {
      var locationShort = item.location.split(",")[0];
      markers.push({ markerOffset: 5, name: locationShort, coordinates: [item.location_lon, item.location_lat] })
    });

    return markers;
  }

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function openLocation(locationName) {
    console.log("location clicked" + locationName)
  }

  return (
    <div>
      <h3>The red dots represent pools.</h3>
      <h3>Click the country to view all the pools in there.</h3>
      <div style={{ width: "80%", height: "90%", margin: "20px", alignItems: "center" }}>
      <ComposableMap>
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
              <circle r={1.8} fill="#F00" stroke="#fff" strokeWidth={0} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 4 }}
              >
                {name}
              </text>
            </Marker>

          ))}
        </ZoomableGroup>
      </ComposableMap>
      </div>

    </div >
  );
};

export default MapChart;
