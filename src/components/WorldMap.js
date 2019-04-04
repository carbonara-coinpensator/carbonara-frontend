import React, {Component} from 'react';
import geodata from '../static/media/ne_110m_land.topojson'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import RegionInfos from './RegionInfos'

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class WorldMap extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            regions: RegionInfos
        }

    }

    componentDidMount() {

    }

    render() {

        return (

            <div style={wrapperStyles}>

                <ComposableMap
                    projectionConfig={{ scale: 205 }}
                    width={980}
                    height={551}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                    >
                    <ZoomableGroup center={[0,20]} disablePanning>
                        <Geographies geography={geodata}>
                        {(geographies, projection) =>
                            geographies.map((geography, i) =>
                            geography.id !== "ATA" && (
                                <Geography
                                key={i}
                                geography={geography}
                                projection={projection}
                                style={{
                                    default: {
                                        fill: "#eee",
                                        stroke: "#ccc",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#f2f2f2",
                                        stroke: "#ddd",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: "#fff",
                                        stroke: "#eee",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                    },
                                }}
                                />
                        ))}
                        </Geographies>
                        <Markers>
                        {
                            this.state.regions.map((region, i) => (
                            <Marker key={i} marker={region}>
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={this.props.consumptionsPercent[i]}
                                    fill={region.color}
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            </Marker>
                            ))
                        }
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>

            </div>

        )
    }
}

export default WorldMap;
