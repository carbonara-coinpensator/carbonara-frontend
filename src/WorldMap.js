import React, {Component} from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class WorldMap extends Component {

    constructor(...props) {

        super(...props);

        this.state = {
            regions: [
                { "name": "US", "coordinates": [-74.0059,40.7128], "amount": (this.props.values[1]) },
                { "name": "EU", "coordinates": [2.3522,48.8566], "amount": (this.props.values[0]) },
                { "name": "CN", "coordinates": [121.4737,31.2304], "amount": (this.props.values[0]) }
            ],
            values: this.props.values,
        }

        this.onChange = this.onChange.bind(this);

    }

    onChange(values) {
        console.log(this.props.values);
        this.props.onChange(values);
        this.setState({ values });
    }

    componentDidMount() {

    }

    render() {

        return (

            <div style={wrapperStyles}>

                hey: { this.props.values[0] }

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
                        <Geographies geography="/src/world-50m.json">
                        {(geographies, projection) =>
                            geographies.map((geography, i) =>
                            geography.id !== "ATA" && (
                                <Geography
                                key={i}
                                geography={geography}
                                projection={projection}
                                style={{
                                    default: {
                                    fill: "#ECEFF1",
                                    stroke: "#607D8B",
                                    strokeWidth: 0.75,
                                    outline: "none",
                                    },
                                    hover: {
                                    fill: "#ECEFF1",
                                    stroke: "#607D8B",
                                    strokeWidth: 0.75,
                                    outline: "none",
                                    },
                                    pressed: {
                                    fill: "#ECEFF1",
                                    stroke: "#607D8B",
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
                                r={this.props.values[i]}
                                fill="rgba(255,87,34,0.8)"
                                stroke="#607D8B"
                                strokeWidth="2"
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
